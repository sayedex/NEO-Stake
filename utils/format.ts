import { ethers } from "ethers"; // npm install ethers
export function formatNumber(number:number) {
  if (number < 1000) {
    const formatNumber = number.toFixed(3)
    return formatNumber.toString();
  } else if (number >= 1000 && number < 1000000) {
    const formattedNumber = (number / 1000).toFixed(1);
    return `${formattedNumber}k`;
  } else if (number >= 1000000 && number < 1000000000) {
    const formattedNumber = (number / 1000000).toFixed(1);
    return `${formattedNumber}m`;
  } else {
    const formattedNumber = (number / 1000000000).toFixed(1);
    return `${formattedNumber}b`;
  }
}

export const truncateAddress = (address:string) => {
  const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
  const match = address.match(truncateRegex);
  if (!match) {
    return address;
  }
  return `${match[1]}…${match[2]}`;
};

export const hexToInt = (s:any) => {
  const bn = ethers.BigNumber.from(s);
  return parseInt(bn.toString());
};