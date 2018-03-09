/**
 * .app/components/helpers/Navbar.jsx
 */

import React from 'react';
import { Link } from 'react-router-dom';
import history from '../../js/history';
import {connect} from 'react-redux';
import { SideNav, SideNavItem } from 'react-materialize';
import { logout_user } from '../../js/redux/actions';

const mapDispatchToProps = dispatch => {
    return {
        logout_user: () => dispatch(logout_user())
    }
}

class ConnectingNavbar extends React.Component{
    constructor(props){
        super(props);
        this.logoutUser = this.logoutUser.bind(this)
    }
    logoutUser(){
        console.log('sturborn z')
        this.props.logout_user()
    }
    render(){
        const name = this.props.data.name;
        const email = this.props.data.email;
        const product_length = this.props.data.products.length;
        const creditors_length = this.props.data.creditors.length;
        const items_out_of_stock = this.props.data.products.filter(item => item.quantity < 1).length;

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
			                    name: name,
			                    email: email
		                    }}
	                    />
	                    <li className="waves-effect waves-yellow">
                            <Link to='/'>
                                <i className="fa fa-home yellow-text"></i> Home 
                            </Link>
                        </li>
                        <li className="waves-effect waves-yellow">
                            <Link to='/products'>
                                <i className="fa fa-shopping-basket yellow-text"></i> Products
                                <span className='badge'>{product_length}</span>
                            </Link>
                        </li>
                        <li className="waves-effect waves-yellow">
                            <Link to='/creditors'>
                                <i className="fa fa-user yellow-text"></i>Creditors
                                <span className='badge'>{creditors_length}</span>
                            </Link>
                        </li>
                        <li className="waves-effect waves-yellow">
                            <Link to='/registry'>
                                <i className="fa fa-book yellow-text"></i>Registry
                            </Link>
                        </li>
	                    <SideNavItem divider />
                        <li className="waves-effect waves-yellow">
                            <a className='light' onClick={this.logoutUser}>
                                <i className="fa fa-sign-out"></i> Logout
                            </a>
                        </li>
                    </SideNav>

                    <ul className="right hide-on-med-and-above">
                        <li><a className='white-text'>Items out of stock 
                            <span className='badge red accent-2 white-text'>{items_out_of_stock}</span>
                        </a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}
