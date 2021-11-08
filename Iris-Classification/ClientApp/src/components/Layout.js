import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu/NavMenu';
import '../custom.css'

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        
        return (
            <div style={{ height: "100%" }}>
                <NavMenu />
                <Container>
                    {this.props.children}
                </Container>
                {/*<div className="flowers">*/}
                {/*    <img src="./iris1.svg" alt="iris1" className="flower" />*/}
                {/*</div>*/}
            </div>
        );
    }
}
