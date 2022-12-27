"use client";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import decoration from "../../public/assets/decoration.svg";

const GiftForm = ({ gifts, setGifts, setShowGift }) => {
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
      giftText: "",
      for: "",
      amount: 1,
      price: 1,
      imageUrl: "",
    },
  });
  const onSubmit = (data) => {
    if (
      gifts.some(
        (gift) =>
          gift.giftText.toLowerCase() === getValues("giftText").toLowerCase()
      )
    ) {
      return setError(
        "giftText",
        { type: "focus", message: "That gift already exists." },
        { shouldFocus: true }
      );
    }
    setShowGift((prevV) => !prevV);
    setGifts([
      ...gifts,
      {
        id: uuidv4(),
        ...data,
      },
    ]);
  };

  const getRandomGift = () => {
    let randomGift =
      randomGifts[Math.floor(Math.random() * randomGifts.length)];
    setValue("giftText", randomGift, { shouldValidate: true });
  };

  const randomGifts = [
    "Luxury watch",
    "Gourmet chocolates",
    "Customized phone case",
    "Cozy throw blanket",
    "Elegant jewelry box",
    "Artisanal coffee beans",
    "Designer handbag",
    "Premium quality pens",
    "Luxurious scented candles",
    "High-end skincare products",
    "Gourmet cooking sauces",
    "Personalized cutting board",
    "Handmade pottery mug",
    "Quality leather wallet",
    "Luxurious silk pillowcase",
    "Gourmet snack basket",
    "Premium quality wine",
    "Handmade soap set",
    "Exotic spice blend",
    "Luxurious bathrobe",
    "Quality kitchen knife set",
    "Personalized stationary set",
    "Handmade quilt or afghan",
    "Luxurious candle set",
    "Premium quality teas",
    "Gourmet popcorn set",
    "Handmade pottery vase",
    "Quality essential oil diffuser",
    "Personalized photo album",
    "Handmade candle holders",
  ];

  const isImage = (url) => {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  };

  return (
    <form
      className="bg-[#faf0e4] absolute w-[min(95%,700px)] p-3 py-5 gap-2 top-32 z-50 rounded-md flex flex-col items-center border border-white"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="text-6xl text-red-600 pb-2 font-great-vibes">Add Gift</h3>
      <div className="w-10/12 lg:w-9/12 flex items-center gap-1">
        <div className="w-full">
          <label htmlFor="gift">Gift:</label>
          <input
            type="text"
            name="gift"
            className="text-black w-full rounded-md p-2"
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
        <button
          onClick={getRandomGift}
          type="button"
          className="p-1 flex flex-col text-sm items-center justify-center self-end border border-amber-800 text-amber-900 bg-[#fff9f1] gap-2 rounded-md hover:border-amber-700"
        >
          Random Gift
        </button>
      </div>
      <div className="w-10/12 lg:w-9/12">
        <label htmlFor="for">For:</label>
        <input
          type="text"
          name="for"
          {...register("for", {
            required: {
              value: true,
              message: "Add a recipient.",
            },
            maxLength: {
              value: 25,
              message: "The recipient is too long.",
            },
          })}
          className="text-black w-full rounded-md p-2"
        />
        {errors.for && <p className="text-red-600">{errors.for.message}</p>}
      </div>
      <div className="w-10/12 lg:w-9/12">
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          name="amount"
          {...register("amount", {
            required: {
              value: true,
              message: "Add an amount.",
            },
            min: {
              value: 1,
              message: "The amount must be greater than 1.",
            },
            max: {
              value: 25,
              message: "The amount must be less than 25.",
            },
          })}
          className="text-black w-full rounded-md p-2"
        />
        {errors.amount && (
          <p className="text-red-600">{errors.amount.message}</p>
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
          className="text-black w-full rounded-md p-2"
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
          className="text-black w-full rounded-md p-2"
        />
        {errors.imageUrl && (
          <p className="text-red-600">{errors.imageUrl.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between w-full px-3">
        <button
          type="button"
          onClick={() => setShowGift((prevV) => !prevV)}
          className="rounded-md text-red-600 p-2 min-w-[90px]"
        >
          Close
        </button>
        <Image
          src={decoration}
          alt="decoration"
          width="90"
          height="90"
          className=""
        />
        <button
          type="submit"
          className="rounded-md p-2 border border-amber-900 bg-[#fffbef] min-w-[90px] hover:border-amber-700"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default GiftForm;
