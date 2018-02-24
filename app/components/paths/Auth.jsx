/**
 * .app/components/Auth.jsx
 */

// React import 
import React from 'react';

// Router
import history from '../../js/history';

// Redux
import {connect} from 'react-redux';
import { register_user, login_user } from '../../js/actions';

// Components
import LoginForm from '../helpers/Login.jsx';

const mapDispatchToProps = dispatch => {
    return {
        register_user: user_data => dispatch(register_user(user_data)),
        login_user: user_data => dispatch(login_user(user_data))
    }
};

const mapStateToProps = state => {
    return {
        state: state
    }
};

class ConnectingLogin extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e, state){
        this.props.login_user(state).then(
            (res) => {
                this.forceUpdate();
                if(localStorage.loggedIn){
                    history.push('/')
                }
            }
        );
        this.forceUpdate();
    }
    render(){
        const isLoggingIn = this.props.state.isLoggingIn;
        return(
            <LoginForm formType='login' onSubmit={this.handleSubmit}
              state={isLoggingIn}/>
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
                if(localStorage.loggedIn){
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
export const Login = connect(mapStateToProps, mapDispatchToProps)(ConnectingLogin);
