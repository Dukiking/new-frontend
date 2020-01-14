import React from 'react';
import { Signal } from './data';
import { loadData } from './utils';

interface SignalGraphicProps {
    signal: Signal;
}

class SignalGraphic extends React.Component<SignalGraphicProps,{}> {
  constructor(props: SignalGraphicProps) {
    super(props);
  }

    function generateNavBoard(signalParams) {
        return `
        <svg width="320" height="320">
        <g>
            <rect
            id="outerRect"
            x="0"
            y="0"
            width="320"
            height="320"
            fill="green"
            />
            <rect
            id="innerRect"
            x="10"
            y="10"
            rx="14"
            ry="14"
            width="300"
            height="300"
            fill="green"
            id="WGWF01"
            stroke="white"
            stroke-width="8"
            />
        </g>
        <foreignObject x="35" y="35" width="250" height="250" class="navSignTextParent">
            <div class="navSignDiv">
                <textfield class="navSignText" contenteditable="true">
                    ${signalParams.text} 
                </textfield>
            </div>
        </foreignObject>
        </svg>`;
    }
    function generateSpeedSign(signalParams) {
        return `
        <svg width="100" height="100">
        <image x="0" y="0" height="100" width="100"  xlink:href="svg/201.svg" />
        <foreignObject x="0" y="0" width="100" height="100" class="speedSignTextParent">
            <div class="speedSignDiv">
                <textfield class="speedSignText" contenteditable="true">
                    ${signalParams.text} 
                </textfield>
            </div>
        </foreignObject>
        </svg>`;
    }
  
  public render() {
    let signHtml = '';
    let signs = {
        'baustelle': 114,
        'achtung': 130,
        'stau': 131,
        'aufgehoben': 258,
        'tunnel': 407,
    }
    const sig = this.props.signal;
    switch(sig.bild) {
        case 'limit':
            document.getElementById("svg-signal").innerHTML = generateSpeedSign(sig);
            // Get svg nr. 201 and write limit on it.
            break;
        case 'navsign':
            document.getElementById("svg-signal").innerHTML = generateNavBoard(sig);
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
    return (
          <div class="input-group mb-3" id="svg-signal">
          </div>
    );
  }
}

export default SignalViewer;