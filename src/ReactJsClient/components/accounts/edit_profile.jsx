import React, { Component, Fragment } from 'react'
import { Input, Button, Fa, Icon } from 'mdbreact'
import { withRouter } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import { callApi, getApi, callApiAuthen } from '../../utils/api_caller'
import * as validate from '../../contants/accounts/sign'
import { Link } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passWordConfirm: false,
            hasEdit: false,
            avatar: '',
            updateInfo: {},
            passWord: '',
            confirmRes: true
        }
    }
    handleDrop = (files) => {
        let reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                avatar: reader.result,
                hasEdit: true
            })
        }
        reader.readAsDataURL(files[0])
    }
    upload = () => {
        let data = this.state;
        this.props.upload(data);
    }
    edit = (e) => {
        let { avatar } = this.state;
        let editTarget = $(e.target).prev().children('input');
        let id = editTarget.prop('id');
        let text = editTarget.next().text();
        if (editTarget.is(':disabled')) {
            editTarget.prop('disabled', false).addClass('green-text-border');
            editTarget.parent().next().children().removeClass('fa-pencil').addClass('fa-times-circle');
            editTarget.next().addClass('green-text').text(`Edit: ${text}`);
            editTarget.focus();
            this.setState({
                hasEdit: true
            })
        } else {
            let { user_info } = this.props;
            let id = editTarget.prop('id');
            this.cleanEdit(editTarget);
            this.setState({
                hasEdit: false
            })
            editTarget.val(user_info[id]);
        }
        if (this.checkEdit() || avatar != '') {
            this.setState({
                hasEdit: true
            })
        }
        else {
            this.setState({
                hasEdit: false
            })
        }
    }
    cleanEdit = (field) => {
        field.prop('disabled', true).removeClass('green-text-border');
        field.parent().next().children().removeClass('fa-times-circle').addClass('fa-pencil');
        field.next().removeClass('green-text').text(field.next().text().replace('Edit: ', ''));
    }
    checkEdit = () => {
        let hasEdit = false;
        let arrInput = $('.disable-flat');
        arrInput.each((key, element) => {
            if (!$(element).is(':disabled')) {
                hasEdit = true;
            }
        });
        return hasEdit;
    }
    onSubmit = () => {
        let { avatar } = this.state;
        let arrInput = $('.disable-flat');
        let obj = {};
        let isEditMail = false;
        arrInput.each((key, element) => {
            if (!$(element).is(':disabled')) {
                let value = $(element).val();
                let id = $(element).prop('id');
                obj[id] = value;
                this.cleanEdit($(element));
                if (id == 'email') {
                    isEditMail = true
                }
            }
        });
        if (avatar != '') {
            obj['avatar'] = avatar;
        }
        if (isEditMail) {
            this.setState({
                passWordConfirm: true,
                updateInfo: obj
            })
        }
        else {
            this.props.upload(obj);
        }
        this.setState({
            hasEdit: false,
            avatar: ''
        })
    }
    confirmPass = async (e) => {
        e.preventDefault();
        let res = await callApi('user/check_pass_word', 'POST', {
            passWord: this.state.passWord
        })
        if (res.status == 200) {
            this.setState({
                avatar: '',
                passWordConfirm: false
            }, () => {
                this.props.upload(this.state.updateInfo);
            })
        }
        else {
            this.setState({
                confirmRes: false
            })
        }
    }
    cancelImg = () => {
        if (this.checkEdit()) {
            this.setState({
                avatar: '',
            })
        }
        else {
            this.setState({
                avatar: '',
                hasEdit: false
            })
        }
    }
    cancelConfirmPass = () => {
        this.setState({
            passWordConfirm: false
        })
    }
    onChangePass = (e) => {
        this.setState({
            passWord: $(e.target).val()
        })
    }
    render() {
        let { avatar, hasEdit, passWordConfirm, passWord, confirmRes } = this.state;
        let { user_info } = this.props;
        if (!confirmRes) {
            $('#passWord').next('label').addClass('err_label').text('Password is not invalid!');
        }
        else {
            $('#passWord').next('label').removeClass('err_label').text('Enter password');
        }
        return (
            <Fragment>
                <ReactCSSTransitionGroup transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    <div className="row" style={passWordConfirm ? { display: 'none' } : null}>
                        <div className="col-md-4 main-zone">
                            {avatar != '' && <Button className="btn-icon cancel-icon" onClick={this.cancelImg}><Fa icon="times" className="ml-1" /></Button>}
                            <Dropzone onDrop={this.handleDrop}
                                accept="image/jpeg,image/jpg,image/tiff,image/gif,image/png" multiple={false}>
                                <img className="profile-panel DragnDropDP preview-img"
                                    src={avatar != '' ? avatar : (user_info.avatar != "" ? user_info.avatar : require('../../../../public/images/no-avatar.jpeg'))} />
                            </Dropzone>
                        </div>
                        <div className="col-md-7 sign_form">
                            <div className="row">
                                <div className="col-md-6">
                                    <Input
                                        label="User name"
                                        id="user_name"
                                        name="user_name"
                                        ref="user_name"
                                        defaultValue={user_info.user_name}
                                        onChange={this.onChange}
                                        onClick={this.cleanError}
                                        className="disable-flat"
                                        disabled
                                        autoComplete="off" />
                                    <Button className="btn-icon edit-icon" onClick={this.edit}><Fa icon="pencil" className="ml-1 edit-icon" /></Button>

                                </div>
                                <div className="col-md-6">
                                    <Input
                                        label="Level"
                                        id="level"
                                        name="level"
                                        ref="level"
                                        defaultValue={user_info.level}
                                        onChange={this.onChange}
                                        onClick={this.cleanError}
                                        className="disable-flat"
                                        disabled
                                        autoComplete="off" />
                                    <Button className="btn-icon edit-icon" onClick={this.edit}><Fa icon="pencil" className="ml-1 edit-icon" /></Button>
                                </div>
                                <div className="col-md-6">
                                    <Input
                                        label="Age" type="number"
                                        id="age"
                                        name="age"
                                        ref="age"
                                        defaultValue="24"
                                        onChange={this.onChange}
                                        onClick={this.cleanError}
                                        disabled
                                        className="disable-flat"
                                        disabled
                                        autoComplete="off" />
                                    <Button className="btn-icon edit-icon" onClick={this.edit}><Fa icon="pencil" className="ml-1 edit-icon" /></Button>
                                </div>
                                <div className="col-md-6">
                                    <Input
                                        label="Provider"
                                        id="provider"
                                        name="provider"
                                        ref="provider"
                                        defaultValue={user_info.provider}
                                        onChange={this.onChange}
                                        onClick={this.cleanError}
                                        className="disable-flat"
                                        disabled
                                        autoComplete="off" />
                                    <Button className="btn-icon edit-icon" onClick={this.edit}><Fa icon="pencil" className="ml-1 edit-icon" /></Button>
                                </div>
                                <div className="col-md-12">
                                    <Input
                                        label="Email address"
                                        id="email"
                                        name="email"
                                        ref="email"
                                        defaultValue={user_info.email}
                                        onChange={this.onChange}
                                        onClick={this.cleanError}
                                        className="disable-flat"
                                        disabled
                                        autoComplete="off" />
                                    <Button className="btn-icon edit-icon" onClick={this.edit}><Fa icon="pencil" className="ml-1 edit-icon" /></Button>
                                </div>
                                <div className="col-md-12">
                                    {hasEdit && <Button className="change-info" onClick={this.onSubmit}>Change</Button>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={!passWordConfirm ? { display: 'none' } : null}>
                        <form onSubmit={this.confirmPass} ><div className="col-md-8 sign_form confirm-password">
                            <Input
                                label="Enter password"
                                id="passWord"
                                name="passWord"
                                ref="passWord"
                                defaultValue={passWord}
                                onChange={this.onChangePass}
                                autoComplete="off" />
                            <Button className="btn-icon cancel-confirm-pass" onClick={this.cancelConfirmPass}><Fa icon="times" className="ml-1" /></Button>
                        </div></form>
                    </div>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
export default EditProfile;