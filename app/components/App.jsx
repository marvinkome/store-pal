/**
 * .app/components/App.jsx
 */

// React import 
import React from 'react';

// React router
import {Route, Switch} from 'react-router-dom';

// Components
import {Register, Login} from './paths/Auth.jsx';
import { Index, Products } from './paths/Main.jsx';

export default class App extends React.Component{
    render(){
        return(
            <Switch>
                <Route path='/register' exact component={Register}/>
                <Route path='/login' exact component={Login}/>
                <Route path='/' exact component={Index}/>
                <Route path='/inventory/:id' exact component={Products}/>
            </Switch>
        );
    }
}