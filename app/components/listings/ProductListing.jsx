/**
 * .app/components/listings/ProductListing.jsx
 */

import React from 'react';
import { Modal } from 'react-materialize';
import { connect } from 'react-redux';
import { deleteProduct } from '../../js/redux/actions';
import { EditProducts, Searchform  } from '../helpers/Forms.jsx';

const mapDispatchToProps = dispatch => ({
    deleteProduct: id => dispatch(deleteProduct(id)),
});

class ConnectingProductListing extends React.Component{
    constructor(props){
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }
    handleDelete(id){
        this.props.deleteProduct(id);
    }
    render(){
        let data = this.props.user_data;
        return(
            <div className="container section">
                <div className="row">
                    <div className="col s12">
                        {data.length < 1 ? 
                            <div className="col s12 center-align">
                                <p>
                                    <b>No Product here.</b>
                                </p>
                            </div>:
                            data.map(product => {
                                const name = product.name;
                                const quantity = product.quantity;
                                const price = product.price;

                                return(
                                    <div key={product.id} className="card center grey lighten-5 z-depth-1">
                                        <div className='card-content left-align'>
                                            <span className='card-title'>
                                                {name}
                                            </span>
                                            <span>
                                                Price: ${price}<br/>
                                            </span><span>
                                                Quantity: {quantity}
                                            </span>
                                        </div>
                                        <div className='card-action center'>
                                            <div className='row'>
                                                <div className='col s12'>
                                                    <Modal
                                                      header='Edit Product'
                                                      modalOptions={{
                                                        opacity: 0.0
                                                      }}
                                                      trigger={
                                                        <button className='btn yellow accent-3 center'>Edit</button>
                                                      }
                                                      actions={
                                                          <div>
                                                              <Modal
                                                                header='Delete Product'
                                                                modalOptions={{
                                                                    opacity: 0.0
                                                                }}
                                                                trigger={
                                                                    <a className="modal-action modal-close waves-effect waves-yellow btn-flat">Delete</a>
                                                                }
                                                                actions={
                                                                    <div>
                                                                        <a className='modal-action modal-close waves-effect waves-yellow btn-flat'
                                                                            onClick={() => this.handleDelete(product.id)}>Yes</a>
                                                                        <a className='modal-action modal-close waves-effect waves-yellow btn-flat'>No</a>
                                                                    </div>
                                                                }>
                                                                    <p>Are you sure you want to delete this product? It can't be undone</p>
                                                              </Modal>
                                                              <a className="modal-action modal-close waves-effect waves-yellow btn-flat">Close</a>
                                                          </div>
                                                      }>
                                                        <EditProducts product={product} afterEdit={this.afterEdit}/>
                                                    </Modal>
                                                </div>
                                            </div>
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

const ProductListing = connect(null, mapDispatchToProps)(ConnectingProductListing);

export default ProductListing;
