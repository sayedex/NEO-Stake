
  export const ConvertLink = (link: any) => {
    if (!link) {
      return;
    }
    if (link.startsWith("ipfs://")) {
      return `https://ipfs.io/ipfs/${link.split("ipfs://")[1]}`;
    } else {
      return link;
    }
  };  

  export const ConvertCID = (CID: any, tokenId: any) => {
    return `https://ipfs.io/ipfs/${CID}/${tokenId}.png`;
  };
