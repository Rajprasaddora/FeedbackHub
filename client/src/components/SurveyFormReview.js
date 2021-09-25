import React from "react";
import { FIELDS } from "./SurveyForm";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "./../actions";
import { withRouter } from "react-router";

function SurveyFormReview({ onCancel, formValues, submitSurvey, history }) {
    const renderContent = _.map(FIELDS, (field) => {
        return (
            <div key={field.name}>
                <label>{field.label}</label>
                <div>{formValues[field.name]}</div>
            </div>
        );
    });
    return (
        <div>
            <h5>Please confirm your emails</h5>
            {renderContent}
            <button
                className="yellow darken-3 white-text btn-flat"
                onClick={onCancel}
            >
                Back
            </button>
            <button
                onClick={() => submitSurvey(formValues, history)}
                className="green btn-flat right white-text"
            >
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
}

function mapStateToProps(state) {
    return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
