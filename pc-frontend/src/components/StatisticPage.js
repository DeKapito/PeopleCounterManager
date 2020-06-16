import React from 'react';
import M from 'materialize-css';
import { Row, Col } from 'react-materialize';
import { request } from './utils';
import { BASE_URL } from '../Consts';
import CameraSelector from './CameraSelector';
import MyBarChart from './BarChart';
import MyScatterChart from './ScatterChart';


class StatisticPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            camera_id: '',
            metrics: [],
        };
    }

    onCameraSelect = (e) => {
        const camera_id = e.target.value;
        if (!camera_id) {
            return;
        }
        request({
            method: 'GET',
            url: BASE_URL + '/core/metrics/'+ camera_id,
        })
            .then(result => {
                console.log(result);
                this.setState({ metrics: result });
            })
            .catch(error => {
                console.log(error);
                M.toast({ html: 'Error: ' + JSON.stringify(error) });
            });
        this.setState({
            camera_id: e.target.value
        })
    }

    render() {
        const cameras = this.state.cameras;
        return (
            <div className='container'>
                <h2 className="header">
                    Statistic
                </h2>
                <Row>
                    <Col><h5>Select Camera</h5></Col>
                    <Col><CameraSelector onCameraSelect={this.onCameraSelect}/></Col>
                </Row>
                <MyBarChart metrics={this.state.metrics}/>
                <MyScatterChart metrics={this.state.metrics}/>
            </div>
        );
    }
}

export default StatisticPage;
