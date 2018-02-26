/**
 * .app/components/helpers/Forms.jsx
 */

// React import 
import React from 'react';

// Router
import history from '../../js/history';

// Redux
import { connect } from 'react-redux';
import { addInventory, addProduct } from '../../js/redux/actions';

const mapInvDispatchToProps = dispatch => {
    return {
        addInventory: (token, inventory, cb) => dispatch(addInventory(token, inventory, cb))
    }
};
const mapProdDispatchToProps = dispatch => {
    return {
        addProducts: (product, inv_id) => dispatch(addProduct(product, inv_id))
    }
};

class AddInventoryToConnect extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            inventory_name: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit(e){
        e.preventDefault();
        const {inventory_name} = this.state;
        const id = 3

        if ( inventory_name == '' ){
            history.push('/');
            return;
        }

        this.props.addInventory(localStorage.token, inventory_name, () => {
            this.props.afterInvAdd();
        });
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit} className="row center">
                <div className="col s12 input-field">
                    <label htmlFor="inventory_name">Inventory Name </label>
                    <input type="text" id="inventory_name" 
                      onChange={this.handleChange}/>
                </div>
                <button type='submit' className="btn modal-close waves-effect waves-dark yellow">
                    Add
                </button>
            </form>
        );
    }
}

export class AddProductToConnect extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            product_name: '',
            product_quantity: 0
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit(e){
        e.preventDefault();
        const {product_name, product_quantity} = this.state;

        if ( product_name == '' ){
            history.push('/inventory/'+this.props.inv_id);
            return;
        }

        this.props.addProducts({
            id: 3,
            name: product_name,
            quantity: product_quantity
        }, this.props.inv_id);

        console.log('Added in component');
        
        this.props.afterProdAdd();
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit} className="row center">
                <div className="col s12 input-field">
                    <label htmlFor="product_name">Product Name </label>
                    <input type="text" id="product_name"
                      onChange={this.handleChange}/>
                </div>
                <div className="col s12 input-field">
                    <label htmlFor="product_quantity">Quantity</label>
                    <input type="number" id="product_quantity"
                      onChange={this.handleChange}/>
                </div>
                <button type='submit' className="modal-close btn waves-effect waves-dark yellow">
                    Add
                </button>
            </form>
        );
    }
}

export const AddInventory = connect(null, mapInvDispatchToProps)(AddInventoryToConnect);
export const AddProducts = connect(null, mapProdDispatchToProps)(AddProductToConnect);
