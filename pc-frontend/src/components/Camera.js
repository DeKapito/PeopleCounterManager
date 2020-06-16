import React, { Component } from 'react';
import M from 'materialize-css';
import { Col, Row, Card, Button, Modal } from 'react-materialize';
import { request } from './utils';
import { BASE_URL } from '../Consts';


class Camera extends Component {

    constructor(props) {
        super(props);
        this.deleteHandler = this.deleteHandler.bind(this);
    }

    deleteHandler = function(cameraId) {
        console.log(BASE_URL + '/core/cameras/' + cameraId);
        request({
            method: 'DELETE',
            url: BASE_URL + '/core/cameras/' + cameraId,
        })
            .then(result => {
                M.toast({ html: 'Camera deleted' });
                this.props.removeCamera(this.props.index)
            })
            .catch(error => {
                console.log(error);
                M.toast({ html: 'Error: ' + JSON.stringify(error) });
            });
    }

    render() {
        return (
            <Row>
                <Col s={12}>
                    <Card
                        actions={[
                            <Row key="buttons">
                                <Col offset="s8">
                                    <Col>
                                        <Button className='light-blue darken-2'>
                                            <a style={{margin: '0px', color: 'white'}} target="_blank" href={this.props.cameraUrl}>View</a>
                                        </Button>
                                    </Col>
                                    <Col><Button className='red' onClick={e => this.deleteHandler(this.props.cameraId)}>Delete</Button></Col>
                                </Col>
                            </Row>
                        ]}
                        className="yellow lighten-1"
                        textClassName="black-text"
                        title={this.props.cameraName}
                    >
                        {this.props.cameraDescription}
                    </Card>
                </Col>
            </Row>
        );
    }

}

export default Camera;