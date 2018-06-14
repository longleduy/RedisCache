import React, { Component, Fragment } from 'react'
import { Input, Button, Fa, View, Mask } from 'mdbreact'
import { Link, withRouter } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import * as MessageContants from '../../contants/accounts/sign'
class ChangePassWord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            field: {
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: '',
                isInvalid: false,
                errMessage: ''
            }
        }
    }
    onChange = (e) => {
        let _name = e.target.name;
        let _value = e.target.value;
        this.setState({
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
            if (_pass_word != _re_pass_word) {
                $('#newPassword').removeClass('success-input').addClass('error-input');
                $('#confirmNewPassword').removeClass('success-input').addClass('error-input');
            }
            else {
                $('#newPassword').removeClass('error-input').addClass('success-input');
                $('#confirmNewPassword').removeClass('error-input').addClass('success-input');
                isValid = true;
            }
        }
        else {
            $('#confirmNewPassword').removeClass('error-input success-input');
            $('#newPassword').removeClass('error-input').addClass('success-input');
            isValid = false;
        }
        this.setState({
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
        if(currentPassword == newPassword){
            this.setState({
                field:{
                    ...this.state.field,
                    errMessage: MessageContants.NEW_PASSWORD_FAILD
                }
            })
        }
        else{
            let data = {
                currentPassword,
                newPassword,
                isInvalid
            }
            this.props.onChangePassWord(data)
        }
        
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.changePassword.errMessage != '' && this.state.field.errMessage != nextProps.changePassword.errMessage){
            this.setState({
                field:{
                    ...this.state.field,
                    errMessage: nextProps.changePassword.errMessage
                }
            })
        }
    }
    cleanError = () => {
        if (this.state.field.errMessage != '') {
            this.setState({
                field:{
                    ...this.state.field,
                    errMessage: ''
                }
            })
        }
    }
    render() {
        let { currentPassword, newPassword, confirmNewPassword, isInvalid, errMessage } = this.state.field;
        if(errMessage != ''){
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
                            <div className="col-md-6 sign_form">
                                <div className="row">
                                    <div className="col-md-12 div-user-img">
                                        <span className="big-title" id='sign_lbl'>Sign In</span>
                                    </div>
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
                            </div>
                        </div>
                    </form>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
export default ChangePassWord;