import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home/Home';
import { About } from './components/About/About';
import { Contact } from './components/Contact/Contact';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/contact' component={Contact} />
      </Layout>
    );
  }
}
