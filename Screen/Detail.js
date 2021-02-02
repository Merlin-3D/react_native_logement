import React, { Component } from 'react'
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons"; 
import { MaterialIcons } from "@expo/vector-icons"; 
import DatePicker from "react-native-datepicker";
import { connect } from "react-redux";
import {
  delete_location,
  prolongement_date,
  list_location,
} from "../redux/locations/actionLocation";
import * as SMS from "expo-sms";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      dt: null,
      registrationDate: "",
    };
  }


  sendMessage = async () => {
    await SMS.sendSMSAsync(
      this.props.route.params.id.telephone,
      "Bsr M./Mm pensée a renouveller votre location"
    );
  };

  _showAlert = (msg) => {
    Alert.alert(
      "Success",
      msg,
      [
        {
          text: "Cancel",
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

  async handlDelete() {
    await this.props.deleteLocation(this.props.route.params.id.idLocation);
    this._showAlert(
      "Location détenue par :" +
        this.props.route.params.id.nom +
        " " +
        this.props.route.params.id.prenom +
        " a été supprimer"
    );
  }

  async handlDate() {
    await this.props.updateLocation(
      this.props.route.params.id.idLocation,
      this.state.date
    );
    this._showAlert(
      "Location détenue par :" +
        this.props.route.params.id.nom +
        " " +
        this.props.route.params.id.prenom +
        " a été prolonger"
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.nouveauTitre}>Informations Locataire</Text>

        <View style={styles.column}>
          <View>
            <Text style={styles.count}> Nom </Text>
            <Text style={styles.text}>
              {this.props.route.params.id.nom}{" "}
              {this.props.route.params.id.prenom}
            </Text>
          </View>
          <View>
            <Text style={styles.count}> Télèphone</Text>
            <Text style={styles.text}>
              {" "}
              {this.props.route.params.id.telephone}
            </Text>
          </View>
          <View>
            <Text style={styles.count}> CNI </Text>
            <Text style={styles.text}> {this.props.route.params.id.cni}</Text>
          </View>
        </View>

        <Text style={styles.nouveauTitre}>Informations Location</Text>

        <View style={styles.column2}>
          <View>
            <Text style={styles.count2}>
              {" "}
              Intitulé :{" "}
              <Text style={styles.text2}>
                {" "}
                {this.props.route.params.id.intitule}
              </Text>{" "}
            </Text>
          </View>
          <View>
            <Text style={styles.count2}>
              {" "}
              Ville :{" "}
              <Text style={styles.text2}>
                {" "}
                {this.props.route.params.id.ville}
              </Text>
            </Text>
          </View>
          <View>
            <Text style={styles.count2}>
              {" "}
              Quartier :{" "}
              <Text style={styles.text2}>
                {" "}
                {this.props.route.params.id.quartier}
              </Text>
            </Text>
          </View>
          <View>
            <Text style={styles.count2}>
              {" "}
              Coup Mensuel :{" "}
              <Text style={styles.text2}>
                {" "}
                {this.props.route.params.id.mensuel}
              </Text>
            </Text>
          </View>
          <View>
            <Text style={styles.count2}>
              {" "}
              Avance :{" "}
              <Text style={styles.text2}>
                {" "}
                {this.props.route.params.id.avance}
              </Text>
            </Text>
          </View>
          <View>
            <Text style={styles.count2}>
              {" "}
              Caution :{" "}
              <Text style={styles.text2}>
                {" "}
                {this.props.route.params.id.caution}
              </Text>
            </Text>
          </View>
          <View>
            <Text style={styles.count2}>
              {" "}
              Ville :{" "}
              <Text style={styles.text2}>
                {" "}
                {this.props.route.params.id.ville}
              </Text>
            </Text>
          </View>
          <View>
            <Text style={styles.count2}>
              {" "}
              Validité :{" "}
              <Text style={styles.text2}>
                {" "}
                {this.props.route.params.id.validite}
              </Text>
            </Text>
          </View>
          <DatePicker
            showIcon={false}
            androidMode="spinner"
            style={{ width: 300 }}
            date={this.state.date}
            mode="date"
            placeholder="Prologer la date d'expiration"
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
        </View>
        <View style={styles.line}>
          <View style={[styles.backCard, { backgroundColor: "#2980b9" }]}>
            <TouchableOpacity onPress={() => this.sendMessage()}>
              <AntDesign
                name="message1"
                size={24}
                color="#fff"
                style={styles.count}
              />
            </TouchableOpacity>
          </View>

          <View style={[styles.backCard, { backgroundColor: "green" }]}>
            <TouchableOpacity onPress={() => this.handlDate()}>
              <MaterialIcons
                name="update"
                size={24}
                color="#fff"
                style={styles.count}
              />
            </TouchableOpacity>
          </View>

          <View style={[styles.backCard, { backgroundColor: "red" }]}>
            <TouchableOpacity onPress={() => this.handlDelete()}>
              <AntDesign
                name="delete"
                size={24}
                color="#fff"
                style={styles.count}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteLocation: (id) => dispatch(delete_location(id)),
    updateLocation: (id, date) => dispatch(prolongement_date(id, date)),
    listLocation: () => dispatch(list_location()),
  };
};

const mapStateToProps = (state) => {
  return {
    countLocation: state.location.count,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail)

const styles = StyleSheet.create({
  container: {},
  line: {
    flexDirection: "row",
    marginHorizontal: 5,
    borderRadius: 10,
    elevation: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    marginTop: 5,
    height: 80,
  },
  inputBox: {
    margin: 5,
    padding: 5,
    fontSize: 16,
    borderColor: "#d3d3d3",
    backgroundColor:"orange",
    borderRadius:10,
    textAlign: "center",
    width: 340,
  },
  backCard: {
    borderRadius: 10,
    marginTop: 10,
    margin: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  column: {
    flexDirection: "row",
    marginHorizontal: 5,
    borderRadius: 10,
    elevation: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    marginTop: 5,
    height: 80,
  },
  nouveauTitre: {
    margin: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "grey",
  },
  count: {
    marginTop: 15,
    alignSelf: "center",
    fontSize: 24,
  },
  count2: {
    fontSize: 24,
    marginTop: 10,
  },
  column2: {
    flexDirection: "column",
    marginHorizontal: 5,
    borderRadius: 10,
    elevation: 1,
    backgroundColor: "#fff",
    marginTop: 5,
    height: 400,
  },
  text: {
    alignSelf: "center",
    marginLeft: 5,
    marginRight: 5,
  },
  text2: {
    color: "grey",
  },
});