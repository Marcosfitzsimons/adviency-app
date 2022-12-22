"use client";
import Script from "next/script";
import { useEffect, useState } from "react";
import EditGiftForm from "./components/EditGiftForm";
import DuplicateGiftForm from "./components/DuplicateGiftForm";
import Gift from "./components/Gift";
import GiftForm from "./components/GiftForm";

export default function Home() {
  const [gifts, setGifts] = useState([]);
  const [currentGift, setCurrentGift] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showGiftForm, setShowGiftForm] = useState(false);
  const [totalGifts, setTotalGifts] = useState(0);
  const [showDuplicate, setShowDuplicate] = useState(false);

  const getTotal = () => {
    let total = 0;

    for (let i = 0; i < gifts.length; i++) {
      total += parseInt(gifts[i].price * gifts[i].amount);
    }

    return setTotalGifts(total);
  };

  const getLocalGifts = () => {
    if (localStorage.getItem("gifts" === null)) {
      localStorage.setItem("gifts", JSON.stringify([]));
    } else {
      const localGifts = JSON.parse(localStorage.getItem("gifts"));
      setGifts(localGifts);
    }
  };

  const saveLocalGifts = () => {
    localStorage.setItem("gifts", JSON.stringify(gifts));
  };

  useEffect(() => {
    getLocalGifts();
  }, []);

  useEffect(() => {
    saveLocalGifts();
    getTotal();
    console.log(gifts);
  }, [gifts]);

  return (
    <main className="w-[min(90%,600px)]">
      <div className="w-11/12 mx-auto flex flex-col items-center justify-center gap-6 border border-amber-900 rounded-lg shadow-lg shadow-amber-900 p-6 bg-black/60">
        <Script src="https://app.embed.im/snow.js" />
        {isEditing || showGiftForm || showDuplicate ? (
          <div className="absolute block inset-0 bg-[rgba(0,0,0,.6)]" />
        ) : (
          ""
        )}
        {isEditing && (
          <EditGiftForm
            gifts={gifts}
            setGifts={setGifts}
            setIsEditing={setIsEditing}
            currentGift={currentGift}
          />
        )}
        {showGiftForm && (
          <GiftForm
            gifts={gifts}
            setGifts={setGifts}
            setShowGiftForm={setShowGiftForm}
          />
        )}
        {showDuplicate && (
          <DuplicateGiftForm
            setShowDuplicate={setShowDuplicate}
            gifts={gifts}
            setGifts={setGifts}
            currentGift={currentGift}
          />
        )}
        <h1 className="font-great-vibes text-6xl">List of Gifts</h1>
        <button
          className=""
          type="button"
          onClick={() => setShowGiftForm((prevValue) => !prevValue)}
        >
          Add Gift
        </button>
        <ul className="flex flex-col gap-3 w-11/12">
          {gifts.map((gift) => (
            <Gift
              key={gift.id}
              gift={gift}
              setGifts={setGifts}
              gifts={gifts}
              setIsEditing={setIsEditing}
              setCurrentGift={setCurrentGift}
              setShowDuplicate={setShowDuplicate}
            />
          ))}
        </ul>
        <p className="p-2 border-t border-zinc-600 text-center w-full">
          Total account: $ {totalGifts}
        </p>
        <button
          type="button"
          className="rounded-lg text-red-600 bg-black/70 p-2"
        >
          Delete All
        </button>
        <button
          type="button"
          className="rounded-lg border border-yellow-600 bg-black/70 p-2"
        >
          Preview
        </button>
      </div>
    </main>
  );
}
