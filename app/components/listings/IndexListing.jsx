/**
 * .app/components/listings/IndexListing.jsx
 */

import React from 'react';
import { Modal } from 'react-materialize';
import { SoldProduct } from '../helpers/Forms.jsx';

export default class Listing extends React.Component{
    render(){
        const data = this.props.user_data;
        return(
            <div className="container section">
                <div className="row">   
                    <div className="col s12">
                        {this.props.user_data.length < 1 ? 
                            <div className="col s12 center-align">
                                <p>
                                    <b>You haven't added any product yet</b>
                                </p>
                            </div>:
                            this.props.user_data.map(product => {
                                const name = product.name;
                                const quantity = product.quantity;

                                return(
                                    <div key={product.id} className="card center grey lighten-5 z-depth-1">
                                        <div className='card-content left-align'>
                                            <span className='card-title'>
                                                {name}
                                            </span>
                                            <span>
                                                Items remaining: {quantity}
                                            </span>
                                            {quantity < 1 ? 
                                            <b className='red-text accent-5'>
                                                <br/>Out of stock
                                            </b>: ''}
                                        </div>
                                        <div className='card-action center'>
                                            {quantity > 0 ? 
                                            <div className='row'>
                                                <div className='col s12'>
                                                    <Modal
                                                      header='Product Sold'
                                                      modalOptions={{
                                                        opacity: .0
                                                      }}
                                                      trigger={
                                                        <button className='btn yellow accent-3 center'>Sold</button>
                                                      }
                                                      actions={
                                                        <a className='modal-action modal-close waves-effect waves-yellow btn-flat'>Close</a>
                                                      }>
                                                        <SoldProduct product={product}/>
                                                    </Modal>
                                                </div>
                                            </div>:
                                            <div className='row'>
                                                <div className='col s12'>
                                                    <button className='btn yellow accent-3 center disabled'>Sold</button>
                                                </div>
                                            </div>}
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}
