import { Pool } from "../typeing";

export const pools: Pool[] = [
  { id:0,
    name: "Genesis",
    header: "For 1-5x Holders",
    rate: "0",
    contract:"0x6eeFdd781Cef85847F696c0BeD22E0475B265bA6",
    nftcontract: "0x130471fE74F2d7d305AefC93DF837Af81Cd87237",
    totaldeposit: 0,
    yourdeposit: 0,
    unclaimed: "0",
    limit:false,
    headerIMG:"/pool/1.png",
    min:0,
    max:0,
  },
  { id:0,
    name: "Platinum",
    header: "For 1-5x Holders",
    rate: "0",
    contract:"0x73bFd328DA0EFcDC586feD007c72af0cde06Ed2d",
    nftcontract: "0xAbc163e962c87127e0c74888B551946e573c0da2",
    totaldeposit: 0,
    yourdeposit: 0,
    unclaimed: "0",
    limit:false,
    headerIMG:"/pool/1.png",
    min:0,
    max:0,
  },
  { id:0,
    name: "Gold",
    header: "For 1-5x Holders",
    rate: "0",
    contract:"0x18B515FEb7d599974496D40564Ae08A307fbBf08",
    nftcontract: "0x99858CF814fd0f704962c7A81965CaF30326113e",
    totaldeposit: 0,
    yourdeposit: 0,
    unclaimed: "0",
    limit:false,
    headerIMG:"/pool/1.png",
    min:0,
    max:0,
  },
  { id:0,
    name: "Diamond",
    header: "For 1-5x Holders",
    rate: "0",
    contract:"0x40418D367f43428640247EeD3DFbC0Ac5e8b78C7",
    nftcontract: "0x58da1e55744dB7F3f92F43E226A2F9d5B132a2ba",
    totaldeposit: 0,
    yourdeposit: 0,
    unclaimed: "0",
    limit:false,
    headerIMG:"/pool/1.png",
    min:0,
    max:0,
  },
  
  
  // Add more pool objects as needed
];



// export const NFT =[
//   {
//     nftcontract: "0x03869836C325323e201c7bCC0E07D8B8A7671470",
//     name:"zen1"
//   },
//   {
//     nftcontract: "0xC253aA4a596DE76DD62122c9CE8Cbcbd4d069703",
//     name:"zen2"
//   }

// ]

export const NFT =[
  {
    nftcontract: "0x130471fE74F2d7d305AefC93DF837Af81Cd87237",
    name:"Platinum",
    CID:"QmdBoggjVJi1zhxtxuuzj4GBE8hsb8SNdmjo4BgmKTwx6g",
    type:"png",
    isSame:false,
  },
  {
    nftcontract: "0xAbc163e962c87127e0c74888B551946e573c0da2",
    name:"Platinum",
    CID:"QmRbbM9TbsXo6rErwQdpmMq1HPDFZXi6sXnNwJeT2Kqf96",
    type:"mp4",
    isSame:true,
  },
  {
    nftcontract: "0x99858CF814fd0f704962c7A81965CaF30326113e",
    name:"Gold",
    CID:"QmRbbM9TbsXo6rErwQdpmMq1HPDFZXi6sXnNwJeT2Kqf96",
    type:"mp4",
    isSame:true,
  },
  {
    nftcontract: "0x58da1e55744dB7F3f92F43E226A2F9d5B132a2ba",
    name:"Diamond",
    CID:"QmRbbM9TbsXo6rErwQdpmMq1HPDFZXi6sXnNwJeT2Kqf96",
    type:"mp4",
    isSame:true,
  },
]