import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS } from "./types";

export const fetchUser = () => async (dispatch) => {
    const res = await axios.get("/api/current_user");
    console.log("user fetched ", res);
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async (dispatch) => {
    const res = await axios.post("/api/stripe", token);
    console.log("res is ", res);
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async (dispatch) => {
    const res = await axios.post("/api/surveys", values);
    console.log("clicked");
    history.push("/surveys");
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async (dispatch) => {
    const res = await axios.get("/api/surveys");
    dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
