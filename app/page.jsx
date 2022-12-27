"use client";
import Script from "next/script";
import Image from "next/image";
import { useEffect, useState } from "react";
import EditGiftForm from "./components/EditGiftForm";
import DuplicateGiftForm from "./components/DuplicateGiftForm";
import Gift from "./components/Gift";
import GiftForm from "./components/GiftForm";
import hat from "../public/assets/hat.svg";
import decoration from "../public/assets/decoration.svg";
import MainButton from "./components/MainButton";
import ListPreview from "./components/ListPreview";

export default function Home() {
  const [gifts, setGifts] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showDuplicate, setShowDuplicate] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [currentGift, setCurrentGift] = useState({});
  const [totalAccount, setTotalAccount] = useState(0);

  const getLocalGifts = () => {
    if (localStorage.getItem("gifts" === null)) {
      localStorage.setItem("gifts", JSON.stringify([]));
    } else {
      const giftLocal = JSON.parse(localStorage.getItem("gifts"));
      setGifts(giftLocal);
    }
  };

  const saveLocalGifts = () => {
    localStorage.setItem("gifts", JSON.stringify(gifts));
  };

  const getTotalAccount = () => {
    let total = 0;
    for (let i = 0; i < gifts.length; i++) {
      total += gifts[i].price * gifts[i].quantity;
    }
    setTotalAccount(total);
  };

  useEffect(() => {
    getLocalGifts();
  }, []);

  useEffect(() => {
    saveLocalGifts();
    getTotalAccount();
  }, [gifts]);

  return (
    <main className="mx-auto py-16 w-[min(95%,800px)] h-full flex items-center justify-center lg:py-24 text-amber-900">
      {showEdit || showGift || showDuplicate || showPreview ? (
        <div className="absolute block inset-0 bg-[rgba(0,0,0,.6)] z-30" />
      ) : (
        ""
      )}
      {showGift && (
        <GiftForm gifts={gifts} setGifts={setGifts} setShowGift={setShowGift} />
      )}
      {showEdit && (
        <EditGiftForm
          gifts={gifts}
          setGifts={setGifts}
          setShowEdit={setShowEdit}
          currentGift={currentGift}
        />
      )}
      {showDuplicate && (
        <DuplicateGiftForm
          gifts={gifts}
          setGifts={setGifts}
          setShowDuplicate={setShowDuplicate}
          currentGift={currentGift}
        />
      )}
      {showPreview && (
        <ListPreview gifts={gifts} setShowPreview={setShowPreview} />
      )}
      <div className="relative w-[95%] mx-auto border min-h-[400px] border-[#ece5dc] rounded-lg flex flex-col items-center gap-6 p-6 bg-[#faf0e4] shadow-lg">
        <Script src="https://app.embed.im/snow.js" />
        <div className="hidden drop-shadow-lg rotate-[65deg] absolute right-[-75px] top-[-65px] w-32 aspect-square lg:flex lg:right-[-115px] lg:top-[-100px] lg:w-48">
          <Image src={hat} alt="hat" fill className="" />
        </div>

        <h1 className="font-great-vibes text-6xl lg:text-7xl text-red-600">
          List of Gifts
        </h1>
        <MainButton setShowGift={setShowGift} />
        <ul className="relative w-full flex flex-col items-center gap-5 p-6 lg:w-11/12">
          {gifts.length > 0 ? (
            gifts.map((gift) => (
              <Gift
                key={gift.id}
                gift={gift}
                setGifts={setGifts}
                gifts={gifts}
                setCurrentGift={setCurrentGift}
                setShowDuplicate={setShowDuplicate}
                setShowEdit={setShowEdit}
              />
            ))
          ) : (
            <p className="flex flex-col p-3 max-w-[270px] mx-auto rounded-lg text-center col-start-1 col-end-3">
              The list is currently empty.{" "}
              <span>Try adding some gifts to the list.</span>
            </p>
          )}
        </ul>

        {gifts.length > 0 && (
          <>
            <div className="w-full flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowPreview((prevV) => !prevV)}
                className="bg-[#fffbef] rounded-md py-1 px-3 border border-amber-900 outline-none  hover:border-amber-600 focus:outline-2 focus:outline-amber-900"
              >
                List Preview
              </button>

              <p className="min-w-[200px] text-center lg:border-l lg:border-l-amber-900 py-1">
                Total account: $ {totalAccount}
              </p>
            </div>
            <button
              onClick={() => setGifts([])}
              className="font-medium text-red-600 outline-none"
            >
              Delete All
            </button>
          </>
        )}
      </div>
    </main>
  );
}
