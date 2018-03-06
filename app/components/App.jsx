/**
 * .app/components/App.jsx
 */

// React import 
import React from 'react';

// React router
import {Route, Switch} from 'react-router-dom';

// Components
import { Index, Products, Creditors, Creditor, Registry } from './paths/Main.jsx';

export default class App extends React.Component{
    render(){
        return(
            <Switch>
                <Route path='/' exact component={Index}/>
                <Route path='/products' exact component={Products}/> 
                <Route path='/creditors' exact component={Creditors}/>
                <Route path='/creditor/:name' exact component={Creditor}/>  
                <Route path='/registry' exact component={Registry}/>  
            </Switch>
        );
    }
}