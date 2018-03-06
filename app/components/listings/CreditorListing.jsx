/**
 * .app/components/listings/CreditorListing.jsx
 */

import React from 'react';
import history from '../../js/history';

export default class CreditorListing extends React.Component{

    render(){
        let data = this.props.user_data;

        return(
            <div className="container section">
                <div className="row">
                    <div className="col s12">
                        {data.length < 1 ? 
                            <div className="col s12 center-align">
                                <p>
                                    <b>No Creditors here.</b>
                                </p>
                            </div>:
                            data.map(creditor => {
                                const name = creditor.name;
                                const total_ammount_owing = creditor.total_ammount_owing;
                                const items_owing = creditor.items_owing;

                                return(
                                    <div key={name} className="card center grey lighten-5 z-depth-1">
                                        <div className='card-content left-align'>
                                            <span className='card-title'>
                                                {name}
                                            </span>
                                            <span className='bold'>
                                                Amount Owing: ${total_ammount_owing}<br/>
                                            </span><span className='bold'>
                                                No. of items owing: {items_owing.length}
                                            </span>
                                        </div>
                                        <div className='card-action center'>
                                            <div className='row'>
                                                <div className='col s12'>
                                                    <button className='btn yellow accent-3 center'
                                                      onClick={() => history.push('/creditor/'+name)}>
                                                        View Items Owing
                                                    </button>
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
