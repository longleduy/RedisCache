import React, { Component, Fragment } from 'react'
import { Input, Button, Fa, Icon } from 'mdbreact'
import { withRouter } from 'react-router-dom'
import { callApi, getApi } from '../../utils/api_caller'
import * as validate from '../../contants/accounts/sign'
import { Link } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { EPIPE } from 'constants';
class ForgotPassWord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormValid: '',
            email: '',
            errorMesage: '',
            isSuccess: 0,
            scret_code: '',
            newPassword: '',
            confirmNewPassword: ''
        }
    }
    onChange = (e) => {
        let email = e.target.value;
        let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (email != '') {
            if (!emailReg.test(email)) {
                $('#email').next('label').addClass('err_label');
                this.setState({
                    isFormValid: '',
                    errorMesage: validate.VALIDATE_EMAIL
                })
            }
            else {
                $('#email').next('label').removeClass('err_label');
                this.setState({
                    isFormValid: 'FORM1',
                    email,
                    errorMesage: ''
                })
            }
        }
        else {
            $('#email').next('label').removeClass('err_label');
            this.setState({
                isFormValid: '',
                errorMesage: ''
            })
        }
    }
    onChangeForm2 = (e) => {
        let _name = e.target.name;
        let _value = e.target.value;
        let { errorMesage } = this.state;
        if (_name == 'scret_code' && errorMesage != '') {
            this.setState({
                [_name]: _value,
                errorMesage: ''
            })
            $('#scret_code').next('label').removeClass('err_label');
        }
        else {
            this.setState({
                [_name]: _value
            })
        }
    }
    onSend = async (e) => {
        e.preventDefault();
        let { email } = this.state;
        let res = await getApi('user/reset_password_code', { email });
        if (res.status == 200) {
            this.setState({
                isSuccess: 1
            })
        }
        else {
            this.setState({
                isFormValid: '',
                errorMesage: res.data.message
            })
            $('#email').next('label').addClass('err_label');
        }
    }
    onValidPassWord = () => {
        let { newPassword, confirmNewPassword } = this.state;
        let isFormValid = false;
        if (newPassword != '' || confirmNewPassword != '') {
            if (newPassword != '' && newPassword.length < 8) {
                $('#newPassword').next('label').addClass('err_label').text(validate.VALIDATE_PASS_WORD);
            }
            else if (newPassword != confirmNewPassword) {
                $('#newPassword').next('label').removeClass('err_label').text('New PassWord');
                $('#newPassword').removeClass('success-input').addClass('error-input');
                $('#confirmNewPassword').removeClass('success-input').addClass('error-input');
            }
            else {
                $('#newPassword').next('label').removeClass('err_label').text('New PassWord');
                $('#newPassword').removeClass('error-input').addClass('success-input');
                $('#confirmNewPassword').removeClass('error-input').addClass('success-input');
                isFormValid = 'FORM2';
            }
        }
        else {
            $('#newPassword').next('label').removeClass('err_label').text('New PassWord');
            $('#confirmNewPassword').removeClass('error-input success-input');
            $('#newPassword').removeClass('error-input').addClass('success-input');
            isFormValid = '';
        }
        this.setState({
            isFormValid
        })
    }
    resetPassword = async () => {
        let { email, newPassword, scret_code } = this.state;
        let payload = {
            email,
            newPassword,
            scret_code
        }
        let res = await callApi('user/reset_pass_word_by_email', 'POST', payload);
        if (res.status == 200) {
            this.setState({
                isSuccess: 2
            })
        }
        else {
            this.setState({
                errorMesage: res.data.message
            });
            $('#scret_code').next('label').addClass('err_label');
        }
    }
    render() {
        let { isFormValid, email, errorMesage, isSuccess, scret_code, newPassword, confirmNewPassword } = this.state;
        return (
            <Fragment>
                <ReactCSSTransitionGroup transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    <form onSubmit={this.onSend}>
                        <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-6 sign_form">
                                <div className="row">
                                    <div className="col-md-12 div-user-img">
                                        <span className="big-title" id='sign_lbl'></span>
                                    </div>
                                    {isSuccess == 0 && <div className="col-md-12">
                                        <Input
                                            label={errorMesage != '' ? errorMesage : 'Your email address'}
                                            id="email"
                                            name="email"
                                            ref="email"
                                            onChange={this.onChange}
                                            defaultValue={email}
                                            autoComplete="off" />

                                        {isFormValid == 'FORM1' &&
                                            <Button type="submit" className="btn-icon send-mail-btn"><Fa icon="paper-plane" className="ml-1 send-email" /></Button>
                                        }
                                    </div>}
                                    {isSuccess == 1 && <Fragment>
                                        <div className="col-md-12 title-send-code">
                                            <img src={require(`../../../../public/images/icon/mail_sender.png`)} className="mail_sender_icon" />
                                            <label>We've send a secret code to your email to verify request. Please click the link in that email to continue. Use that code to reset pass word
                                        </label>
                                        </div>
                                        <div className="col-md-12">
                                            <Input
                                                label={errorMesage != '' ? errorMesage : 'Secret code'}
                                                id="scret_code"
                                                name="scret_code"
                                                ref="scret_code"
                                                defaultValue={scret_code}
                                                onChange={this.onChangeForm2}
                                                autoComplete="off" />
                                        </div>
                                        <div className="col-md-6">
                                            <Input
                                                label="New password" type="password"
                                                id="newPassword"
                                                name="newPassword"
                                                ref="newPassword"
                                                disabled={scret_code == '' ? true : false}
                                                defaultValue={newPassword}
                                                onChange={this.onChangeForm2}
                                                onKeyUp={this.onValidPassWord}
                                                autoComplete="off" />
                                        </div>
                                        <div className="col-md-6">
                                            <Input
                                                label="Confirm password" type="password"
                                                id="confirmNewPassword"
                                                name="confirmNewPassword"
                                                ref="confirmNewPassword"
                                                disabled={newPassword == '' ? true : false}
                                                defaultValue={confirmNewPassword}
                                                onChange={this.onChangeForm2}
                                                onKeyUp={this.onValidPassWord}
                                                autoComplete="off" />
                                        </div>
                                        <div className="col-md-12">
                                            <Button
                                                block
                                                className="btn-sign-up"
                                                id="sign_in_btn"
                                                onClick={this.resetPassword}
                                                style={isFormValid == 'FORM2' ? null : { pointerEvents: 'none' }}
                                            >{isFormValid == 'FORM2' ? 'Reset password' : 'Please! Finish this form'}</Button>
                                        </div>
                                    </Fragment>
                                    }
                                    {isSuccess == 2 &&
                                        <div className="col-md-12">
                                            <div className="reset-pass-success">
                                                <label>Success!</label>
                                            </div>
                                        </div>}
                                </div>
                            </div>
                        </div>
                    </form>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
export default ForgotPassWord;