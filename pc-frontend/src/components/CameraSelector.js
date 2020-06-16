import React, { Component } from 'react';
import M from 'materialize-css';
import { Select } from 'react-materialize';
import { request } from './utils';
import { BASE_URL } from '../Consts';


class CameraSelector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cameras: [],
        };
    }

    componentDidMount() {
        request({
            method: 'GET',
            url: BASE_URL + '/core/cameras/',
        })
            .then(result => {
                this.setState({ cameras: result });
            })
            .catch(error => {
                console.log(error);
                M.toast({ html: 'Error: ' + JSON.stringify(error) });
            });
    }

    render() {
        const cameras = this.state.cameras;

        return (
            <Select onChange={this.props.onCameraSelect}>
                <option></option>
                {
                    cameras.map(camera => (
                        <option key={camera.camera_id}
                            value={camera.camera_id}
                            // style={{ zIndex: 100 }}
                        >{camera.camera_name}</option>
                    ))}
            </Select>
        );
    }

}

export default CameraSelector;