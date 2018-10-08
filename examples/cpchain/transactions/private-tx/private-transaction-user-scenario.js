// Create a private tx for node1 and node2.
// Account 1 (Party A), Account 2(Party B), Account 3(Agent P), Account 4(other party)
var account1 = "0xe94b7b6c5a0e526a4d97f9768ad6097bde25c62a";
var account2 = "0xc05302acebd0730e3a18a058d7d1cb1204c4a092";
var account3 = "0xef3dd127de235f15ffb4fc0d71469d1339df6465";
var account4 = "0x3a18598184ef84198db90c28fdfdfdf56544f747";

// NOTE: you must update the public keys with the real ones in running environment.
// Party A, seller
var pubkey1 = "0x3082010a0282010100d2574d3137b7aaf410ad717203d48de8a967be03f01bc3607e06018b97be284bdedd5464e0cccfb4097a22a8c4d0c5d552cc80d0e59bfd7a078f6e1b684929c157354f67aee376927bc4428c4de30225fadef596d664058d2de55332af76058b578f329612a47274dbc84186f3e3c6857b13c962dd12d2e2d05fe3882cc3a3bfcbeb33b04800d41c6d4f4b95517696239eb032df8870be946d3efcea6332905db526c4d1233fb8e9cfca36000e70734adccd8626cf806715c035173d44aeeb5468bd6cbb7ab31dd0fc5e304e3299a9dc7be7aa40e4bbc81d4ca20c993e84a55b10c9447109e632b680918f7d395ac41d1977dc4b38135432a1b8922b8a13b7370203010001"
// Party B, buyer
var pubkey2 = "0x3082010a0282010100af5cdeede29982aebbf8577a4ebe10962105d82dadd1b3c845092a521e67c0c7004b47c7f8ec7dfce2fe99b1532f7f7bfb967fc2be25e6d56605485f2efcb2224cd7ce53dab5deb2c769e1ceb0dd238581460d3d636e0861a14c172f331b0fd6d55acffc73f8bc449f356e568cdb45348c0ae41a77437fc17e270821785a6135a8f44028af79103e9fb140a2ee281b91bcddf062b88eea13935a1900225e0a9d51aae0657225ea47dbeb3efbd9bddd6e5e341f97af8c0b625b41b252e2bc44cba8026fc6b56b05669db3b34be874a58d9a2bbe9d346a5fb4302b0974bb50130b19179f68b5d0491d794c7b65c231fba3160078406afd8e18307e5f90eb1f53a10203010001"
// Agent P, e.g. PDash
var pubkey3 = "0x3082010a0282010100a8b3670e163d24db4b8022c9f73f68eb01fa504dc3ca1d6e63d9af78e88c4546857afd522ceb1c79409aa9bd48a1d10eea36c4bfcc3aa5af90df88d5a68614f2829d3ee051274819587276d82a6ed8c34032404e803fa8be1fd25dced98c9eb4ce29a15e30754f7f7b7d84e2b5670044033bf1affc8de55ff18fa5b8f682ad34ba953dc805238205036ab982e90fdb225484722994034841885babe2436845be3dd15ce2f08d1737d82855f7a25f966aa4cacfa3e174f578ad6023b294b04b01362d7ba41cfadb47962acf0b8d398effd1eb766d34de3eb768f332f72d79679dd229b5d120f38fa09fbd331a18bf0d91f785f2990ee56676c85435292d9cda670203010001"
// private tx group
var group1 = [pubkey1, pubkey2, pubkey3];

