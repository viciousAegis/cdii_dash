"use client";

import { SetStateAction, useEffect, useState } from "react";
import TextInput from "../components/TextInput";
import FileUploadComponent from "../components/FileUpload_CSV";
import GraphUploadComponent from "../components/FileUpload_GML";
import CytoscapeGraph from "./graph";
import ForceGraph from "../components/ForceGraph";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000";

const listOfTerms = (input) => {
  return input.split(",").map((term) => term.trim());
};

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [graphData, setGraphData] = useState({}); // [nodes, edges]

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (graphData) {
      console.log(graphData);
    }
  }, [graphData]);

  const handleSearch = () => {
    console.log("searching");
    const search_terms = listOfTerms(inputValue);
    console.log(search_terms);

    axios
      .post(
        `${BASE_URL}/scrape`,
        {
          search_terms: search_terms,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setInputValue("");
        alert("Scraping started.. you will be notified when it is done!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main className="flex min-h-screen flex-col p-12 items-center justify-between gap-6 h-full">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center">
          Community Detection and Influencer Identification
        </h1>
        <h2 className="text-2xl font-bold text-center">Sample Dashboard</h2>
      </div>

      <div className="flex container gap-4 justify-center w-full">
        <h2 className="text-xl font-bold text-center">Search Terms:</h2>
        <TextInput
          placeholder={"Enter comma separated list of search terms"}
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          className="rounded-md px-4 py-2 bg-blue-500 text-white hover:bg-blue-700"
          onClick={handleSearch}
        >
          Submit
        </button>
      </div>

      <div className="flex gap-4 justify-between w-full">
        <div className="flex gap-4 justify-center w-full">
          <FileUploadComponent setGraphData={setGraphData} />
        </div>
        {/* <div className="flex gap-4 justify-center w-full">
          <GraphUploadComponent />
        </div> */}
      </div>

      <div className="flex flex-col w-auto bg-white p-6 h-auto shadow-lg rounded-lg m-4">
        {/* <CytoscapeGraph graphData={graphData} setGraphData={setGraphData} /> */}
        <ForceGraph nodes={graphData.nodes} links={graphData.edges} />
      </div>
      <div className="flex flex-col w-1/2 p-6">
          <h2 className="text-xl font-bold text-center">
            Information about communities/influencers
          </h2>
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe vel
            ducimus molestiae voluptas doloribus corporis quae esse excepturi
            ullam nesciunt, quia vero. Iusto tenetur atque modi quibusdam eum.
            Non, dolore?
          </p>
        </div>
    </main>
  );
}
