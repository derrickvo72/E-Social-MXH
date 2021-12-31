import { chatApi } from "../axiosApi/api/chatApi";

const initialState = {
  data: [],
  next: [],
  pageNext: 2,
  totalPages: 0,
  totalResults: 0,
  more: true,
  error: null,
};

// Child reducer
export const mediaReducer = (
  state = initialState,
  { type, payload, ...action }
) => {
  switch (type) {
    case "GET_SUCCES_MEDIA": {
      state.data = payload.results;
      state.next = [];
      state.pageNext = 2;
      state.totalPages = payload.totalPages;
      state.totalResults = payload.totalResults;
      state.error = null;
      if (state.pageNext > state.totalPages) state.more = false;
      else state.more = true;
      return { ...state };
    }

    case "ADD_MORE_MEDIA": {
      state.next = payload.results;
      if (state.pageNext > state.totalPages) state.more = false;
      else {
        state.data = [...state.data, ...state.next];
        state.pageNext = state.pageNext + 1;
        state.more = true;
      }
      return { ...state };
    }

    case "LOG_OUT_MEDIA": {
      state.data = [];
      state.next = [];
      state.pageNext = 0;
      state.totalPages = 0;
      state.totalResults = 0;
      state.error = null;
      state.more = true;

      return { ...state };
    }

    default: {
      return { ...state };
    }
  }
};

export const actGetMediaByConver = (
  token,
  converId,
  firstPage,
  limit,
  type
) => {
  return (dispatch) => {
    chatApi
      .getFileByToken(token, converId, firstPage, limit, type)
      .then((result) => {
        // console.log("ReduxConver", result.data.results);
        dispatch({
          type: "GET_SUCCES_MEDIA",
          payload: result.data,
        });
      })
      .catch((error) => {
        console.log("getConver", error);
      });
  };
};

export const actLoadMoreMedia = (token, converId, firstPage, limit, type) => {
  return (dispatch) => {
    chatApi
      .getFileByToken(token, converId, firstPage, limit, type)
      .then((result) => {
        console.log("re", result.data);
        dispatch({
          type: "ADD_MORE_MEDIA",
          payload: result.data,
        });
      })
      .catch((error) => {
        console.log("getMoreConver", error);
      });
  };
};

export const actLogoutMedia = () => {
  return (dispatch) => {
    dispatch({
      type: "LOG_OUT_MEDIA",
    });
  };
};
