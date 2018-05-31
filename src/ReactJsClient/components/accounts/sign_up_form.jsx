import React, { Component, Fragment } from 'react'
import { Input, Button, Fa } from 'mdbreact'
import { callApi } from '../../utils/api_caller'
import * as validate from '../../contants/accounts/sign'
import { Link } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { EPIPE } from 'constants';
export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                user_name: 'LongDuy',
                pass_word: 'longkhanh',
                re_pass_word: 'longkhanh',
                email: 'longldseatchit@gmail.com'
            },
            statusSignUp: {
                success: false
            }
        }
    }
    onChange = (e) => {
        let _name = e.target.name;
        let _value = e.target.value;
        this.setState({
            userInfo: {
                ...this.state.userInfo,
                [_name]: _value
            }
        })
    }
    onValidPassWord = () => {
        let _pass_word = this.state.userInfo.pass_word;
        let _re_pass_word = this.state.userInfo.re_pass_word;
        if (_pass_word != '' && _pass_word.length < 8) {
            $('#pass_word').next('label').addClass('err_label').text(validate.VALIDATE_PASS_WORD);
            return false;
        }
        else if (_pass_word != '' || _re_pass_word != '') {
            $('#pass_word').next('label').removeClass('err_label').text('Pass word');
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
            $('#pass_word').next('label').removeClass('err_label').text('Pass word');
            $('#pass_word').removeClass('error-input success-input');
            $('#re_pass_word').removeClass('error-input success-input');
            return true;
        }
    }
    onValidUserName = (e) => {
        let _userName = this.state.userInfo.user_name;
        if (_userName.length < 6 && _userName != '') {
            $('#error_user_name').text(validate.VALIDATE_CHARACTER);
            $('#user_name').next('label').addClass('err_label').text(validate.VALIDATE_CHARACTER);
            return false;
        }
        else {
            $('#error_user_name').text('');
            $('#user_name').next('label').removeClass('err_label').text('User name');
            return true;
        }
    }
    onSignUp = async (e) => {
        e.preventDefault();
        let res = await callApi('user/sign_up', 'POST', this.state.userInfo);
        if (res.status == 200) {
            this.setState({
                statusSignUp: {
                    success: true
                }
            })
            this.clearText();
        }
    }
    onValidEmail = async () => {
        let _email = this.state.userInfo.email;
        let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (!emailReg.test(_email)) {
            $('#email').next('label').addClass('err_label').text(validate.VALIDATE_EMAIL);
            return false;
        }
        else if (_email != '') {
            let res = await callApi('user/check_email', 'POST', this.state.userInfo);
            if (res.data.status == false) {
                $('#email').next('label').addClass('err_label').text(res.data.message);
                return false;
            }
            else {
                $('#email').next('label').removeClass('err_label').text('Email');
                return true;
            }
        }
        else {
            $('#email').next('label').removeClass('err_label').text('Email');
            return false;
        }
    }
    cleanError = () => {
        let _email = this.state.userInfo.email;
        if (_email != '') {
            $('#email').next('label').removeClass('err_label').text('Email');
        }
    }
    clearText = () => {
        $('#user_name').val('');
        $('#pass_word').val('');
        $('#re_pass_word').val('');
        $('#email').val('');
    }
    activeButton = () => {
        let { user_name, pass_word, re_pass_word, email } = this.state.userInfo;
        if (user_name != '' && pass_word != '' && re_pass_word != '' && email != '' && pass_word == re_pass_word && this.onValidPassWord() == true && this.onValidUserName() == true) {
            return true;
        }
        else {
            return false;
        }
    }
    verifyEmailAvtive = () => {
        $('.sign_form').addClass('opacity0');
        let email = this.state.userInfo.email;
        let index = email.indexOf('@');
        let emailView = `${email.substring(0,index-4)}****${email.substring(index,email.length)}`
        return <Fragment>
            <div className="col-md-8 verify-email" onMouseLeave={this.closeVerifyForm}>
                <label className="sign-up-success">Success</label>
                <label className="verify-noti">We now need to verify your email address
                    . We've send an email to {emailView} to verify your address. Please
                    click the link in that email to continue.
                                </label>
            </div>
        </Fragment>
    }
    closeVerifyForm = () => {
        this.setState({
            statusSignUp: {
                success: false
            }
        })
            $('.sign_form').removeClass('opacity0');
    }
    render() {
        let { user_name, pass_word, re_pass_word, email } = this.state.userInfo;
        return (
            <Fragment>
                <ReactCSSTransitionGroup transitionName="example"
                    transitionAppear={true} transitionAppearTimeout={500}
                >
                    <form onSubmit={this.onSignUp}>
                        <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-6 sign_form">
                                <div className="row">
                                    <div className="col-md-12 div-user-img">
                                        <span className="big-title" id='sign_lbl'>Sign Up</span>
                                    </div>
                                    <div className="col-md-12">
                                        <Input
                                            label="User name"
                                            id="user_name"
                                            name="user_name"
                                            ref="user_name"
                                            onChange={this.onChange}
                                            onKeyUp={this.onValidUserName}
                                            defaultValue={user_name}
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
                                        <Input
                                            label="Email address"
                                            id="email"
                                            name="email"
                                            ref="email"
                                            defaultValue={email}
                                            onChange={this.onChange}
                                            onKeyUp={this.onValidEmail}
                                            onClick={this.cleanError}
                                            autoComplete="off" />
                                    </div>
                                    <div className="col-md-12">
                                        <Button
                                            block
                                            className="btn-sign-up"
                                            id="sign_up_btn"
                                            type="submit"
                                            style={this.activeButton() ? null : { pointerEvents: 'none' }}
                                        >{this.activeButton() ? 'Sign Up' : 'Please! Finish this form'}</Button>
                                    </div>
                                    <div className="col-md-12">
                                        <Link
                                            to='/sign_in'
                                            className='label-sign'
                                        >Have account ? Sign In now</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3"></div>
                            {this.state.statusSignUp.success && this.verifyEmailAvtive()}
                        </div>
                    </form>

                </ReactCSSTransitionGroup>
            </Fragment >
        )
    }

}