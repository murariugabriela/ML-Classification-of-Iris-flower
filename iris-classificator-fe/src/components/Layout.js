import React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu/NavMenu';
import '../custom.css'

export default function Layout(){

        return (
            <div style={{ height: "100%" }}>
                <NavMenu />
                <Container>
                    {this.props.children}
                </Container>
            </div>
        );
}
