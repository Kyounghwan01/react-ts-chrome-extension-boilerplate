import React, { useEffect } from "react";
import "../assets/tailwind.css";

const handleChromeNewTab = () => {
  console.log("크롬 뉴탭");
  chrome.tabs.create({ url: "./options.html", selected: true, active: true });
};

const handleInput = e => {
  e.preventDefault();
  const name = e.target[0].value;
  chrome.storage.sync.set({ name }, () => {
    console.log(`이름 셋됨: ${name}`);
  });
};

const Popup = () => {
  useEffect(() => {
    chrome.storage.sync.get(["name"], res => {
      console.log(res.name);
    });
  }, []);

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

      <div>
        <form
          onSubmit={handleInput}
          className="flex justify-center items-center py-44"
        >
          <input
            type="text"
            name="name"
            className="bg-gray ring-black px-4 py-4"
            placeholder="input"
          />
          <button className="py04 px-3 bg-indigo-500 text-white m-2">
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
