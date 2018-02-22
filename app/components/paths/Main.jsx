/**
 * .app/components/Main.jsx
 */

// React import 
import React from 'react';

// Redux
import {connect} from 'react-redux';

// Materialize
import {Modal} from 'react-materialize';

// Components
import Listing from '../helpers/Listing.jsx';
import Navbar from '../helpers/Navbar.jsx';
import { AddInventory, AddProducts } from '../helpers/Forms.jsx';

const mapStateToProps = state => {
    return {
        data: state.items
    }
};

class ConnectingIndex extends React.Component{
    constructor(props){
        super(props);

        this.state = {};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e, state){
        console.log(state.email);
    }
    render(){
        const inventories = this.props.data.inventories;
        return(
            <div>
                <Navbar/>
                <Listing page='index' user_data={inventories}/>
                <Modal
                    header='Add Inventory'
                    trigger={
                        <div className='fixed-action-btn action-button'>
                            <a className="btn-floating btn-large yellow darken-1">
                                <i className="fa fa-plus"></i>
                            </a>
                        </div>
                    }>
                    <AddInventory/>
                </Modal>
            </div>
        );
    }
}

class ConnectingProducts extends React.Component{
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.afterProdAdd = this.afterProdAdd.bind(this);
        this.style = {}
    }

    handleSubmit(e, state){
        console.log(state.email);
    }

    afterProdAdd(){
        this.forceUpdate();
    }

    render(){
        const id = this.props.match.params.id;
        const inventory = this.props.data.inventories.find(obj => obj.id == id);
        return(
            <div>
                <Navbar/>
                <Listing page='inventory' user_data={inventory}/>
                <Modal
                    header='Add Product'
                    actions={
                        <a className="modal-action modal-close waves-effect waves-yellow btn-flat">Close</a>
                    }
                    trigger={
                        <div className='fixed-action-btn action-button'>
                            <a className="btn-floating btn-large yellow darken-1">
                                <i className="fa fa-plus"></i>
                            </a>
                        </div>
                    }>
                    <AddProducts inv_id={id} afterProdAdd={this.afterProdAdd}/>
                </Modal>
            </div>
        );
    }
}

export const Index = connect(mapStateToProps)(ConnectingIndex);
export const Products = connect(mapStateToProps)(ConnectingProducts);