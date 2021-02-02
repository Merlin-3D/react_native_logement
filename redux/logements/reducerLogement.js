import {
  LIST,
  MESSAGE,
  LOADING,
  COUNT_LOGEMENT,
  LIST_LOGEMENT_STATUS,
} from "./type";

const initial = {
  logements: [],
  loading: false,
  message: "",
  count:"",
  statusLogement:[]

};

const logementReducer = (state = initial, action) => {
  switch (action.type) {
    case LIST:
      return {
        ...state,
        logements: action.payload,
      };
    case COUNT_LOGEMENT:
      return {
        ...state,
        count: action.payload,
      };
    case LIST_LOGEMENT_STATUS:
      return {
        ...state,
        statusLogement: action.payload,
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

export default logementReducer;
