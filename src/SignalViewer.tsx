import React from 'react';
import logo from './logo.svg';
import './SignalViewer.css';
import SignalEditor from './SignalEditor';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";



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
  state = {
    show: false
  };


  handleClose = () => {
    this.setState({
        show: false
    });
  };

  handleShow = () => {
    this.setState({
      show: true
    });
  };

  constructor(props: {}) {
    super(props);
  }

  public async componentDidMount() {
    console.log('componentDidMount');
    // Load signal list
    //await loadData();
  }

  public render() {
    const text = "text";
    const kat = "kategorie";
    const bild = "bild";
    const version = "version";


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

            <ButtonGroup>
                <Button id="edit" className="btn btn-outline-dark" onClick={this.handleShow}>
                  Edit
                </Button>
                <Button id="add" className="btn btn-outline-dark" onClick={this.handleShow}>
                  ++
                </Button>

            </ButtonGroup>

            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>{text}</Form.Label>
                  <Form.Control type="email" placeholder="" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>{kat}</Form.Label>
                  <Form.Control type="email" placeholder="" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>{bild}</Form.Label>
                  <Form.Control type="email" placeholder="" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>{version}</Form.Label>
                  <Form.Control type="email" placeholder="" />
                </Form.Group>
              </Form>

              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={this.handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>

            <DropdownButton
                alignRight
                title="Dropdown right"
                id="dropdown-menu-align-right"
            >
              <Dropdown.Item eventKey="1">Action</Dropdown.Item>
              <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
              <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
            </DropdownButton>


          </div>
        </div>
      </div>
    );
  }
}

export default SignalViewer;
