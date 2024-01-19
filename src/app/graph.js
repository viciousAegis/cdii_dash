import React, { useState } from "react";
import ReactDOM from "react-dom";
import CytoscapeComponent from "react-cytoscapejs";
import cytoscape from "cytoscape";
import cola from 'cytoscape-cola';

cytoscape.use(cola);

export default function CytoscapeGraph() {
  const [width, setWith] = useState("100%");
  const [height, setHeight] = useState("400px");
  const [graphData, setGraphData] = useState({
    nodes: [
      { data: { id: 'user1', label: 'User 1' } },
      { data: { id: 'user2', label: 'User 2' } },
      { data: { id: 'user3', label: 'User 3' } },
      { data: { id: 'user4', label: 'User 4' } },
      { data: { id: 'user5', label: 'User 5' } },
      { data: { id: 'user6', label: 'User 6' } },
    ],
    edges: [
      { data: { id: 'edge1', source: 'user1', target: 'user2' } },
      { data: { id: 'edge2', source: 'user1', target: 'user3' } },
      { data: { id: 'edge3', source: 'user2', target: 'user4' } },
      { data: { id: 'edge4', source: 'user3', target: 'user5' } },
      { data: { id: 'edge5', source: 'user4', target: 'user6' } },
      { data: { id: 'edge6', source: 'user5', target: 'user6' } }
    ],
  });

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
        'shape': 'roundrectangle'
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
