/**
 * .app/components/helpers/Listing.jsx
 */

import React from 'react';
import { Modal } from 'react-materialize'
import { Link } from 'react-router-dom';


export default class Listing extends React.Component{
    render(){
        const page = this.props.page;
        const data = this.props.user_data;
        //const inventory = this.props.inventory.find( obj => obj.id == id);
        return(
            <div className="container section">
                <div className="row">
                    <div className="col s12">
                        <h5 className="center-align">
                            {page == 'index' ? 
                              'Your Inventories':
                              data.name}
                        </h5>
                    </div>
    
                    <div className="col s12">
                        {page == 'index'? 
                        <ul className="collection">
                        {data.length < 1 ? 
                            <div className="col s12 center-align">
                                <p>
                                    <b>You haven't created any Inventory click 
                                        button below to create one.
                                    </b>
                                </p>
                            </div>:
                            data.map(inventory => (
                                <li key={inventory.id} className="collection-item avatar">
                                    <i className="circle green fa fa-building"></i>
                                    <Link to={'/inventory/'+ inventory.id}
                                    className='black-text'>
                                        <span className="title">
                                            {inventory.name}
                                        </span>
                                    </Link>
                                    {inventory.products == undefined ?
                                    <p>
                                        <span>Products: 0</span><br/>
                                        <span>
                                            Items out of stocks: 0
                                        </span><br/>
                                    </p>:
                                    <p>
                                        <span>Products: {inventory.products.length}</span><br/>
                                        <span>
                                            Items out of stocks: {inventory.products.filter(prod => prod.quantity < 2).length}
                                        </span><br/>
                                    </p>}
                                    <Modal
                                    header='DELETE INVENTORY'
                                    trigger={
                                        <a className="secondary-content">
                                            <i className="fa fa-2x fa-trash green-text"></i>
                                        </a>
                                    }
                                    actions={
                                        <div>
                                            <a className="modal-action waves-effect waves-yellow btn-flat">Yes</a>
                                            <a className="modal-action modal-close waves-effect waves-yellow btn-flat">No</a>
                                        </div>
                                    }>
                                        <p>Are you sure you want to delet this Inventory?
                                            It can't be undone
                                        </p>
                                    </Modal>
                                </li>
                            ))
                        }
                        </ul>: 
                        <ul className="collection">
                        {this.props.user_data.products.length < 1 ? 
                            <div className="col s12 center-align">
                                <p>
                                    <b>You haven't added any products to this Inventory</b>
                                </p>
                            </div>:
                            this.props.user_data.products.map(product => (
                                <li key={product.id} className="collection-item avatar">
                                    <i className="circle green fa fa-product-hunt"></i>
                                    <span className="title">
                                        {product.name}
                                    </span>
                                    <p>
                                        <span className='light'>Quantity: {product.quantity}</span><br/>
                                        {product.quantity < 2 ? 
                                        <span className="red-text text-accent-2">Out of stock</span>:''}<br/>
                                    </p>
                                    <Modal
                                    header='REMOVE PRODUCT'
                                    trigger={
                                        <a className="secondary-content">
                                            <i className="fa fa-2x fa-trash green-text"></i>
                                        </a>
                                    }
                                    actions={
                                        <div>
                                            <a className="modal-action waves-effect waves-yellow btn-flat">Yes</a>
                                            <a className="modal-action modal-close waves-effect waves-yellow btn-flat">No</a>
                                        </div>
                                    }>
                                        <p>Are you sure you want to remove this Product?
                                            It can't be undone
                                        </p>
                                    </Modal>
                                </li>
                            ))
                        }
                        </ul>}
                    </div>
                </div>
            </div>
        );
    }
}

