
import * as SQLite from "expo-sqlite"
import { LIST, MESSAGE, COUNT_LOGEMENT, LIST_LOGEMENT_STATUS } from "./type";

const db = SQLite.openDatabase("datab.db");

const listLogement = (logement) => {
  return {
    type: LIST,
    payload: logement,
  };
};
const countLogement = (count) => {
  return {
    type: COUNT_LOGEMENT,
    payload: count,
  };
};

const listLogementStatus = (status) => {
  return {
    type: LIST_LOGEMENT_STATUS,
    payload: status,
  };
};

const message = (message) => {
  return {
    type: MESSAGE,
    payload: message,
  };
};

export const inserLogement = (intitule, mensuel, ville, quartier)=>{
   return async (dispatch) => {
         try {
            db.transaction( tx => {
                tx.executeSql( 'insert into logements (intitule,mensuel,ville,quartier,status) values (?,?,?,?,?)', [intitule,mensuel,ville,quartier,'0'] );
            },
               
            (t, error) => { console.log("error"); },
            (t) => { 
                dispatch(message("db sucess insertUser"));
                 }
        )
           
        } catch (e) {
    
        }
    }
    
}

export const list_logement = () => {
     return (dispatch) => {
         try {
           db.transaction(
            tx =>  {
            tx.executeSql(
                'select * from logements',
                [],
                (_, { rows: { _array } }) => {
      
                dispatch(listLogement(_array))
                  
                let row;

                if (_array.length > 0) {
                    for (let i = 0; i < _array.length; i++) {
                    row = i;
                    //console.log("row : " + JSON.stringify(row));
                    }
                    dispatch(countLogement(row+1));

                    //this.setState({ count2: row });
                }

                }
            );
            },
            (t, error) => {  },
            (_t, _success) => {}
        );
        } catch (e) {
           
        }
    }
}

export const list_logement_status = () => {
  return (dispatch) => {
    try {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "select * from logements where status = ?",
            [0],
            (_, { rows: { _array } }) => {
              console.log(_array);
              dispatch(listLogementStatus(_array));
            }
          );
        },
        (t, error) => {},
        (_t, _success) => {}
      );
    } catch (e) {}
  };
};

export const update_logement = (id, status) => {
  return (dispatch) => {
    try {
      db.transaction(
        (tx) => {
          tx.executeSql("update logements set status=? where idLogement=?", [
            status,
            id,
          ]);
        },
        (t, error) => {},
        (_t, _success) => {
          dispatch(message("Locataire logement"));
        }
      );
    } catch (e) {}
  };
};