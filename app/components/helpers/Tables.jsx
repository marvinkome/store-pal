/**
 * .app/components/helpers/Tables.jsx
 */

import React from 'react';

export class ProductSoldTables extends React.Component{
    render(){
        return(
            <div className='section'>
                {this.props.data.length < 1 ? 
                <h5>No data yet in the registry</h5>:
                <table className='striped centered'>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                            <th>Change</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                    {this.props.data.map((item, index) => {
                        const item_name = item.product_name;
                        const quantity = item.quantity_sold;
                        const amount = item.ammount_paid;
                        const change = item.change_remaining;
                        const date = new Date(item.date_sold).toDateString();

                        return(<tr key={index}>
                            <td>{item_name}</td>
                            <td>{quantity}</td>
                            <td>${amount}</td>
                            <td>${change}</td>
                            <td>{date}</td>
                        </tr>);
                    })}
                    </tbody>
                </table>}
            </div>
        );
    }
}

export class ProductSoldCreditTables extends React.Component{
    render(){
        return(
            <div className='section'>
                {this.props.data.length < 1 ? 
                <h5>No data yet in the registry</h5>:
                <table className='striped centered'>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Creditor</th>
                            <th>Owing</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                    {this.props.data.map((item, index) => {
                        const item_name = item.product_name;
                        const quantity = item.quantity_sold;
                        const creditor = item.creditor_name;
                        const owing = item.ammount_owing;
                        const date = new Date(item.date_sold).toDateString();

                        return(
                        <tr key={index}>
                            <td>{item_name}</td>
                            <td>{quantity}</td>
                            <td>{creditor}</td>
                            <td>${owing}</td>
                            <td>{date}</td>
                        </tr>);
                    })}
                    </tbody>
                </table>}
            </div>
        );
    }
}