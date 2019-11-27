let x = 100;

const shieldHeight = document.getElementById("heights");
const outerRect = document.getElementById("outerRect");

shieldHeight.oninput = () => {
    const height = shieldHeight.innerHTML;
    console.log(`textfield changed and height is ${height}`);
    outerRect.setAttribute("height", height);
};

const shieldWidth = document.getElementById("width");
const outerRect = document.getElementById("outerRect");

shieldWidth.oninput = () => {
    const width = shieldWidth.innerHTML;
    console.log(`textfield changed and width is ${width}`);
    outerRect.setAttribute("width", width);
};