import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { Input, Button, Fa, Container } from 'mdbreact'
import { Link } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
const _homePageTitle = [
    {
        title: 'Learn To Code'
    },
    {
        title: 'Get Your Dream Job'
    },
    {
        title: 'Dream Big, Think Big'
    },
    {
        title: 'Code Your Life'
    },
    {
        title: 'Talk Is Cheap, Show Me The Code'
    },
    {
        title: 'Before software can be reusable it first has to be usable'
    }
]
export default class HomePublic extends Component {
    constructor(props) {
        super(props);
    }
    delayShowTitle = () => {
        setTimeout(() => {
            let delayTime = 2000;
            $('[class ^= "home-title"]').each((index) => {
                $(`.home-title-${index + 1}`).fadeIn(delayTime);
                delayTime += 1000;
            })
        }, 500)
    }
    showHomePageTitle = (lists) => {
       let result = lists.map((value,index)=>{
           return <label style={{ display: 'none' }} className={`home-title-${index+1}`} >{value.title}</label>
        })
        return result;
    }
    render() {
        return (
            <Fragment>
                <ReactCSSTransitionGroup transitionName="example"
                    transitionAppear={true} transitionAppearTimeout={500}
                >
                    <div className="home-div">
                        <label className='home-big-title'>It's not a Bug, It's a Feauture</label>
                        {this.showHomePageTitle(_homePageTitle)}
                        {this.delayShowTitle()}
                    </div>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }

}