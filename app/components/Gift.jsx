"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BiEdit, BiDuplicate } from "react-icons/bi";
import { BsTrash, BsGift } from "react-icons/bs";
import bow from "../../public/assets/bow.png";

const Gift = ({
  gift,
  setGifts,
  gifts,
  setCurrentGift,
  setShowEdit,
  setShowDuplicate,
}) => {
  const handleDelete = () => {
    setGifts(gifts.filter((e) => e.id !== gift.id));
  };

  const handleEdit = () => {
    setCurrentGift(gifts.find((e) => e.id === gift.id));
    setShowEdit((prevV) => !prevV);
  };

  const handleDuplicate = () => {
    setCurrentGift(gifts.find((e) => e.id === gift.id));
    setShowDuplicate((prevV) => !prevV);
  };

  const giftVariants = {
    hidden: {
      opacity: 0,
      y: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "backInOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: -15,
      transition: {
        duration: 0.6,
        ease: "backInOut",
      },
    },
  };

  return (
    <motion.li
      variants={giftVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative flex flex-col justify-center items-center gap-3 p-4 px-5 rounded-md bg-[#fffbef] text-amber-900 w-full border border-amber-900 max-w-[300px] shadow-md md:flex-row md:max-w-full md:justify-between"
    >
      <Image
        src={bow}
        alt="bow"
        className="absolute top-[-18px] left-[-24px] z-20"
      />
      <div className="flex flex-col gap-3 w-full md:flex-row md:items-center">
        <div className="w-full h-[160px] rounded-lg relative md:w-20 md:aspect-square md:h-auto">
          <Image
            src={gift.imageUrl}
            alt={gift.giftText}
            fill
            className="rounded-xl"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>
            <span className="">{gift.giftText}</span> ({gift.quantity}) - ${" "}
            {gift.price * gift.quantity}
          </p>
          <p className="text-amber-700">{gift.to}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 pt-2">
        <BiDuplicate
          className="cursor-pointer text-lg hover:text-amber-700 lg:text-xl"
          onClick={handleDuplicate}
        />
        <BiEdit
          className="cursor-pointer text-lg hover:text-amber-700 lg:text-xl"
          onClick={handleEdit}
        />
        <BsTrash
          className="cursor-pointer hover:text-amber-700 lg:text-lg"
          onClick={handleDelete}
        />
      </div>
    </motion.li>
  );
};

export default Gift;
