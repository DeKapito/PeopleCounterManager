import React from 'react';
import '../styles/Form.css'
import { Parallax, Row, Col, Card, CardTitle, Icon } from 'react-materialize';
import { BASE_URL } from '../Consts'


class Home extends React.Component {
    render() {
        return (
            <div className='container'>
                <div className="section white">
                    <div className="row container">
                        <h2 className="header">
                            People Counter
                        </h2>
                        <p className="grey-text text-darken-3 lighten-3">
                            People Counter is application which is able to detect pedestrians on the video and count them
                        </p>
                    </div>
                </div>
                <Parallax
                    image={<img alt="" src={process.env.PUBLIC_URL + "pedestrians_1.jpg"} />}
                    options={{
                        responsiveThreshold: 0
                    }}
                />
                <Row>
                    <h2 className="header">
                        Technologies
                    </h2>
                </Row>
                <Row>
                    <Col s={3}>
                        <Card
                            header={<CardTitle image={process.env.PUBLIC_URL + "OpenCV.png"}/>}
                        >
                            A library of programming functions. Very convenient for real-time computer vision.
                        </Card>
                    </Col>
                    <Col s={3}>
                        <Card
                            header={<CardTitle image={process.env.PUBLIC_URL + "TensorFlow.png"}/>}
                        >
                            A library for Machine Learning. Useful for constructing and training neural networks.
                        </Card>
                    </Col>
                    <Col s={3}>
                        <Card
                            header={<CardTitle image={process.env.PUBLIC_URL + "django.jpg"}/>}
                        >
                            Is a free and open-source web framework that follows the model-template-view (MVC) pattern.
                        </Card>
                    </Col>
                    <Col s={3}>
                        <Card
                            header={<CardTitle image={process.env.PUBLIC_URL + "flask.png"}/>}
                        >
                            Is a micro web framework written in Python. It doesn't require particular tools or libraries.
                        </Card>
                    </Col>
                </Row>
                <Parallax
                    image={<img alt="" src={process.env.PUBLIC_URL + "pedestrians_2.jpg"} />}
                    options={{
                        responsiveThreshold: 0
                    }}
                />
            </div>
        );
    }
}

export default Home;
