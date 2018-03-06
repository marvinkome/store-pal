/**
 * .app/components/listings/RegistryListing.jsx
 */

import React from 'react';
import { Tabs, Tab } from 'react-materialize';
import { ProductSoldTables, ProductSoldCreditTables } from '../helpers/Tables.jsx';

export class ProductSoldRegister extends React.Component{
    render(){
        const sold_data = this.props.data.filter(item => item.on_credit == false);
        const credit_data = this.props.data.filter(item => item.on_credit == true);
        return(
            <div className='section'>
                <Tabs className='black-text'>
                    <Tab title='Product Sold' active>
                        <ProductSoldTables data={sold_data}/>
                    </Tab>
                    <Tab title='Product Sold On Credit'>
                        <ProductSoldCreditTables data={credit_data}/>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}
