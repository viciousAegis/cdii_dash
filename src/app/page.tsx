"use client";

import { SetStateAction, useState } from "react";
import TextInput from "../components/TextInput";
import CytoscapeGraph from "./graph";

export default function Home() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(e.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-12 justify-between">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center">
          Community Detection and Influencer Identification
        </h1>
        <h2 className="text-2xl font-bold text-center">Sample Dashboard</h2>
      </div>

      <div className="flex container items-center gap-4 justify-center w-3/4">
        <h2 className="text-xl font-bold text-center">Search Terms:</h2>
        <TextInput
          placeholder={"Enter comma separated list of search terms"}
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex w-3/4 gap-4 justify-between">
        <div className="flex container items-center justify-center border-2 border-black w-1/2">
          <CytoscapeGraph />
        </div>
        <div className="flex flex-col w-1/2 p-6">
          <h2 className="text-xl font-bold text-center">Information about communities/influencers</h2>
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe vel ducimus molestiae voluptas doloribus corporis quae esse excepturi ullam nesciunt, quia vero. Iusto tenetur atque modi quibusdam eum. Non, dolore?
          </p>
        </div>
      </div>
    </main>
  );
}
