import React from 'react';
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import SignalForm from './SignalForm';
import SignalGraphic from './SignalGraphic'
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { Signal } from '../data';
import { loadData } from '../utils';

const buttonStyle = {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    boxShadow: 'none',
};

/**
 * Get object from state data array corresponding to provided id.
 * Should only ever be called with id's that exist in the array.
 * @param searchId The external (database) id of the signal.
 */
function getObjFromId(searchId: number, data: Signal[]): Signal | null {
    const searchRes = data.filter(signal => {
        const comp1 = (typeof signal.id === 'string' ? parseInt(signal.id) : signal.id);
        const comp2 = (typeof searchId === 'string' ? parseInt(searchId) : searchId);
        return comp1 === comp2;
    });
    if (searchRes.length > 1) {
        throw Error(`Found ${searchRes.length} signals with id ${searchId}`);
    }
    if (searchRes.length === 1) {
        return searchRes[0];
    } else {
        return null;
    }
}

interface SignalViewerState {
    selectedSignalId: number | null; // Must ALWAYS match with exactly one element from data array.
    data: Signal[];
    showModal: boolean;
    addNew: boolean;
}

class SignalViewer extends React.Component<{}, SignalViewerState> {
    private selectedRef: any;

    constructor(props: {}) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.updateData = this.updateData.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.selectedRef = React.createRef();

        this.state = {
            data: [],
            selectedSignalId: null,
            showModal: false,
            addNew: false,
        }
    }

    public async componentDidMount() {
        await this.updateData();
    }

    private async updateData() {
        // Load signal list
        const newData = await loadData();
        console.log(JSON.stringify(newData));
        this.setState((prevState) => {
            let newSelectedId = prevState.selectedSignalId;
            if (!newSelectedId || !getObjFromId(newSelectedId as number, newData)) {
                // If nothing was selected or object doesnt exist anymore set new selection
                // by just taking the first element.
                newSelectedId = null;
                if (newData.length > 0) {
                    newSelectedId = newData[0].id;
                }
            }
            return {
                data: newData,
                selectedSignalId: newSelectedId,
            }
        });
    }

    /**
     * Apply getObjFromId function to this components data array and guarantee a result.
     */
    private getObjFromIdSafe(searchId: number): Signal {
        const result = getObjFromId(searchId, this.state.data);
        if (!result) Error(`Didn't find ${searchId} in data array.`);
        return result as Signal;
    }

    /**
     * Listener for dropdown changes.
     * @param event
     */
    private onSelect(event: any) {
        const selectedStr = this.selectedRef.current.value;
        const selectedId = selectedStr.substr(0, selectedStr.indexOf(':'));
        this.setState({
            selectedSignalId: selectedId
        });
    }

    /**
     * Close editor modal.
     */
    private handleClose() {
        this.setState({
            showModal: false,
        });
    }

    public render() {
        // Functions for opening the editor modal in differet modes.
        const openNew = () => {
            this.setState({
                showModal: true,
                addNew: true,
            })
        };
        const openEdit = () => {
            this.setState({
                showModal: true,
                addNew: false,
            })
        };

        let dropDownElements: any = [];
        if (this.state.data) {
            dropDownElements = this.state.data.map((signal: Signal, idx) => {
                return (<option key={signal.id}>{`${signal.id}: ${signal.kategorie}`}</option>)
            });
        }

        return (
            <div>
                <div className="row" style={{ margin: 30, fontSize: 30}}>
                    Signale
                </div>
                <div className="row" style={{ margin: 30 }}>
                    <div className="col-md-6 mb-3">
                        <Form.Group controlId="formGridState">
                            <Form.Control
                                as="select"
                                ref={this.selectedRef}
                                onChange={this.onSelect}
                            >
                                {dropDownElements}
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <div className="col-md-6 mb-3">
                        <ButtonGroup>
                            <Button
                                id="edit"
                                className="btn btn-outline-dark"
                                onClick={openEdit}
                                style={buttonStyle}
                            >
                                <FontAwesomeIcon icon={faEdit} /> 
                            </Button>
                            <Button
                                id="add"
                                className="btn btn-outline-dark"
                                onClick={openNew}
                                style={buttonStyle}
                            >
                                <FontAwesomeIcon icon={faPlus} /> 
                            </Button>
                        </ButtonGroup>

                    </div>
                </div>
                <div className="row" style={{ marginLeft: 50 }}>
                    <div>
                        {this.state.selectedSignalId
                            ? (<SignalGraphic
                                    {...this.getObjFromIdSafe(this.state.selectedSignalId)}
                                />)
                            : null}
                    </div>
                </div>
                <SignalForm
                    show={this.state.showModal}
                    selectedSignal={this.state.selectedSignalId && !this.state.addNew
                        ? this.getObjFromIdSafe(this.state.selectedSignalId)
                        : null}
                    handleClose={this.handleClose}
                    reloadMethod={this.updateData}
                />
            </div>
        );
    }
}

export default SignalViewer;
