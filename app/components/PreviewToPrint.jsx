"use client";
import Image from "next/image";
import bow from "../../public/assets/bow.png";

const PreviewToPrint = ({ gifts }) => {
  return (
    <>
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
                  <span className="">{gift.giftText}</span> ({gift.amount})
                </p>
                <p className="text-amber-700">{gift.to}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PreviewToPrint;
