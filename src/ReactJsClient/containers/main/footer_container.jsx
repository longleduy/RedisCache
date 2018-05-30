import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
//Todo: Component
import Footer from '../../components/main/footer.jsx'
//Todo: Untils

export default class FooterContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Footer />
        )
    }
}
export default connect(null, null)(ContainerContainer);