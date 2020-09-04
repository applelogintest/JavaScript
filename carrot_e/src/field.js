"use strict";
import * as sound from "./sound.js";

export const ItemType = Object.freeze({
  carrot: "carrot",
  bug: "bug",
});
export class Field {
  constructor(carrotCount, bugCount, carrotSize, bugSize) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.carrotSize = carrotSize;
    this.bugSize = bugSize;
    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();
    //this.field.addEventListener("click", (event) => this.onClick(event));
    this.field.addEventListener("click", this.onClick);
  }

  init() {
    this.field.innerHTML = "";
    this._addItem(
      ItemType.carrot,
      this.carrotCount,
      "img/carrot.png",
      this.carrotSize
    );

    this._addItem(ItemType.bug, this.bugCount, "img/bug.png", this.bugSize);
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  _addItem(className, count, imgPath, padding) {
    const x1 = 0;
    const x2 = this.fieldRect.width - padding;
    const y1 = 0;
    const y2 = this.fieldRect.height - padding;

    for (let i = 0; i < count; i++) {
      const item = document.createElement("img");
      item.setAttribute("class", className);
      item.setAttribute("src", imgPath);
      item.style.position = "absolute";

      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;

      this.field.appendChild(item);
    }
  }

  onClick = (event) => {
    const target = event.target;
    if (target.matches(".carrot")) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick(ItemType.carrot);
    } else if (target.matches(".bug")) {
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  };
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
