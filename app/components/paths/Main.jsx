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
import {
    MainList,
    ProductsList,
    CreditorsList,
    CreditorItemsList,
    ProductSold
} from '../listings';

import Navbar from '../helpers/Navbar.jsx';
import { AddProducts, Searchform } from '../helpers/Forms.jsx';

const mapStateToProps = state => {
    return {
        data: state
    }
};

const mapDispatch = dispatch => {
    return {
        fetch_data : (token, cb) => dispatch(fetch_data(token, cb)),
        fetch_from_local : () => dispatch(fetch_from_store()),
        deleteInventory: (token, inventory, cb) => dispatch(deleteInventory(token, inventory, cb))
    }
}

class ConnectingIndex extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data.products
        }
        this.handleSearch = this.handleSearch.bind(this);
    }
    componentWillReceiveProps(np){
        this.setState({
            data: np.data.products
        });
    }
    handleSearch(data){
        this.setState({
            data: data
        });
    }
    render(){
        const products = this.props.data.products;
        const searched_products = this.state.data;

         return(
            <div>
                <Navbar data={this.props.data}/>
                <Searchform data={products} new_data={this.handleSearch}/>
                <MainList user_data={searched_products}/>
            </div>
        );
    }
}

class ConnectingItems extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data.products
        }
        this.handleSearch = this.handleSearch.bind(this);
    }
    componentWillReceiveProps(np){
        this.setState({
            data: np.data.products
        });
    }
    handleSearch(data){
        this.setState({
            data: data
        })
    }
    render(){
        const products = this.props.data.products;
        const searched_products = this.state.data;

        return(
            <div>
                <Navbar data={this.props.data}/>
                <Searchform data={products} new_data={this.handleSearch}/>
                <ProductsList user_data={searched_products}/>
                <Modal
                    header='Add Product'
                    modalOptions={{
                        opacity: .0
                    }}
                    trigger={
                        <div className='fixed-action-btn action-button'>
                            <a className="btn-floating btn-large yellow darken-1">
                                <i className="fa fa-plus"></i>
                            </a>
                        </div>
                    }
                    actions={
                        <a className="modal-action modal-close waves-effect waves-yellow btn-flat">Close</a>
                    }>
                    <AddProducts/>
                </Modal>
            </div>            
        );
    }
}

class ConnectingCreditors extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data.creditors
        }
        this.handleSearch = this.handleSearch.bind(this);
    }
    componentWillReceiveProps(np){
        this.setState({
            data: np.data.creditors
        });
    }
    handleSearch(data){
        this.setState({
            data: data
        })
    }
    render(){
        const creditors = this.props.data.creditors;
        const searched_creditors = this.state.data;
        return(
            <div>
                <Navbar data={this.props.data}/>
                <Searchform data={creditors} new_data={this.handleSearch}/>
                <CreditorsList user_data={searched_creditors}/>
            </div>
        );
    }
}

class ConnectingCreditorItems extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data.creditors.find(obj => obj.name == this.props.match.params.name).items_owing
        }
        this.handleSearch = this.handleSearch.bind(this);
    }
    componentWillReceiveProps(np){
        this.setState({
            data: np.data.creditors.find(obj => obj.name == this.props.match.params.name).items_owing
        });
    }
    handleSearch(data){
        this.setState({
            data: data
        })
    }
    render(){
        const creditor = this.props.data.creditors.find(obj => obj.name == this.props.match.params.name);
        const searched_item = this.state.data;
        return(
            <div>
                <Navbar data={this.props.data}/>
                <Searchform data={creditor.items_owing} new_data={this.handleSearch}/>
                <div className="container">
                    <h5 className="center-align">
                        {creditor.name.toUpperCase()}
                    </h5>
                </div>
                <CreditorItemsList items={searched_item} creditor={creditor.name}/>
            </div>
        );
    }
}

class ConnectingRegistry extends React.Component{
    render(){
        const data = this.props.data.sold_items;
        return(
            <div>
                <Navbar data={this.props.data}/>
                <ProductSold data={data}/>
            </div>
        )
    }
}

export const Index = connect(mapStateToProps)(ConnectingIndex);
export const Products = connect(mapStateToProps)(ConnectingItems);
export const Creditors = connect(mapStateToProps)(ConnectingCreditors);
export const Creditor = connect(mapStateToProps)(ConnectingCreditorItems);
export const Registry = connect(mapStateToProps)(ConnectingRegistry);
