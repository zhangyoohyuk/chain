import json
import os.path as osp


# cf. http://tinyurl.com/yd7mbzp3
from solc import compile_standard
from web3 import Web3, TestRPCProvider, HTTPProvider
from web3.contract import ImplicitContract


#from cpchain.chain.utils import default_w3 as w3
#from cpchain import config
#from cpchain.utils import join_with_root

# solidity source code
contract_source_code = '''
pragma solidity ^0.4.0;

contract Greeter {
    string public greeting;

    function Greeter() {
        greeting = 'Hello';
    }

    function setGreeting(string _greeting) public {
        greeting = _greeting;
    }

    function greet() constant returns (string) {
        return greeting;
    }
}
'''
w3 = None
mode = ""
http_provider = ""

def _set_default_w3():
    global w3
    global mode
    global http_provider
    if mode == "test":
        provider = TestRPCProvider()
    elif mode == "falcon":
        provider = HTTPProvider(http_provider)
    elif mode == "local":
        provider = HTTPProvider(http_provider)
    else:
        raise RuntimeError("No Provider Found.")
    w3 = Web3(provider)
    w3.eth.defaultAccount = w3.eth.accounts[0]
    
def compile_contract():
    #compiled_sol = compile_source(contract_source_code)
    #return compiled_sol
    
    # cf. http://tinyurl.com/yap75nl8
    sol_map = {
        "language": "Solidity",
        "sources": {},
        "settings": {
            "outputSelection": {
                "*": {
                    "*": ["abi", "evm.bytecode"]
                }
            }
        }
    }
    d = sol_map["sources"]["contract"] = {}
    d["content"] = contract_source_code
    output = compile_standard(sol_map)
    return output['contracts']['contract']['Greeter']


def deploy_contract(interface):
    contract = w3.eth.contract(abi=interface['abi'], bytecode=interface['evm']['bytecode']['object'])
    
    estimated_gas = contract.constructor().estimateGas()
    tx_hash = contract.constructor().transact(dict(gas=estimated_gas))

    # get tx receipt to get contract address
    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
    address = tx_receipt['contractAddress']

    contract = w3.eth.contract(address=address, abi=interface['abi'], ContractFactoryClass=ImplicitContract)

    print('Contract value: {}'.format(contract.greet()))
    tx_hash = contract.setGreeting('Nihao')
    w3.eth.waitForTransactionReceipt(tx_hash)
    print('Setting value to: Nihao')
    print('Contract value: {}'.format(contract.greet()))


def main():
    global w3
    _set_default_w3()
    interface = compile_contract()
    deploy_contract(interface)


if __name__ == '__main__':
    main()