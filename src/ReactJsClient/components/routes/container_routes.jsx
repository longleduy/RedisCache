import React, { Component } from 'react'
//Todo: Component
import SignUp from '../accounts/sign_up_form.jsx'
import IndexContainer from '../../containers/index_container.jsx'
import SignInContainer from '../../containers/accounts/sign_in_container.jsx'
import Authen_Failed from '../accounts/authen_failed.jsx'
import HomePublic from '../public/home_page.jsx'
import AccountInfoContainer from '../../containers/accounts/account_info_container.jsx'
import ChangePassWordContainer from '../../containers/accounts/change_pass_word_container.jsx'
import ConfirmAuthSignInContainer from '../../containers/accounts/confirm_auth_sign_in_controller.jsx'
import EditProfileController from '../../containers/accounts/edit_profile_controller.jsx'
import ForgotPassWord from '../../components/accounts/forgot_password.jsx'

export const _privte_routes = [
    {
        path: '/index',
        exact: false,
        component: IndexContainer,
        title: 'Index'
    },
    {
        path: '/user/information',
        exact: false,
        component: AccountInfoContainer,
        title: 'User Information'
    },
    {
        path: '/user/change_pass_word',
        exact: true,
        component: ChangePassWordContainer,
        title: 'Reset PassWord'
    },
    {
        path: '/user/edit_profile',
        exact: true,
        component: EditProfileController,
        title: 'Edit Profile'
    }
]
export const _public_routes = [
    {
        path: '/',
        exact: true,
        main: () => <HomePublic/>
    },
    {
        path: '/sign_up',
        exact: true,
        main: () => <SignUp/>
    },
    {
        path: '/sign_in',
        exact: true,
        main: () => <SignInContainer/>
    },
    {
        path: '/forgot_password',
        exact: true,
        main: () => <ForgotPassWord/>
    },
    {
        path: '/authen_failed',
        exact: true,
        main: () => <Authen_Failed/>
    },
    {
        path: '/confirm_auth_sign_in',
        exact: true,
        main: () => <ConfirmAuthSignInContainer/>
    }
]
