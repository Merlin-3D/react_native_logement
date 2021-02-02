import * as SQLite from "expo-sqlite";
import { LIST_LOCATION, MESSAGE, COUNT_LOCATION } from "./type";

const db = SQLite.openDatabase("datab.db");

const listLocation = (location) => {
  return {
    type: LIST_LOCATION,
    payload: location,
  };
};

const message = (message) => {
  return {
    type: MESSAGE,
    payload: message,
  };
};

const countLocation = (count) => {
  return {
    type: COUNT_LOCATION,
    payload: count,
  };
};

export const inserLocation = (
  avance,
  caution,
  validite,
  id_logement,
  id_locataire
) => {
  return async (dispatch) => {
    try {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "insert into locations (avance,caution,validite,id_logement,id_locataire) values (?,?,?,?,?)",
            [avance, caution, validite, id_logement, id_locataire]
          );
        },
      );
    } catch (e) {
      console.log(e);
    }
  };
};

export const list_location = () => {
  return (dispatch) => {
    try {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "select *  from locations inner Join logements  on logements.idLogement = locations.id_logement inner Join locataires  on locataires.idLocataire = locations.id_locataire",
            [],
            (_, { rows: { _array } }) => {
             //console.log(_array);
              dispatch(listLocation(_array));
              let row;

              if (_array.length > 0) {
                for (let i = 0; i < _array.length; i++) {
                  row = i;
                  //  console.log("row : " + JSON.stringify(row));inner Join logements  on logements.id = locations.id_logement
                }
                dispatch(countLocation(row + 1));

              }
            }
          );
        },
      );
    } catch (e) {
      console.log(e);
    }
  };
};

 export const delete_location = (id) =>{
      return (dispatch) => {
        try {
          db.transaction(
            (tx) => {
              tx.executeSql(
                "DELETE FROM  locations where idLocation=?",
                [id],
              );
            },

          );
        } catch (e) {
        }
      };
  };

   export const prolongement_date = (id, date) => {
     return (dispatch) => {
       try {
         db.transaction(
           (tx) => {
             tx.executeSql(
               "UPDATE locations set validite=? where idLocation=?",
               [date, id],
             );
           },
         );
       } catch (e) {
       }
     };
   };