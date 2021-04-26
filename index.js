const box = document.querySelector(".box");
const $container = document.querySelector(".container");
const $content = document.querySelector(".content");

console.warn("$container width", $container.clientWidth);
console.warn("$content width", $content.clientWidth);

const makeRang = (min, max, bands, n) =>
  Math.floor((bands * (n - min)) / (max - min + 1));

// const band = n => makeRang(0, 100, 5, n);
// console.log(band(0),  band(20));  // 0 0
// console.log(band(21), band(40));  // 1 1
// console.log(band(41), band(60));  // 2 2
// console.log(band(61), band(80));  // 3 3
// console.log(band(81), band(100)); // 4 4

function getCenterPosition(dom) {
  return {
    x: dom.clientWidth / 2,
    y: dom.clientHeight / 2,
  };
}

const debounce = (fn, ms) => {
  let timeout;
  return function (args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(args), ms);
  };
};

let position = {
  x: 0,
  y: 0,
};

// 驗證觸發範圍
function validateScope(content, x, y) {
  const formatX = x - content.offsetLeft;
  const formatY = y - content.offsetTop;
  if (
    formatX >= content.clientWidth ||
    formatX <= 0 ||
    formatY >= content.clientHeight ||
    formatY <= 0
  ) {
    return false;
  }
  return true;
}

function getOffsetByRang(value, min, max, count) {
  const band = (n) => makeRang(min, max, count, n);
  return band(value);
}

function getExceedSize(layout, content) {
  return {
    width: content.clientWidth - layout.clientWidth,
    height: content.clientHeight - layout.clientHeight,
  };
}

const handleMouseMove = (event) => {
  const { pageX, pageY, offsetX, offsetY } = event;
  const valid = validateScope($container, pageX, pageY);

  if (!valid) return;

  const { x: centerX, y: centerY } = getCenterPosition($container);

  updateMouse(pageX, pageY, `x: ${offsetX}, y: ${offsetY}`);

  const { width: exceedWidth, height: exceedHeight } = getExceedSize(
    $container,
    $content
  );

  const rangOffsetX = this.getOffsetByRang(
    offsetX,
    0,
    $container.clientWidth,
    exceedWidth
  );
  const rangOffsetY = this.getOffsetByRang(
    offsetY,
    0,
    $container.clientHeight,
    exceedHeight
  );

  // 反方向移動
  // gsap.to(content, {
  //   x: -(offsetX - centerX),
  //   y: -(offsetY - centerY),
  //   ease: Power2.easeOut,
  // });

  // 反方向移動可移動的比例 px
  let finalOffsetX = rangOffsetX;
  let finalOffsetY = rangOffsetY;

  if (offsetX > centerX) {
    finalOffsetX * -1;
  }
  if (offsetY > centerY) {
    finalOffsetY * -1;
  }

  gsap.to($content, {
    x: -finalOffsetX + exceedWidth / 2,
    y: -finalOffsetY + exceedHeight / 2,
    ease: Power2.easeOut,
  });
};

$container.addEventListener("mousemove", debounce(handleMouseMove, 10));

function getDistance(x1, y1, x2, y2) {
  const a = x1 - x2;
  const b = y1 - y2;
  var result = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

  return result;
}

function updateMouse(x, y, text) {
  const $mouse = document.getElementById("mouse");
  gsap.to($mouse, {
    x: x - $mouse.clientWidth / 2,
    y: y - $mouse.clientHeight / 2,
    ease: Power2.easeOut,
  });

  $mouse.querySelector("span").innerText = text;
}
