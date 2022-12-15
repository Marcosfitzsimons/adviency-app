"use client";
import Image from "next/image";
import { BiEdit } from "react-icons/bi";
import { BsTrash, BsGift } from "react-icons/bs";

const Gift = ({ gifts, setGifts, gift, setCurrentGift, setEditing }) => {
  const handleDelete = () => {
    setGifts(gifts.filter((e) => e.id !== gift.id));
  };

  const handleEdit = () => {
    setCurrentGift(gifts.find((e) => e.id === gift.id));
    setEditing((prevValue) => !prevValue);
  };

  return (
    <li className="flex items-center gap-3 justify-between">
      <div className="flex items-center gap-2">
        <div className="w-16 aspect-square relative">
          <Image src={gift.url} alt={gift.text} fill />
        </div>
        <div className="flex flex-col">
          <span>
            {gift.text} ({gift.amount})
          </span>
          {gift.recipient}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <BiEdit className="cursor-pointer text-lg" onClick={handleEdit} />
        <BsTrash onClick={handleDelete} className="cursor-pointer" />
      </div>
    </li>
  );
};

export default Gift;
