import React,{ Fragment, Component } from 'react'
import { connect } from 'react-redux'
import Index from '../components/index.jsx'
import * as action from '../actions/action'
import * as ActionAPI from '../actions/action_api';
class IndexContainer extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        let { user_info } = this.props;
        return(
            <Fragment>
                <Index
                    user_info={user_info}
                    />
            </Fragment>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        user_info: state.user_info
    }
}
const mapDispatchToProp = (dispatch,props) => {
    return {
        actFetchDataApiReques: ()=>{
            dispatch(ActionAPI.actFetchDataApiReques())
        }
    }
}
export default connect(mapStateToProps,null)(IndexContainer);