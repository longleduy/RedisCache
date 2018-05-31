import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { Input, Button, Fa } from 'mdbreact'
import { callApi } from '../../utils/api_caller'
import {Link} from 'react-router-dom'
import jwt from 'jsonwebtoken'
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group'
import * as Common from '../../utils/common'
export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sign_info: {
                email: 'longldseatchit@gmail.com',
                pass_word: 'longkhanh',
                re_pass_word: 'longkhanh'
            },
            status: ''
        }
    }
    validateForm = () => {
        let { email, pass_word, re_pass_word } = this.state.sign_info;
        if (email != '' && pass_word != '' && re_pass_word != '' && this.onValidPassWord() == true) {
            return true;
        }
        else{
            return false;
        }
    }
    onChange = (e) => {
        let _name = e.target.name;
        let _value = e.target.value;
        this.setState({
            sign_info: {
                ...this.state.sign_info,
                [_name]: _value
            }
        })
    }
    cleanError = (e) => {
        if ($(e.target).val() != '') {
            this.setState({
                status: ''
            });
            let _text_label = $(e.target).attr('id') == 'email'?'Email address':'Pass word';
            $(e.target).next('label').removeClass('err_label').text(_text_label);
        }
    }
    onSignIn = (e) => {
        e.preventDefault();
        callApi('user/sign_in','POST',this.state.sign_info)
            .then(res => {
                if (res.status != 200) {
                    this.setState({
                        status: 'error'
                    });
                    $(`#${res.data.detail}`).next('label').addClass('err_label').text(res.data.message);
                    return false;
                }
                else {
                    Common.setItemLocalStorage('token', res.data.token);
                    let infoUser = jwt.decode(res.data.token);
                    this.props.signInSucess(infoUser);
                    this.setState({
                        status: 'success'
                    });                
                    return true;
                }
            })
    }
    onValidPassWord = () => {
        let _pass_word = this.state.sign_info.pass_word;
        let _re_pass_word = this.state.sign_info.re_pass_word;
        if (_pass_word != '' || _re_pass_word != '') {
            if (_pass_word != _re_pass_word) {
                $('#pass_word').removeClass('success-input').addClass('error-input');
                $('#re_pass_word').removeClass('success-input').addClass('error-input');
                return false;
            }
            else {
                $('#pass_word').removeClass('error-input').addClass('success-input');
                $('#re_pass_word').removeClass('error-input').addClass('success-input');
                return true;
            }
        }
        else {
            $('#re_pass_word').removeClass('error-input success-input');
            return true;
        }
    }
    render() {
        let { email, pass_word, re_pass_word} = this.state.sign_info;
        let { status } = this.state;
        if (status == 'success') {
            return <Redirect to='index' />
        }
        return (
            <Fragment>
            <ReactCSSTransitionGroup transitionName = "example"
            transitionAppear = {true} transitionAppearTimeout = {500}
            >
                    <form onSubmit={this.onSignIn}>
                        <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-6 sign_form">
                                <div className="row">
                                    <div className="col-md-12 div-user-img">
                                        <span className="big-title" id='sign_lbl'>Sign In</span>
                                    </div>
                                    <div className="col-md-12">
                                        <Input
                                            label="Email address"
                                            id="email"
                                            name="email"
                                            ref="email"
                                            defaultValue={email}
                                            onChange={this.onChange}
                                            onBlur={this.onValidEmail}
                                            onClick={this.cleanError}
                                            autoComplete="off" />
                                    </div>
                                    <div className="col-md-6">
                                        <Input
                                            label="Pass word" type="password"
                                            id="pass_word"
                                            name="pass_word"
                                            ref="pass_word"
                                            defaultValue={pass_word}
                                            onChange={this.onChange}
                                            onKeyUp={this.onValidPassWord}
                                            onClick={this.cleanError}
                                            autoComplete="off" />
                                    </div>
                                    <div className="col-md-6">
                                        <Input
                                            label="Repass word" type="password"
                                            id="re_pass_word"
                                            name="re_pass_word"
                                            ref="re_pass_word"
                                            defaultValue={re_pass_word}
                                            onChange={this.onChange}
                                            onKeyUp={this.onValidPassWord}
                                            autoComplete="off" />
                                    </div>
                                    <div className="col-md-12">
                                        <Button
                                            block
                                            className="btn-sign-up"
                                            id="sign_in_btn"
                                            type="submit"
                                            style={this.validateForm() ? null : { pointerEvents: 'none' }}
                                        >{this.validateForm() ? 'Sign In' : 'Please! Finish this form'}</Button>
                                    </div>
                                    <div className="col-md-12">
                                        <Link
                                            to='/sign_up'
                                            className='label-sign'
                                        >Don't have account ? Sign Up now</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3"></div>
                        </div>
                    </form>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}