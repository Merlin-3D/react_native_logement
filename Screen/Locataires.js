import React, { Component } from 'react'
import { View,Text,StyleSheet,TouchableOpacity,Alert } from 'react-native'
import { connect } from 'react-redux';
import Inputs from '../Components/Inputs'
import * as Contacts from "expo-contacts";
import {
  inserLocataire,
  list_locataire,
} from "../redux/locataires/actionLocataire";

 class Locataires extends Component {
   constructor(props) {
     super(props);
     this.state = {
       modalVisible: false,
       modalVisible2: false,
       nom: "",
       prenom: "",
       telephone: "",
       cni: "",
       contact: "",
     };
   }

   /*  componentDidMount(){
         (async () => {
           const { status } = await Contacts.requestPermissionsAsync();
           if (status === "granted") {
             const { data } = await Contacts.getContactsAsync({
               fields: [Contacts.Fields.PhoneNumbers, Contacts.EMAILS],
             });

             if (data.length > 0) {
               this.setState({
                 loading: false,
                 contact: data,
               });
             }
               console.log(this.state.contact);

           }
         })();
}*/
   _showAlert = () => {
     Alert.alert(
       "Success",
       "Locataire Ajouter",
       [
         {
           text: "Cancel",
           onPress: () => console.log("Cancel Pressed"),
           style: "cancel",
         },
         {
           text: "OK",
           onPress: () => {this.props.navigation.navigate("TabNavigation"), this.props.listLocataire()},
         },
       ],
       { cancelable: false }
     );
   };

   handleSubmit = () => {

     this.setState({ msg: "" });

     if (
       this.state.nom === "" ||
       this.state.prenom === "" ||
       this.state.telephone === "" ||
       this.state.cni === ""
     ) {
       this.setState({ msg: "Remplir tout les champs" });
     } else {
       this.props.ajouterLocataire(
         this.state.nom,
         this.state.prenom,
         this.state.telephone,
         this.state.cni
       );
       this._showAlert();
     }
   };

   /**<TouchableOpacity
           onPress={() => this.props.navigation.navigate("contacts")}
           activeOpacity={0.8}
           style={{}}
         >
           <Text style={styles.text}> Importer depuis les contacts</Text>
         </TouchableOpacity> */

   render() {
     return (
       <View style={styles.container}>
         
         <Inputs
           label="Nom"
           placeholder="Nom"
           onChangeText={(nom) => this.setState({ nom: nom })}
         />
         <Inputs
           label="Prénom"
           placeholder="Prénom"
           onChangeText={(prenom) => this.setState({ prenom: prenom })}
         />
         <Inputs
           label="Téléphone"
           keyboard="numeric"
           placeholder="Téléphone"
           onChangeText={(telephone) => this.setState({ telephone: telephone })}
         />
         <Inputs
           label="Numéro de CNI"
           keyboard="numeric"
           placeholder="Numéro de CNI"
           onChangeText={(cni) => this.setState({ cni: cni })}
         />
         <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
           <Text style={styles.buttonText}>Ajouter Locataire</Text>
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
      ajouterLocataire: (nom, prenom, telephone, cni) =>
        dispatch(inserLocataire(nom, prenom, telephone, cni)),
      listLocataire: () => dispatch(list_locataire()),
    };
  
}


export default connect(null,mapDispatchToProps)(Locataires)
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    alignSelf: "center",
    marginTop: 5,
    color: "red",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#000",
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
  buttonSignup: {
    fontSize: 12,
  },
  msg: {
    fontSize: 15,
    fontWeight: "bold",
    color: "red",
    alignSelf: "center",
  },
});