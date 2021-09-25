import React, { Component } from "react";
import _ from "lodash";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";
import validateEmails from "../utils/validateEmails";

export const FIELDS = [
    { label: "Survey Title", name: "title" },
    { label: "Subject Line", name: "subject" },
    { label: "Email Body", name: "body" },
    { label: "Recipient List", name: "recipients" },
];

class SurveyForm extends Component {
    renderFields() {
        return _.map(FIELDS, ({ label, name }) => {
            return (
                <Field
                    key={name}
                    component={SurveyField}
                    type="text"
                    label={label}
                    name={name}
                />
            );
        });
    }
    render() {
        return (
            <div>
                SurveyForm!
                <form
                    onSubmit={this.props.handleSubmit(
                        this.props.onSurveySubmit
                    )}
                >
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        className="teal btn-flat right white-text"
                    >
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};
    errors.recipients = validateEmails(values.recipients || "");
    _.each(FIELDS, ({ name }) => {
        if (!values[name]) {
            errors[name] = "You must provide a value";
        }
    });

    return errors;
}

export default reduxForm({
    validate: validate,
    form: "surveyForm",
    destroyOnUnmount: false,
})(SurveyForm);
