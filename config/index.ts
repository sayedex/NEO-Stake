import { Pool } from "../typeing";

export const pools: Pool[] = [
  { id:0,
    name: "GEN 1 POOL",
    header: "For 1-5x Holders",
    rate: "0",
    contract:"0xD1ADA606bCa5253c475cEb050a17bF7d9C5C6458",
    nftcontract: "0xd0bd375a43b58fd8329980898802667a64623f60",
    totaldeposit: 0,
    yourdeposit: 0,
    unclaimed: "0",
    limit:false,
    headerIMG:"/pool/1.png",
    min:0,
    max:0,
  },
  { id:0,
    name: "GEN 2 POOL",
    header: "For 1-5x Holders",
    rate: "0",
    type:" 1-5x ",
    typeimg:"/pool/bronze.png",
    contract:"0x719c1Bb8835912B640708BE4A0D85058F24A340A",
    nftcontract: "0x8ee54067dbb58d872424050234df6162aa27c06d",
    totaldeposit: 0,
    yourdeposit: 0,
    unclaimed: "0",
    limit:true,
    headerIMG:"/pool/bronze1.png",
    min:1,
    max:5,
  },
  { id:0,
    name: "GEN 2 POOL",
    header: "For 6-15x Holders",
    rate: "0",
    type:" 6-15x ",
    typeimg:"/pool/silver.png",
    contract:"0xEE870888d2a988023D73D72077849e8504a442cb",
    nftcontract: "0x8ee54067dbb58d872424050234df6162aa27c06d",
    totaldeposit: 0,
    yourdeposit: 0,
    unclaimed: "0",
    limit:true,
    headerIMG:"/pool/silver1.png",
    min:6,
    max:15,
  },
  { id:0,
    name: "GEN 2 POOL",
    header: "For 16-39x Holders",
    rate: "0",
    type:" 16-39x ",
    typeimg:"/pool/gold.png",
    contract:"0x5680130D987fD1E9ca1600459a9309999F823828",
    nftcontract: "0x8ee54067dbb58d872424050234df6162aa27c06d",
    totaldeposit: 0,
    yourdeposit: 0,
    unclaimed: "0",
    limit:true,
    headerIMG:"/pool/gold1.png",
     min:16,
     max:39,

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
    nftcontract: "0xd0bd375a43b58fd8329980898802667a64623f60",
    name:"zen1",
    CID:"Qmecr9u77NMse117M1CJjNnt1aNV1L9G897AhHmbhBiZdM"
  },
  {
    nftcontract: "0x8ee54067dbb58d872424050234df6162aa27c06d",
    name:"zen2",
    CID:"QmRn52MzEUnd8DD2UQugi6khgPPFjrztGHBKKHgakftbnN"
  }

]