import React, { Component } from 'react';
import { Navbar, NavItem } from 'react-materialize';


class Menu extends Component {
    render() {
        const isLoggedIn = this.props.isLoggedIn;

        if (isLoggedIn) {
            return (
                <Navbar alignLinks='right' className='light-blue darken-2'>
                    <NavItem href='/'>Home</NavItem>
                    <NavItem href='/cameras'>Cameras</NavItem>
                    <NavItem href='/statistic'>Statistic</NavItem>
                    <NavItem onClick={this.props.handleLogout}>Log Out</NavItem>
                </Navbar>
            );
        } else {
            return (
                <Navbar alignLinks='right' className='light-blue darken-2'>
                    <NavItem href="/">Home</NavItem>
                    <NavItem href='/sign-in'>Sign In</NavItem>
                </Navbar>
            );
        }
    }
}

export default Menu;