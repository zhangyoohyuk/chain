package rpt

// this package collects all reputation calculation related information,
// then calculates the reputations of candidates.

import (
	"context"
	"fmt"
	"math/big"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/log"
	"github.com/ethereum/go-ethereum/params"
	"github.com/ethereum/go-ethereum/rpc"
)

var (
	extraVanity = 32 // Fixed number of extra-data prefix bytes reserved for signer vanity
	// extraSeal   = 65 // Fixed number of extra-data suffix bytes reserved for signer seal
)

// RPT defines the name and reputation pair.
type RPT struct {
	Address common.Address
	Rpt     float64
}

// RPTs is an array of RPT.
type RPTs []RPT

// This is used for sorting.
func (a RPTs) Len() int           { return len(a) }
func (a RPTs) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }
func (a RPTs) Less(i, j int) bool { return a[i].Rpt < a[j].Rpt }

// Collector collects all rpt related information from block txs and contracts.
type Collector interface {
	GetRpt(address common.Address, number uint64) RPT
	GetRpts(addresses []common.Address, number uint64) RPTs

	GetRptInfo(address common.Address, number uint64) Info
	GetRptInfos(addresses common.Address, number uint64) map[common.Address]Info

	calcRptInfo(address common.Address, number uint64) RPT

	getChainRptInfo(address common.Address, number uint64) ChainRptInfo
	getContractRptInfo(address common.Address, number uint64) ContractRptInfo
}

// CollectorConfig is the config of rpt info collector
type CollectorConfig struct {
	LeaderReward float64
	ProxyReward  float64
	UploadReward float64
	Alpha        float64 // coinAge coefficient
	Beta         float64 // dataUpload coefficient
	Gamma        float64 // proxyReward coefficient
	Phi          float64 // leaderReward coefficient
	Omega        float64 // txVolume coefficient
	WindowSize   uint64  // window size, how many blocks to recall.
	ChainConfig  *params.ChainConfig
	DporConfig   *params.DporConfig
}

// BasicCollector is the default rpt collector
type BasicCollector struct {
	// TODO: backend here.
	*ethclient.Client
	Config CollectorConfig
}

// ChainRptInfo is the rpt info from chain
type ChainRptInfo struct {
	CoinAge  float64
	TxVolume float64
	IfLeader float64
}

// ContractRptInfo is the rpt info from contracts.
type ContractRptInfo struct {
	ProxyReward  float64
	UploadReward float64
}

// Info is the whole rpt info.
type Info struct {
	Number       uint64
	ChainInfo    ChainRptInfo
	ContractInfo ContractRptInfo
}

// NewBasicCollector returns a new BasicCollector object.
func NewBasicCollector(endpoint string, config *CollectorConfig) (*BasicCollector, error) {
	log.Info("connecting to RPT API", "url", endpoint)
	client, err := rpc.Dial(endpoint)
	if err != nil {
		return nil, fmt.Errorf("error connecting to RPT API %s: %s", endpoint, err)
	}
	ethClient := ethclient.NewClient(client)
	bc := &BasicCollector{
		Client: ethClient,
		Config: *config,
	}
	return bc, err
}

// GetRpt returns reputation of the given address.
func (bc *BasicCollector) GetRpt(address common.Address, number uint64) RPT {
	return bc.calcRptInfo(address, number)
}

// GetRpts returns reputation list of given addresses.
func (bc *BasicCollector) GetRpts(addresses *[]common.Address, number uint64) RPTs {
	rpts := RPTs{}
	for i := 0; i < len(*addresses); i++ {
		rpts = append(rpts, bc.GetRpt((*addresses)[i], number))
	}
	return rpts
}

// GetRptInfo returns reputation info of given address.
func (bc *BasicCollector) GetRptInfo(address common.Address, number uint64) Info {
	return Info{
		ChainInfo:    bc.getChainRptInfo(address, number),
		ContractInfo: bc.getContractRptInfo(address, number),
	}
}

