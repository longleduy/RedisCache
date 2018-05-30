import React, { Component } from 'react'
//Todo: Component
import SignUp from '../accounts/sign_up_form.jsx'
import SignIn from '../accounts/sign_in_form.jsx'
import IndexContainer from '../../containers/index_container.jsx'
import SignInContainer from '../../containers/accounts/sign_in_container.jsx'
import Authen_Failed from '../accounts/authen_failed.jsx'
import HomePublic from '../public/home_page.jsx'

const _header_routes = [
    {
        path: '/',
        exact: true,
        main: () => <HomePublic/>
    },
    {
        path: '/home_public',
        exact: false,
        main: () => <HomePublic />
    },
    {
        path: '/sign_in',
        exact: false,
        main: ({match}) => <SignInContainer match={match} />
    },
    {
        path: '/sign_up',
        exact: false,
        main: () => <SignUp />
    },
    {
        path: '/index',
        exact: false,
        main: () => <IndexContainer />
    },
    {
        path: '/authen_failed',
        exact: false,
        main: () => <Authen_Failed />
    }
   
]
export default routes;
