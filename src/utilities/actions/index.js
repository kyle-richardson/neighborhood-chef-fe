import axios from "axios";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const INCREMENT = "INCREMENT";
export const MAKEACTIVE = "MAKEACTIVE";
export const CHANGE_MONTH = "CHANGE_MONTH";
export const RSVP = "RSVP";
export const CHANGE_PAGE = "CHANGE_PAGE";

//action using thunk middleware, NOT hooks
export const login = (event, credentials) => (dispatch) => {
  event.preventDefault();
  dispatch({ type: LOGIN_START });
  axios
    .post("https://example-neighborhood.com/login", credentials)
    .then((res) => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: LOGIN_FAIL, payload: err });
    });
};

//simplified action using useDispatch hooks within component
export const increment = () => ({
  type: INCREMENT,
});

export const makeActive = (id) => ({
  type: MAKEACTIVE,
  payload: id,
});

export const setMonth = (type) => ({
  type: CHANGE_MONTH,
  payload: type,
});

export const rsvp = (event, id) => {
  event.preventDefault();
  return {
    type: RSVP,
    payload: {
      name: event.target.innerHTML,
      id: id,
    },
  };
};

export const changePage = () => ({
  type: CHANGE_PAGE,
});
