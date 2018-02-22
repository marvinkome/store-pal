/**
 * .app/components/Auth.jsx
 */

// React import 
import React from 'react';

// React router
//import {Route, Switch} from 'react-router-dom';

// Components
import LoginForm from '../helpers/Login.jsx';

export class Login extends React.Component{
    constructor(props){
        super(props);

        this.state = {};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e, state){
        console.log(state.email);
    }
    render(){
        return(
            <LoginForm formType='login' onSubmit={this.handleSubmit}/>
        );
    }
}

export class Register extends React.Component{
    constructor(props){
        super(props);

        this.state = {};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e, state){
        console.log(state.email);
    }
    render(){
        return(
            <LoginForm formType='signup' onSubmit={this.handleSubmit}/>
        );
    }
}