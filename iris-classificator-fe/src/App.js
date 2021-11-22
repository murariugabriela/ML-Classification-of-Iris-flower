import React from 'react';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import HomeIcon from '@mui/icons-material/Home';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import InfoIcon from '@mui/icons-material/Info';
import './custom.css'
import {Container} from "reactstrap";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

export default function App() {
    const [value, setValue] = React.useState(0);
    return (
        <div style={{height: "100%"}}>
            <Container>
                <Router>
                    <div>
                        <BottomNavigation
                            showLabels
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        >
                            <BottomNavigationAction component={Link} to='/' label="Home" icon={<HomeIcon/>}/>
                            <BottomNavigationAction component={Link} to='/contact' label="Contact" icon={<ContactPageIcon/>}/>
                            <BottomNavigationAction component={Link} to='/about' label="About" icon={<InfoIcon/>}/>
                        </BottomNavigation>
                        <Switch>
                            <Route exact path='/'> <Home/> </Route>
                            <Route path='/about'><About/></Route>
                            <Route path='/contact'><Contact/></Route>
                        </Switch>
                    </div>
                </Router>
            </Container>
        </div>
    );
}

