let x = 100;

const shieldHeight = document.getElementById("heights");
const shieldWidth = document.getElementById("width");
const outerRect = document.getElementById("outerRect");
const innerRect = document.getElementById("innerRect");

shieldHeight.oninput = () => {
  const height = shieldHeight.innerHTML;
  console.log(`textfield changed and height is ${height}`);
  outerRect.setAttribute("height", height);
  innerRect.setAttribute("height", height - 20);
};

shieldWidth.oninput = () => {
    const width = shieldWidth.innerHTML;
    console.log(`textfield changed and width is ${width}`);
    outerRect.setAttribute("width", width);
    innerRect.setAttribute("width", width-20);
};