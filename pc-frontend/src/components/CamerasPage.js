import React from 'react';
import M from 'materialize-css';
import { Collapsible, CollapsibleItem, Icon, Button, Row, Col, TextInput, Textarea } from 'react-materialize';
import { request } from './utils';
import { BASE_URL } from '../Consts';
import Camera from './Camera';


class CamerasPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cameras: [],
            camera_id: '',
            camera_name: '',
            camera_description: '',
            view_url: '',
        };
        this.removeCamera = this.removeCamera.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validate = () => {
        console.log(this.state)
        if (this.state.camera_id.length === 0 ||
            this.state.camera_name.length === 0 ||
            this.state.camera_description.length === 0 ||
            this.state.view_url.length === 0) {
                return false;
            } else {
                return true;
            }
    }

    handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevstate => {
            const newState = { ...prevstate };
            newState[name] = value;
            return newState;
        });
    };

    handleSubmit(event) {
        event.preventDefault();
        if (!this.validate()) {
            M.toast({ html: 'Please, fill all fields' });
            return
        }
        const body = {
            camera_id: this.state.camera_id,
            camera_name: this.state.camera_name,
            description: this.state.camera_description,
            view_url: this.state.view_url,
        }
        request({
            method: 'POST',
            url: BASE_URL + '/core/cameras/',
            body: JSON.stringify(body)
        })
            .then(result => {
                console.log(result);
                this.setState({
                    camera_id: '',
                    camera_name: '',
                    camera_description: '',
                    view_url: '',
                });
                M.toast({ html: 'Camera added' });
                this.componentDidMount();
            })
            .catch(error => {
                console.log(error);
                M.toast({ html: 'Error: ' + JSON.stringify(error) });
            });
    }

    componentDidMount() {
        request({
            method: 'GET',
            url: BASE_URL + '/core/cameras/',
        })
            .then(result => {
                console.log(result);
                this.setState({ cameras: result });
            })
            .catch(error => {
                console.log(error);
                M.toast({ html: 'Error: ' + JSON.stringify(error) });
            });
    }

    removeCamera(index) {
        this.state.cameras.splice(index, 1);
        this.setState(this.state);
    }


    render() {
        const cameras = this.state.cameras;
        return (
            <div className='container'>
                <h2 className="header">
                    Cameras
                </h2>
                <Row>
                    <Col s={12}>
                        <Collapsible accordion>
                            <CollapsibleItem
                                expanded={false}
                                header="Add Camera"
                                icon={<Icon>add</Icon>}
                                node="div"
                                className={this.state.collapsibleStatus}
                            >
                                <Row>
                                    <TextInput
                                        type='text'
                                        id='camera_id'
                                        name='camera_id'
                                        label='Camera Id (should be the same as in flask config)'
                                        value={this.state.camera_id}
                                        onChange={this.handleChange}
                                        maxLength={255}
                                        s={12}
                                    />
                                    <TextInput
                                        type='text'
                                        id='view_url'
                                        name='view_url'
                                        label='View URL (URL of flask server)'
                                        value={this.state.view_url}
                                        onChange={this.handleChange}
                                        s={12}
                                    />
                                    <TextInput
                                        id='camera_name'
                                        name='camera_name'
                                        label='Camera Name'
                                        value={this.state.camera_name}
                                        onChange={this.handleChange}
                                        s={12}
                                    />
                                    <Textarea
                                        name='camera_description'
                                        label='Camera Descripiton'
                                        value={this.state.camera_description}
                                        onChange={this.handleChange}
                                        s={12}
                                    />
                                </Row>
                                <Row>
                                    <Col offset='s10'>
                                        <Button className='light-blue darken-2' onClick={this.handleSubmit}>
                                            Add
                                        </Button>
                                    </Col>
                                </Row>
                            </CollapsibleItem>
                        </Collapsible>
                    </Col>
                </Row>
                {
                    cameras.map((item, index) => (
                        <Camera
                            cameraId={item['camera_id']}
                            cameraUrl={item['view_url']}
                            cameraName={item['camera_name']}
                            cameraDescription={item['description']}
                            key={index}
                            index={index}
                            removeCamera={this.removeCamera}
                        />
                    ))
                }
            </div>
        );
    }
}

export default CamerasPage;
