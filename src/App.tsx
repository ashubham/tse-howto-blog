import React from "react";
import "antd/dist/antd.css";
import { init, AuthType } from "@thoughtspot/visual-embed-sdk";
import "./styles.css";
import { Search } from "./Search";

init({
  thoughtSpotHost: "https://embed-1-do-not-delete.thoughtspotdev.cloud",
  authType: AuthType.None
});

export default function App() {
  return (
    <div className="App">
      <h1>Hello ThoughtSpot Everywhere</h1>
      <p>This is a simple demo embedding ThoughSpot Search in a React App.</p>
      <Search />
    </div>
  );
}
