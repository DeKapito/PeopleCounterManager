import './App.css';
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'

import React, { Component } from 'react';
import LoginForm from './components/LoginForm';
import Menu from './components/Menu';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { BASE_URL } from './Consts'
import { isLoggedIn } from './components/utils'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: isLoggedIn(),
            username: ''
        };
    }

    componentDidMount() {
        if (this.state.isLoggedIn) {
            fetch(BASE_URL + '/core/current_user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(json => {
                    this.setState({ username: json.username });
                });
        }
    }

    handleLogin = (e, data) => {
        e.preventDefault();
        fetch(BASE_URL + '/token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
                localStorage.setItem('token', json.token);
                this.setState({
                    isLoggedIn: true,
                    username: json.user.username
                });
            })
            .catch(error => {
                M.toast({ html: 'Error: ' + error });
            });
    };

    handleLogout = () => {
        localStorage.removeItem('token');
        this.setState({ isLoggedIn: false, username: '' });
    };

    PrivateRoute({ children, ...rest }) {
        return (
            <Route
                {...rest}
                render={({ location }) =>
                    isLoggedIn()
                        ? (children)
                        : (<Redirect to={{ pathname: "/sign-in", state: { from: location } }} />)
                }
            />
        );
    }

    render() {
        return (
            <div className="App">
                <Menu isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout} />
                <Router>
                    <Switch>
                        <Route path='/sign-in'>
                            <LoginForm handleLogin={this.handleLogin} />
                        </Route>
                        <this.PrivateRoute path='/hello'>
                            <h2>Hello</h2>
                        </this.PrivateRoute>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
