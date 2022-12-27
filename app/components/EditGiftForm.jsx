"use client";
import { useForm } from "react-hook-form";

const EditGiftForm = ({ gifts, setGifts, currentGift, setShowEdit }) => {
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
      for: currentGift.for,
      amount: currentGift.amount,
      price: currentGift.price,
      imageUrl: currentGift.imageUrl,
    },
  });
  const onSubmit = (data) => {
    const updatedGift = {
      id: currentGift.id,
      ...data,
    };

    setGifts(
      gifts.map((gift) => (gift.id === updatedGift.id ? updatedGift : gift))
    );

    setShowEdit((prevV) => !prevV);
  };

  const isImage = (url) => {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  };

  return (
    <form
      className="absolute w-[min(95%,700px)] p-3 py-5 gap-2 top-32 bg-[#faf0e4] z-50 rounded-md flex flex-col items-center border border-white"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="text-6xl text-red-600 pb-2 font-great-vibes">Edit Gift</h3>
      <div className="w-10/12 lg:w-9/12">
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

      <div className="flex items-center justify-between w-full pt-3 px-3">
        <button
          type="button"
          onClick={() => setShowEdit((prevV) => !prevV)}
          className="rounded-md text-red-600 p-2 min-w-[90px]"
        >
          Close
        </button>
        <button
          type="submit"
          className="rounded-md p-2 border border-amber-900 bg-[#fffbef] min-w-[90px] hover:border-amber-700"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default EditGiftForm;
