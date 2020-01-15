import React from 'react';
import logo from './logo.svg';
import './SignalViewer.css';
import SignalEditor from './SignalEditor';
import SignalGraphic from './SignalGraphic'
import { ENGINE_METHOD_ALL } from 'constants';
import { Signal } from './data';
import { loadData } from './utils';

interface SignalViewerState {
  selectedSignalId: number | null;
  data: Signal[];
}

class SignalViewer extends React.Component<{}, SignalViewerState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: [],
      selectedSignalId: null,
    }
  }

  public async componentDidMount() {
    console.log('componentDidMount');
    // Load signal list
    const newData = await loadData();
    console.log(JSON.stringify(newData));

    // Set selected item as first data item.
    let newSelect: number | null = null;
    if (newData.length > 0) {
        let counter = 0;
        newData.forEach((val: Signal, idx: number) => {
            if (!newSelect && counter === 3) {
                newSelect = idx;
            }
            counter++;
        });
    }
    this.setState({
      data: newData,
      selectedSignalId: newSelect,
    });
  }

  public render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6 mb-3">
            Signal Graphic:
            <div>
              {this.state.selectedSignalId ? (<SignalGraphic signal={this.state.data[this.state.selectedSignalId]} />) : null}
            </div>
            <PortalViewer />
          </div>
        </div>
      </div>
    );
  }
}
// <SignalEditor selectedSignal={} show={}/>
/*
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
*/

export default SignalViewer;
