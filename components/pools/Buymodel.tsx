"use client";
import Link from "next/link";
import { rewardnft } from "../../typeing";
import { Buybox } from "./Helper/Buybox";
import { useState } from "react";

type Props = {
  rewardnft?: rewardnft[];
  closeModal: () => void; // Add a prop for closing the modal
};

export function BasicBuyModal({ rewardnft, closeModal }: Props) {
  return (
    <div
      className="fixed z-[100] inset-0 overflow-y-auto "
      id="error-modal"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex  items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center  sm:p-0">
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          aria-hidden="true"
        ></div>

        <div className=" bg-[#1a1c1f] rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all">
          {/* show text if more then one buy item */}
          {rewardnft && rewardnft.length > 1 ? <h1 className="text-xl py-4">Scroll for all options</h1> : null}
          {/* buy box  */}
          <div className="flex flex-wrap justify-center gap-5 m-auto relative md:w-[500px] h-[70vh] overflow-y-scroll mb-5 ">
            {rewardnft?.map((e: rewardnft, indx: any) => {
              return (
                <Buybox data={e} key={indx} closeModal={() => closeModal()} />
              );
            })}
          </div>

          {/* buy box  */}
          <div className="  ">
            <button
              onClick={() => closeModal()}
              type="button"
              className="inline-flex justify-center truncate w-[90%] rounded-lg border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 text-xl"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
