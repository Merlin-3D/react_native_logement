import {
  LIST_LOCATAIRE,
  MESSAGE,
  LOADING,
  COUNT_LOCATAIRE,
  LIST_LOCATAIRE_STATUS,
} from "./type";


const initial = {
  locataires: [],
  loading: false,
  message: "",
  count:"",
  listStatus:[]
};

const logementReducer = (state = initial, action) => {
  switch (action.type) {
    case LIST_LOCATAIRE:
      return {
        ...state,
        locataires: action.payload,
      };
    case COUNT_LOCATAIRE:
      return {
        ...state,
        count: action.payload,
      };
    case LIST_LOCATAIRE_STATUS:
      return {
        ...state,
        listStatus: action.payload,
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
