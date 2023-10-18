import { Pool } from "../typeing";
//old - 0x3874a935F769865E214eF01f8208b288aDC78b41
// old- 0x3AeC85EFbf2cE538a2c07EB2B446c7E26F4C7A1D

//mainnet
export const stakingcontractaddress = "0xb554d8F9E9c19D7F5b894471392fdbFBFA679C13";

//tesnet 
//export const stakingcontractaddress = "0x3AeC85EFbf2cE538a2c07EB2B446c7E26F4C7A1D";

//testnet = 0x019dE39F63821EF96a4d90d134D41d8EF341987B
export const Purchasecontract  = "0x2f8C8c128C27B60A882C4a562926ab7C66440535";

//mainnet
export const NeoBoxcontract = "0xebdffe2aa7d71e915ddc70777882b55823cff9b5";

//testnet 
//export const NeoBoxcontract = "0x546D0F819354875D20e136EfF8520418e19cc82e";

export const rewardNFTuri="ipfs://QmbMCwsznaRRLr4Sy9W8o8NGmE8R2oJTC7P8YFZDFvQgr2/"


//dim 0xDA41aa572c7A38c2F245655F535efc1e02267f62


//test : 0xa84a6c745cc6482c7e89dfd6d775B761631faF4D

//mainnet 
export const pools: Pool[] = [

  {
    id: 0,
    name: "Diamond",
    header: "For 1-5x Holders",
    rate: "0",
    nftcontract: "0xDA41aa572c7A38c2F245655F535efc1e02267f62",
    totaldeposit: 0,
    yourdeposit: 0,
    unclaimed: "0",
    limit: true,
    headerIMG: "/pool/1.png",
    min: 0,
    max: 0,
    poolId:3,
    poolloading:true,
    rewardnft: [
      {
        name: "Diamond reward nft",
        cid: "",
        tokenid: 3,
        imgName:"DIAMOND"
      }]
  },
  {
    id: 0,
    name: "Platinum",
    header: "For 1-5x Holders",
    rate: "0",
    nftcontract: "0xE9dA8F93B5C40005FE74CA9Eb386B96DF1380A82",
    totaldeposit: 0,
    yourdeposit: 0,
    unclaimed: "0",
    limit: true,
    headerIMG: "/pool/1.png",
    min: 0,
    max: 0,
    poolId:2,
    poolloading:true,
    rewardnft: [
      {
        name: "Platinum reward nft",
        cid: "",
        tokenid: 5,
        imgName:"PLATINUM"
      }]
  },
  {
    id: 0,
    name: "Gold",
    header: "For 1-5x Holders",
    rate: "0",
    nftcontract: "0xBfCe43Fa3990Fb48166A484468C1D93a63F6cDeA",
    totaldeposit: 0,
    yourdeposit: 0,
    unclaimed: "0",
    limit: true,
    headerIMG: "/pool/1.png",
    min: 0,
    max: 0,
    poolId:1,
    poolloading:true,
    rewardnft: [
      {
        name: "Gold reward nft",
        cid: "",
        tokenid: 4,
        imgName:"GOLD"
      }]
  },
  {
    id: 0,
    name: "Genesis",
    header: "For 1-5x Holders",
    rate: "0",
    nftcontract: "0xe7d05a668EB20256B1bd4836299E21Fa6d92c206",
    totaldeposit: 0,
    yourdeposit: 0,
    unclaimed: "0",
    limit: true,
    headerIMG: "/pool/1.png",
    min: 0,
    max: 0,
    poolId:0,
    poolloading:true,
    rewardnft: [
      {
        name: "30% reward nft",
        cid: "",
        tokenid: 0,
        imgName:"30"
      },
      {
        name: "40% reward nft",
        cid: "",
        tokenid: 1,
        imgName:"40"
      },
      {
        name: "50% reward nft",
        cid: "",
        tokenid: 2,
        imgName:"50"
      },
    ],
  },
 



  // Add more pool objects as needed
];



