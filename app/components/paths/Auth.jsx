/**
 * .app/components/Auth.jsx
 */

// React import 
import React from 'react';

// Router
import history from '../../js/history';

// Redux
import {connect} from 'react-redux';
import { register_user } from '../../js/actions';

// Components
import LoginForm from '../helpers/Login.jsx';

const mapDispatchToProps = dispatch => {
    return {
        register_user: user_data => dispatch(register_user(user_data))
    }
};

const mapStateToProps = state => {
    return {
        state: state
    }
};

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

class ConnectingRegister extends React.Component{
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e, data){
        this.props.register_user(data).then(
            (res) => {
                this.forceUpdate();
                if(this.props.state.loggedIn){
                    history.push('/')
                }
            }
        );
        this.forceUpdate();
    }

    render(){
        const isLoggingIn = this.props.state.isLoggingIn;

        return(
            <LoginForm formType='signup' onSubmit={this.handleSubmit} 
              state={isLoggingIn}/>
        );
    }
}

export const Register = connect(mapStateToProps, mapDispatchToProps)(ConnectingRegister);