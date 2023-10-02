"use client";
import Link from "next/link";
import { rewardnft } from "../../typeing";
import { useState } from "react";

type Props = {
  closeModal: () => void; // Add a prop for closing the modal
};

const info = [
  "With NEO Staking you can Stake and Unstake at any time",
  " While your NFTs are staked, they will be moved to a staking contract, upon unstaking they will return to your wallet ",
  "NEOBux only accumulate during the time your NFT(s) are staked",
  "Your NEOBux will remain claimable even if you unstake as long as you hold the NFT",
  "When Purchasing Reward NFTs: Holders are only eligible to redeem 1 Reward NFT per each founder pass/ genesis NFT you hold at the time of the snapshot for the Reward Period",
  "All Reward NFT purchases will be verified by the NEO Masterpiece Films team",
  "If you are not eligible; we will notify you and return your NEOBux ",
  "Successful verifications will have their Reward NFTs airdropped with 72 hours ",
];

export function Popup({ closeModal }: Props) {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const ofModel = () => {
    if (isChecked) {
      closeModal();
    }
  };

  return (
    <div
      className={`fixed z-[100] inset-0 overflow-y-auto  `}
      id="error-modal"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex  items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center  sm:p-0 ">
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          aria-hidden="true"
        ></div>

        <div className="  rounded-2xl     overflow-hidden shadow-xl transform transition-all bg_btn_gr ">
          <div className="bg-[#20002c]  p-5 m-[2px] mt-[7px] rounded-2xl  ">
            <div className="h-[7px]"></div>

            <h1 className="text-3xl pt-5">STAKING & REWARDS INSTRUCTIONS</h1>

            <div className="flex flex-col  gap-5 m-auto relative md:w-[500px] h-auto overflow-y-auto mb-5 pt-5 ">
              <ul className=" list-item list-disc 	">
                {info.map((e) => {
                  return (
                    <li className="text-start text-lg ml-[22px] py-2">{e}</li>
                  );
                })}
              </ul>
              <div className="text-start px-3 text-lg">
                For all questions: please submit a ticket in the NEO discord
                server
              </div>
            </div>
            <label className="flex flex-row gap-2 justify-center items-center py-3 text-lg">
              <input
                type="checkbox"
                className="w-4 h-4 text-indigo-500 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500  focus:ring-2 "
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              I have read and understand the above
            </label>

            {/* buy box  */}
            <div className="  ">
              <button
                onClick={() => ofModel()}
                type="button"
                className="inline-flex justify-center truncate w-[90%] rounded-lg border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 text-xl"
              >
                I AGREE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
