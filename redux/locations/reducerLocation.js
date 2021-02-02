import { LIST_LOCATION, MESSAGE, LOADING, COUNT_LOCATION } from "./type";

const initial = {
  locations: [],
  loading: false,
  message: "",
  count:""
};

const locationReducer = (state = initial, action) => {
  switch (action.type) {
    case LIST_LOCATION:
      return {
        ...state,
        locations: action.payload,
      };
    case COUNT_LOCATION:
      return {
        ...state,
        count: action.payload,
      };
    case MESSAGE:
      return {
        ...state,
        message: action.payload,
      };

    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

export default locationReducer;