// GetRptInfos returns reputation info of given address.
func (bc *BasicCollector) GetRptInfos(addresses *[]common.Address, number uint64) map[common.Address]Info {
	infos := make(map[common.Address]Info)
	for _, address := range *addresses {
		infos[address] = bc.GetRptInfo(address, number)
	}
	return infos
}

func (bc *BasicCollector) calcRptInfo(address common.Address, number uint64) RPT {
	alpha, beta, gamma, phi, omega := bc.Config.Alpha, bc.Config.Beta, bc.Config.Gamma, bc.Config.Phi, bc.Config.Omega

	chainInfo := bc.getChainRptInfo(address, number)
	contractInfo := bc.getContractRptInfo(address, number)

	rpt := alpha*chainInfo.CoinAge + beta*contractInfo.UploadReward + gamma*contractInfo.ProxyReward + phi*chainInfo.IfLeader + omega*chainInfo.TxVolume
	return RPT{Address: address, Rpt: rpt}
}

func (bc *BasicCollector) getChainRptInfo(address common.Address, number uint64) ChainRptInfo {
	coinAge, txVolume, ifLeader := 0., 0., 0.
	for i := number; i >= 0 && i >= number-bc.Config.WindowSize; i-- {
		coinAge += bc.getCoinAge(address, i)
		txVolume += bc.getTxVolume(address, i)
		ifLeader += bc.getIfLeader(address, i)
	}
	return ChainRptInfo{
		CoinAge:  coinAge,
		TxVolume: txVolume,
		IfLeader: ifLeader,
	}
}

func (bc *BasicCollector) getContractRptInfo(address common.Address, number uint64) ContractRptInfo {
	uploadReward, proxyReward := 0., 0.
	for i := number; i >= 0 && i >= number-bc.Config.WindowSize; i-- {
		uploadReward += bc.getUploadReward(address, i)
		proxyReward += bc.getProxyReward(address, i)
	}
	return ContractRptInfo{
		UploadReward: uploadReward,
		ProxyReward:  proxyReward,
	}
}

func (bc *BasicCollector) getCoinAge(address common.Address, number uint64) float64 {
	balance, err := bc.BalanceAt(context.Background(), address, big.NewInt(int64(number)))
	if err != nil {
		log.Warn("error with bc.getCoinAge", "error", err)
	}
	return float64(balance.Uint64())
}

func (bc *BasicCollector) getTxVolume(address common.Address, number uint64) float64 {
	block, err := bc.BlockByNumber(context.Background(), big.NewInt(int64(number)))
	if err != nil {
		log.Warn("error with bc.getTxVolume", "error", err)
	}
	txvs := float64(0)
	signer := types.NewEIP155Signer(bc.Config.ChainConfig.ChainID)
	txs := block.Transactions()
	for _, tx := range txs {
		sender, err := signer.Sender(tx)
		if err != nil {
			continue
		}
		if sender == address {
			txvs += float64(tx.Value().Uint64())
		}
	}
	return txvs
}

func (bc *BasicCollector) getIfLeader(address common.Address, number uint64) float64 {
	if bc.Config.ChainConfig.ChainID.Uint64() == uint64(4) {
		return 0
	}
	header, err := bc.HeaderByNumber(context.Background(), big.NewInt(int64(number)))
	if err != nil {
		log.Warn("error with bc.getIfLeader", "error", err)
	}
	number = number%bc.Config.DporConfig.Epoch - 1
	leaderBytes := header.Extra[uint64(extraVanity)+number*common.AddressLength : uint64(extraVanity)+(number+1)*common.AddressLength]
	leader := common.BytesToAddress(leaderBytes)
	if leader == address {
		return bc.Config.LeaderReward
	}
	return 0
}

func (bc *BasicCollector) getUploadReward(address common.Address, number uint64) float64 {
	// TODO: implement this.
	return bc.Config.UploadReward
}

func (bc *BasicCollector) getProxyReward(address common.Address, number uint64) float64 {
	// TODO: implement this.
	return bc.Config.ProxyReward
}