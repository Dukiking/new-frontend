import React from 'react';
import logo from './logo.svg';
import './SignalViewer.css';
import SignalEditor from './SignalEditor';
import SignalGraphic from './SignalGraphic'
import { ENGINE_METHOD_ALL } from 'constants';
import { Signal } from '../data';
import { loadData } from '../utils';

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
          </div>
        </div>
      </div>
    );
  }
}

export default SignalViewer;
