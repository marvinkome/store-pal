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
import history from '../../js/history';
import { fetch_data, fetch_from_store, deleteInventory } from '../../js/actions';

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
            isLoaded: false,
        }
        this.afterInvAdd = this.afterInvAdd.bind(this);
        this.onDeleteItem = this.onDeleteItem.bind(this);
    }
    componentWillMount(){
        if (localStorage.getItem('loggedIn') == undefined){
            history.push('/login')
        } 
    }
    componentDidMount(){
        if(localStorage.state){
            this.props.fetch_from_local();
            this.setState({
                isLoaded: true
            });
        } else {
            this.props.fetch_data(localStorage.token, () => {
                this.setState({
                    isLoaded: true
                });
                console.log('updated')
            })
        }
        console.log('component did mount'); 
    }
    onDeleteItem(id){
        const token = localStorage.token
        console.log('about to delete')

        this.props.deleteInventory(token, id, () => {
            this.forceUpdate();
        })
    }
    afterInvAdd(){
        this.forceUpdate();
    }
    render(){
        console.log(this.props.data);
        const inventories = this.props.data.items.inventories;
        return(
            <div>
                <Navbar data={this.props.data.items}/>
                {this.state.isLoaded ? 
                    <Listing page='index' user_data={inventories} onDelete={this.onDeleteItem}/>:
                    <div className='center'>
                        <div className="preloader-wrapper center-align big active">
                            <div className="spinner-layer spinner-yellow-only">
                                <div className="circle-clipper left">
                                    <div className="circle"></div>
                                </div><div className="gap-patch">
                                    <div className="circle"></div>
                                </div><div className="circle-clipper right">
                                    <div className="circle"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <Modal
                    header='Add Inventory'
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
                    <AddInventory afterInvAdd={this.afterInvAdd}/>
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
    componentWillMount(){
        if (localStorage.getItem('loggedIn') == undefined){
            history.push('/login')
        }
    }
    handleSubmit(e, state){
        console.log(state.email);
    }
    afterProdAdd(){
        this.forceUpdate();
    }
    render(){
        const id = this.props.match.params.id;
        const inventory = this.props.data.items.inventories.find(obj => obj.id == id);
        return(
            <div>
                <Navbar data={this.props.data}/>
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

export const Index = connect(mapStateToProps,mapDispatch)(ConnectingIndex);
export const Products = connect(mapStateToProps)(ConnectingProducts);
