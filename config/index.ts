import { Pool } from "../typeing";


export const stakingcontractaddress = "0xa32079d6468121F2cf1487c9572D639F09959a81";
export const Purchasecontract  = "0xeB6ef6Dc25c26bB4b62534Dc11B2BfF6C02181E7";
export const NeoBoxcontract = "0x98401Ef9f441f88072F7d13314071D2644Ea38c1";
export const rewardNFTuri="ipfs://QmbMCwsznaRRLr4Sy9W8o8NGmE8R2oJTC7P8YFZDFvQgr2/"

export const pools: Pool[] = [
  {
    id: 0,
    name: "Genesis",
    header: "For 1-5x Holders",
    rate: "0",
    nftcontract: "0x130471fE74F2d7d305AefC93DF837Af81Cd87237",
    totaldeposit: 0,
    yourdeposit: 0,
    unclaimed: "0",
    limit: false,
    headerIMG: "/pool/1.png",
    min: 0,
    max: 0,
    poolId:3,
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
  {
    id: 0,
    name: "Gold",
    header: "For 1-5x Holders",
    rate: "0",
    nftcontract: "0x99858CF814fd0f704962c7A81965CaF30326113e",
    totaldeposit: 0,
    yourdeposit: 0,
    unclaimed: "0",
    limit: false,
    headerIMG: "/pool/1.png",
    min: 0,
    max: 0,
    poolId:1,
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
    name: "Platinum",
    header: "For 1-5x Holders",
    rate: "0",
    nftcontract: "0xAbc163e962c87127e0c74888B551946e573c0da2",
    totaldeposit: 0,
    yourdeposit: 0,
    unclaimed: "0",
    limit: false,
    headerIMG: "/pool/1.png",
    min: 0,
    max: 0,
    poolId:0,
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
    name: "Diamond",
    header: "For 1-5x Holders",
    rate: "0",
    nftcontract: "0x58da1e55744dB7F3f92F43E226A2F9d5B132a2ba",
    totaldeposit: 0,
    yourdeposit: 0,
    unclaimed: "0",
    limit: false,
    headerIMG: "/pool/1.png",
    min: 0,
    max: 0,
    poolId:2,
    rewardnft: [
      {
        name: "Diamond reward nft",
        cid: "",
        tokenid: 3,
        imgName:"DIAMOND"
      }]
  },

  // Add more pool objects as needed
];

export const NFT = [
  {
    nftcontract: "0x130471fE74F2d7d305AefC93DF837Af81Cd87237",
    name: "NEO",
    thCID: "QmdBoggjVJi1zhxtxuuzj4GBE8hsb8SNdmjo4BgmKTwx6g",
    CID: "QmdBoggjVJi1zhxtxuuzj4GBE8hsb8SNdmjo4BgmKTwx6g",
    isSame: false,
  },
  {
    nftcontract: "0xAbc163e962c87127e0c74888B551946e573c0da2",
    name: "Platinum",
    thCID: "QmNt67zFxvwmCdizcTWtktQ16MxE3rQ6VJWMF8AoQiwc8Q",
    CID: "QmNt67zFxvwmCdizcTWtktQ16MxE3rQ6VJWMF8AoQiwc8Q",
    isSame: true,
  },
  {
    nftcontract: "0x99858CF814fd0f704962c7A81965CaF30326113e",
    name: "Gold",
    thCID: "QmNt67zFxvwmCdizcTWtktQ16MxE3rQ6VJWMF8AoQiwc8Q",
    CID: "QmNt67zFxvwmCdizcTWtktQ16MxE3rQ6VJWMF8AoQiwc8Q",
    isSame: true,
  },
  {
    nftcontract: "0x58da1e55744dB7F3f92F43E226A2F9d5B132a2ba",
    name: "Diamond",
    thCID: "QmNt67zFxvwmCdizcTWtktQ16MxE3rQ6VJWMF8AoQiwc8Q",
    CID: "QmNt67zFxvwmCdizcTWtktQ16MxE3rQ6VJWMF8AoQiwc8Q",
    isSame: true,
  },
];
