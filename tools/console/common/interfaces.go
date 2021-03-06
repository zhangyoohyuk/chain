package common

import "math/big"

// Output data
type Output interface {
	Status(status *Status)
	Balance(balance *Balance)
	Info(msg string, params ...interface{})
	Error(msg string, params ...interface{})
	Fatal(msg string, params ...interface{})
	Warn(msg string, params ...interface{})
}

// Manager manage the cpchain node
type Manager interface {
	GetStatus() (*Status, error)
	StartMining() error
	StopMining() error
	GetBalance() (*Balance, error)
	GetBalanceOnReward() (*RewardBalance, error)
	Withdraw() error
	SubmitDeposit() error
	WantRenew() error
	QuitRenew() error
}

// Balance of the cpchain node
type Balance struct {
	Balance big.Int
	Reward  RewardBalance
}

// Status is the status of cpchain ndoe
type Status struct {
	Mining           bool
	RNode            bool
	ENode            bool
	Proposer         bool
	Locked           bool
	NextNumber       *big.Int
	SupportPrivateTx bool
}

// RewardBalance is balance of contract namded reward
type RewardBalance struct {
	TotalBalance  *big.Int
	FreeBalance   *big.Int
	LockedBalance *big.Int
}
