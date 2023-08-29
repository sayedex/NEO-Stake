import React from 'react'

// import {FaFacebook} from "react-icons/fa";
// import {AiFillFacebook, AiFillTwitterCircle, AiFillInstagram} from "react-icons/ai";

const Footer = () => {
    return (
        <div
            className="flex flex-col border-t max-w-7xl m-auto justify-center gap-3 py-3 text-center text-sm uppercase  text-white  md:flex-row">
            <a  rel="noreferrer" >ⓒ 2023 Blockchain Basement, All Rights Reserved </a>
            <a  rel="noreferrer" target="_blank" href="">OpenSea</a>
            <a  rel="noreferrer" target="_blank"  href="">Etherscan</a>
    
        </div>
    )
}

export default Footer
