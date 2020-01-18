import { Signal, SignalData } from './data';

export async function loadData() {
    return await (await fetch('/signals')).json() as Signal[];
}

export async function editSignal(signal: Signal) {
    return await fetch('/signals', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: signal.id,
            version: signal.version,
            kategorie: signal.kategorie,
            bild: signal.bild,
            text: signal.text,
        }),
    });
}

export async function deleteSignal(signal: Signal) {
    return await fetch('/signals', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: signal.id,
        }),
    });
}

export async function newSignal(signal: SignalData) {
    return await fetch('/signals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            version: signal.version,
            kategorie: signal.kategorie,
            bild: signal.bild,
            text: signal.text,
        }),
    });
}