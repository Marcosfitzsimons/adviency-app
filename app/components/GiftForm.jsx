"use client";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { BsDice5 } from "react-icons/bs";

const GiftForm = ({ gifts, setGifts, setShowGiftForm }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    getValues,
    setError,
  } = useForm({
    defaultValues: {
      gift: "",
      for: "",
      amount: 1,
      price: 1,
      imageUrl: "",
    },
  });
  const onSubmit = (data) => {
    if (gifts.some((item) => item.gift === getValues("gift"))) {
      return setError(
        "gift",
        { type: "focus", message: "That gift already exists." },
        { shouldFocus: true }
      );
    }
    setGifts([
      ...gifts,
      {
        id: uuidv4(),
        ...data,
      },
    ]);
    setShowGiftForm((prevValue) => !prevValue);
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

  const getRandomGift = () => {
    const randomGift =
      randomGifts[Math.floor(Math.random() * randomGifts.length)];
    return randomGift;
  };

  const isImage = (url) => {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  };

  return (
    <form
      className="absolute w-[min(90%,500px)] bg-black/60 z-40 rounded-lg border border-amber-900 p-4 flex flex-col items-center justify-center gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3>Add Gift</h3>
      <div className="flex gap-3 w-11/12">
        <div className="flex flex-col gap-3 w-full">
          <label htmlFor="gift">Gift:</label>
          <input
            type="text"
            name="gift"
            {...register("gift", {
              required: {
                value: true,
                message: "Empty gift are not valid.",
              },
              maxLength: {
                value: 30,
                message: "The gift is too long",
              },
            })}
            className="text-black p-2 rounded-lg w-full"
          />
          {errors.gift && <p className="text-red-600">{errors.gift.message}</p>}
        </div>
        <button
          onClick={() => setValue("gift", getRandomGift())}
          type="button"
          className="border border-amber-700 rounded-lg "
        >
          Random Gift
        </button>
      </div>
      <div className="flex flex-col gap-3 w-11/12">
        <label htmlFor="for">For:</label>
        <input
          type="text"
          name="for"
          {...register("for", {
            required: {
              value: true,
              message: "Empty recipient are not valid.",
            },
            maxLength: {
              value: 25,
              message: "The gift recipient is too long",
            },
          })}
          className="text-black p-2 rounded-lg w-full"
        />
        {errors.for && <p className="text-red-600">{errors.for.message}</p>}
      </div>
      <div className="flex flex-col gap-3 w-11/12">
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          name="amount"
          min="1"
          max="20"
          {...register("amount", {
            required: true,
            min: {
              value: 1,
              message: "The amount must be greater than 0.",
            },
            max: {
              value: 20,
              message: "The amount must be less than 20.",
            },
          })}
          className="text-black p-2 rounded-lg w-full"
        />
        {errors.amount && (
          <p className="text-red-600">{errors.amount.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-3 w-11/12">
        <label htmlFor="amount">Price:</label>
        <input
          type="number"
          name="price"
          {...register("price", {
            required: true,
            min: {
              value: 1,
              message: "The price must be greater than 0.",
            },
            max: {
              value: 200000,
              message: "The price must be less than 200000.",
            },
          })}
          className="text-black p-2 rounded-lg w-full"
        />
        {errors.price && <p className="text-red-600">{errors.price.message}</p>}
      </div>
      <div className="flex flex-col gap-3 w-11/12">
        <label htmlFor="image">Image Url:</label>
        <input
          type="text"
          name="image"
          {...register("imageUrl", {
            validate: (value) => isImage(value),
          })}
          className="text-black p-2 rounded-lg w-full"
        />
        {errors.imageUrl && (
          <p className="text-red-600">Add a valid Image Url.</p>
        )}
      </div>
      <div className="flex items-center justify-between w-full">
        <button
          type="button"
          onClick={() => setShowGiftForm((prevValue) => !prevValue)}
        >
          Close
        </button>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default GiftForm;
