// Copyright 2018 The cphain authors

package configs

import (
	"fmt"

	"bitbucket.org/cpchain/chain/commons/log"
)

type RunMode string
const (
	Dev RunMode = "dev"
	Testnet RunMode = "testnet"
	Mainnet RunMode = "mainnet"
)

// Run mode for switch node configuration, eg:dev|testnet|mainnet
var runModeValue = Dev

func GetRunMode() RunMode {
	return runModeValue
}

func SetRunMode(runMode RunMode) error {
	switch runMode {
	case Dev:
	case Mainnet:
	case Testnet:
	default:
		log.Error(fmt.Sprintf("unknown runModeValue, revert to default mode: %s", runModeValue), "runModeValue", runMode)
		return fmt.Errorf("unknown runModeValue %s", runMode)
	}
	runModeValue = runMode
	log.Debug("init runModeValue", "runModeValue", runModeValue)
	return nil
}

func IsDev() bool {
	return Dev == runModeValue
}

func IsMainnet() bool {
	return Mainnet == runModeValue
}

func IsTestnet() bool {
	return Testnet == runModeValue
}