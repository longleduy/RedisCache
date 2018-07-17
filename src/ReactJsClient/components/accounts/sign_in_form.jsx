import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { Input, Button, Fa, View, Mask } from 'mdbreact'
import Recaptcha from 'react-recaptcha'
import { callApi } from '../../utils/api_caller'
import { Link, withRouter } from 'react-router-dom'
import jwt from 'jsonwebtoken'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import * as Common from '../../utils/common'
class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sign_info: {
                email: 'longldseatchit@gmail.com',
                pass_word: 'longkhanh',
                re_pass_word: 'longkhanh'
            },
            status: '',
            signAuth: {
                viewBox: false,
                provider: ''
            },
            captchConfirm: false
        }
    }
    validateForm = () => {
        let { email, pass_word, re_pass_word } = this.state.sign_info;
        if (email != '' && pass_word != '' && re_pass_word != '' && this.onValidPassWord() == true) {
            return true;
        }
        else {
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
            let _text_label = $(e.target).attr('id') == 'email' ? 'Email address' : 'Pass word';
            $(e.target).next('label').removeClass('err_label').text(_text_label);
        }
    }
    onSignIn = (e) => {
        e.preventDefault();
        callApi('user/sign_in', 'POST', this.state.sign_info)
            .then(res => {
                if (res.status != 200) {
                    this.setState({
                        status: 'error'
                    });
                    $(`#${res.data.detail}`).next('label').addClass('err_label').text(res.data.message);
                    return false;
                }
                else {
                    Common.setItemLocalStorage('token', res.data.userInfo.token);
                    Common.setItemLocalStorage('avatar', res.data.userInfo.avatar);
                    let infoUser = {
                        payload: jwt.decode(res.data.userInfo.token),
                        avatar: res.data.userInfo.avatar
                    }
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
    signInAuth = () => {
        let { provider } = this.state.signAuth
        window.location.href = `https://localhost:8000/auth/${provider}`
    }
    showBox = (authenApplication) => {
        this.setState({
            signAuth: {
                viewBox: true,
                provider: authenApplication
            }
        })
    }
    cancelBox = () => {
        this.setState({
            signAuth: {
                viewBox: false,
                provider: ''
            }
        })
    }
    // verifyCallback = (response) => {
    //     this.setState({
    //         captchConfirm: true
    //     })
    // }
    // callback = () => {
    //     this.setState({
    //         captchConfirm: false
    //     })
    // }
    render() {
        let { email, pass_word, re_pass_word } = this.state.sign_info;
        let { status, captchConfirm } = this.state;
        let { viewBox, provider } = this.state.signAuth;
        let providerView = provider.toUpperCase();
        if (status == 'success') {
            return <Redirect to='index' />
        }
        return (
            <Fragment>
                <ReactCSSTransitionGroup transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    <form onSubmit={this.onSignIn}>
                        <div className="row">
                            <div className="col-md-3"></div>
                            {!viewBox && <div className="col-md-6 sign_form">
                                <div className="row">
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
                                    {/* {this.validateForm() &&
                                        <div className="col-md-12">
                                                <Recaptcha
                                                    sitekey="6LffBF8UAAAAAKkdFJk625CKnmEpFB-79hkzr-at"
                                                    render="explicit"
                                                    verifyCallback={this.verifyCallback}
                                                    onloadCallback={this.callback}

                                                />
                                        </div>} */}
                                    <div className="col-md-12">
                                        <Button
                                            block
                                            className="btn-sign-up"
                                            id="sign_in_btn"
                                            type="submit"
                                            style={this.validateForm() ? null : { pointerEvents: 'none' }}
                                        >{this.validateForm() ? 'Sign In' : 'Please! Finish this form'}</Button>
                                    </div>
                                    <div className="col-md-6">
                                        <Link
                                            to='/forgot_password'
                                            className='label-sign'
                                            style={{ textAlign: 'left' }}
                                        >Forgot pass word !</Link>
                                    </div>
                                    <div className="col-md-612">
                                        <Link
                                            to='/sign_up'
                                            className='label-sign'
                                        >Don't have account ? Sign Up now</Link>
                                    </div>
                                    <div className="col-md-12 auth-icon">
                                        <View zoom onClick={() => this.showBox('facebook')}>
                                            <img src={require('../../../../public/images/icon/facebook.png')}
                                                className="img-fluid"
                                                title="Login with Facebook" />
                                        </View>
                                        <View zoom onClick={() => this.showBox('google')}>
                                            <img src={require('../../../../public/images/icon/google.png')}
                                                className="img-fluid" title="Login with Google" />
                                        </View>
                                        <View zoom onClick={() => this.showBox('twitter')}>
                                            <img src={require('../../../../public/images/icon/twt.png')}
                                                className="img-fluid" title="Login with Twitter" />
                                        </View>
                                        <View zoom onClick={() => this.showBox('github')}>
                                            <img src={require('../../../../public/images/icon/github.png')}
                                                className="img-fluid" title="Login with Github" />
                                        </View>
                                    </div>
                                </div>
                            </div>}
                            <div className="col-md-3"></div>
                            {viewBox &&
                                <ReactCSSTransitionGroup transitionName="example"
                                    transitionAppear={true}
                                    transitionAppearTimeout={500}
                                    transitionEnterTimeout={500}
                                    transitionLeaveTimeout={500}
                                >
                                    <div className="col-md-6 confirm-box">
                                        <img src={require(`../../../../public/images/icon/${provider}-logo.png`)} className="logo" />
                                        <label className="big-title">Sign In with {providerView} Authentication ?</label>
                                        <div>
                                            <Button className="btn btn-sign-up" onClick={this.signInAuth}>Acept</Button>
                                            <label className="cancel-lbl" onClick={this.cancelBox}>Cancel</label>
                                        </div>
                                    </div>
                                </ReactCSSTransitionGroup>
                            }
                            {/* <div className="col-md-3"></div>
                            <div className="col-md-6">
                                <Recaptcha
                                    sitekey="6LffBF8UAAAAAKkdFJk625CKnmEpFB-79hkzr-at"
                                    render="explicit"
                                    theme="dark"
                                    verifyCallback={this.verifyCallback}
                                    onloadCallback={this.callback}

                                />
                            </div> */}
                        </div>
                    </form>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
export default withRouter(SignIn)