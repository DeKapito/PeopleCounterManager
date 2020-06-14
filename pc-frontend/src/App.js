import './App.css';
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'

import React, { Component } from 'react';
import LoginForm from './components/LoginForm';
import Menu from './components/Menu';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { BASE_URL } from './Consts'
import { isLoggedIn, request } from './components/utils'
import Home from './components/Home';


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
            request({
                url: BASE_URL + "/core/current_user/",
            })
                .then(result => {
                    console.log(result);
                    this.setState({ username: result.username });
                })
                .catch(error => {
                    console.log(error);
                    M.toast({ html: 'Error: ' + JSON.stringify(error) });
                });
        }
    }

    handleLogin = (e, data) => {
        e.preventDefault();

        request({
            url: BASE_URL + "/token-auth/",
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(result => {
                localStorage.setItem('token', result.token);
                this.setState({
                    isLoggedIn: true,
                    username: result.user.username
                });
            })
            .catch(error => {
                console.log(error);
                M.toast({ html: 'Error: ' + JSON.stringify(error) });
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

    PublicRoute({ children, ...rest }) {
        return (
            <Route
                {...rest}
                render={({ location }) =>
                    isLoggedIn() && rest.protected
                        ? (<Redirect to={{ pathname: "/", state: { from: location } }} />)
                        : (children)
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
                        <this.PublicRoute path='/sign-in' protected={true}>
                            <LoginForm handleLogin={this.handleLogin} />
                        </this.PublicRoute>
                        <Route path='/'>
                            <Home />
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
