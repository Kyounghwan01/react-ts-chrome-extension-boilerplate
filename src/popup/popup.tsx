import React from "react";
import "../assets/tailwind.css";

const handleChromeNewTab = () => {
  console.log("크롬 뉴탭");
  chrome.tabs.create({ url: "./options.html", selected: true, active: true });
};

const Popup = () => {
  return (
    <div className="h-screen">
      <div className="flex justify-center items-center py-44">
        <button
          onClick={handleChromeNewTab}
          className="py04 px-3 bg-indigo-500 text-white m-2"
        >
          테스트
        </button>
      </div>
    </div>
  );
};

export default Popup;
