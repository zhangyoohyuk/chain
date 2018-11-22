// Code generated by github.com/fjl/gencodec. DO NOT EDIT.

package types

import (
	"encoding/json"
	"errors"
	"math/big"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
)

var _ = (*headerMarshaling)(nil)

// MarshalJSON marshals as JSON.
func (h Header) MarshalJSON() ([]byte, error) {
	type Header struct {
		ParentHash   common.Hash    `json:"parentHash"       gencodec:"required"`
		Coinbase     common.Address `json:"miner"            gencodec:"required"`
		StateRoot    common.Hash    `json:"stateRoot"        gencodec:"required"`
		TxsRoot      common.Hash    `json:"transactionsRoot" gencodec:"required"`
		ReceiptsRoot common.Hash    `json:"receiptsRoot"     gencodec:"required"`
		LogsBloom    Bloom          `json:"logsBloom"        gencodec:"required"`
		Difficulty   *hexutil.Big   `json:"difficulty"       gencodec:"required"`
		Number       *hexutil.Big   `json:"number"           gencodec:"required"`
		GasLimit     hexutil.Uint64 `json:"gasLimit"         gencodec:"required"`
		GasUsed      hexutil.Uint64 `json:"gasUsed"          gencodec:"required"`
		Time         *hexutil.Big   `json:"timestamp"        gencodec:"required"`
		Extra        hexutil.Bytes  `json:"extraData"        gencodec:"required"`
		MixHash      common.Hash    `json:"mixHash"          gencodec:"required"`
		Nonce        BlockNonce     `json:"nonce"            gencodec:"required"`
		Dpor         DporSnap       `json:"dpor"             gencodec:"required"`
		Hash         common.Hash    `json:"hash"`
	}
	var enc Header
	enc.ParentHash = h.ParentHash
	enc.Coinbase = h.Coinbase
	enc.StateRoot = h.StateRoot
	enc.TxsRoot = h.TxsRoot
	enc.ReceiptsRoot = h.ReceiptsRoot
	enc.LogsBloom = h.LogsBloom
	enc.Difficulty = (*hexutil.Big)(h.Difficulty)
	enc.Number = (*hexutil.Big)(h.Number)
	enc.GasLimit = hexutil.Uint64(h.GasLimit)
	enc.GasUsed = hexutil.Uint64(h.GasUsed)
	enc.Time = (*hexutil.Big)(h.Time)
	enc.Extra = h.Extra
	enc.MixHash = h.MixHash
	enc.Nonce = h.Nonce
	enc.Dpor = h.Dpor
	enc.Hash = h.Hash()
	return json.Marshal(&enc)
}

// UnmarshalJSON unmarshals from JSON.
func (h *Header) UnmarshalJSON(input []byte) error {
	type Header struct {
		ParentHash   *common.Hash    `json:"parentHash"       gencodec:"required"`
		Coinbase     *common.Address `json:"miner"            gencodec:"required"`
		StateRoot    *common.Hash    `json:"stateRoot"        gencodec:"required"`
		TxsRoot      *common.Hash    `json:"transactionsRoot" gencodec:"required"`
		ReceiptsRoot *common.Hash    `json:"receiptsRoot"     gencodec:"required"`
		LogsBloom    *Bloom          `json:"logsBloom"        gencodec:"required"`
		Difficulty   *hexutil.Big    `json:"difficulty"       gencodec:"required"`
		Number       *hexutil.Big    `json:"number"           gencodec:"required"`
		GasLimit     *hexutil.Uint64 `json:"gasLimit"         gencodec:"required"`
		GasUsed      *hexutil.Uint64 `json:"gasUsed"          gencodec:"required"`
		Time         *hexutil.Big    `json:"timestamp"        gencodec:"required"`
		Extra        *hexutil.Bytes  `json:"extraData"        gencodec:"required"`
		MixHash      *common.Hash    `json:"mixHash"          gencodec:"required"`
		Nonce        *BlockNonce     `json:"nonce"            gencodec:"required"`
		Dpor         *DporSnap       `json:"dpor"             gencodec:"required"`
	}
	var dec Header
	if err := json.Unmarshal(input, &dec); err != nil {
		return err
	}
	if dec.ParentHash == nil {
		return errors.New("missing required field 'parentHash' for Header")
	}
	h.ParentHash = *dec.ParentHash
	if dec.Coinbase == nil {
		return errors.New("missing required field 'miner' for Header")
	}
	h.Coinbase = *dec.Coinbase
	if dec.StateRoot == nil {
		return errors.New("missing required field 'stateRoot' for Header")
	}
	h.StateRoot = *dec.StateRoot
	if dec.TxsRoot == nil {
		return errors.New("missing required field 'transactionsRoot' for Header")
	}
	h.TxsRoot = *dec.TxsRoot
	if dec.ReceiptsRoot == nil {
		return errors.New("missing required field 'receiptsRoot' for Header")
	}
	h.ReceiptsRoot = *dec.ReceiptsRoot
	if dec.LogsBloom == nil {
		return errors.New("missing required field 'logsBloom' for Header")
	}
	h.LogsBloom = *dec.LogsBloom
	if dec.Difficulty == nil {
		return errors.New("missing required field 'difficulty' for Header")
	}
	h.Difficulty = (*big.Int)(dec.Difficulty)
	if dec.Number == nil {
		return errors.New("missing required field 'number' for Header")
	}
	h.Number = (*big.Int)(dec.Number)
	if dec.GasLimit == nil {
		return errors.New("missing required field 'gasLimit' for Header")
	}
	h.GasLimit = uint64(*dec.GasLimit)
	if dec.GasUsed == nil {
		return errors.New("missing required field 'gasUsed' for Header")
	}
	h.GasUsed = uint64(*dec.GasUsed)
	if dec.Time == nil {
		return errors.New("missing required field 'timestamp' for Header")
	}
	h.Time = (*big.Int)(dec.Time)
	if dec.Extra == nil {
		return errors.New("missing required field 'extraData' for Header")
	}
	h.Extra = *dec.Extra
	if dec.MixHash == nil {
		return errors.New("missing required field 'mixHash' for Header")
	}
	h.MixHash = *dec.MixHash
	if dec.Nonce == nil {
		return errors.New("missing required field 'nonce' for Header")
	}
	h.Nonce = *dec.Nonce
	if dec.Dpor == nil {
		return errors.New("missing required field 'dpor' for Header")
	}
	h.Dpor = *dec.Dpor
	return nil
}
