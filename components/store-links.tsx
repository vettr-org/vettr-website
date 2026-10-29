"use client";

import Image from "next/image";

export type StoreClickDetail = {
  store: "app-store" | "google-play";
  placement: "hero" | "hiring";
};

export function StoreLinks({ placement }: { placement: StoreClickDetail["placement"] }) {
  function handleClick(store: StoreClickDetail["store"]) {
    const detail: StoreClickDetail = { store, placement };
    console.info("[WorkedWith] store-click", detail);
    window.dispatchEvent(new CustomEvent("workedwith:store-click", { detail }));
  }

  return (
    <div className="store-links" aria-label="Get the app">
      {(["app-store", "google-play"] as const).map(store => (
        <button className="store-button" type="button" key={store} data-store={store} data-placement={placement}
          aria-label={store === "app-store" ? "Download on the App Store" : "Get it on Google Play"}
          onClick={() => handleClick(store)}>
          <Image className="store-badge" src={`/assets/${store}-3x.png`} width={120} height={40} alt="" unoptimized />
        </button>
      ))}
    </div>
  );
}
