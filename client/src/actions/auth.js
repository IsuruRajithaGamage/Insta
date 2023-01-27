import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";

//manual log in the user
export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });

    history.push("/home");
  } catch (error) {
    console.log(error);
  }
};

//manual signup user
export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });

    history.push("/home");
  } catch (error) {
    console.log(error);
  }
};
