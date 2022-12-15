"use client";
import Script from "next/script";
import { useEffect, useState } from "react";
import EditGiftForm from "./components/EditGiftForm";
import Gift from "./components/Gift";
import GiftForm from "./components/GiftForm";

export default function Home() {
  const [gifts, setGifts] = useState([]);
  const [showGiftForm, setShowGiftForm] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentGift, setCurrentGift] = useState({});

  const getLocalGifts = () => {
    if (localStorage.getItem("gifts") === null) {
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
  }, [gifts]);

  return (
    <main className="w-[min(90%,500px)]">
      <Script src="https://app.embed.im/snow.js" />
      {showGiftForm && (
        <div className="absolute block inset-0 bg-[rgba(0,0,0,.6)]"></div>
      )}
      {editing && (
        <div className="absolute block inset-0 bg-[rgba(0,0,0,.6)]"></div>
      )}
      <div className="w-11/12 mx-auto border border-purple-200 bg-black/60 rounded-lg p-4 flex flex-col items-center gap-6 z-30">
        <h1 className="font-great-vibes text-5xl">List of Gifts</h1>
        <button
          onClick={() => setShowGiftForm((prevValue) => !prevValue)}
          className="bg-purple-200 rounded-lg font-mono p-1 text-black"
        >
          Add new Gift
        </button>
        {editing ? (
          <EditGiftForm
            currentGift={currentGift}
            gifts={gifts}
            setGifts={setGifts}
            setEditing={setEditing}
          />
        ) : (
          showGiftForm && (
            <GiftForm
              gifts={gifts}
              setGifts={setGifts}
              setShowGiftForm={setShowGiftForm}
            />
          )
        )}
        <ul className="flex flex-col gap-3 w-10/12">
          {gifts.length > 0 ? (
            gifts.map((gift) => (
              <Gift
                key={gift.id}
                gift={gift}
                gifts={gifts}
                setGifts={setGifts}
                setCurrentGift={setCurrentGift}
                setEditing={setEditing}
              />
            ))
          ) : (
            <p className="">You have no pending gifts.</p>
          )}
        </ul>
        <button onClick={() => setGifts([])} className="text-red-600 font-mono">
          Delete All
        </button>
      </div>
    </main>
  );
}
