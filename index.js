const $container = document.querySelector(".container");
const $content = document.querySelector(".content");
const $body = document.querySelector("body");

class MoveSpace {
  constructor(fullContent, viewContent) {
    this.body = document.querySelector("body");
    this.fullContent = fullContent;
    this.viewContent = viewContent;
    this.init();
  }

  init() {
    this.onListener();
  }

  destroy() {
    this.removeListener();
  }

  makeRang(min, max, bands, n) {
    return Math.floor((bands * (n - min)) / (max - min + 1));
  }

  getOffsetByRang(value, min, max, count) {
    const band = (n) => this.makeRang(min, max, count, n);
    return band(value);
  }

  getViewContentCenter() {
    const { offsetX, offsetY } = this.getOffset(
      this.fullContent,
      this.viewContent
    );
    return {
      centerX: this.fullContent.clientWidth / 2 - offsetX / 2,
      centerY: this.fullContent.clientHeight / 2 - offsetY / 2
    };
  }

  getOffset(dom1, dom2) {
    return {
      offsetX: dom1.clientWidth - dom2.clientWidth,
      offsetY: dom1.clientHeight - dom2.clientHeight
    };
  }

  moveFullContent(currentX, currentY, rangOffsetX, rangOffsetY) {
    const { centerX, centerY } = this.getViewContentCenter();

    let finalOffsetX = rangOffsetX;
    let finalOffsetY = rangOffsetY;

    if (currentX >= centerX) {
      finalOffsetX = finalOffsetX * -1;
    }

    if (currentY >= centerY) {
      finalOffsetY = finalOffsetY * -1;
    }

    this.fullContent.style.left = `${-rangOffsetX}px`;
    this.fullContent.style.top = `${-rangOffsetY}px`;
  }

  handleMouseMove = (event) => {
    const { offsetX: offsetXByBody, offsetY: offsetYByBody } = this.getOffset(
      this.body,
      this.viewContent
    );
    const innerX = event.clientX - offsetXByBody / 2;
    const innerY = event.clientY - offsetYByBody / 2;

    const { offsetX, offsetY } = this.getOffset(
      this.fullContent,
      this.viewContent
    );
    const rangOffsetX = this.getOffsetByRang(
      innerX,
      0,
      this.viewContent.clientWidth,
      offsetX
    );
    const rangOffsetY = this.getOffsetByRang(
      innerY,
      0,
      this.viewContent.clientHeight,
      offsetY
    );

    this.moveFullContent(innerX, innerY, rangOffsetX, rangOffsetY);
  };

  onListener() {
    this.viewContent.addEventListener("mousemove", this.handleMouseMove, false);
  }

  removeListener() {
    this.viewContent.removeEventListener(
      "mousemove",
      this.handleMouseMove,
      false
    );
  }
}

const moveSpace = new MoveSpace($content, $container);
