import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducerLogement from "./logements/reducerLogement";
import reducerLocataire from "./locataires/reducerLocataire";
import reducerLocation from "./locations/reducerLocation"

const rootReducer = combineReducers({
  logement: reducerLogement,
  locataire: reducerLocataire,
  location:reducerLocation

});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
