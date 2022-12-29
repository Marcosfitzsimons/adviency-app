"use client";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import FormButton from "./FormButton";

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
      to: "",
      quantity: 1,
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
      <div className="w-10/12 lg:w-9/12 flex items-strech gap-2">
        <div className="w-full">
          <label htmlFor="gift">Gift:</label>
          <input
            type="text"
            name="gift"
            className="text-black w-full rounded-md p-2 outline-none focus:outline-2 focus:outline-amber-900"
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
          className="p-1 flex flex-col text-sm items-center justify-center border border-amber-900 text-amber-900 bg-[#fff9f1] gap-2 rounded-md outline-none hover:border-amber-600 focus:outline-2 focus:outline-amber-900"
        >
          Random Gift
        </button>
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
          className="text-black w-full rounded-md p-2 outline-none focus:outline-2 focus:outline-amber-900"
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
          className="text-black w-full rounded-md p-2 outline-none focus:outline-2 focus:outline-amber-900"
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
          className="text-black w-full rounded-md p-2 outline-none focus:outline-2 focus:outline-amber-900"
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
          className="text-black w-full rounded-md p-2 outline-none focus:outline-2 focus:outline-amber-900"
        />
        {errors.imageUrl && (
          <p className="text-red-600">{errors.imageUrl.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between w-full pt-3 px-3">
        <button
          type="button"
          onClick={() => setShowGift((prevV) => !prevV)}
          className="rounded-md text-red-600 p-2 min-w-[90px] outline-none"
        >
          Close
        </button>
        <FormButton>Add</FormButton>
      </div>
    </form>
  );
};

export default GiftForm;