var escrowAbi = [{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"prepay","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"payTo","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Recieve","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"PayTo","type":"event"}];
var escrowBin = '0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610348806100606000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806312065fe01461005c57806334fe1d1e146100875780637bf0862114610091575b600080fd5b34801561006857600080fd5b506100716100d1565b6040518082815260200191505060405180910390f35b61008f6100db565b005b6100cf600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610158565b005b6000600154905090565b346001600082825401925050819055507f6dafa44e4ef0f7a8b0488d91952b277c21e6fc0b6572aaedd63a3ebc0b74a42a3334604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a1565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156101b357600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561020e57600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415151561024a57600080fd5b806001541015151561025b57600080fd5b80600154036001819055508173ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501580156102ac573d6000803e3d6000fd5b507fba9a19d1fffd67bcf0c89ea4fa1c9f02c7c6649ab43b81c9c1ade9bc8c36199a8282604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a150505600a165627a7a723058201b83d778aa49736d2acf4750973fabbb463ea8b33a79da081933ebb5553d21700029'

var tradingAbi = [{"constant":false,"inputs":[{"name":"price","type":"uint256"}],"name":"updateItemPrice","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getItemPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"pubkey","type":"string"}],"name":"buy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"_item","outputs":[{"name":"available","type":"bool"},{"name":"name","type":"string"},{"name":"seller","type":"address"},{"name":"price","type":"uint256"},{"name":"description","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"confirm","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"price","type":"uint256"},{"name":"name","type":"string"},{"name":"description","type":"string"}],"name":"setItem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"_order","outputs":[{"name":"available","type":"bool"},{"name":"price","type":"uint256"},{"name":"seller","type":"address"},{"name":"buyer","type":"address"},{"name":"pubKey","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getItem","outputs":[{"name":"name","type":"string"},{"name":"price","type":"uint256"},{"name":"description","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_delivery","outputs":[{"name":"available","type":"bool"},{"name":"cid","type":"string"},{"name":"symKey","type":"string"},{"name":"confirmed","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getItemName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"cid","type":"string"},{"name":"symKey","type":"string"}],"name":"deliver","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"price","type":"uint256"},{"indexed":false,"name":"seller","type":"address"},{"indexed":false,"name":"buyer","type":"address"},{"indexed":false,"name":"pubkey","type":"string"}],"name":"OrderCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"cid","type":"string"},{"indexed":false,"name":"seller","type":"address"},{"indexed":false,"name":"buyer","type":"address"},{"indexed":false,"name":"symKey","type":"string"}],"name":"ItemDelivered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"seller","type":"address"},{"indexed":false,"name":"buyer","type":"address"}],"name":"Confirmed","type":"event"}]
var tradingBin = '0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506117c6806100606000396000f3006080604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630ae24354146100b45780632083ad82146100e1578063492cc7691461010c5780636c9231e1146101755780637022b58e146102b657806381a6ea29146102cd5780638cbac4a314610386578063c412eaba1461048e578063c814631b14610591578063c819d85a146106a3578063d6c56ac114610733575b600080fd5b3480156100c057600080fd5b506100df600480360381019080803590602001909291905050506107e2565b005b3480156100ed57600080fd5b506100f6610873565b6040518082815260200191505060405180910390f35b34801561011857600080fd5b50610173600480360381019080803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050610880565b005b34801561018157600080fd5b5061018a610b5b565b6040518086151515158152602001806020018573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200184815260200180602001838103835287818151815260200191508051906020019080838360005b838110156102105780820151818401526020810190506101f5565b50505050905090810190601f16801561023d5780820380516001836020036101000a031916815260200191505b50838103825284818151815260200191508051906020019080838360005b8381101561027657808201518184015260208101905061025b565b50505050905090810190601f1680156102a35780820380516001836020036101000a031916815260200191505b5097505050505050505060405180910390f35b3480156102c257600080fd5b506102cb610cdc565b005b3480156102d957600080fd5b5061038460048036038101908080359060200190929190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050610e61565b005b34801561039257600080fd5b5061039b610f7c565b60405180861515151581526020018581526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200180602001828103825283818151815260200191508051906020019080838360005b8381101561044f578082015181840152602081019050610434565b50505050905090810190601f16801561047c5780820380516001836020036101000a031916815260200191505b50965050505050505060405180910390f35b34801561049a57600080fd5b506104a3611085565b604051808060200184815260200180602001838103835286818151815260200191508051906020019080838360005b838110156104ed5780820151818401526020810190506104d2565b50505050905090810190601f16801561051a5780820380516001836020036101000a031916815260200191505b50838103825284818151815260200191508051906020019080838360005b83811015610553578082015181840152602081019050610538565b50505050905090810190601f1680156105805780820380516001836020036101000a031916815260200191505b509550505050505060405180910390f35b34801561059d57600080fd5b506105a66111dd565b6040518085151515158152602001806020018060200184151515158152602001838103835286818151815260200191508051906020019080838360005b838110156105fe5780820151818401526020810190506105e3565b50505050905090810190601f16801561062b5780820380516001836020036101000a031916815260200191505b50838103825285818151815260200191508051906020019080838360005b83811015610664578082015181840152602081019050610649565b50505050905090810190601f1680156106915780820380516001836020036101000a031916815260200191505b50965050505050505060405180910390f35b3480156106af57600080fd5b506106b8611345565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156106f85780820151818401526020810190506106dd565b50505050905090810190601f1680156107255780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561073f57600080fd5b506107e0600480360381019080803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091929192905050506113e9565b005b600160020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561084157600080fd5b60011515600160000160009054906101000a900460ff16151514151561086657600080fd5b8060016003018190555050565b6000600160030154905090565b60001515600660000160009054906101000a900460ff1615151480156108bc575060011515600160000160009054906101000a900460ff161515145b15156108c757600080fd5b60a0604051908101604052806001151581526020016001600301548152602001600160020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020013373ffffffffffffffffffffffffffffffffffffffff16815260200182815250600660008201518160000160006101000a81548160ff0219169083151502179055506020820151816001015560408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060608201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506080820151816004019080519060200190610a1e9291906116f5565b509050507fe3f4f7fc5607c6ab42a1ec9a7537ede8a0731377be155565f5f20c1fa298f449600160030154600160020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff163384604051808581526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200180602001828103825283818151815260200191508051906020019080838360005b83811015610b1b578082015181840152602081019050610b00565b50505050905090810190601f168015610b485780820380516001836020036101000a031916815260200191505b509550505050505060405180910390a150565b60018060000160009054906101000a900460ff1690806001018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610c085780601f10610bdd57610100808354040283529160200191610c08565b820191906000526020600020905b815481529060010190602001808311610beb57829003601f168201915b5050505050908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690806003015490806004018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610cd25780601f10610ca757610100808354040283529160200191610cd2565b820191906000526020600020905b815481529060010190602001808311610cb557829003601f168201915b5050505050905085565b600660030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610d3b57600080fd5b60011515600b60000160009054906101000a900460ff161515141515610d6057600080fd5b6001600b60030160006101000a81548160ff0219169083151502179055507fe6e1c12204e969623af0187721b9bc96d35b0f7b0d41c6c61e8137869ba4a8f4600660020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600660030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1565b60001515600160000160009054906101000a900460ff161515141515610e8657600080fd5b60a0604051908101604052806001151581526020018381526020013373ffffffffffffffffffffffffffffffffffffffff16815260200184815260200182815250600160008201518160000160006101000a81548160ff0219169083151502179055506020820151816001019080519060200190610f059291906116f5565b5060408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550606082015181600301556080820151816004019080519060200190610f739291906116f5565b50905050505050565b60068060000160009054906101000a900460ff16908060010154908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690806004018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561107b5780601f106110505761010080835404028352916020019161107b565b820191906000526020600020905b81548152906001019060200180831161105e57829003601f168201915b5050505050905085565b606060006060600180016001600301546001600401828054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561112f5780601f106111045761010080835404028352916020019161112f565b820191906000526020600020905b81548152906001019060200180831161111257829003601f168201915b50505050509250808054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156111cb5780601f106111a0576101008083540402835291602001916111cb565b820191906000526020600020905b8154815290600101906020018083116111ae57829003601f168201915b50505050509050925092509250909192565b600b8060000160009054906101000a900460ff1690806001018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561128a5780601f1061125f5761010080835404028352916020019161128a565b820191906000526020600020905b81548152906001019060200180831161126d57829003601f168201915b505050505090806002018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156113285780601f106112fd57610100808354040283529160200191611328565b820191906000526020600020905b81548152906001019060200180831161130b57829003601f168201915b5050505050908060030160009054906101000a900460ff16905084565b6060600180018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156113df5780601f106113b4576101008083540402835291602001916113df565b820191906000526020600020905b8154815290600101906020018083116113c257829003601f168201915b5050505050905090565b600160020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561144857600080fd5b60001515600b60000160009054906101000a900460ff161515148015611484575060011515600660000160009054906101000a900460ff161515145b151561148f57600080fd5b60806040519081016040528060011515815260200183815260200182815260200160001515815250600b60008201518160000160006101000a81548160ff02191690831515021790555060208201518160010190805190602001906114f59291906116f5565b5060408201518160020190805190602001906115129291906116f5565b5060608201518160030160006101000a81548160ff0219169083151502179055509050507f5d5f7a595ba2e0dbe03f6c3761f5de07df55511cc6640f71a613718a1729ddad82600660020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600660030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168460405180806020018573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200180602001838103835287818151815260200191508051906020019080838360005b8381101561164d578082015181840152602081019050611632565b50505050905090810190601f16801561167a5780820380516001836020036101000a031916815260200191505b50838103825284818151815260200191508051906020019080838360005b838110156116b3578082015181840152602081019050611698565b50505050905090810190601f1680156116e05780820380516001836020036101000a031916815260200191505b50965050505050505060405180910390a15050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061173657805160ff1916838001178555611764565b82800160010185558215611764579182015b82811115611763578251825591602001919060010190611748565b5b5090506117719190611775565b5090565b61179791905b8082111561179357600081600090555060010161177b565b5090565b905600a165627a7a7230582011538498784cd545e8b90c2ea566f28e206c0332a9c2a6cc0f61ee4727cfaa2e0029';

