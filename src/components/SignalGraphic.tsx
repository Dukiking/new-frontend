import React from 'react';
import { Signal } from '../data';
import { loadData } from '../utils';
//import svg2 from '../svg/201.svg';

interface SignalGraphicProps {
    signal: Signal;
}

class SignalGraphic extends React.Component<SignalGraphicProps,{}> {
    constructor(props: SignalGraphicProps) {
        super(props);
    }

    public generateNavBoard(signalParams: Signal) {
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
                    <div className="navSignText">
                      {signalParams.text}
                    </div>
                  </div>
                </foreignObject>
              </svg>
            );
    }
    private generateSpeedSign(signalParams: Signal) {
        return (<svg width="100" height="100">
            <image x="0" y="0" height="100" width="100"  xlinkHref="svg/201.svg" />
        <foreignObject
          width="100"
          height="100"
          x="0"
          y="0"
          className="speedSignTextParent"
        >
          <div className="speedSignDiv">
            <div className="speedSignText">
              {signalParams.text}
            </div>
          </div>
        </foreignObject>
      </svg>);
    }
  
  public render() {
    let signHtml = (<div></div>);
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
    const sig = this.props.signal;
    switch(sig.bild) {
        case 'limit':
            //document.getElementById("svg-signal").innerHTML = generateSpeedSign(sig);
            // Get svg nr. 201 and write limit on it.
            break;
        case 'navsign':
            //document.getElementById("svg-signal").innerHTML = generateNavBoard(sig);
            // Draw green rect with white borders and specified text in it.
            break;
        default:
            const lookup = signs[sig.bild];
            const svgPath = `svg/${lookup}.svg`;
            if (lookup) {
                signHtml = 
                (<object
                    id="svg-object"
                    data={svgPath}
                    type="image/svg+xml">
                </object>
                );
            } else {
                console.warn(`Didn't find any graphics specification for ${sig.bild}`)
            }
            //document.getElementById("svg-signal").innerHTML = html;
    }
    return (
          <div className="input-group mb-3">
              {signHtml}
          </div>
    );
  }
}

export default SignalGraphic;