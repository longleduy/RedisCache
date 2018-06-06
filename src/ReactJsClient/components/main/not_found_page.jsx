import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
//Todo: Component

//Todo: Untils

export default class NotFoundPage extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <ReactCSSTransitionGroup transitionName="example"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
            >
                <div className="home-div">
                    <label className='not-found-big-title'>404</label>
                    <label className='not-found-small-title'>Page Not Found</label>
                </div>
            </ReactCSSTransitionGroup>
        )
    }

}