import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal, TouchableHighlight } from 'react-native'
import Inputs from '../Components/Inputs'
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';
import {
  list_logement,
  update_logement,
  list_logement_status,
} from "../redux/logements/actionLogement";
import {
  list_locataire,
  update_locataire,
  list_locataire_status,
} from "../redux/locataires/actionLocataire";
import { inserLocation, list_location } from '../redux/locations/actionLocation';
import DatePicker from 'react-native-datepicker';



class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalVisible2: false,
      logement: "",
      locataire: "",
      avance: "",
      caution: "",
      validite: "",
      id_logement: 0,
      id_locataire: 0,
      date: null,
      dt: null,
      registrationDate: "",
    };
  }

  componentDidMount() {
    this.props.listLogement()
  }

  openLogement() {
    this.props.listLogement();
    this.setState({ modalVisible: true });
  }
  openLocataire() {
    this.props.listLocataire();
    this.setState({ modalVisible2: true });
  }

  takeLogement(value, id) {
    this.setState({ logement: value });
    this.setState({ modalVisible: false });
    this.setState({ id_logement: id });

  }
  takeLocation(value, id) {
    this.setState({ locataire: value });
    this.setState({ id_locataire: id });

    this.setState({ modalVisible2: false });
  }
_showAlert = () => {
     Alert.alert(
       "Success",
       "Location Attribué",
       [
         {
           text: "Cancel",
           onPress: () => console.log("Cancel Pressed"),
           style: "cancel",
         },
         {
           text: "OK",
           onPress: () => {this.props.navigation.navigate("TabNavigation"),
             this.props.listLocation();},
         },
       ],
       { cancelable: false }
     );
   };

  handle = () => {
     this.setState({ msg: "" });

     if (
       this.state.avance === "" ||
       this.state.caution === "" ||
       this.state.date === ""
     ) {
       this.setState({ msg: "Remplir tout les champs" });
     } else {
         this.props.ajouterLocation(
           this.state.avance,
           this.state.caution,
           this.state.date,
           this.state.id_logement,
           this.state.id_locataire
         );
           
         this.props.updateLocataire(this.state.id_locataire, 1);
         this.props.updateLogement(this.state.id_logement,1);

       this._showAlert();
     }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Liste Logement</Text>
                <ScrollView>
                  {this.props.logements
                    ? this.props.logements.map((tasks) => {
                        return (
                          <TouchableHighlight
                            onPress={() =>
                              this.takeLogement(
                                tasks.intitule,
                                tasks.idLogement
                              )
                            }
                            key={tasks.idLogement}
                          >
                            <Text
                              style={{
                                borderColor: "grey",
                                padding: 10,
                                borderTopWidth: 2,
                              }}
                            >
                              <Ionicons
                                name="md-home"
                                size={18}
                                color="grey"
                                style={styles.count}
                              />{" "}
                              {tasks.intitule}{" "}
                            </Text>
                          </TouchableHighlight>
                        );
                      })
                    : null}
                </ScrollView>
                <TouchableHighlight
                  style={styles.openButton}
                  onPress={() => this.setState({ modalVisible: false })}
                >
                  <Text style={styles.textStyle}>Quitter</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>

          <TouchableHighlight
            style={styles.openButton}
            onPress={() => this.openLogement()}
          >
            <Text style={styles.textStyle}>
              {this.state.logement != ""
                ? this.state.logement
                : "Choisir un logoment"}
            </Text>
          </TouchableHighlight>
        </View>

        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible2}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Liste Locataire</Text>
                <ScrollView>
                  {this.props.locataires
                    ? this.props.locataires.map((tasks) => {
                        return (
                          <TouchableHighlight
                            onPress={() =>
                              this.takeLocation(tasks.nom, tasks.idLocataire)
                            }
                            key={tasks.idLocataire}
                          >
                            <Text
                              style={{
                                borderColor: "grey",
                                padding: 10,
                                borderTopWidth: 2,
                              }}
                            >
                              <Ionicons
                                name="ios-people"
                                size={18}
                                color="grey"
                                style={styles.count}
                              />{" "}
                              {tasks.nom}{" "}
                            </Text>
                          </TouchableHighlight>
                        );
                      })
                    : null}
                </ScrollView>
                <TouchableHighlight
                  style={styles.openButton}
                  onPress={() => this.setState({ modalVisible2: false })}
                >
                  <Text style={styles.textStyle}>Quitter</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>

          <TouchableHighlight
            style={styles.openButton}
            onPress={() => this.openLocataire()}
          >
            <Text style={styles.textStyle}>
              {this.state.locataire != ""
                ? this.state.locataire
                : "Choisir un locataire"}
            </Text>
          </TouchableHighlight>
        </View>

        <>
          <Inputs
            label="Avance payer"
            keyboard="numeric"
            placeholder="00.00"
            onChangeText={(avance) => this.setState({ avance: avance })}
          />
          <Inputs
            label="Caution"
            keyboard="numeric"
            placeholder="00.00"
            onChangeText={(caution) => this.setState({ caution: caution })}
          />
          <DatePicker
            showIcon={false}
            androidMode="spinner"
            style={{ width: 300 }}
            date={this.state.date}
            mode="date"
            placeholder="Expiration du loyer"
            format="DD-MM-YYYY"
            maxDate={"01-01-2050"}
            confirmBtnText="Chọn"
            cancelBtnText="Hủy"
            customStyles={{
              dateInput: {
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: "black",
              },
            }}
            style={styles.inputBox}
            onDateChange={(date) => {
              this.setState({ date: date });
            }}
          />
        </>
        <TouchableOpacity style={styles.button} onPress={() => this.handle()}>
          <Text style={styles.buttonText}>Attribuer</Text>
        </TouchableOpacity>
        {this.state.msg != "" && (
           <Text style={styles.msg}>{this.state.msg}</Text>
         )}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return {
      listLogement: () => dispatch(list_logement_status()),
      listLocataire: () => dispatch(list_locataire_status()),
      ajouterLocation: (avance, caution, validite, id_logement, id_locataire) =>
        dispatch(
          inserLocation(avance, caution, validite, id_logement, id_locataire)
        ),
      updateLocataire: (id, status) => dispatch(update_locataire(id, status)),
      updateLogement: (id, status) => dispatch(update_logement(id, status)),
      listLocation: () => dispatch(list_location()),
    };
    
}

const mapStateToPross = state => {

  return {
    locataires: state.locataire.listStatus,
    logements: state.logement.statusLogement,
  };

}

export default connect(mapStateToPross,  mapDispatchToProps )(Locations)


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonSelect: {
    marginTop: 10,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "grey",
    borderWidth: 1,
    width: 350,
    alignSelf: "center",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#fff",
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#2980b9",
    borderRadius: 5,
    width: 200,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  inputBox: {
    margin: 5,
    padding: 5,
    fontSize: 16,
    borderColor: "#d3d3d3",
    textAlign: "center",
    width: 350,
  },
  buttonSignup: {
    fontSize: 12,
  },
  centeredView: {},
  modalView: {
    margin: 20,
    height: 450,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#7f8c8d",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginTop: 5,
    marginHorizontal: 5,
    color: "white",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  msg: {
    fontSize: 15,
    fontWeight: "bold",
    color: "red",
    alignSelf: "center",
  },
});