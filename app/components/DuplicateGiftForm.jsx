"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import FormButton from "./FormButton";

const DuplicateGiftForm = ({
  gifts,
  setGifts,
  currentGift,
  setShowDuplicate,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      giftText: currentGift.giftText,
      to: currentGift.to,
      quantity: currentGift.quantity,
      price: currentGift.price,
      imageUrl: currentGift.imageUrl,
    },
  });
  const onSubmit = (data) => {
    setGifts([
      ...gifts,
      {
        id: uuidv4(),
        ...data,
      },
    ]);

    setShowDuplicate((prevV) => !prevV);
  };

  const isImage = (url) => {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  };

  return (
    <form
      className="gap-2 flex flex-col items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="text-6xl text-red-600 pb-2 font-great-vibes">
        Duplicate Gift
      </h3>
      <div className="w-10/12 lg:w-9/12">
        <label htmlFor="gift">Gift:</label>
        <input
          type="text"
          name="gift"
          className="text-black w-full rounded-md p-2  outline-none focus:outline-2 focus:outline-amber-900"
          {...register("giftText", {
            required: {
              value: true,
              message: "Empty gifts are not valid.",
            },
            maxLength: {
              value: 25,
              message: "The gift is too long.",
            },
          })}
        />
        {errors.giftText && (
          <p className="text-red-600">{errors.giftText.message}</p>
        )}
      </div>
      <div className="w-10/12 lg:w-9/12">
        <label htmlFor="to">To:</label>
        <input
          type="text"
          name="to"
          {...register("to", {
            required: {
              value: true,
              message: "Add a recipient.",
            },
            maxLength: {
              value: 25,
              message: "The recipient is too long.",
            },
          })}
          className="text-black w-full rounded-md p-2  outline-none focus:outline-2 focus:outline-amber-900"
        />
        {errors.to && <p className="text-red-600">{errors.to.message}</p>}
      </div>
      <div className="w-10/12 lg:w-9/12">
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          name="quantity"
          {...register("quantity", {
            required: {
              value: true,
              message: "Quantity shouldn't be empty.",
            },
            min: {
              value: 1,
              message: "Quantity must be greater than 1.",
            },
            max: {
              value: 25,
              message: "Quantity must be less than 25.",
            },
          })}
          className="text-black w-full rounded-md p-2  outline-none focus:outline-2 focus:outline-amber-900"
        />
        {errors.quantity && (
          <p className="text-red-600">{errors.quantity.message}</p>
        )}
      </div>
      <div className="w-10/12 lg:w-9/12">
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          name="price"
          {...register("price", {
            required: {
              value: true,
              message: "Add a price.",
            },
            min: {
              value: 1,
              message: "The price must be greater than 1.",
            },
            max: {
              value: 1000000,
              message: "The price must be less than 1000000.",
            },
          })}
          className="text-black w-full rounded-md p-2  outline-none focus:outline-2 focus:outline-amber-900"
        />
        {errors.price && <p className="text-red-600">{errors.price.message}</p>}
      </div>
      <div className="w-10/12 lg:w-9/12">
        <label htmlFor="image-url">Image:</label>
        <input
          type="text"
          name="image-url"
          {...register("imageUrl", {
            validate: (val) => isImage(val) || "Add a valid Image Url.",
          })}
          className="text-black w-full rounded-md p-2  outline-none focus:outline-2 focus:outline-amber-900"
        />
        {errors.imageUrl && (
          <p className="text-red-600">{errors.imageUrl.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between w-full pt-3 px-3">
        <button
          type="button"
          onClick={() => setShowDuplicate((prevV) => !prevV)}
          className="rounded-md text-red-600 p-2 min-w-[90px] outline-none"
        >
          Close
        </button>
        <FormButton>Duplicate</FormButton>
      </div>
    </form>
  );
};
export default DuplicateGiftForm;
