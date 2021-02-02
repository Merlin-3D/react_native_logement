import React, { Component } from 'react'
import { ScrollView, TouchableOpacity, Text, View,StyleSheet,Button } from 'react-native';
import Dashbord from '../Components/Dashbord';
import { AntDesign } from '@expo/vector-icons'; 
import {  logementTable ,getLogement,locataireTable, locationTable} from '../DB/database';
import PTRView from 'react-native-pull-to-refresh';
import { connect } from "react-redux";
import { list_logement } from "../redux/logements/actionLogement";
import { list_locataire } from '../redux/locataires/actionLocataire';
import { list_location } from '../redux/locations/actionLocation';
import { DataTable } from "react-native-paper";
import { Entypo } from "@expo/vector-icons"; 
import moment from "moment";

 class Home extends Component {

    constructor(props){
        super(props)
        this.state = {
            count1:0,
            count2:0,
            load:true,
            lastRefresh: Date(Date.now()).toString(),
        }
        this.refreshScreen = this.refreshScreen.bind(this)
    }
    
refreshScreen() {
      this.props.listLogement();
      this.props.listLocataire();
      this.props.listLocation();
      this.setState({ lastRefresh: Date(Date.now()).toString() })
  }

    componentDidMount() {
       logementTable()
       locataireTable()
       locationTable()
      this.props.listLogement()
      this.props.listLocataire();
      this.props.listLocation();
      
      this.refreshScreen()
    }

    render() {
        return (
          <PTRView onRefresh={this.refreshScreen}>
            <View style={{ flex: 1 }}>
              <Dashbord
                count1={
                  this.props.countLogement != null
                    ? this.props.countLogement
                    : 0
                }
                count2={
                  this.props.countLocataire != null
                    ? this.props.countLocataire
                    : 0
                }
                count3={
                  this.props.countLocation != null
                    ? this.props.countLocation
                    : 0
                }
              />

              <Text style={styles.nouveauTitre}> Nouveau</Text>

              <View style={styles.line}>
                <View style={[styles.backCard, { backgroundColor: "#2980b9" }]}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Logement")}
                  >
                    <AntDesign
                      name="plus"
                      size={24}
                      color="#fff"
                      style={styles.count}
                    />
                    <Text style={[styles.text, { color: "#fff" }]}>
                      Créer bien
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.backCard, { backgroundColor: "#2980b9" }]}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Locataire")}
                  >
                    <AntDesign
                      name="plus"
                      size={24}
                      color="#fff"
                      style={styles.count}
                    />
                    <Text style={[styles.text, { color: "#fff" }]}>
                      Locataire
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.backCard, { backgroundColor: "#2980b9" }]}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Locations")}
                  >
                    <AntDesign
                      name="plus"
                      size={24}
                      color="#fff"
                      style={styles.count}
                    />
                    <Text style={[styles.text, { color: "#fff" }]}>
                      Location
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.nouveauTitre}> Mes locations</Text>

              <ScrollView style={{ marginTop: 15,flex:1 }}>
                <View style={styles.container2}>
                  <DataTable>
                    {this.props.getLocation ? (
                      this.props.getLocation.map((tasks) => {
                        return moment().format("DD-MM-YYYY") <
                          tasks.validite ? (
                          <DataTable.Row
                            key={tasks.idLocation}
                            style={styles.good}
                            onPress={() =>
                              this.props.navigation.navigate("Details", {
                                id: tasks,
                              })
                            }
                          >
                            <DataTable.Cell>
                              <Text style={{ color: "black" }}>
                                <Entypo name="user" size={14} color="black" />{" "}
                                {tasks.nom} {tasks.prenom}
                              </Text>
                            </DataTable.Cell>
                            <DataTable.Cell numeric>
                              <Text style={{ color: "black" }}> En régle</Text>
                            </DataTable.Cell>
                            <DataTable.Cell numeric>
                              <Text style={{ color: "black" }}>
                                {" "}
                                {tasks.validite}
                              </Text>
                            </DataTable.Cell>
                          </DataTable.Row>
                        ) : (
                          <DataTable.Row
                            key={tasks.idLocation}
                            style={styles.ko}
                            onPress={() =>
                              this.props.navigation.navigate("Details", {
                                id: tasks,
                              })
                            }
                          >
                            <DataTable.Cell>
                              <Entypo name="user" size={14} color="white" />
                              <Text style={{ color: "white" }}>
                                {" "}
                                {tasks.nom} {tasks.prenom}
                              </Text>
                            </DataTable.Cell>
                            <DataTable.Cell numeric>
                              <Text style={{ color: "white" }}> A expiré</Text>
                            </DataTable.Cell>
                            <DataTable.Cell numeric>
                              <Text style={{ color: "white" }}>
                                {" "}
                                {tasks.validite}
                              </Text>
                            </DataTable.Cell>
                          </DataTable.Row>
                        );
                      })
                    ) : (
                      null
                    )}
                  </DataTable>
                </View>
              </ScrollView>
            </View>
          </PTRView>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    listLogement: () => dispatch(list_logement()),
    listLocataire: () => dispatch(list_locataire()),
    listLocation: () => dispatch(list_location()),
  };
};

const mapStateToProps = (state) => {
  //console.log(state.location.locations);
  return {
    countLogement: state.logement.count,
    countLocataire: state.locataire.count,
    countLocation: state.location.count,
    getLocation: state.location.locations,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

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
  count: {
    marginTop: 10,
    alignSelf: "center",
    fontSize: 24,
  },
  text: {
    alignSelf: "center",
    marginLeft: 5,
    marginRight: 5,
  },
  nouveauTitre: {
    margin: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  backCard: {
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    margin: 10,
  },
  container2: {
    marginHorizontal: 5,
    borderRadius: 10,
    elevation: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    marginBottom: 5,
  },
  header: {
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 18,
  },
  ko: {
    backgroundColor: "red",
    borderTopStartRadius: 10,
    borderBottomRightRadius: 10,
    color: "white",
  },
  good: {
    backgroundColor: "#fff",
    marginTop: 5,
    color: "black",

    borderTopStartRadius: 10,
    borderBottomRightRadius: 10,
  },
});