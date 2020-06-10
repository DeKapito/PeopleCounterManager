import React from 'react';
import '../styles/Form.css'
import { Row, TextInput, Button } from 'react-materialize';


class LoginForm extends React.Component {
    state = {
        username: '',
        password: ''
    };

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
    }

    render() {
        return (
            <div className='form-container z-depth-3'>
                <form onSubmit={e => this.props.handleLogin(e, this.state)}>
                    <h4>Sign In</h4>
                    <Row>
                        <TextInput
                            type='text'
                            name='username'
                            label='username'
                            value={this.state.username}
                            onChange={this.handleChange}
                            s={12}
                        />
                    </Row>
                    <Row>
                        <TextInput
                            type='password'
                            name='password'
                            label='password'
                            value={this.state.password}
                            onChange={this.handleChange}
                            s={12}
                        />
                    </Row>
                    <Row>
                        <Button type="submit" className='light-blue darken-2' large style={{width: '250px'}}>Sign In</Button>
                    </Row>
                </form>
            </div>
        );
    }
}

export default LoginForm;
