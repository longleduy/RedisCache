import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Admin from '../components/Admin';
import { saveCard } from '../actions/action';
import { actFetchDataApiReques, actDelCardReques } from '../actions/actionAPI';
class Admin_container extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        let { products, saveCard, actFetchDataApiReques,actDelCardReques } = this.props;
        return (
            <Fragment>
                <Admin 
                    products={products} 
                    saveCard={saveCard} 
                    actFetchDataApiReques={actFetchDataApiReques}
                    onDel={actDelCardReques} />
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        saveCard: (obj) => {
            dispatch(saveCard(obj))
        },
        actFetchDataApiReques: () => {
            dispatch(actFetchDataApiReques())
        },
        actDelCardReques: (id) => {
            dispatch(actDelCardReques(id));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Admin_container);