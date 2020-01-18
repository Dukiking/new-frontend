import React from 'react';
import { SignalData } from '../data';
import { loadData } from '../utils';

function generateNavBoard(signalParams: SignalData) {
    return (
        <svg width="320" height="320">
            <g fill="green">
                <path d="M0 0H320V320H0z"></path>
                <rect
                    width="300"
                    height="300"
                    x="10"
                    y="10"
                    stroke="#fff"
                    strokeWidth="8"
                    rx="14"
                    ry="14"
                ></rect>
            </g>
            <foreignObject
                width="250"
                height="250"
                x="35"
                y="35"
                className="navSignTextParent"
            >
                <div className="navSignDiv">
                    <div className="navSignText">{signalParams.text}</div>
                </div>
            </foreignObject>
        </svg>
    );
}

function generateSpeedSign(signalParams: SignalData) {
    return (
        <svg width="100" height="100">
            <image x="0" y="0" height="100" width="100"  xlinkHref="svg/201.svg" />
            <foreignObject
                width="100"
                height="100"
                x="0"
                y="0"
                className="speedSignTextParent"
            >
                <div className="speedSignDiv">
                    <div className="speedSignText">{signalParams.text}</div>
                </div>
            </foreignObject>
        </svg>
    );
}

function generateStaticSign(graphicId: string) {
    interface SignObject {
        [key: string]: number;
    }
    let signs: SignObject = {
        'baustelle': 114,
        'achtung': 130,
        'stau': 131,
        'aufgehoben': 258,
        'tunnel': 407,
    }
    const lookup = signs[graphicId];
    const svgPath = `svg/${lookup}.svg`;
    if (lookup) {
        return (
            <object
                id="svg-object"
                data={svgPath}
                type="image/svg+xml">
            </object>
        );
    } else {
        console.warn(`Didn't find any graphics specification for ${graphicId}`)
        return <div>{`No graphics for ${graphicId}`}</div>;
    }
}

/**
 * Decide which function to use to render the signal.
 * @param props Attributes describing a signal
 */
const SignalGraphic: React.FC<SignalData> = (props: SignalData) => {
    let signHtml = (<div></div>);
    switch(props.bild) {
        case 'limit':
            signHtml = generateSpeedSign(props);
            break;
        case 'navsign':
            signHtml = generateNavBoard(props);
            break;
        default:
            signHtml = generateStaticSign(props.bild);
            //document.getElementById("svg-signal").innerHTML = html;
    }
    return signHtml;
}

/*
    return (
        <div className="input-group mb-3">
            {signHtml}
        </div>
    );
    */
export default React.memo(SignalGraphic);