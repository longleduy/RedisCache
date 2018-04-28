import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '../components/Card';
import CardItem from '../components/CardItem';
import CardResult from '../components/CardResult';
import { changeAmounts, deleteCard } from '../actions/action';
class Card_container extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if (this.props.cards.length > 0) {
            $(".card_list").show(500);
        }
        else {
            $(".card_list").slideUp(500);
        }
    }
    showCards = (cards) => {
        let cardResult;
        let { changeAmounts } = this.props;
        let { deleteCard } = this.props;
        if (cards.length > 0) {
            return cardResult = cards.map((card, index) => {
                return <CardItem key={index}
                    card={card}
                    changeAmounts={changeAmounts}
                    deleteCard={deleteCard}
                />
            })
        }
    }
    showTotal = (cards) => {
        return <CardResult
            cards={cards}
        />
    }
    render() {
        let { cards } = this.props;
        return (
            <Card cards={cards}>
                {this.showCards(cards)}
                <CardResult cards={cards} />
            </Card>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        cards: state.cards
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        changeAmounts: (change_action, id) => {
            dispatch(changeAmounts(change_action, id))
        },
        deleteCard: (id) => {
            dispatch(deleteCard(id));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Card_container);