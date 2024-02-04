export const abi = [
  {
    inputs: [],
    name: "earnReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC721",
        name: "_digdragon",
        type: "address",
      },
      {
        internalType: "contract IERC20",
        name: "_reward",
        type: "address",
      },
      {
        internalType: "contract IHashPowerStorage",
        name: "_hashPowerStorage",
        type: "address",
      },
      {
        internalType: "address",
        name: "_feeCollector",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_startBlock",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_rewardPerBlock",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_rewardEndBlock",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ZeroStakedHashPowerAmount",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroStakedTokens",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "miner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "earned",
        type: "uint256",
      },
    ],
    name: "Earned",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "emergencyRewardTokenWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [],
    name: "EmergencyRewardWithDrawn",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "emergencyUnstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [],
    name: "EmergencyUnstaked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newStorage",
        type: "address",
      },
    ],
    name: "HashPowerStorageChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "MinePaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_newRewardBlock",
        type: "uint256",
      },
    ],
    name: "NewRewardEndBlockSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_newRewardPerBlock",
        type: "uint256",
      },
    ],
    name: "NewRewardPerBlockSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_startBlock",
        type: "uint256",
      },
    ],
    name: "NewStartBlockSet",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "stopBlock",
        type: "uint256",
      },
    ],
    name: "RewardDistributionStopped",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_collector",
        type: "address",
      },
    ],
    name: "setFeeCollector",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IHashPowerStorage",
        name: "_storage",
        type: "address",
      },
    ],
    name: "setHashPowerStorage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_miner",
        type: "address",
      },
    ],
    name: "setMinerAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "miner",
        type: "address",
      },
    ],
    name: "SetNewMiner",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newReward",
        type: "address",
      },
    ],
    name: "SetNewReward",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_value",
        type: "bool",
      },
    ],
    name: "setPause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_newReward",
        type: "address",
      },
    ],
    name: "setRewardAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_rewardEndBlock",
        type: "uint256",
      },
    ],
    name: "setRewardEndBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_rewardPerBlock",
        type: "uint256",
      },
    ],
    name: "setRewardPerBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_startBlock",
        type: "uint256",
      },
    ],
    name: "setStartBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_tokenIds",
        type: "uint256[]",
      },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
    ],
    name: "Staked",
    type: "event",
  },
  {
    inputs: [],
    name: "stopRewardDistribution",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_tokenIds",
        type: "uint256[]",
      },
    ],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
    ],
    name: "Unstaked",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_miner",
        type: "address",
      },
    ],
    name: "calculateReward",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMineInfo",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "digdragon",
            type: "address",
          },
          {
            internalType: "address",
            name: "reward",
            type: "address",
          },
          {
            internalType: "address",
            name: "hashStorage",
            type: "address",
          },
          {
            internalType: "address",
            name: "feeCollector",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "fee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "startBlock",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "rewardEndBlock",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "rewardPerBlock",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "currentRewardPerHashPowere",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalStakedTokens",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalHashPower",
            type: "uint256",
          },
        ],
        internalType: "struct DigDragonMineV2.MineInfo",
        name: "info",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_miner",
        type: "address",
      },
    ],
    name: "getRewardDebt",
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_miner",
        type: "address",
      },
    ],
    name: "getUserInfo",
    outputs: [
      {
        components: [
          {
            internalType: "uint256[]",
            name: "stakedTokenIds",
            type: "uint256[]",
          },
          {
            internalType: "uint256",
            name: "stakedHashPowerAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastIn",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastOut",
            type: "uint256",
          },
        ],
        internalType: "struct DigDragonMineV2.Miner",
        name: "userInfo",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_miner",
        type: "address",
      },
    ],
    name: "getUserStakedHashPowerAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_miner",
        type: "address",
      },
    ],
    name: "getUserStakedTokens",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isPaused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rewardPerHashPower",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalHashPower",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalStakedTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export const address2 = "0xC1F2AD8960f01E8700ba1ee52A9D0729F2beACd2";
