import React from 'react';
import logo from './logo.svg';
import './SignalViewer.css';
import Signal from './SignalViewer';

async function loadData() {
    const data = await (await fetch('/signals')).json();
    console.log(JSON.stringify(data));
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  activeTitle: {
    color: 'red',
  },
});

interface SignalEditorProps {
  selectedSignal: Signal | null;
  show: boolean;
}

class SignalEditor extends React.Component<SignalEditorProps,{}> {
  /*
  constructor(props: {}) {
    super(props);
  }
  */

  public async componentDidMount() {
    console.log('componentDidMount');
    // Load signal list
    await loadData();
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
          <button type="button" className="btn btn-primary">{this.props.selectedSignal ? 'Save Changes' : 'Create'}</button>
          <button type="button" className="btn btn-secondary"> New </button>
          <button type="button" className="btn btn-danger"> Delete </button>
        </form>
      </div>
    );
  }
}

export default SignalEditor;