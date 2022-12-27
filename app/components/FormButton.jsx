import React from "react";

const FormButton = ({ children }) => {
  return (
    <button
      type="submit"
      className="bg-[#fffbef] rounded-md py-1 px-4 border border-amber-900 hover:border-amber-600 outline-none focus:outline-2 focus:outline-amber-900"
    >
      {children}
    </button>
  );
};

export default FormButton;
