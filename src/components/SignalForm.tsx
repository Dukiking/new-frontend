import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { Signal, SignalData } from '../data';
import { editSignal, deleteSignal, newSignal } from '../utils';

interface SignalFormProps {
    selectedSignal: Signal | null;
    show: boolean;
    handleClose: () => void;
    reloadMethod: () => void;
}

class SignalForm extends React.Component<SignalFormProps, {}> {
    private signalTextRef: any;
    private signalKategorieRef: any;
    private signalBildRef: any;
    private signalVersionRef: any;

    constructor(props: SignalFormProps) {
        super(props);
        this.signalTextRef = React.createRef();
        this.signalKategorieRef = React.createRef();
        this.signalBildRef = React.createRef();
        this.signalVersionRef = React.createRef();
    }

    public render() {
        const handleSubmit = async () => {
            /** @todo Submit to Server */
            const newSignalData: SignalData = {
                text: this.signalTextRef.current.value,
                kategorie: this.signalKategorieRef.current.value,
                bild: this.signalBildRef.current.value,
                version: this.signalVersionRef.current.value,
            }
            if (this.props.selectedSignal) {
                await editSignal({
                    id: this.props.selectedSignal.id,
                    ...newSignalData,
                });
            } else {
                await newSignal(newSignalData);
            }

            this.props.handleClose();
            await this.props.reloadMethod();
        }
        const handleDelete = async () => {
            if (this.props.selectedSignal) {
                await deleteSignal(this.props.selectedSignal);
                this.props.handleClose();
                await this.props.reloadMethod();
            }
        }
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{
                        this.props.selectedSignal
                            ? 'Signal bearbeiten'
                            : 'Neues Signal erstellen'
                    }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="signalKategorie" >
                            <Form.Label>Kategorie</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                defaultValue={
                                    this.props.selectedSignal
                                        ? this.props.selectedSignal.kategorie
                                        : ''
                                }
                                ref={this.signalKategorieRef}
                            />
                        </Form.Group>
                        <Form.Group controlId="signalText" >
                            <Form.Label>Text</Form.Label>
                            <Form.Control
                                type="text"
                                as="textarea"
                                placeholder=""
                                defaultValue={
                                    this.props.selectedSignal
                                        ? this.props.selectedSignal.text
                                        : ''
                                }
                                ref={this.signalTextRef}
                            />
                        </Form.Group>
                        <Form.Group controlId="signalBild" >
                            <Form.Label>Bild</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                defaultValue={
                                    this.props.selectedSignal
                                        ? this.props.selectedSignal.bild
                                        : ''
                                }
                                ref={this.signalBildRef}
                            />
                        </Form.Group>
                        <Form.Group controlId="signalVersion" >
                            <Form.Label>Version</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                defaultValue={
                                    this.props.selectedSignal
                                        ? this.props.selectedSignal.version
                                        : ''
                                }
                                ref={this.signalVersionRef}
                            />
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmit}>
                        {this.props.selectedSignal ? 'Save Changes' : 'Create'}
                    </Button>
                    {this.props.selectedSignal
                    ? <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    : null} 
                </Modal.Footer>
            </Modal>
        );
    }
};
export default SignalForm;
