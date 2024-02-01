import React, { useState } from "react";
import ReactDOM from "react-dom";
import CytoscapeComponent from "react-cytoscapejs";
import cytoscape from "cytoscape";
import cola from 'cytoscape-cola';

var graphml = require("cytoscape-graphml");

cytoscape.use(cola);

function generateRandomColors(numColors) {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    // Generate a random color code (hex format)
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    colors.push(color);
  }
  return colors;
}

export default function CytoscapeGraph({graphData, setGraphData}) {
  const [width, setWith] = useState("100%");
  const [height, setHeight] = useState("400px");

  const layout = {
    name: "cola",
  };

  const styleSheet = [
    {
      selector: 'node',
      style: {
        'background-color': '#4CAF50',
        'label': 'data(label)',
        'width': 40,
        'height': 40,
        'text-valign': 'center',
        'color': '#fff',
        'text-outline-color': '#4CAF50',
        'text-outline-width': 2,
        'shape': 'circle'
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 2,
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle'
      }
    }
  ];

  let myCyRef;

  return (
    <CytoscapeComponent
      elements={CytoscapeComponent.normalizeElements(graphData)}
      // pan={{ x: 200, y: 200 }}
      style={{ width: width, height: height }}
      zoomingEnabled={true}
      maxZoom={3}
      minZoom={0.1}
      autounselectify={false}
      boxSelectionEnabled={true}
      layout={layout}
      stylesheet={styleSheet}
      cy={(cy) => {
        myCyRef = cy;

        console.log("EVT", cy);

        cy.on("tap", "node", (evt) => {
          var node = evt.target;
          console.log("EVT", evt);
          console.log("TARGET", node.data());
          console.log("TARGET TYPE", typeof node[0]);
        });
      }}
      abc={console.log("myCyRef", myCyRef)}
    />
  );
}
