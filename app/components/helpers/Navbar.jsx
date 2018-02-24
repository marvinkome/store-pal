/**
 * .app/components/helpers/Navbar.jsx
 */

import React from 'react';
import { Link } from 'react-router-dom';
import history from '../../js/history';
import {connect} from 'react-redux';
import { SideNav, SideNavItem } from 'react-materialize';
import { logout_user } from '../../js/actions';

const mapDispatchToProps = dispatch => {
    return {
        logout_user: dispatch(logout_user())
    }
}

class ConnectingNavbar extends React.Component{
    constructor(props){
        super(props);
        this.logoutUser = this.logoutUser.bind(this)
    }
    logoutUser(){
        if(localStorage){
            
            history.push('/login');
        }
    }
    render(){
        return(
            <nav className="yellow darken-1 nav-extended">
                <div className="nav-wrapper">
                    <SideNav
	                    trigger={<a className="button-collapse">
                                    <i className="fa fa-bars"></i>
                                </a>}
	                    options={{ closeOnClick: true }}>
	                    <SideNavItem userView
		                    user={{
			                    background: './app/images/office.jpg',
			                    image: './app/images/yuna.jpg',
			                    name: this.props.data.items.name,
			                    email: this.props.data.items.email
		                    }}
	                    />
	                    <li className="waves-effect waves-yellow">
                            <Link to='/' className='light'>
                                <i className="fa fa-building"></i> Inventories
                            </Link>
                        </li>
	                    <SideNavItem divider />
                        <li className="waves-effect waves-yellow">
                            <a className='light' onClick={this.logoutUser}>
                                <i className="fa fa-sign-out"></i> Logout
                            </a>
                        </li>
                    </SideNav>
                </div>
            </nav>
        );
    }
}

const Navbar = connect(null, mapDispatchToProps)(ConnectingNavbar);

export default Navbar;