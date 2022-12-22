"use client";
import Image from "next/image";
import { BiEdit, BiDuplicate } from "react-icons/bi";
import { BsTrash, BsGift } from "react-icons/bs";

const Gift = ({
  gift,
  setGifts,
  gifts,
  setIsEditing,
  setCurrentGift,
  setShowDuplicate,
}) => {
  const handleEdit = () => {
    setCurrentGift(gifts.find((e) => e.id === gift.id));
    setIsEditing((prevV) => !prevV);
  };

  const handleDuplicate = () => {
    setCurrentGift(gifts.find((e) => e.id === gift.id));
    setShowDuplicate((prevV) => !prevV);
  };

  const handleDelete = () => {
    setGifts(gifts.filter((e) => e.id !== gift.id));
  };

  return (
    <li className="flex items-center gap-3 justify-between bg-zinc-700/70 p-2 rounded-md w-full">
      <div className="flex items-center gap-3">
        <div className="relative w-20 aspect-square">
          <Image src={gift.imageUrl} alt={gift.gift} fill />
        </div>
        <div className="flex flex-col">
          <p>
            {gift.gift} x({gift.amount}) - $ {gift.price * gift.amount}{" "}
          </p>
          <span className="text-slate-200">{gift.for}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <BiDuplicate
          className="cursor-pointer text-lg"
          onClick={handleDuplicate}
        />
        <BiEdit className="cursor-pointer text-lg" onClick={handleEdit} />
        <BsTrash className="cursor-pointer" onClick={handleDelete} />
      </div>
    </li>
  );
};

export default Gift;
