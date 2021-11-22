import React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export default function NavMenu (){



        // this.toggleNavbar = this.toggleNavbar.bind(this);
        // this.state = {
        //     collapsed: true
        // };
        //
        // this.setState({
        //     collapsed: !this.state.collapsed
        // });
    

        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 navBarItem" dark>
                    <Container>
                        <NavbarBrand tag={Link} to="/">Iris_Classification</NavbarBrand>
                        <NavbarToggler 
                            //onClick={this.toggleNavbar} 
                            className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={true} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/about">About</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/contact">Contact</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
}