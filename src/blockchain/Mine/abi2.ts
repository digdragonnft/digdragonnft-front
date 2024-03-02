export const abi = [
  {
    type: "constructor",
    stateMutability: "nonpayable",
    inputs: [
      { type: "address", name: "_digdragon", internalType: "contract IERC721" },
      { type: "address", name: "_reward", internalType: "contract IERC20" },
      {
        type: "address",
        name: "_hashPowerStorage",
        internalType: "contract IHashPowerStorage",
      },
      { type: "address", name: "_feeCollector", internalType: "address" },
      { type: "uint256", name: "_startBlock", internalType: "uint256" },
      { type: "uint256", name: "_rewardPerBlock", internalType: "uint256" },
      { type: "uint256", name: "_rewardEndBlock", internalType: "uint256" },
    ],
  },
  { type: "error", name: "ZeroStakedHashPowerAmount", inputs: [] },
  { type: "error", name: "ZeroStakedTokens", inputs: [] },
  {
    type: "event",
    name: "Earned",
    inputs: [
      {
        type: "address",
        name: "miner",
        internalType: "address",
        indexed: true,
      },
      {
        type: "uint256",
        name: "earned",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "EmergencyRewardWithDrawn",
    inputs: [],
    anonymous: false,
  },
  { type: "event", name: "EmergencyUnstaked", inputs: [], anonymous: false },
  {
    type: "event",
    name: "HashPowerStorageChanged",
    inputs: [
      {
        type: "address",
        name: "newStorage",
        internalType: "address",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  { type: "event", name: "MinePaused", inputs: [], anonymous: false },
  {
    type: "event",
    name: "NewRewardEndBlockSet",
    inputs: [
      {
        type: "uint256",
        name: "_newRewardBlock",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "NewRewardPerBlockSet",
    inputs: [
      {
        type: "uint256",
        name: "_newRewardPerBlock",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "NewStartBlockSet",
    inputs: [
      {
        type: "uint256",
        name: "_startBlock",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        type: "address",
        name: "previousOwner",
        internalType: "address",
        indexed: true,
      },
      {
        type: "address",
        name: "newOwner",
        internalType: "address",
        indexed: true,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RewardDistributionStopped",
    inputs: [
      {
        type: "uint256",
        name: "stopBlock",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SetNewMiner",
    inputs: [
      {
        type: "address",
        name: "miner",
        internalType: "address",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SetNewReward",
    inputs: [
      {
        type: "address",
        name: "newReward",
        internalType: "address",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Staked",
    inputs: [
      {
        type: "address",
        name: "owner",
        internalType: "address",
        indexed: true,
      },
      {
        type: "uint256[]",
        name: "tokenIds",
        internalType: "uint256[]",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Unstaked",
    inputs: [
      {
        type: "address",
        name: "owner",
        internalType: "address",
        indexed: true,
      },
      {
        type: "uint256[]",
        name: "tokenIds",
        internalType: "uint256[]",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "earnReward",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "emergencyRewardTokenWithdraw",
    inputs: [
      { type: "address", name: "_token", internalType: "address" },
      { type: "uint256", name: "_amount", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "emergencyUnstake",
    inputs: [{ type: "address", name: "_owner", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "tuple",
        name: "info",
        internalType: "struct DigDragonMineV2.MineInfo",
        components: [
          { type: "address", name: "digdragon", internalType: "address" },
          { type: "address", name: "reward", internalType: "address" },
          { type: "address", name: "hashStorage", internalType: "address" },
          { type: "address", name: "feeCollector", internalType: "address" },
          { type: "uint256", name: "fee", internalType: "uint256" },
          { type: "uint256", name: "startBlock", internalType: "uint256" },
          { type: "uint256", name: "rewardEndBlock", internalType: "uint256" },
          { type: "uint256", name: "rewardPerBlock", internalType: "uint256" },
          {
            type: "uint256",
            name: "accTokenPerShare",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "rewardsForWithdrawal",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "totalStakedTokens",
            internalType: "uint256",
          },
          { type: "uint256", name: "totalHashPower", internalType: "uint256" },
        ],
      },
    ],
    name: "getMineInfo",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "amount", internalType: "uint256" }],
    name: "getRewardDebt",
    inputs: [{ type: "address", name: "_miner", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "tuple",
        name: "userInfo",
        internalType: "struct DigDragonMineV2.Miner",
        components: [
          {
            type: "uint256[]",
            name: "stakedTokenIds",
            internalType: "uint256[]",
          },
          {
            type: "uint256",
            name: "stakedHashPowerAmount",
            internalType: "uint256",
          },
          { type: "uint256", name: "lastIn", internalType: "uint256" },
          { type: "uint256", name: "lastOut", internalType: "uint256" },
        ],
      },
    ],
    name: "getUserInfo",
    inputs: [{ type: "address", name: "_miner", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "getUserStakedHashPowerAmount",
    inputs: [{ type: "address", name: "_miner", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256[]", name: "", internalType: "uint256[]" }],
    name: "getUserStakedTokens",
    inputs: [{ type: "address", name: "_miner", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "isPaused",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [{ type: "bytes4", name: "", internalType: "bytes4" }],
    name: "onERC721Received",
    inputs: [
      { type: "address", name: "", internalType: "address" },
      { type: "address", name: "", internalType: "address" },
      { type: "uint256", name: "", internalType: "uint256" },
      { type: "bytes", name: "", internalType: "bytes" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "owner",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "pendingReward",
    inputs: [{ type: "address", name: "_miner", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "renounceOwnership",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "rewardPerHashPower",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setFeeCollector",
    inputs: [{ type: "address", name: "_collector", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setHashPowerStorage",
    inputs: [
      {
        type: "address",
        name: "_storage",
        internalType: "contract IHashPowerStorage",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setMinerAddress",
    inputs: [{ type: "address", name: "_miner", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setPause",
    inputs: [{ type: "bool", name: "_value", internalType: "bool" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setRewardAddress",
    inputs: [
      { type: "address", name: "_newReward", internalType: "contract IERC20" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setRewardEndBlock",
    inputs: [
      { type: "uint256", name: "_rewardEndBlock", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setRewardPerBlock",
    inputs: [
      { type: "uint256", name: "_rewardPerBlock", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setStartBlock",
    inputs: [{ type: "uint256", name: "_startBlock", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "stake",
    inputs: [
      { type: "uint256[]", name: "_tokenIds", internalType: "uint256[]" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "stopRewardDistribution",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "totalHashPower",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "totalStakedTokens",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "transferOwnership",
    inputs: [{ type: "address", name: "newOwner", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "unstake",
    inputs: [
      { type: "uint256[]", name: "_tokenIds", internalType: "uint256[]" },
    ],
  },
];

export const address1 = "0x55448C24DB10822DF8736661FbEaC0f30e182b85";
export const address2 = "0x70241e08CC1735B9b0B3568C42EE8Ce10aD49339";
