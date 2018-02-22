/**
 * .app/components/helpers/Navbar.jsx
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { SideNav, SideNavItem } from 'react-materialize';

export default class Navbar extends React.Component{
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
			                    name: 'John Doe',
			                    email: 'jdandturk@gmail.com'
		                    }}
	                    />
	                    <li className="waves-effect waves-yellow">
                            <Link to='/' className='light'>
                                <i className="fa fa-building"></i> Inventories
                            </Link>
                        </li>
	                    <SideNavItem divider />
                    </SideNav>
                </div>
            </nav>
        );
    }
}