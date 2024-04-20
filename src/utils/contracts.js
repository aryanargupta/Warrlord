export const gameManagerAddress = '0x58Ef449A413A6Ca9AD35D7e65E5c17Ab4666C904'
export const gameManagerAbi = [
	{
		"inputs": [],
		"name": "buy_or_upgrade_storage",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "initialize",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "mine",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "goldAddress",
				"type": "address"
			}
		],
		"name": "setGoldAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint64",
				"name": "_rate",
				"type": "uint64"
			}
		],
		"name": "setMiningRate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "player",
				"type": "address"
			}
		],
		"name": "doesPlayerExist",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "gameStates",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "hall",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "camp",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "cannon",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "mine",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "gold_storage",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "last_mined",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "player",
				"type": "address"
			}
		],
		"name": "getPlayerState",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint8",
						"name": "hall",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "camp",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "cannon",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "mine",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "gold_storage",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "last_mined",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "balance",
						"type": "uint256"
					}
				],
				"internalType": "struct GameManager.State",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "isPlayerExist",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]