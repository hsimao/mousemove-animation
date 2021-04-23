const box = document.querySelector(".box");
const content = document.querySelector(".content");

const mouseVector = new Victor(0, 0);

console.warn("mouseVector", mouseVector);

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

console.warn("content", content.clientWidth);

const handleMouseMove = (event) => {
  const { pageX, pageY } = event;

  const distance = getDistance(position.x, position.y, pageX, pageY);
  const currentVictor = new Victor(pageX, pageY);
  const x = currentVictor.x - mouseVector.x;
  const y = currentVictor.y - mouseVector.y;
  console.warn("currentVictor.x", currentVictor.x);
  console.warn("mouseVector.x", mouseVector.x);

  // const distanceVector = mouseVector.distance(new Victor(pageX, pageY));

  mouseVector.add(new Victor(x, y));
  console.warn("mouseVector.x after", mouseVector.x);

  console.warn("pageX", pageX);
  console.warn("distanceVector", mouseVector.distance(new Victor(x, y)));
  console.warn("distance", distance);

  position.x = pageX;
  position.y = pageY;

  gsap.to(content, {
    x: mouseVector.x,
    y: mouseVector.y,
    ease: Power2.easeOut,
    duration: 4,
  });

  // content.style.transform = `translate(${mouseVector.x}px, ${mouseVector.y}px)`;

  // box.style.left = `${pageX}px`;
  // box.style.top = `${pageY}px`;
  // gsap.to(box, {
  //   x: pageX,
  //   y: pageY,
  //   ease: Power2.easeOut,
  //   duration: 4,
  // });
};
window.addEventListener("mousemove", debounce(handleMouseMove, 50));

function handleUpdatePosition(event) {
  const { pageX, pageY } = event;
  const result = getDistance(position.x, position.y, pageX, pageY);
  console.warn("result", result);

  position.x = pageX;
  position.y = pageY;
  console.warn("position", position);
}

window.addEventListener("click", handleUpdatePosition);

function getDistance(x1, y1, x2, y2) {
  const a = x1 - x2;
  const b = y1 - y2;
  var result = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

  return result;
}

function getPositon(x, y, distance) {
  const a = x1 - x2;
  const b = y1 - y2;
  var result = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

  return result;
}
