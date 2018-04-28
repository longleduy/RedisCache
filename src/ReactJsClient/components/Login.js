import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import {callApi} from '../utils/apiCaller';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                user_name: '',
                pass_word: '',
                re_pass_word: ''
            },
            userLogin: {
                is_login: false
            }
        }
    }
    componentDidMount(){
        callApi('a','GET',null).then(res=> console.log(res.data));
    }
    onChange = (e) => {
        let _name = e.target.name;
        let _value = e.target.value;
        if(_name == "user_name"){
            $('#user_name_label').css({"color":"","text-decoration": ""});
        }
        else if(_name == "pass_word"){
            $('#pass_word_label').css({"color":"","text-decoration": ""});
        }
        this.setState({
            userInfo: {
                ...this.state.userInfo,
                [_name]: _value
            }
        })
    }
    onValidPassWord = (e) => {
        let _pass_word = this.state.userInfo.pass_word;
        let _re_pass_word = this.state.userInfo.re_pass_word;
        if (_pass_word != '' || _re_pass_word != '') {
            if (_pass_word != _re_pass_word) {
                $('#pass_word').removeClass('success-input').addClass('error-input');
                $('#re_pass_word').removeClass('success-input').addClass('error-input');
                $('#btn-signin').prop('disabled', true);
            }
            else {
                $('#pass_word').removeClass('error-input').addClass('success-input');
                $('#re_pass_word').removeClass('error-input').addClass('success-input');
                $('#btn-signin').removeAttr('disabled');
            }
        }
        else {
            $('#pass_word').removeClass('success-input error-input');
            $('#re_pass_word').removeClass('success-input error-input');
        }

    }
    onLogin = (e) => {
        let { user_name, pass_word, re_pass_word } = this.state.userInfo;
        e.preventDefault();
        if (user_name === 'long' && pass_word === '123') {
            this.setState({
                userLogin: {
                    is_login: true
                }
            })
            localStorage.setItem('_user_info', JSON.stringify(this.state));
        }
         else if(user_name != 'long'){
            $('#user_name_label').css({"color":"red","text-decoration": "line-through"});
            return false;
         }
         else if(pass_word != '123'){
            $('#pass_word_label').css({"color":"red","text-decoration": "line-through"});
            return false;
         }
    }
    render() {
        let { user_name, pass_word, re_pass_word } = this.state.userInfo;
        let { is_login } = this.state.userLogin;
        if (is_login == true || localStorage.getItem('_user_info') != null) {
            return <Redirect to='/items' />
        }
        return (
            <Fragment>
                <form onSubmit={this.onLogin}>
                    <div className="col s6 offset-s3 login-component z-depth-2">
                        <label className="login-title">Sign In</label>
                        <div className="col s12 login-info">
                            <div className="col s3">
                                <label id="user_name_label">User name</label>
                            </div>
                            <div className="col s12">
                                <input
                                    type="text"
                                    id="user_name"
                                    name="user_name"
                                    ref="user_name"
                                    value={user_name}
                                    onChange={this.onChange} />
                            </div>
                        </div>
                        <div className="col s12 login-info">
                            <div className="col s3">
                                <label id="pass_word_label">Pass word</label>
                            </div>
                            <div className="col s12">
                                <input
                                    type="password"
                                    id="pass_word"
                                    name="pass_word"
                                    ref="pass_word"
                                    value={pass_word}
                                    onChange={this.onChange}
                                    onKeyUp={this.onValidPassWord} />
                            </div>
                        </div>
                        <div className="col s12 login-info">
                            <div className="col s3">
                                <label id="re_pass_word_label">RePass</label>
                            </div>
                            <div className="col s12">
                                <input
                                    type="password"
                                    id="re_pass_word"
                                    name="re_pass_word"
                                    ref="re_pass_word"
                                    value={re_pass_word}
                                    onChange={this.onChange}
                                    onKeyUp={this.onValidPassWord} />
                            </div>
                        </div>
                        <div className="col s12 login-btn">
                            <a className="forgot-pass col s12" href="#">Forgot password ?</a>
                            <div className="col s12 btn-div">
                                <button className="btn waves-effect waves-light" type="submit" id="btn-signin" disabled><i className="material-icons">fingerprint</i>Sign In</button>
                            </div>
                            <div className="col s12 other-acc">
                                <a><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANYSURBVFhH7VdLa9RQFI660f/QpChu1B8g+ChuXU1mOi0+Fl1Y8IkLn6WCXRRbbae4UlwI0laqVnQjtKKIBUsLBRVdiAtFq0VacWMmM5nJZHJ6zs1tO8m9zWSm2Sj94GOG3HO+c3If554o6/jvAS3KJiPV0GTqaiarq9P4u4C/NpH/p2cZI6HuJ1vuFj/cdMMWDNRh6tpvM6lBJGKCZkK7RL5cJh7gW7dmdW1OGjQC0X82m9RauFz9gC5lIwr1yoLUStRx8aWukSaXrw3kiFP+WCa+Ro6ComzgYaIjrpmRkWaKh4kGI6mlZUJxkZbPSGjNPFw46ESsZQNHJSb1A9oaN/Owq4MdbYkAMX/6ABQfDEBpehyc9xNQevUICv0nwUxvk9pXJZYEHlYOKmSsdgQdW7dD6fkwgFsGGdz5WbCupP0+kajOh546VoGDTvj2zoc3PLQX3B4fBPvpbXBmXnpJOiUo9J3w+0Wkoav7eHgRaDAQdKAl8jJxoTjUIyxP/txBsLrbfM+CLAycYS8lG8Oi2c/Di8gm1alK49zhHeBaJsvHfnLLJ1QLi8PXmYZsDLfIJA8vInhPWb3tTAjsIuSO7vQJFW6exRnrFVi40ynYOO8mmMySTa5994oW7lkeXgROX3HZEFm8182Eyl8+rghwOp9m2FgQbt6samN1Ni/b4KoUeHgRtSRkP7vL9sUSy7OfmW1lQksMW7LQhIQl6znGhGRLFqQ9PsRMZclX2UMhSybb1PjGBDrmlWOVzJ9qAjdnMLviSEYYzx3fA1bXEeE5Y/imVjNBB9+xv39DeuzLc189k79/cCZ3+carMfTYU9spODVv9RfGhZ+sant7aBIf8OqNy2pdPeT3jUAjpe3l4UWwqwPLueCIV4c9NsgqsgzlX98g36H7fSKxytVBQKPLcmd+uY70Q2lqDJy3r6H0YsS7Muq9XJPaBR52dbD2A1sDiXOsxL3zPVL7QaAGjZoomVAcZA2a3pji4aKB2kyZWBzE8tLNw0QHNeLoPBoUWzN17WFdTT6BfQbhTMWxfKRBM1N3MpVgewo/9mSBopB8c4kGncvFA+9TWrsorVOrUp3PphrPx/4pXQlaRmo7qeR7dx8GxS6ByJLFuwmf91EFrlr01vHvQ1EWAfrucC7wLsVbAAAAAElFTkSuQmCC" /></a>
                                <a><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPPSURBVFhH7VhLbExhFB6delt5BImQiI2EBWskNhLiEfGKlRALG0vECqEh8S4LoYmI0HuHSj1aLIhHPapBRBVthZZINZ73v/M29/j+v3/bO/eeOzPtlJUv+ZI7d/5zztf/nP/8pxP6j6JwzhpbYtobwoaoKDFFDVgdNu3ysBFdEjpNw/SqfwDTGQ4Re8EYBBBLQwgIbA0b9pewKVKKeMa7R/j+QGmlNTcUobD2WASq7Ilw2uAT0B9KgYa9Vf6B2nsfcYVGlBiinnVeDA3RBq7SUQqHShPncCBoCAcsC+2gEh0uD0xrHAyCa2bgGAkRDdJRg6FOE+9g4Cl3Kh+wqII1Zjg4YtPahwmKtKep8WeGviUdstNEr/Bc9TFNy+viNOwCb6uo0met0KF54GTVssYeTr0apeffM5QPn2IOLbwbZ310UbTn7GU4XZd4w16OumhT0y+/mAReJRmNKbybdytYlGoJQcCCcq+Bl+vrEzpUFxq+ZWj2zVjP9zOux8hEGt24gM9uHx52BJ66sBldyhhk8URrdjC3mG6WguXNKb2C6BievWvcLI1Yc7QED5BPFJvgjLp55n22oMX3+HRIUWtQ9BufJGgk0syt6aEh9msFfuDot7BGmjtfJrWULkR/Ex1+m6L5t+OqvjibfETMOh3eD9w9nZxRNydfiaoC5iAL+PHXDB18k1I7V7BA3Hc6vB/YviRr5OLqBwm1M/nQmXBo89OkSh/np4eGSOjwfhQiSFL2okNIVVvU0eGDUdaUu6jzCMqdMo7Ta2O0qSFBlW1p6oj7Bf7Gq2nXoqytYq6UoTk+ZI36wAV34vTZI0z2L26tJIq6WYf3AwsOeA3cXISr4AtqQ3brmTf8Paib219kn0b5mVunaNhW4BUix07WSLPmc281t4gMTajmU1HxLrtf5dohxUp7sZbgAWZgLOjwGWgeb+ntwBJvrQwtux/vaX5S4K7GFLkTJtvBpMs5akjSsI9qBX4gp9tYI3AK+pA8zhysNP9+3+s8pwyUF7sOz0D+x4HRgDOUlBdoIeOHlCfvtCGYnTg/bsrRR0fnETatlegPDmcsKQc0OYSd/ZBWQ9mPlKMEyEHtGcQehZBZzMUbSEOc1KGDgUVlrPFfIMpknQ6bAxjEsTjiNR5wGiIaMn+O1lHzAMOT2qkc6SueYreOVjh0TbXxDvtPFPPj/v9GgNOHXG+Bo8A+1RcqMefFeO29CCCNcuzEju3Xd18HnpOKeJZ3E54td/BsChvf7/m3v57UOkPldYAOfAQ7UQ3h1yDklDpNl36N0av+ox8Ihf4A01JQ0qKOxpsAAAAASUVORK5CYII=" /></a>
                                <a><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGVSURBVFhHYxgFo4BWwCZkm6h9wNYMu8DN5dTEIDNBZkOtIQ7YBW51BeLX9oFb/9MCg80O2uICtQ4/sAzcKUZLx8Aw2A6fTSJQa3EDUJBiM4AW2C5gSxrUWtzAPmBLBTbNtMDAUGqGWosbUMtBUVn7/+dWH/9fVH8SjL1jdmGoATqoHWotbkCpgzLLj/5/9OTLf3SQU3UMQy3NHeQVvfP/x08/oU5ABQPioJqOs1DrIeDL19//L159+//Mxdf/E/IPYainuYOmzLsGdQoEgByITR0M09xBMxffgDoFArBFEzKmmYPSSo6Ac9KW3Y+gToGAyXOvDUwuu3TtHdQJuEFExn4MfQPmoB8///x3DNqGoY9mDlq9+R44Jz159hXqBAi4cecDWHzrnsdY9Y2cRA3Dow4ihEcdRAiPOogQHg4OIqYJS34jP7/2xP+l6+7AcXj6Pqzq4DhgayrUWtwA1IkDupzm3SBgTLwiqhsEAkAH0bSjCHYMsR1FGACHFLDfBDSgBRi0HVTBQLPAZhIbMqNgFJAMGBgAIRE6D/cJ0FYAAAAASUVORK5CYII=" /></a>
                                <a><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJXSURBVFhH7ZY7iBRBFEXL/vjDD2iqBmqoIqKBIKKBKCyCCCaGGghmBioiJiaiJoKCmriBuPOqcWUxEA0MNfeTayQsLjozr3pEcae93T5WZ7Z6u2p7DIQ+cGGntt69r7s+M6qhoeG/JMmWxhO8I9K9vepJZ72M1iSZXiV/uaP7K0LN10My7VCb7Ld4NtD8Ita8XWapkPggxk7KRwfwhAGZt0q3t8pINU+zlQHx6z+NDIsNGhmHPuJzRyW9TVJZTZR09xUmxJ/ixOyU4QXBW7kz2ECJyHwNKT0atrrH1WS6QcoXBo2c+MuAA21Oyb/sJF/W4g38GAguU7GcPIuMG1JdTUTd/cNGWMKX+UaVKQMg4NDw/FIR96GrKsuWSLkDz/rL8CQzNjNsxufFhnw4s0Zm442mx+bNLVG+z6TMD4SesxnOifgnlvINGn8EkXWORfCdkgh3ool0d7Gxie/aTOuJ70mMOygck2K3jeohvNUrEuMB9geKO8Nmo1B+YCTFD5yqCzbDWsKRV/ezWCI8wbGEgdtl5yocAHFfJEkWwuQw1v2VNcBHuDLK7jFnYjK7YPTdGuCpRR13GzhpD2wBnuqoVnuLWNYkX7a8qfzKt4dVqrjZR01E6R40dRP76b0ttFRkbovFiBnPlhdXAXHPGmwTTqnfl2gVaCJs8QE0cQ3m09ZQm4jTgNIz4lKTqc+rsSyX0cD8b/sqFb8GzKTXL01nWr2NWKJLCHiXB1kbmBN/wAPciom3SfU/RrfXIfgImjsNnYcuBtQ9i7Ex9fjbZpnV0NDQ4I9SvwB4Uv/ot1KMMAAAAABJRU5ErkJggg==" /></a>

                            </div>
                        </div>
                    </div>
                </form>
            </Fragment>
        )
    }

}