//devs mode
export const poolsDevs: Pool[] = [

  {
    id: 0,
    name: "Diamond",
    header: "For 1-5x Holders",
    rate: "0",
    nftcontract: "0x9056761a3041262BC48070D0D7f66ae474199042",
    totaldeposit: 0,
    yourdeposit: 0,
    unclaimed: "0",
    limit: true,
    headerIMG: "/pool/1.png",
    min: 0,
    max: 0,
    poolId:3,
    poolloading:true,
    rewardnft: [
      {
        name: "Diamond reward nft",
        cid: "",
        tokenid: 3,
        imgName:"DIAMOND"
      }]
  },
  {
    id: 0,
    name: "Platinum",
    header: "For 1-5x Holders",
    rate: "0",
    nftcontract: "0x320A98C46C8EC72EF44Ad7c19b46867071a914Af",
    totaldeposit: 0,
    yourdeposit: 0,
    unclaimed: "0",
    limit: true,
    headerIMG: "/pool/1.png",
    min: 0,
    max: 0,
    poolId:2,
    poolloading:true,
    rewardnft: [
      {
        name: "Platinum reward nft",
        cid: "",
        tokenid: 5,
        imgName:"PLATINUM"
      }]
  },
  {
    id: 0,
    name: "Gold",
    header: "For 1-5x Holders",
    rate: "0",
    nftcontract: "0x2f8C8c128C27B60A882C4a562926ab7C66440535",
    totaldeposit: 0,
    yourdeposit: 0,
    unclaimed: "0",
    limit: true,
    headerIMG: "/pool/1.png",
    min: 0,
    max: 0,
    poolId:1,
    poolloading:true,
    rewardnft: [
      {
        name: "Gold reward nft",
        cid: "",
        tokenid: 4,
        imgName:"GOLD"
      }]
  },
  {
    id: 0,
    name: "Genesis",
    header: "For 1-5x Holders",
    rate: "0",
    nftcontract: "0x7F72929DF45fb0a9e4E52274425aadB3CA90bc96",
    totaldeposit: 0,
    yourdeposit: 0,
    unclaimed: "0",
    limit: true,
    headerIMG: "/pool/1.png",
    min: 0,
    max: 0,
    poolId:0,
    poolloading:true,
    rewardnft: [
      {
        name: "30% reward nft",
        cid: "",
        tokenid: 0,
        imgName:"30"
      },
      {
        name: "40% reward nft",
        cid: "",
        tokenid: 1,
        imgName:"40"
      },
      {
        name: "50% reward nft",
        cid: "",
        tokenid: 2,
        imgName:"50"
      },
    ],
  },
 



  // Add more pool objects as needed
];


//mainnet
export const NFT = [
  {
    nftcontract: "0xe7d05a668EB20256B1bd4836299E21Fa6d92c206",
    name: "NEO",
    thCID: "QmdBoggjVJi1zhxtxuuzj4GBE8hsb8SNdmjo4BgmKTwx6g",
    CID: "QmdBoggjVJi1zhxtxuuzj4GBE8hsb8SNdmjo4BgmKTwx6g",
    isSame: false,
  },
  {
    nftcontract: "0xE9dA8F93B5C40005FE74CA9Eb386B96DF1380A82",
    name: "Platinum",
    thCID: "QmNt67zFxvwmCdizcTWtktQ16MxE3rQ6VJWMF8AoQiwc8Q",
    CID: "QmNt67zFxvwmCdizcTWtktQ16MxE3rQ6VJWMF8AoQiwc8Q",
    isSame: true,
  },
  {
    nftcontract: "0xBfCe43Fa3990Fb48166A484468C1D93a63F6cDeA",
    name: "Gold",
    thCID: "QmNt67zFxvwmCdizcTWtktQ16MxE3rQ6VJWMF8AoQiwc8Q",
    CID: "QmNt67zFxvwmCdizcTWtktQ16MxE3rQ6VJWMF8AoQiwc8Q",
    isSame: true,
  },
  {
    nftcontract: "0xDA41aa572c7A38c2F245655F535efc1e02267f62",
    name: "Diamond",
    thCID: "QmNt67zFxvwmCdizcTWtktQ16MxE3rQ6VJWMF8AoQiwc8Q",
    CID: "QmNt67zFxvwmCdizcTWtktQ16MxE3rQ6VJWMF8AoQiwc8Q",
    isSame: true,
  },
];

//tesnet
export const NFT_A = [
  {
    nftcontract: "0x7F72929DF45fb0a9e4E52274425aadB3CA90bc96",
    name: "NEO",
    thCID: "QmdBoggjVJi1zhxtxuuzj4GBE8hsb8SNdmjo4BgmKTwx6g",
    CID: "QmdBoggjVJi1zhxtxuuzj4GBE8hsb8SNdmjo4BgmKTwx6g",
    isSame: false,
  },
  {
    nftcontract: "0x320A98C46C8EC72EF44Ad7c19b46867071a914Af",
    name: "Platinum",
    thCID: "QmNt67zFxvwmCdizcTWtktQ16MxE3rQ6VJWMF8AoQiwc8Q",
    CID: "QmNt67zFxvwmCdizcTWtktQ16MxE3rQ6VJWMF8AoQiwc8Q",
    isSame: true,
  },
  {
    nftcontract: "0x2f8C8c128C27B60A882C4a562926ab7C66440535",
    name: "Gold",
    thCID: "QmNt67zFxvwmCdizcTWtktQ16MxE3rQ6VJWMF8AoQiwc8Q",
    CID: "QmNt67zFxvwmCdizcTWtktQ16MxE3rQ6VJWMF8AoQiwc8Q",
    isSame: true,
  },
  {
    nftcontract: "0xDA41aa572c7A38c2F245655F535efc1e02267f62",
    name: "Diamond",
    thCID: "QmNt67zFxvwmCdizcTWtktQ16MxE3rQ6VJWMF8AoQiwc8Q",
    CID: "QmNt67zFxvwmCdizcTWtktQ16MxE3rQ6VJWMF8AoQiwc8Q",
    isSame: true,
  },
];
