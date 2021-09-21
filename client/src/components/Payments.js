import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import * as actions from "../actions";
import { connect } from "react-redux";

class Payments extends Component {
    render() {
        return (
            <StripeCheckout
                name="FeedbackHub"
                description="$5 for 5 email"
                amount={500}
                token={(token) => this.props.handleToken()}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn"> Add Credits </button>
            </StripeCheckout>
        );
    }
}
export default connect(null, actions)(Payments);
