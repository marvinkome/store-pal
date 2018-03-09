/**
 * .app/components/helpers/Forms.jsx
 */

// React import 
import React from 'react';

// Router
import history from '../../js/history';

// Redux
import { connect } from 'react-redux';
import { addProduct, editProduct, productSold, creditPaid } from '../../js/redux/actions';

const mapProdDispatchToProps = dispatch => {
    return {
        addProducts: (product) => dispatch(addProduct(product)),
        editProduct: (product, id) => dispatch(editProduct(product, id)),
        productSold: (id, sale_data) => dispatch(productSold(id, sale_data)),
        creditPaid: (payment_data) => dispatch(creditPaid(payment_data))
    }
};

class AddProductToConnect extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            product_name: '',
            product_price: '',
            product_quantity: '',
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
        const {product_name, product_quantity, product_price} = this.state;

        if ( product_name == '' ){
            history.push('/');
            return;
        }

        this.props.addProducts({
            name: product_name.toLowerCase(),
            quantity: Number(product_quantity),
            price: Number(product_price),
        });

        this.setState({
            product_name: '',
            product_price: '',
            product_quantity: ''
        })
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit} className="row center">
                <div className="col s12 input-field">
                    <label htmlFor="product_name">Product Name </label>
                    <input type="text" id="product_name" required
                      onChange={this.handleChange} value={this.state.product_name}/>
                </div>
                <div className="col s12 input-field">
                    <label htmlFor="product_price">Price</label>
                    <input type="number" id="product_price" min='0' required
                      onChange={this.handleChange} value={this.state.product_price}/>
                </div>
                <div className="col s12 input-field">
                    <label htmlFor="product_quantity">Quantity</label>
                    <input type="number" id="product_quantity" min='0' required
                      onChange={this.handleChange} value={this.state.product_quantity}/>
                </div>
                <button type='submit' className="modal-close btn waves-effect waves-dark yellow">
                    Add
                </button>
            </form>
        );
    }
}

class EditProductToConnect extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            product_name: this.props.product.name,
            product_price: this.props.product.price,
            product_quantity: this.props.product.quantity
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillReceiveProps(np){
        this.setState({
            product_name: np.product.name,
            product_price: np.product.price,
            product_quantity: np.product.quantity
        });
    }
    handleChange(e){
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    handleSubmit(e){
        e.preventDefault();
        const {product_name, product_price, product_quantity} = this.state;
        const id = this.props.product.id;

        this.props.editProduct({
            name: product_name.toLowerCase(),
            price: Number(product_price),
            quantity: Number(product_quantity)
        }, id);
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit} className="row center">
                <div className="col s12 input-field">
                    <label htmlFor="product_name">Product Name </label>
                    <input type="text" id="product_name" required
                      onChange={this.handleChange} value={this.state.product_name}/>
                </div>
                <div className="col s12 input-field">
                    <label htmlFor="product_price">Price</label>
                    <input type="number" id="product_price" min='0' required
                      onChange={this.handleChange} value={this.state.product_price}/>
                </div>
                <div className="col s12 input-field">
                    <label htmlFor="product_price">Quantity</label>
                    <input type="number" id="product_quantity" min='0' required
                      onChange={this.handleChange} value={this.state.product_quantity}/>
                </div>
                <button type='submit' className="modal-close btn waves-effect waves-dark yellow">
                    EDIT
                </button>
            </form>
        );
    }
}

