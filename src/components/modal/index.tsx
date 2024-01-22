import React from "react";
import ReactDOM from "react-dom";
const modalRoot = document.getElementById("modal-root");
export const Modal = ({ children, isOpen }) => {
  if (!isOpen) return null;
  // const element = document.createElement('div');
  // React.useEffect(()=>{
  //     modalRoot.appendChild(element);

  //     return ()=>{
  //         modalRoot.removeChild(element)
  //     }
  // })
  return ReactDOM.createPortal(
    <div className=" fixed inset-0  bg-black bg-opacity-25 flex justify-center items-center  backdrop-blur-0 ">
      {children}
    </div>,
    document.getElementById("modal-root")
  );
};
