import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div>
                <h2>Hellooooo</h2>

                <p>The <code>ClientApp</code> subdirectory is a standard React application based on the <code>create-react-app</code> template. If you open a command prompt in that directory, you can run <code>npm</code> commands such as <code>npm test</code> or <code>npm install</code>.</p>
            </div>
        );
    }
}