var global = {
    tradingContractAddr: '0x799fB2cA811B56eA7F415B153339d5A674031b58',
    escrowContractAddr: '0x488375a5306Cd40904ac8DED5984193197738201'
};

var GWEI = Math.pow(10, 9)

if(typeof Scene == 'undefined') {
    Scene = 1;
}

var getTradingContractInst = function () {
    var contractAddr = global['tradingContractAddr'];
    var tradingContract = web3.eth.contract(tradingAbi);
    return tradingContract.at(contractAddr);
};

var getEscrowContractInst = function () {
    var contractAddr = global['escrowContractAddr'];
    var escrowContract = web3.eth.contract(escrowAbi);
    return escrowContract.at(contractAddr);
}

var scenes = {
    // (run on node 3)Agent P deploys a trading contract CT involving party A and party B on private
    1: function () {

        var tradingContract = web3.eth.contract(tradingAbi)
        web3.eth.defaultAccount = account3;
        tradingContract.new(
            "Trading Contract",
            {
                from: account3,
                data: tradingBin,
                gas: 3000000,
                isPrivate: true,
                participants: group1
            }, function (e, contract) {
                console.info('Trading contract CT created, address: ' + contract.address + ' , transactionHash: ' + contract.transactionHash);
                admin.sleep(2) // wait for a moment
                global['tradingContractAddr'] = eth.getTransactionReceipt(contract.transactionHash).contractAddress
                console.log('tradingContractAddr = ' + global['tradingContractAddr'])
            });
        admin.sleep(5) // wait for a moment
    },
    // (run on node 3)Agent P deploys an escrow contract CE on public
    2: function () {
        var escrowContract = web3.eth.contract(escrowAbi);
        web3.eth.defaultAccount = account3;
        escrowContract.new(
            "Escrow Contract",
            {
                from: account3,
                data: escrowBin,
                gas: 1000000,
                isPrivate: false
            }, function (e, contract) {
                console.info('Escrow contract CE created, address: ' + contract.address + ' , transactionHash: ' + contract.transactionHash);
                admin.sleep(2); // wait for a momentsde
                global['escrowContractAddr'] = eth.getTransactionReceipt(contract.transactionHash).contractAddress;
                console.log('escrowContractAddr = ' + global['escrowContractAddr']);
            });
        admin.sleep(5)
    },
    // (run on node 1)Party A sets the item for sale
    3: function() {
        web3.eth.defaultAccount = account1;
        var tradingContractInst = getTradingContractInst();
        var result = tradingContractInst.setItem.sendTransaction(120000000 * GWEI, "A secret data", "You may want to get it!", {
            gas: 3000000,
            isPrivate: true,
            participants: group1
        });
        console.log("setItem() result: " + result);
    },
    // (run on node 2)Party B pays money to the escrow contract CE
    4: function() {
        web3.eth.defaultAccount = account2;

        // Gets the item for sale.
        var tradingContractInst = getTradingContractInst();
        var itemName = tradingContractInst.getItemName.call({isPrivate: true, participants: group1});
        var itemPrice = tradingContractInst.getItemPrice.call({isPrivate: true, participants: group1});
        console.log("Item: (" + itemName + "," + itemPrice + ")");

        var escrowContractInst = getEscrowContractInst();
        var result = escrowContractInst.prepay.sendTransaction({
            gas: 200000,
            isPrivate: false,
            value: 120000000 * GWEI
        });
        console.log("prepay() result: " + result);

        var result = escrowContractInst.getBalance.call({
            gas: 200000,
            isPrivate: false
        });
        console.log("getBalance() result: " + result);
    },
    // (run on node2)Party B then sends contract CT an order
    5: function() {
        web3.eth.defaultAccount = account2;

        var tradingContractInst = getTradingContractInst();
        var result = tradingContractInst.buy.sendTransaction(pubkey2, {
            gas: 3000000,
            isPrivate: true,
            participants: group1
        });
        console.log("buy() result: " + result);
        console.log("the order is: " + tradingContractInst._order({isPrivate: true}));
    },
    // (run on node1)Party A sends the delivery message attached with the symmetric key encrypted by the buyer's public key
    6: function() {
        web3.eth.defaultAccount = account1;

        var tradingContractInst = getTradingContractInst();
        var result = tradingContractInst.deliver.sendTransaction("cid1", "symmetric-key-encrypted-by-pubkey", {
            gas: 3000000,
            isPrivate: true,
            participants: group1
        });
        console.log("deliver() result: " + result);
        console.log("the delivery is: " + tradingContractInst._delivery({isPrivate: true}));
    },
    // (run on node2)Party B receives the delivery and send confirmation message
    7: function() {
        web3.eth.defaultAccount = account2;

        var tradingContractInst = getTradingContractInst();
        var result = tradingContractInst.confirm({
            gas: 3000000,
            isPrivate: true,
            participants: group1
        });
        console.log("confirm() result: " + result);
        console.log("the delivery is: " + tradingContractInst._delivery({isPrivate: true}));
    },
    // (run on node3)Agent P notice the confirmation and transfer money to Party A
    8: function() {
        web3.eth.defaultAccount = account3;

        var tradingContractInst = getTradingContractInst();
        var fee = tradingContractInst.getItemPrice({isPrivate: true});

        var escrowContractInst = getEscrowContractInst();
        var result = escrowContractInst.payTo(account1, fee, {gas: 200000});
        console.log("payTo() result: " + result);

        var result = escrowContractInst.getBalance.call({gas: 200000});
        console.log("getBalance() result: " + result);
    },
    // (run on node4)Other parties could not get any information about the transaction between A and B
    9: function() {
        web3.eth.defaultAccount = account4;

        var tradingContractInst = getTradingContractInst();
        var itemName = tradingContractInst.getItemName({isPrivate: true});
        console.log("Inspect the trading, got: " + itemName)
    },
}

console.info("Scene<" + Scene + "> begins.");
scenes[Scene]();
console.info("Scene<" + Scene + "> ends.");
