import React from 'react';
import logo from './logo.svg';
import './SignalViewer.css';
import Signal from './SignalViewer';

async function loadData() {
    const data = await (await fetch('/signals')).json();
    console.log(JSON.stringify(data));
}

interface SignalEditorProps {
  selectedSignal: Signal;
}

class SignalEditor extends React.Component<{},{}> {
  constructor(props: {}) {
    super(props);
  }

  public async componentDidMount() {
    console.log('componentDidMount');
    // Load signal list
    //await loadData();
  }

  public render() {
    return (
      <div>
        <form>
          <div className="input-group mb-3" id="svg-signal"></div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">Text</span>
            </div>
            <div contentEditable="true" id="text" className="col-md-6 form-control"></div>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">Kategorie</span>
            </div>
            <div contentEditable="true" className="col-md-6 form-control" id="kategorie"></div>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-default">Bild</span>
            </div>
            <div contentEditable="true" className="col-md-6 form-control" id="bild"></div>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">Version</span>
            </div>
            <div contentEditable="true" className="col-md-6 form-control" id="version"></div>
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
            <label className="form-check-label">Stromanschluss</label>
          </div>
          <button type="button" className="btn btn-primary">Save Changes</button>
          <button type="button" className="btn btn-secondary"> New </button>
          <button type="button" className="btn btn-danger"> Delete </button>
        </form>
      </div>
    );
  }
}

export default SignalEditor;
