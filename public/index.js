let data = [];
let selectedId;
function onSelected() {
    const dropdown = document.getElementById("validationCustom03");
    let signs = {
        'baustelle': 114,
        'achtung': 130,
        'stau': 131,
        'aufgehoben': 258,
        'tunnel': 407,
    }
    const selected = data[dropdown.options[dropdown.selectedIndex].value];
    document.getElementById("bild").innerHTML = selected.bild;
    document.getElementById("kategorie").innerHTML = selected.kategorie;
    document.getElementById("version").innerHTML = selected.version;
    document.getElementById("text").innerHTML = selected.text;
    selectedId = selected.id;
    console.log(`Selected id ${selectedId} with text ${selected.text}`);

    switch(selected.bild) {
        case 'limit':
        // Get svg nr. 201 and write limit on it.
        break;
        case 'navsign':
        document.getElementById("svg-signal").innerHTML = generateNavBoard(selected);
        // Draw green rect with white borders and specified text in it.
        break;
        default:
        const lookup = signs[selected.bild];
        let html = '';
        if (lookup) {
            html = `
            <object
                id="svg-object"
                data="svg/${lookup}.svg"
                type="image/svg+xml">
            </object>
            `;
        } else {
            console.warn(`Didn't find any graphics specification for ${selected.bild}`)
        }
        document.getElementById("svg-signal").innerHTML = html;
    }
}
function generateNavBoard(signalParams) {
    return `
    <svg width="220" height="220">
      <g>
        <rect
          id="outerRect"
          x="0"
          y="0"
          width="220"
          height="220"
          fill="green"
        />
        <rect
          id="innerRect"
          x="10"
          y="10"
          rx="14"
          ry="14"
          width="200"
          height="200"
          fill="green"
          id="WGWF01"
          stroke="white"
          stroke-width="8"
        />
      </g>
      <foreignObject x="35" y="35" width="150" height="150" id="navSignTextParent">
            <textfield id="navSignText" contenteditable="true">
                ${signalParams.text} 
            </textfield>
      </foreignObject>
    </svg>`;
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
            id: selectedId,
            version: document.getElementById("version").innerHTML,
            kategorie: document.getElementById("kategorie").innerHTML,
            bild: document.getElementById("bild").innerHTML,
            text: document.getElementById("text").innerHTML,
        }),
    });
}
async function on_delete(event) {
    console.log('delete is called');
    await fetch('/signals', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: selectedId,
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
