
export async function loadData() {
    const data = await (await fetch('/signals')).json();
    //console.log(JSON.stringify(data));
    return data;
}