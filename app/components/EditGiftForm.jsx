"use client";
import { useForm } from "react-hook-form";

const EditGiftForm = ({ gifts, setGifts, currentGift, setIsEditing }) => {
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
      gift: currentGift.gift,
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
    setIsEditing((prevValue) => !prevValue);
  };

  const isImage = (url) => {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  };

  return (
    <form
      className="absolute w-[min(90%,500px)] bg-black/60 z-40 rounded-lg border border-amber-900 p-4 flex flex-col items-center justify-center gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3>Edit Gift</h3>
      <div className="flex flex-col gap-3 w-11/12">
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
          onClick={() => setIsEditing((prevValue) => !prevValue)}
        >
          Close
        </button>
        <button type="submit">Update</button>
      </div>
    </form>
  );
};

export default EditGiftForm;
