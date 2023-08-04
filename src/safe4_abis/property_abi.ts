export const PropertyABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
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
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "PropertyAdd",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_newValue",
        type: "uint256",
      },
    ],
    name: "PropertyUpdateAgree",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_newValue",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_oldValue",
        type: "uint256",
      },
    ],
    name: "PropertyUpdateApply",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_newValue",
        type: "uint256",
      },
    ],
    name: "PropertyUpdateReject",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_newValue",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_voter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_voteResult",
        type: "uint256",
      },
    ],
    name: "PropertyUpdateVote",
    type: "event",
  },
  {
    inputs: [],
    name: "GetInitializeData",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
    ],
    name: "add",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_reason",
        type: "string",
      },
    ],
    name: "applyUpdate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllConfirmed",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "createHeight",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "updateHeight",
            type: "uint256",
          },
        ],
        internalType: "struct IProperty.PropertyInfo[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllUnConfirmed",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "applicant",
            type: "address",
          },
          {
            internalType: "address[]",
            name: "voters",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "voteResults",
            type: "uint256[]",
          },
          {
            internalType: "string",
            name: "reason",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "applyHeight",
            type: "uint256",
          },
        ],
        internalType: "struct IProperty.UnconfirmedPropertyInfo[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "getInfo",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "createHeight",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "updateHeight",
            type: "uint256",
          },
        ],
        internalType: "struct IProperty.PropertyInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "getUnconfirmedInfo",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "applicant",
            type: "address",
          },
          {
            internalType: "address[]",
            name: "voters",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "voteResults",
            type: "uint256[]",
          },
          {
            internalType: "string",
            name: "reason",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "applyHeight",
            type: "uint256",
          },
        ],
        internalType: "struct IProperty.UnconfirmedPropertyInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "getValue",
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
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "renounceOwnership",
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
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_voteResult",
        type: "uint256",
      },
    ],
    name: "vote4Update",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;