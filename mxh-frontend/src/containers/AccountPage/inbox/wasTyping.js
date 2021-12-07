import React from "react";

const WasTyping = () => {
  return (
    <div className="absolute top-3/4 transform translate-y-10">
      <div className="flex  items-center">
        <p className=" font-medium text-base" style={{ color: "#06b6d4" }}>
          Other is typing ....
        </p>
        <div className="">
          <div className="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WasTyping;
