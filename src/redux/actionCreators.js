export const fetchItemsThunked = () => (dispatch, getState) => {
  const url = getState().listReducer.url;

  dispatch({ type: "SET_ERROR", payload: false });
  dispatch({ type: "SET_LOADING", payload: "loading" });
  fetch(`${url}/services`)
    .then((response) => {
      if (response.status > 300) {
        console.log("error" + response.status);
      }
      return response.json();
    })
    .then((service) => {
      dispatch({ type: "GET_ITEM", payload: service });
      dispatch({ type: "SET_LOADING", payload: "idel" });
    })
    .catch(() => {
      dispatch({ type: "SET_ERROR", payload: true });
    });
};

export const fetchDelItemsThunked = (id) => (dispatch, getState) => {
  const url = getState().listReducer.url;
  dispatch({ type: "SET_ERROR", payload: false });
  dispatch({ type: "SET_LOADING", payload: "loading" });
  fetch(`${url}/services/:${id}`, { method: "DELETE" })
    .then((response) => {
      if (response.status === 204) {
        dispatch({ type: "DELETE_ITEM", payload: id });
        dispatch({ type: "SET_LOADING", payload: "idel" });
      }
    })
    .catch(() => {
      dispatch({ type: "SET_ERROR", payload: true });
      dispatch({ type: "SET_LOADING", payload: "idel" });
    });
};

export const fetchItemFormThunked = (id) => (dispatch, getState) => {
  const url = getState().listReducer.url;
  dispatch({ type: "SET_ERROR", payload: false });
  dispatch({ type: "SET_LOADING", payload: "loading" });
  fetch(`${url}/services/${id}`)
    .then((response) => {
      return response.json();
    })
    .then((item) => {
      dispatch({ type: "SET_LOADING", payload: "idel" });
      dispatch({
        type: "CHANGE_FORM_IN_ITEM",
        payload: {
          name: item.name,
          price: item.price,
          content: item.content,
        },
      });
    })
    .catch(() => {
      dispatch({ type: "SET_LOADING", payload: "idel" });
      dispatch({ type: "SET_ERROR", payload: true });
    });
};

export const fetchEditItemThunked = (id, navigate) => (dispatch, getState) => {
  const url = getState().listReducer.url;
  const form = getState().formReducer;
  dispatch({ type: "SET_LOADING", payload: "loading" });
  fetch(`${url}/services/`, {
    method: "POST",
    body: JSON.stringify({ ...form, id: +id }),
  })
    .then((response) => {
      if (response.status === 204) {
        dispatch({ type: "SET_LOADING", payload: "idel" });
        navigate("/");
      }
    })
    .catch(() => {
      dispatch({ type: "SET_LOADING", payload: "idel" });
      dispatch({ type: "SET_ERROR", payload: true });
    });
};
