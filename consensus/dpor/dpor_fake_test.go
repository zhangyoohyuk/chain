// Copyright 2018 The cpchain authors
// This file is part of the cpchain library.
//
// The cpchain library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// The cpchain library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the cpchain library. If not, see <http://www.gnu.org/licenses/>.

package dpor

import (
	"errors"
	"math/big"
	"time"

	"bitbucket.org/cpchain/chain/configs"
	"bitbucket.org/cpchain/chain/consensus"
	"bitbucket.org/cpchain/chain/types"
	"github.com/ethereum/go-ethereum/common"
)

type FakeReader struct {
	consensus.ChainReader
}

func (*FakeReader) Config() *configs.ChainConfig {
	// TODO @hmw populate this config
	return &configs.ChainConfig{}
}

func (*FakeReader) GetHeaderByNumber(number uint64) *types.Header {
	return &types.Header{Number: big.NewInt(0), Time: big.NewInt(0).Sub(big.NewInt(time.Now().Unix()), big.NewInt(100))}
}

type fakeDporUtil struct {
	dporUtil
	success bool
}

func (f *fakeDporUtil) calcDifficulty(snap *DporSnapshot, signer common.Address) *big.Int {
	if f.success {
		return big.NewInt(10)
	} else {
		return nil
	}
}

type fakeDporHelper struct {
	dporUtil
	verifySuccess   bool
	snapshotSuccess bool
}

func (f *fakeDporHelper) verifyHeader(c *Dpor, chain consensus.ChainReader, header *types.Header, parents []*types.Header, refHeader *types.Header) error {
	if f.verifySuccess {
		return nil
	} else {
		return errors.New("verify Header")
	}
}

func (*fakeDporHelper) verifyCascadingFields(c *Dpor, chain consensus.ChainReader, header *types.Header, parents []*types.Header, refHeader *types.Header) error {
	panic("implement me")
}

func (f *fakeDporHelper) snapshot(c *Dpor, chain consensus.ChainReader, number uint64, hash common.Hash, parents []*types.Header) (*DporSnapshot, error) {
	if f.snapshotSuccess {
		return &DporSnapshot{}, nil
	} else {
		return nil, errors.New("err")
	}

}

func (*fakeDporHelper) verifySeal(c *Dpor, chain consensus.ChainReader, header *types.Header, parents []*types.Header, refHeader *types.Header) error {
	panic("implement me")
}

type fakeSnapshot struct {
	Snapshot
}
