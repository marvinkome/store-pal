/**
 * .app/components/listings/CreditorListing.jsx
 */

import React from 'react';
import { CreditPayment } from '../helpers/Forms.jsx';
import {Modal} from 'react-materialize';

export class CreditorItems extends React.Component{
    render(){
        return(
            <div className="container section">
            <div className="row">   
                <div className="col s12">
                    {this.props.items.length < 1 ? 
                        <div className="col s12 center-align">
                            <p>
                                <b>All debts have been paid</b>
                            </p>
                        </div>:
                        this.props.items.map(item => {
                            const name = item.name;
                            const ammount_owing = item.ammount_owing;
                            const date_purchased = new Date(item.date_purchased).toDateString();
                            const form_data = {
                                creditor_name: this.props.creditor,
                                product_id: item.id
                            }

                            return(
                                <div key={item.id} className="card center grey lighten-5 z-depth-1">
                                    <div className='card-content left-align'>
                                        <span className='card-title'>
                                            {name}
                                        </span>
                                        <span>
                                            Amount Owing: ${ammount_owing}
                                        </span>
                                        <span>
                                            <br/>Date Purchased: {date_purchased}
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
                                                    <button className='btn yellow accent-3 center'>Pay Debts</button>
                                                  }
                                                  actions={
                                                    <div>
                                                        <a className="modal-action modal-close waves-effect waves-yellow btn-flat">Close</a>
                                                    </div>
                                                  }>
                                                        <CreditPayment data={form_data}/>
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
        )
    }
}