class SoldProductToConnect extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            ammount_paid: this.props.product.price,
            quantity_sold: 1,
            will_be_credit: false,
            creditor_name: '',
            required_amount: this.props.product.price
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }
    handleChange(e){
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value
        });
        
        if(e.target.id == 'ammount_paid' || e.target.id == 'quantity_sold'){
            if( e.target.id == 'quantity_sold'){
                this.setState({
                    required_amount: this.props.product.price * Number(e.target.value)
                });
            }
        }
    }
    handleCheck(e){
        this.setState({
            [e.target.id]: e.target.checked
        });
    }
    handleSubmit(e){
        e.preventDefault();

        let {quantity_sold, ammount_paid, will_be_credit, creditor_name, required_amount} = this.state;
        const id = this.props.product.id;
        const date_sold = Date.now();
        const on_credit = will_be_credit;
        let ammount_owing = (Number(this.props.product.price) - Number(ammount_paid)) * Number(quantity_sold);
        let change_remaining = Number(ammount_paid) - Number(required_amount);

        if (!on_credit){
            creditor_name = '';
            ammount_owing =  0;
        } else {
            change_remaining = 0;
        }

        this.props.productSold(id, {
            product_name: this.props.product.name,
            quantity_sold: Number(quantity_sold),
            ammount_paid: Number(ammount_paid) * Number(quantity_sold),
            date_sold,
            change_remaining,
            on_credit,
            creditor_name: creditor_name.toLowerCase(),
            ammount_owing
        });

        this.setState({
            ammount_paid: this.props.product.price,
            quantity_sold: 1,
            will_be_credit: false,
            creditor_name: '',
            required_amount: this.props.product.price
        })
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit} className="row center">
                <div className="col s12 input-field">
                    <label htmlFor="quantity_sold">Quantity Sold </label>
                    <input type="number" id="quantity_sold" min='0'
                      onChange={this.handleChange} value={this.state.quantity_sold}/>
                </div>
                <div className="col s12 input-field">
                    <label htmlFor="ammount_paid">Ammount Paid </label>
                    <input type="number" id="ammount_paid"min='0'
                      onChange={this.handleChange} value={this.state.ammount_paid}/>
                </div>
                {Number(this.state.ammount_paid) < Number(this.state.required_amount) &&
                <div>
                    <div className="col s12">
                        <input type="checkbox" id="will_be_credit" onChange={this.handleCheck}
                          checked={this.state.will_be_credit}/>
                        <label htmlFor="will_be_credit"> This transaction will be marked as credit  </label>
                    </div>
                    {this.state.will_be_credit && 
                    <div className="col s12 input-field">
                        <label htmlFor="creditor_name">Creditor Name </label>
                        <input type="text" id="creditor_name" onChange={this.handleChange}
                          value={this.state.creditor_name} required/>
                    </div>}
                </div>}
                <br/><br/>

                <button type='submit' className="modal-close btn waves-effect waves-dark yellow darken-1">
                    PROCESS
                </button>
            </form>
        );
    }
}

class CreditPaymentFormToConnect extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            ammount_paid: 0,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){
        e.preventDefault();
        this.setState({
            [e.target.id]: Number(e.target.value)
        });
    }
    handleSubmit(e){
        e.preventDefault();
        const {creditor_name, product_id} = this.props.data;
        const {ammount_paid} = this.state;

        this.props.creditPaid({
            creditor_name,
            product_id,
            ammount_paid
        });
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit} className="row center">
                <div className="col s12 input-field">
                    <label htmlFor="ammount_paid">Amount Paid </label>
                    <input type="number" id="ammount_paid" min='0'
                      onChange={this.handleChange}/>
                </div>
                <button type='submit' className="modal-close btn waves-effect waves-dark yellow">
                    PROCESS
                </button>
            </form>
        );
    }
}

export class Searchform extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            query: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        this.setState({
            query: e.target.value
        });
        const query = e.target.value.toLowerCase();
        const data = this.props.data;
        console.log(query);
        const new_data = data.filter((obj) => {
            let resp = obj.name.indexOf(query) == 0;
            const log = obj.name + ' matches ' + query + '? ' + resp;
            console.log(log)
            return resp}
        );

        this.props.new_data(new_data);
    }
    render(){
        return(
            <div className="container">
                <h5 className="center-align">
                    <form className="row center">
                        <div className="col s12 input-field">
                            <label htmlFor="search_product">Search.... </label>
                            <input type="text" id="search_product" onChange={this.handleChange}/>
                        </div> 
                    </form>
                </h5>
            </div>
        );
    }
}

export const AddProducts = connect(null, mapProdDispatchToProps)(AddProductToConnect);
export const EditProducts = connect(null, mapProdDispatchToProps)(EditProductToConnect);
export const SoldProduct = connect(null, mapProdDispatchToProps)(SoldProductToConnect);
export const CreditPayment = connect(null, mapProdDispatchToProps)(CreditPaymentFormToConnect);