import React, { Fragment, Component } from 'react';
import Products from '../components/Products';
import Product from '../components/Product';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {addToCard} from '../actions/action' ;
class Products_container extends Component {
    constructor(props) {
        super(props);
    }
    showProducts = (products) => {
        let {cards}=this.props;
        let { onAddToCard }=this.props;
        let result;
        if (products.length > 0) {
            return result = products.map((product, index) => {
                return <Product key={index} 
                    product={product} 
                    index={index} 
                    cards={cards}
                    onAddToCard={onAddToCard}
                    />;
            })
        }
    }
    render() {      
        let { products } = this.props;
        return (
            <Products>
                {this.showProducts(products)}
            </Products>
        )
    }
}
Products_container.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            img: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            inventory: PropTypes.number.isRequired,
            rate: PropTypes.number.isRequired
        })
    ).isRequired
}
const mapStateToProps = (state) => {
    return {
        products: state.products,
        cards: state.cards
    }
}
const mapDispatchToProps = (dispatch,props) => {
    return {
        onAddToCard: (product)=>{
            dispatch(addToCard(product));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Products_container);