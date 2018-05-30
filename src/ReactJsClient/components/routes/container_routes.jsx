import React, { Component } from 'react'
//Todo: Component
import SignUp from '../accounts/sign_up_form.jsx'
import SignIn from '../accounts/sign_in_form.jsx'
import IndexContainer from '../../containers/index_container.jsx'
import SignInContainer from '../../containers/accounts/sign_in_container.jsx'
import Authen_Failed from '../accounts/authen_failed.jsx'
import HomePublic from '../public/home_page.jsx'
import NotFoundPage from '../main/not_found_page.jsx'

export const _privte_routes = [
    {
        path: '/index',
        exact: false,
        component: IndexContainer
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
    }
]
