/*********************************************************************
 ** Author: Pablo Turati ID#: 933198349 turatip@oregonstate.edu
 ** Date: October 27th, 2018
 ** Description: "HW Assignment: DOM and Events"
 *********************************************************************/

/* INITIAL CONFIGURATION */

const body = document.getElementsByTagName("body")[0];

const limits = {
  rowMin: 2,
  rowMax: 4,
  colMin: 1,
  colMax: 4
};

var tbSize = 4;

let coords = {
  row: 2, //First row starts at "2"
  col: 1
};

const styles = {
  bodyStyle: {
    "background-color": "lightblue",
    width: "100vw",
    display: "flex",
    "flex-direction": "column",
    "align-items": "center",
    "justify-content": "center",
    "font-family": "Lucida Sans",
    "box-sizing": "border-box"
  },
  tableStyle: {
    padding: "20px",
    "border-collapse": "collapse",
    "text-align": "center",
    "background-color": "white"
  },
  controlPanelStyle: {
    margin: "20px",
    "text-align": "center"
  },
  sectionStyle: {
    "min-height": "8vh",
    width: "30vw,",
    display: "flex",
    "justify-content": "center"
  },
  buttonStyle: {
    "background-color": "darkblue",
    "font-size": "15px",
    "border-radius": "10px",
    color: "white",
    width: "100px",
    margin: "6px"
  },
  markerStyle: {
    "background-color": "orange",
    "border-radius": "50%",
    height: "80px"
  },
  currentSelectStyle: { "background-color": "yellow" }
};

const selectedCSSStr =
  ".selected { border: 5px solid red; }" +
  "table, th, td {border: 1px solid black;}";

const styleConfiguration = [
  {
    id: "body",
    style: styles.bodyStyle
  },
  {
    id: "table",
    style: styles.tableStyle
  },
  {
    id: "th",
    style: styles.tableStyle
  },
  {
    id: "td",
    style: styles.tableStyle
  },
  {
    id: "td",
    style: styles.controlPanelStyle
  },
  {
    id: "button",
    style: styles.buttonStyle
  },
  {
    id: "#MARKER",
    style: styles.markerStyle
  },
  {
    id: ".butSubSection",
    style: styles.sectionStyle
  }
];

window.onload = function() {
  createPage();
  createControlPanel();

  //Set initial coordinates (selection)
  drawSelection(coords);

  //Set CSS styles
  configStyle();
};

/* PAGE MARKUP CONSTRUCTION */
const createPage = () => {
  const header = createSimpleNode("header", body);
  createTextNode("h1", "Pablo Turati", header);
  createTextNode("h2", "HW Assignment: DOM and Events", header);
  createTable(tbSize);
  createSelectedHeader(); //Creates a definition for the selected class
};

const createTable = tbsize => {
  const section = createSimpleNode("section", body);
  const table = createSimpleNode("table", section);

  for (let i = 0; i < tbsize; i++) {
    let row = createSimpleNode("tr", table);
    for (let j = 0; j < tbsize; j++) {
      if (i === 0) {
        cellTag = "th";
        text = "Header " + j;
      } else {
        cellTag = "td";
        text = j + 1 + " , " + i;
      }
      createTextNode(cellTag, text, row);
    }
  }
};

const createButtons = buttons => {
  buttons.forEach(button => {
    const { id, parentNode } = button;
    const tempNode = createTextNode("button", id, parentNode);
    $(tempNode).addClass("navBut");
    $(tempNode).attr("id", id);
  });
};

const createControlPanel = () => {
  const controlPanelDiv = createSimpleNode("div", body);
  const upperButsec = createSimpleNode("div", controlPanelDiv);
  upperButsec.setAttribute("class", "butSubSection");
  const middleButSec = createSimpleNode("div", controlPanelDiv);
  middleButSec.setAttribute("class", "butSubSection");
  const bottomButSec = createSimpleNode("div", controlPanelDiv);
  bottomButSec.setAttribute("class", "butSubSection");

  const buttons = [
    {
      id: "LEFT",
      parentNode: middleButSec
    },
    {
      id: "UP",
      parentNode: upperButsec
    },
    {
      id: "DOWN",
      parentNode: bottomButSec
    },
    {
      id: "MARKER",
      parentNode: middleButSec
    },
    {
      id: "RIGHT",
      parentNode: middleButSec
    }
  ];
  createButtons(buttons);
  $(controlPanelDiv).css(styles.controlPanelStyle);
  setButtonListeners();
};

//Node creator tools
const createSimpleNode = (tag, parent) => {
  const node = document.createElement(tag);
  parent.appendChild(node);
  return node;
};

const createTextNode = (tag, text, parent) => {
  const node = createSimpleNode(tag, parent);
  const txtNode = document.createTextNode(text);
  node.appendChild(txtNode);
  return node;
};

/* STYLE CONFIG CONSTRUCTION */

//Style configuration
const configStyle = () => {
  styleConfiguration.map(elem => {
    const { id, style } = elem;
    $(id).css(style);
  });
};

//Set Listeners
const setButtonListeners = () => {
  $(".navBut").click(e => {
    var { id } = e.target;
    move(id);
  });
};

//Defines a head style class to use for "selected" box.
const createSelectedHeader = () => {
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = selectedCSSStr;
  document.getElementsByTagName("head")[0].appendChild(style);
};

/* FUNCTIONALITY  */

//Controls
const move = inst => {
  const { row, col } = coords;
  const { rowMin, rowMax, colMin, colMax } = limits;
  switch (inst) {
    case "UP":
      row > rowMin && (coords = calculateCoords(coords, "row", -1));
      break;
    case "DOWN":
      row < rowMax && (coords = calculateCoords(coords, "row", 1));
      break;
    case "LEFT":
      col > colMin && (coords = calculateCoords(coords, "col", -1));
      break;
    case "RIGHT":
      col < colMax && (coords = calculateCoords(coords, "col", 1));
      break;
    default:
      markThisBox(coords);
  }
  drawSelection(coords);
};

//Logic
const calculateCoords = (current, changeAxis, change) => {
  const { row, col } = current;
  const newCol = changeAxis === "col" ? col + change : col;
  const newRow = changeAxis === "row" ? row + change : row;
  return { row: newRow, col: newCol };
};

//Output - Current Selection
const drawSelection = coords => {
  $(".selected").removeClass("selected");
  const currentSelect = $(
    `tr:nth-child(${coords.row}) td:nth-child(${coords.col}`
  );
  currentSelect.addClass("selected");
};

//Output - Marker
const markThisBox = coords => {
  let currentSelect = $(
    `tr:nth-child(${coords.row}) td:nth-child(${coords.col}`
  );
  currentSelect.css(styles.currentSelectStyle);
};
