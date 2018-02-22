/**
 * .app/components/helpers/Login.jsx
 */

import React from 'react';
import {Link} from 'react-router-dom';

export default class LoginForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: '',
            name: '',
            password: ''
        }

        this.handleForm = this.handleForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleForm(e){
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.onSubmit(e, this.state);
    }

    render(){
        let login = true;

        if (this.props.formType == 'signup'){
            login = false;
        }

        const {email, name, password} = this.state;
        let password_valid = false;

        if (password.length > 5){
            password_valid = true;
        }

        const error_msg = 'Password should be more than 5 characters long'

        return(
                <div className="container">
                    <div className="center">
                        <h2 className="thin">Store Pal</h2>
                        <p>{ login ? 
                            'Log in to your account':
                            'Sign up to get started'
                        }</p>
                    </div>

                    <div className="section center">
                    <div className="row"> 
                        {login ? '':
                        <div className="card left-align">
                            <div className="card-content">
                                <p>Note: {error_msg}</p>
                            </div>
                        </div>}                                                       
                        <div className="col s12">
                            { login ? 
                            <form className="row">
                                <div className="col s12 input-field">
                                    <label htmlFor="email">Email </label>
                                    <input type="email" className="validate" id="email"/>
                                </div>
                                <div className="input-field col s12">
                                    <label htmlFor="password"> Password </label>
                                    <input type="password" className="validate" id="password"/>
                                </div>
                                <button className="btn waves-effect waves-dark yellow">
                                    Log In
                                </button>
                            </form>:
                            <form onSubmit={this.handleSubmit} className="row">
                                <div className="col s12 input-field">
                                    <label htmlFor="email">Email </label>
                                    <input type="email" className="validate" id="email" 
                                        onChange={this.handleForm} required/>
                                </div>
                                <div className="col s12 input-field">
                                    <label htmlFor="name">Full Name </label>
                                    <input type="text" id="name" onChange={this.handleForm} required/>
                                </div>
                                <div className="input-field col s12">
                                    <label htmlFor="password"> Password </label>
                                    <input type="password" className={password_valid?'valid':'invalid'} 
                                        id="password" required onChange={this.handleForm}
                                        data-error={error_msg}/>
                                </div>
                                <button className={password_valid?'btn waves-effect waves-dark yellow':
                                    "btn waves-effect waves-dark yellow disabled"}>
                                    Sign Up
                                </button>
                            </form>}   
                        </div>

                        {login ? '':
                        <p>By signing up you accept the <a href="#!">Terms and conditions</a></p>}

                        {login ?
                        <div className="col s12">
                            <p> Don't have a account? <Link to='/register'>Register</Link></p>
                        </div>:
                        <div className="col s12">
                            <p> Have an account?<Link to='/login'>Login</Link></p>
                        </div>}
                    </div>
                    </div>
                </div>
        );
    }
}