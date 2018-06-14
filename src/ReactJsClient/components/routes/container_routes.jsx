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

export const _privte_routes = [
    {
        path: '/index',
        exact: false,
        component: IndexContainer
    },
    {
        path: '/user/information',
        exact: false,
        component: AccountInfoContainer
    },
    {
        path: '/user/change_pass_word',
        exact: true,
        component: ChangePassWordContainer
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
