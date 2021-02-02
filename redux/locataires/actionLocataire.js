import React from "react";
import {
  LIST_LOCATAIRE,
  MESSAGE,
  COUNT_LOCATAIRE,
  LIST_LOCATAIRE_STATUS,
} from "./type";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("datab.db");

const listLocataire = (locataire) => {
  return {
    type: LIST_LOCATAIRE,
    payload: locataire,
  };
};

const listLocataireStatus = (status) => {
  return {
    type: LIST_LOCATAIRE_STATUS,
    payload: status,
  };
};

const message = (message) => {
  return {
    type: MESSAGE,
    payload: message,
  };
};

const countLocataire = (count) => {
  return {
    type: COUNT_LOCATAIRE,
    payload: count,
  };
};

export const inserLocataire = (nom, prenom, telephone, cni) => {
  return async (dispatch) => {
    try {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "insert into locataires (nom,prenom,telephone,cni,status) values (?,?,?,?,?)",
            [nom, prenom, telephone, cni, "0"]
          );
        },
        (t, error) => {

        },
        (t, success) => {
            dispatch(message("db sucess locataire"));
        }
      );
    } catch (e) {

    }
  };
};

export const list_locataire = () => {
  return (dispatch) => {
    try {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "select * from locataires",
            [],
            (_, { rows: { _array } }) => {
              dispatch(listLocataire(_array));

              let row;

              if (_array.length > 0) {
                for (let i = 0; i < _array.length; i++) {
                  row = i;
                }
                dispatch(countLocataire(row + 1));


              }
            }
          );
        },
        (t, error) => {
   
        },
        (_t, _success) => {
    
        }
      );
    } catch (e) {
    
    }
  };
};

export const list_locataire_status = () => {
  return (dispatch) => {
    try {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "select * from locataires where status = ?",
            [0],
            (_, { rows: { _array } }) => {
              dispatch(listLocataireStatus(_array));
            }
          );
        },
        (t, error) => {},
        (_t, _success) => {}
      );
    } catch (e) {}
  };
};


export const update_locataire =(id,status)=>{

     return (dispatch) => {
       try {
         db.transaction(
           (tx) => {
             tx.executeSql(
               "update locataires set status=? where idLocataire=?",
               [status, id],
             );},
           (t, error) => {},
           (_t, _success) => {dispatch(message("Locataire update"));}
         );
       } catch (e) {}
     };

}