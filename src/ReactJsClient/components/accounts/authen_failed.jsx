import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { callApi } from '../../utils/api_caller';
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group'
const style = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
}
export default class Authen_Failed extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let token = localStorage.getItem('token');
        if(token != null){
            return <Redirect to='/index' />
        }
        return (
            <Fragment>
                <ReactCSSTransitionGroup transitionName="example"
                    transitionAppear={true} transitionAppearTimeout={500}
                >
                    <div className="home-div">
                    <div className="col s12" style={style}>
                        <img src="https://www.mediware.com/wp-content/uploads/Untitled-1.png" className="verify_img" style={{
                            width: '30%',
                            opacity: '.8'
                        }} />
                        <h4 style={{color: 'white',fontWeight: 'bold'}}>Authentication failed. You don't have permission to access</h4>
                    </div>
                    </div>
                </ReactCSSTransitionGroup>
            </Fragment >
        )
    }

}