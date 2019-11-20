let data = [];
function onSelected() {
    const dropdown = document.getElementById("validationCustom03");
    const selected = dropdown.options[dropdown.selectedIndex].value;
    document.getElementById("bild").innerHTML = data[selected].bild;
    document.getElementById("kategorie").innerHTML = data[selected].kategorie;
    document.getElementById("version").innerHTML = data[selected].version;
    document.getElementById("text").innerHTML = data[selected].text;
}
async function loadData() {
    data = await (await fetch('/signals')).json();
    console.log(JSON.stringify(data));
    setDropdown();
}
function setDropdown() {
    var catList = document.getElementById("validationCustom03");
    while (catList.options.length) {
        catList.remove(0);
    }
    if (data) {
        data.forEach((val, idx) => {
            const opt = new Option(val.text, idx);
            catList.options.add(opt);
        })
    }
}
loadData();
