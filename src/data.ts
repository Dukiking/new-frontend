export interface SignalData {
    bild: string;
    kategorie: string;
    version: string;
    text: string;
}

export interface Signal extends SignalData {
    id: number;
}