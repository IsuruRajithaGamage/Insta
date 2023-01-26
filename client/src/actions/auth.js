import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";

//manual log in the user
export const signin = (formData, history) => async (dispatch) => {
  try {
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

//manual signup user
export const signup = (formData, history) => async (dispatch) => {
  try {
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
