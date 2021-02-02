import React, { Component } from 'react'
import { View,Text,StyleSheet,TouchableOpacity,Alert  } from 'react-native'
import Inputs from '../Components/Inputs'
import {connect} from "react-redux"
import {
  inserLogement,
  list_logement,
} from "../redux/logements/actionLogement";

class Logement extends Component {

     constructor(props){
        super(props)
        this.state = {
            modalVisible:false,
            modalVisible2:false,
            intitule:"",
            mensuel:"",
            ville:"",
            quartier:"",
            msg:""            
        }
    }

  _showAlert = () => {
    Alert.alert(
      "Success",
      "Bien Ajouter",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {this.props.navigation.navigate("TabNavigation"), this.props.listLogement()},
        },
      ],
      { cancelable: false }
    );
  }

    handle =()=> {
      this.setState({msg: ""});

      if (
        this.state.intitule === "" ||
        this.state.mensuel === "" ||
        this.state.ville === "" ||
        this.state.quartier === ""
      ) {
        this.setState({ msg: "Remplir tout les champs" });

      } else {
        this.props.ajouterLogement(
          this.state.intitule,
          this.state.mensuel,
          this.state.ville,
          this.state.quartier
        );
        this._showAlert();
      }
       
    }

    render() {
        return (
          <View style={styles.container}>
            <Inputs
              label="Intitulé du bien"
              placeholder="Intitulé du bien"
              onChangeText={(intitule) => this.setState({ intitule: intitule })}
            />
            <Inputs
              label="Coup Mensuel"
              keyboard="numeric"
              placeholder="Coup Mensuel"
              onChangeText={(mensuel) => this.setState({ mensuel: mensuel })}
            />
            <Inputs
              label="Ville"
              placeholder="Ville"
              onChangeText={(ville) => this.setState({ ville: ville })}
            />
            <Inputs
              label="Quartier"
              placeholder="Quartier"
              onChangeText={(quartier) => this.setState({ quartier: quartier })}
            />
            <TouchableOpacity style={styles.button} onPress={this.handle}>
              <Text style={styles.buttonText}>Nouveau Bien</Text>
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
      ajouterLogement: (intitule, mensuel, ville, quartier) =>
        dispatch(inserLogement(intitule, mensuel, ville, quartier)),
      listLogement: () => dispatch(list_logement()),
    };
}

const mapStateToProps = state =>{
    return {
      logement: state.logement.logements,
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Logement)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
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
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  msg: {
    fontSize: 15,
    fontWeight: "bold",
    color: "red",
    alignSelf: "center",
  },
  buttonSignup: {
    fontSize: 12,
  },
});