let data = [];
let id;
function onSelected() {
    const dropdown = document.getElementById("validationCustom03");
    const selected = dropdown.options[dropdown.selectedIndex].value;
    document.getElementById("bild").innerHTML = data[selected].bild;
    document.getElementById("kategorie").innerHTML = data[selected].kategorie;
    document.getElementById("version").innerHTML = data[selected].version;
    document.getElementById("text").innerHTML = data[selected].text;
    id = data[selected].id;
}
async function loadData() {
    data = await (await fetch('/signals')).json();
    console.log(JSON.stringify(data));
    setDropdown();
}
async function on_submit(event) {
    await fetch('/signals', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            version: document.getElementById("version").innerHTML,
            kategorie: document.getElementById("kategorie").innerHTML,
            bild: document.getElementById("bild").innerHTML,
            text: document.getElementById("text").innerHTML,
        }),
    });
}
async function on_new(event) {
    await fetch('/signals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            version: document.getElementById("version").innerHTML,
            kategorie: document.getElementById("kategorie").innerHTML,
            bild: document.getElementById("bild").innerHTML,
            text: document.getElementById("text").innerHTML,
        }),
    });
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
