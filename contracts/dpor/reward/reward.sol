pragma solidity ^0.4.24;

import "./lib/safeMath.sol";
import "./lib/set.sol";

contract Reward {
    using Set for Set.Data;
    using SafeMath for uint256;

    address owner;
    bool private locked = true; // indicate status of the contract, if true, nobody can deposit
    uint256 public basicCriteria = 20000 ether;
    uint256 public electionCriteria = 200000 ether;
    uint256 public bonusPool = 1250000 ether; // 1.25m x 4 = 5m (cpc)
    uint256 public nextRound = 0;
    Set.Data internal rnodes;
    Set.Data internal participants;   // rnodes and enodes
    uint256 public nextRoundStartTime = 0;
    uint256 private period = 90 days;

    // This is a type for a single investor
    struct Investor {
        uint256 freeDeposit; // amount that can be taken out
        uint256 lockedDeposit; // locked amount
        uint256 returned; // amount that will be returned to investor after a round
        bool toRenew; // if true, the person will continue to invest
    }

    // store a 'Investor' struct for each possible address
    mapping (address => Investor) private investors;

    // These events will be emitted on changes
    event SubmitDeposit(address who,uint256 value);
    event WithdrawDeposit(address who, uint256 value);
    event JoinENodes(address who, uint256 value);
    event JoinRNodes(address who, uint256 value);
    event TransferDeposit(address who, uint256 value);
    event NewRaise(uint256 round, bool lock,uint256 _bonusPool);
    event DepositInsufficient(address who,uint256 value);
    event ContinuedInvest(address _addr,bool _iscontinue);
    event FundBonusPool(uint256 value);

    modifier onlyOwner() {require(msg.sender == owner);_;}

    // have to unlock the contract before starting a new raise
    modifier unlocked() {
        require(locked == false);
        _;
    }

    constructor () public {
        owner = msg.sender;
    }

    // value transferred to contract without calling any legitimate function will fund the bonus pool
    function () public payable {
        emit FundBonusPool(msg.value);
    }

    // owner start a new raise by unlocking the contract
    function newRaise() public onlyOwner() {
        locked = false;
        emit NewRaise(nextRound,locked,bonusPool);
    }

    // owner set amount of bonus pool
    function setBonusPool(uint256 _bonus) public onlyOwner() {
        bonusPool = _bonus;
    }

    // deposit money to become a participate after the contract being unlocked
    // investors will be added into participants after submitting deposit
    // the amount will not locked until new round start
    function submitDeposit() public payable unlocked() {
        require(!isContract(msg.sender),"please not use contract call this function");
        if (!isENode(msg.sender)){
            participants.insert(msg.sender);
        }
        investors[msg.sender].freeDeposit = investors[msg.sender].freeDeposit.add(msg.value);
        emit SubmitDeposit(msg.sender,msg.value);
    }

    // get investor's total balance: freeDeposit + lockedDeposit
    function getTotalBalance(address _addr) public view returns (uint256){
        uint256 freeBalance=0;
        uint256 lockedBalance=0;
        freeBalance = investors[_addr].freeDeposit;
        lockedBalance = investors[_addr].lockedDeposit;
        return freeBalance.add(lockedBalance);
    }

    function getFreeBalance(address _addr) public view returns (uint256){
        uint256  deposit;
        deposit = investors[_addr].freeDeposit;
        return  deposit;
    }

    function getLockedBalance(address _addr) public view returns (uint256){
        uint256  deposit ;
        deposit = investors[_addr].lockedDeposit;
        return  deposit;
    }

    function isLocked() public view returns (bool){
        bool s;
        s=locked;
        return s;
    }

    // judge whether an address is contract address by checking extcodesize
    function isContract(address addr) public view returns (bool) {
        uint size;
        assembly { size := extcodesize(addr) }
        return size > 0;
    }

    // go through all participants and accumulate locked amount
    // participants.value is a list that stores all participant addresses
    // 'participants' is a new defined type set.Data. see lib/set.sol
    function totalInvestAmount() public view returns (uint256){
        uint256 totalAmount = 0;
        for (uint256 i = 0; i < participants.values.length; i++) {
            totalAmount = totalAmount.add(investors[participants.values[i]].lockedDeposit);
        }
        return totalAmount;
    }

    // go through all participants and accumulate total amount: locked + free
    function totalInvestAmountNow()public view returns (uint256){
        uint256 totalAmountNow = 0;
        for (uint256 i = 0; i < participants.values.length; i++){
             totalAmountNow = totalAmountNow.add(getTotalBalance(participants.values[i]));
        }
        return totalAmountNow;
    }

    // investors withdraw their free deposit
    function withdraw(uint256 _value) public payable{
        require(_value <= investors[msg.sender].freeDeposit);
        investors[msg.sender].freeDeposit = investors[msg.sender].freeDeposit.sub(_value);
        msg.sender.transfer(_value);
        emit WithdrawDeposit(msg.sender, _value);
    }

    // owner can transfer investors' free deposit to their address
    function transferDeposit(address _addr,uint256 _value) public onlyOwner(){
        require(_value <= investors[_addr].freeDeposit);
        investors[_addr].freeDeposit = investors[_addr].freeDeposit.sub(_value);
        _addr.transfer(_value);
        emit TransferDeposit(_addr,_value);
    }

    function wantRenew() public unlocked() {
        investors[msg.sender].toRenew =true;
    }

    function quitRenew() public unlocked(){
        investors[msg.sender].toRenew =false;
    }

    function isToRenew(address _addr) public view returns (bool){
        return investors[_addr].toRenew;
    }

    function setPeriod(uint256 _period) public onlyOwner() {
        period = _period;
    }

    function isRNode(address _addr) public view returns (bool){
        return rnodes.contains(_addr);
    }

    function isENode(address _addr) public view returns (bool){
        return participants.contains(_addr);
    }

    // close previous round and dividend bonus
    function closePreviousRound() internal {
        uint256 totalAmount = totalInvestAmount();
        if (totalAmount == 0) {  // no investors
            return;
        }

        uint256 deposit;
        uint256 interest;

        // go through participants, get locked deposit and calculate interest for each
        // interest will be added to returned amount
        // if participant does not renew, locked deposit will also be added to returned amount
        // participants will renew by default
        for (uint i = 0; i< participants.values.length; i++){
            deposit = investors[participants.values[i]].lockedDeposit;
            interest = bonusPool.mul(deposit).div(totalAmount); // interest = [total bonus] * ([the investor's investment] / [total investment])
            investors[participants.values[i]].returned = investors[participants.values[i]].returned.add(interest);

            if (investors[participants.values[i]].toRenew == false){
                investors[participants.values[i]].returned = investors[participants.values[i]].returned.add(deposit);
                investors[participants.values[i]].lockedDeposit = 0;
            }
            emit ContinuedInvest(participants.values[i], investors[participants.values[i]].toRenew);
        }
    }

    // only owner can start a new round
    function startNewRound() public onlyOwner() {
        require(block.timestamp >= (nextRoundStartTime), "the next round not start"); // allow start 3 days ahead of schedule

        // close previous round firstly
        if (nextRound > 0) {
            closePreviousRound();
        }

        // next round
        nextRound = nextRound.add(1);
        nextRoundStartTime = block.timestamp + period - 1 days; // 1days is a buffer

        // Transfer deposit form freeDeposit to lockedDeposit
        for (uint256 i = 0 ; i< participants.values.length; i++) {
            address investorAddr = participants.values[i];
            Investor storage investor = investors[investorAddr];
            uint256 totalAmount;
            totalAmount = getTotalBalance(investorAddr);
            if (totalAmount < basicCriteria){
                // the amount is not enough, return to free deposit and quit participants group
                investor.freeDeposit = investor.freeDeposit.add(investor.returned);
                assert(investor.lockedDeposit == 0); // locked deposit should be 0
                rnodes.remove(investorAddr);
                emit DepositInsufficient(investorAddr, totalAmount);
            } else {
                investor.lockedDeposit = investor.lockedDeposit.add(investor.freeDeposit);
                investor.freeDeposit = 0; // it is not necessary, but be helpful for understanding the logic
                investor.freeDeposit = investor.returned;
                investor.toRenew = true;  // by default it is "to renew" in each round
                if (totalAmount < electionCriteria) {
                    rnodes.remove(investorAddr);
                    emit JoinENodes(investorAddr, investor.lockedDeposit);
                } else {
                    // investor will if investor's deposit satisfy requirement,
                    rnodes.insert(investorAddr);
                    emit JoinRNodes(investorAddr, investor.lockedDeposit);
                }
            }
            investor.returned = 0;
            assert(investor.returned == 0);
        }
        // set locked to true
        locked = true;
    }

    function getInvestors() public onlyOwner() view returns (address[]) {
        return participants.getAll();
    }
}

