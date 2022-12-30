"use client";

import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Image from "next/image";
import bow from "../../public/assets/bow.png";

const ListPreview = ({ setShowPreview, gifts }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "list-preview",
  });
  return (
    <section className="">
      <div className="flex flex-col items-center gap-2" ref={componentRef}>
        <h3 className="text-6xl text-red-600 pb-2 font-great-vibes">
          List Preview
        </h3>
        <ul className="w-full flex flex-col items-center gap-5 p-6 lg:w-11/12">
          {gifts.map((gift) => (
            <li
              key={gift.id}
              className="relative flex flex-row items-center gap-3 p-4 px-5 rounded-md max-w-sm bg-[#fffbef] text-amber-900 w-full border border-amber-900 shadow-md"
            >
              <Image
                src={bow}
                alt="bow"
                className="absolute top-[-18px] left-[-24px] z-20"
              />
              <div className="flex flex-row items-center gap-3 w-full">
                <div className="rounded-lg relative w-20 aspect-square">
                  <Image
                    src={gift.imageUrl}
                    alt={gift.giftText}
                    fill
                    className="rounded-xl"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p>
                    <span className="">{gift.giftText}</span> ({gift.quantity})
                  </p>
                  <p className="text-amber-700">{gift.to}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-between w-full pt-3 px-3">
        <button
          type="button"
          onClick={() => setShowPreview((prevV) => !prevV)}
          className="rounded-md text-red-600 p-2 min-w-[90px]"
        >
          Close
        </button>
        <button
          type="button"
          onClick={handlePrint}
          className="rounded-md p-2 border border-amber-900 bg-[#fffbef] min-w-[90px] hover:border-amber-700"
        >
          Print
        </button>
      </div>
    </section>
  );
};

export default ListPreview;
