import React from "react";
import phone from "../../../assets/images/phone.jpg";
export const Product = () => {
  return (
    <div className="flex justify-center flex-col  items-center">
      <img src={phone} />

      <h3>Xiaomi Redmi A2 6.52" 32 Go Noir</h3>
      <p className="bg-gray-200 p-1 rounded-sm"> CMD N:134455</p>
    </div>
  );
};
