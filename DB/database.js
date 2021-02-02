import * as SQLite from "expo-sqlite"

const db = SQLite.openDatabase("datab.db");

export const logementTable = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS logements (idLogement INTEGER PRIMARY KEY AUTOINCREMENT, intitule text, mensuel text, ville text, quartier text,status int);'
      );
    },
      (_, error) => { console.log("db error creating tables"); console.log(error); reject(error) },
    )
  })
}


export const locataireTable = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS locataires (idLocataire INTEGER PRIMARY KEY AUTOINCREMENT, nom text, prenom text, telephone text, cni text,status int);'
      );
    },
      (_, error) => { console.log("db error creating tables"); console.log(error); reject(error) },
    )
  })
}

export const locationTable = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS locations (idLocation INTEGER PRIMARY KEY AUTOINCREMENT, avance text, caution text, validite text, id_logement INTEGER NOT NULL,id_locataire INTEGER NOT NULL,FOREIGN KEY (id_logement) REFERENCES logements (id),FOREIGN KEY (id_locataire) REFERENCES locataires (id) );"
        );
      },
      (_, error) => {
        console.log("db error creating tables");
        console.log(error);
        reject(error);
      }
    );
  });
};