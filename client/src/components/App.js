import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import { connect } from "react-redux";
import * as actions from "../actions";
import Landing from "./Landing";

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Header />
                    <Route exact path="/" component={Landing} />
                </BrowserRouter>
                Hi there!
            </div>
        );
    }
}
export default connect(null, actions)(App);
