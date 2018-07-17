import React, { Component, Fragment } from 'react'
import { Input, Button, Fa, View, Mask } from 'mdbreact'
import { Link, withRouter } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import * as validate from '../../contants/accounts/sign'
import * as MessageContants from '../../contants/accounts/sign'
import { callApi } from '../../utils/api_caller'
class ChangePassWord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            field: {
                currentPassword: 'longkhanh',
                newPassword: 'quynhnga',
                confirmNewPassword: 'quynhnga',
                isInvalid: false,
                errMessage: '',
            },
            resetPassword: {
                status: '',
                data: ''
            }
        }
    }
    //Todo: Lifecycle
    componentWillReceiveProps(nextProps) {
        if (nextProps.changePassword.errMessage != '' && this.state.field.errMessage != nextProps.changePassword.errMessage) {
            this.setState({
                ...this.state,
                field: {
                    ...this.state.field,
                    errMessage: nextProps.changePassword.errMessage
                }
            })
        }if(nextProps.changePassword.status == 'DEL_REQUEST'){
            this.setState({
                resetPassword: {
                    ...this.state.resetPassword,
                    status: ''
                }
            })
        }
         else if (nextProps.changePassword.errMessage == '') {
            this.setState({
                ...this.state,
                resetPassword: {
                    ...this.state.resetPassword,
                    status: 'SEND_MAIL'
                }
            })
        }
    }
    componentDidMount() {
        callApi('user/check_confirm_reset_password', 'GET', null).then(res => {
            if (res.status == 200) {
                this.setState({
                    ...this.state,
                    resetPassword: {
                        status: 'WAIT_CONFIRM',
                        data: res.data
                    }
                })
            }
        })
    }

    onChange = (e) => {
        let _name = e.target.name;
        let _value = e.target.value;
        this.setState({
            ...this.state,
            field: {
                ...this.state.field,
                [_name]: _value
            }
        })
    }
    onValidPassWord = () => {
        let _pass_word = this.state.field.newPassword;
        let _re_pass_word = this.state.field.confirmNewPassword;
        let currentPassword = this.state.field.currentPassword;
        let isValid = false;
        if (currentPassword == '') {
            isValid = false;
        }
        else if (_pass_word != '' || _re_pass_word != '') {
            if (_pass_word.length < 8) {
                $('#newPassword').next('label').addClass('err_label').text(validate.VALIDATE_PASS_WORD);
            }
            else if (_pass_word != _re_pass_word) {
                $('#newPassword').next('label').removeClass('err_label').text('New PassWord');
                $('#newPassword').removeClass('success-input').addClass('error-input');
                $('#confirmNewPassword').removeClass('success-input').addClass('error-input');
            }
            else {
                $('#newPassword').next('label').removeClass('err_label').text('New PassWord');
                $('#newPassword').removeClass('error-input').addClass('success-input');
                $('#confirmNewPassword').removeClass('error-input').addClass('success-input');
                isValid = true;
            }
        }
        else {
            $('#newPassword').next('label').removeClass('err_label').text('New PassWord');
            $('#confirmNewPassword').removeClass('error-input success-input');
            $('#newPassword').removeClass('error-input').addClass('success-input');
            isValid = false;
        }
        this.setState({
            ...this.state,
            field: {
                ...this.state.field,
                isInvalid: isValid
            }
        })
        return isValid;
    }
    onChangePassWord = (e) => {
        e.preventDefault();
        let { currentPassword, newPassword, isInvalid } = this.state.field;
        if (currentPassword == newPassword) {
            this.setState({
                ...this.state,
                field: {
                    ...this.state.field,
                    errMessage: MessageContants.NEW_PASSWORD_FAILD
                }
            })
        }
        else {
            let data = {
                currentPassword,
                newPassword,
                isInvalid
            }
            this.props.onChangePassWord(data)
        }

    }
    cleanError = () => {
        if (this.state.field.errMessage != '') {
            this.setState({
                ...this.state,
                field: {
                    ...this.state.field,
                    errMessage: ''
                }
            })
        }
    }
    delRequest = () => {
        this.props.delRequest();
    }
    render() {
        let { currentPassword, newPassword, confirmNewPassword, isInvalid, errMessage } = this.state.field;
        let { status, data } = this.state.resetPassword;
        let { email } = this.props.userInfo;
        if (errMessage != '') {
            $('#currentPassword').next('label').addClass('err_label');
        }
        else {
            $('#currentPassword').next('label').removeClass('err_label');
        }
        return (
            <Fragment>
                <ReactCSSTransitionGroup transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    <form onSubmit={this.onChangePassWord}>
                        <div className="row">
                            <div className="col-md-3"></div>
                            {status == '' && <div className="col-md-6 sign_form">
                                <div className="row">
                                    <div className="col-md-12">
                                        <Input
                                            label={errMessage != '' ? errMessage : "Current PassWord"}
                                            id="currentPassword"
                                            type="password"
                                            name="currentPassword"
                                            ref="currentPassword"
                                            defaultValue={currentPassword}
                                            onKeyUp={this.onValidPassWord}
                                            onChange={this.onChange}
                                            onClick={this.cleanError}
                                            autoComplete="off" />
                                    </div>
                                    <div className="col-md-6">
                                        <Input
                                            label="New PassWord" type="password"
                                            id="newPassword"
                                            name="newPassword"
                                            ref="newPassword"
                                            disabled={currentPassword == '' ? true : false}
                                            defaultValue={newPassword}
                                            onChange={this.onChange}
                                            onKeyUp={this.onValidPassWord}
                                            onClick={this.cleanError}
                                            autoComplete="off" />
                                    </div>
                                    <div className="col-md-6">
                                        <Input
                                            label="Confirm New PassWord" type="password"
                                            id="confirmNewPassword"
                                            name="confirmNewPassword"
                                            ref="confirmNewPassword"
                                            disabled={currentPassword == '' ? true : false}
                                            defaultValue={confirmNewPassword}
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
                                            style={isInvalid ? null : { pointerEvents: 'none' }}
                                        >{isInvalid ? 'Sign In' : 'Please! Finish this form'}</Button>
                                    </div>
                                </div>
                            </div>}
                            <div className="col-md-3"></div>
                            {status == 'SEND_MAIL' &&
                                <ReactCSSTransitionGroup transitionName="example"
                                    transitionAppear={true}
                                    transitionAppearTimeout={500}
                                    transitionEnterTimeout={500}
                                    transitionLeaveTimeout={500}
                                >
                                    <div className="col-md-6 confirm-box" style={{ top: '25%' }}>
                                        <img src={require(`../../../../public/images/icon/mail_sender.png`)} className="mail_sender_icon" />
                                        <label className="mail_sender_label">We've send an email to <label className="email_address">{email}</label> to verify your request. Please
                                            click the button 'Reset' in that email to continue.</label>
                                    </div>
                                </ReactCSSTransitionGroup>
                            }
                            {status == 'WAIT_CONFIRM' &&
                                <ReactCSSTransitionGroup transitionName="example"
                                    transitionAppear={true}
                                    transitionAppearTimeout={500}
                                    transitionEnterTimeout={500}
                                    transitionLeaveTimeout={500}
                                >
                                    <div className="col-md-6 confirm-box" style={{ top: '25%' }}>
                                        <img src={require(`../../../../public/images/icon/wait_confirm_email.png`)} style={{width: '15%'}} className="mail_sender_icon" />
                                        <label className="mail_sender_label"><label className="email_address">{data.currentDate}</label> You've send a request to reset pass word and we've send an email to <label className="email_address">{email}</label> to verify your request. Please
                                            click the button 'Reset' in that email to reset your pass word.</label>
                                        <div>
                                            <Button className="btn btn-sign-up warning-btn" onClick={this.delRequest}>Not me !</Button>
                                        </div>
                                    </div>
                                </ReactCSSTransitionGroup>
                            }
                        </div>
                    </form>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
export default ChangePassWord;