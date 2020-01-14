import React from 'react';
import logo from './logo.svg';
import './SignalViewer.css';
import SignalEditor from './SignalEditor';



async function loadData() {
    const data = await (await fetch('/signals')).json();
    console.log(JSON.stringify(data));
}

export interface Signal {
  text: string;
  kategorie: string;
  bild: string;
  version: string;
}

interface SignalViewerProps {
  selectedSignal: Signal;
}

class SignalViewer extends React.Component<{},{}> {
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
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Category:</label>
            <select className="dropdown form-control form-control-lg" name="category" id="validationCustom03" required>
              <option className="dropdown-item" value="">Choose... </option>
              <option value="Classroom Instruction and Assessment">Classroom Instruction and Assessment</option>
              <option value="Curriculum Development and Alignment">Curriculum Development and Alignment</option>
              <option value="District Committee">District Committee</option>
              <option value="Meeting">Meeting</option>
              <option value="Other Category">Other Category</option>
              <option value="Professional Conference">Professional Conference</option>
              <option value="Professional Workshop / Training">Professional Workshop / Training</option>
              <option value="Pupil Services">Pupil Services</option>
            </select>

          </div>
        </div>
      </div>
    );
  }
}

export default SignalViewer;
