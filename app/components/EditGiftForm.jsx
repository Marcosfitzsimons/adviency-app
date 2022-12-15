"use client";
import { useEffect, useState } from "react";

const EditGiftForm = ({ currentGift, gifts, setGifts, setEditing }) => {
  const [giftInput, setGiftInput] = useState(currentGift.text);
  const [amountInput, setAmountInput] = useState(currentGift.amount);
  const [imageInput, setImageInput] = useState(currentGift.url);
  const [recipientInput, setRecipientInput] = useState(currentGift.recipient);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (giftInput.length >= 25) {
      return setErrorMsg("The gift is too long.");
    } else if (!giftInput) {
      return setErrorMsg("Empty gift are invalid.");
    } else if (!isImage(imageInput)) {
      return setErrorMsg("Please add a valid image url.");
    } else if (!recipientInput) {
      return setErrorMsg("The recipient must not be empty");
    } else {
      const updatedGift = {
        id: currentGift.id,
        text: giftInput,
        amount: amountInput,
        url: imageInput,
        recipient: recipientInput,
      };
      setGifts(
        gifts.map((gift) => (gift.id === updatedGift.id ? updatedGift : gift))
      );
      setGiftInput("");
      setAmountInput(1);
      setImageInput("");
      setRecipientInput("");
      setEditing(false);
    }
  };

  useEffect(() => {
    setGiftInput(currentGift.text);
    setAmountInput(currentGift.amount);
    setImageInput(currentGift.url);
    setRecipientInput(currentGift.recipient);
  }, [currentGift]);

  const isImage = (url) => {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  };

  return (
    <form
      className="absolute w-[min(90%,600px)] flex flex-col items-center justify-center gap-2 text-black bg-black/60 p-3 rounded-lg z-50 border border-violet-200"
      onSubmit={handleOnSubmit}
    >
      <h2 className="text-white">Edit Gift</h2>
      <div className="flex flex-col w-full">
        <label htmlFor="gift" className="text-white">
          Gift:
        </label>
        <input
          type="text"
          value={giftInput}
          onChange={(e) => setGiftInput(e.target.value)}
          name="gift"
          className="rounded-lg p-2 w-full outline-none focus:outline-2 focus:outline-purple-200"
        />
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="amount" className="text-white">
          Amount:
        </label>
        <input
          type="number"
          name="amount"
          value={amountInput}
          onChange={(e) => setAmountInput(e.target.value)}
          className="rounded-lg p-2 w-full outline-none focus:outline-2 focus:outline-purple-200"
        />
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="image" className="text-white">
          Image:
        </label>
        <input
          type="text"
          name="image"
          value={imageInput}
          onChange={(e) => setImageInput(e.target.value)}
          placeholder="htpps://example.com/image.jpg"
          className="rounded-lg p-2 w-full outline-none focus:outline-2 focus:outline-purple-200"
        />
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="recipient" className="text-white">
          Recipient:
        </label>
        <input
          type="text"
          value={recipientInput}
          name="recipient"
          onChange={(e) => setRecipientInput(e.target.value)}
          className="rounded-lg p-2 w-full outline-none focus:outline-2 focus:outline-purple-200"
        />
      </div>
      {errorMsg && <p className="text-red-400">{errorMsg}</p>}
      <div className="w-full flex items-center justify-between">
        <button
          type="button"
          className=" bg-purple-200 rounded-lg font-mono p-1"
          onClick={() => setEditing((prevValue) => !prevValue)}
        >
          Close
        </button>
        <button
          type="submit"
          className=" bg-purple-200 rounded-lg font-mono p-1"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default EditGiftForm;
