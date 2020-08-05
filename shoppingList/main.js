"use strict";

const list = document.querySelector(".list");
const inputText = document.querySelector(".inputText");
const btn = document.querySelector(".btn");

const addListItem = function () {
  if (inputText.value !== "" && inputText.value !== null) {
    const div = document.createElement("div");
    const titleSpan = document.createElement("span");
    const deleteSpan = document.createElement("span");

    div.className = "item";
    titleSpan.className = "title";
    deleteSpan.className = "delete";

    deleteSpan.addEventListener("click", () => {
      deleteSpan.parentNode.parentNode.removeChild(div);
    });

    deleteSpan.textContent = "🗑";

    div.appendChild(titleSpan);
    div.appendChild(deleteSpan);

    titleSpan.textContent = inputText.value;
    list.append(div);
  } else {
    console.log("null or space");
  }
  inputText.value = "";
  inputText.focus();
};

inputText.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addListItem();
  }
});

btn.addEventListener("click", () => {
  addListItem();
});
