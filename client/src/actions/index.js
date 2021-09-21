import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () => {
    return function (dispatch) {
        axios
            .get("/api/current_user")
            .then((res) => dispatch({ type: FETCH_USER, payload: res }));
    };
};

export const handleToken = (token) => async (dispatch) => {
    const res = await axios.post("/api/stripe", token);
    console.log("res is ", res);
    dispatch({ type: FETCH_USER, payload: res.data });
};
