import React, { Component } from 'react'
import { View,StyleSheet,Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons'; 


export default class TableLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: [],

    };
  }
  componentDidMount(){
      this.setState({ location: this.props.locations });
  }

  render() {
      console.log(this.state.location);
    return (
      <View style={styles.container}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>
              <Text style={styles.header}>Locataires</Text>
            </DataTable.Title>
            <DataTable.Title numeric>
              <Text style={styles.header}>Logements</Text>
            </DataTable.Title>
            <DataTable.Title numeric>
              <Text style={styles.header}>Etats</Text>
            </DataTable.Title>
          </DataTable.Header>
          
          <DataTable.Row style={styles.ko}>
            <DataTable.Cell>
              <Text style={{ color: "#fff" }}>
                <Entypo name="user" size={14} color="#fff" /> Frozen yogurt
              </Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Text style={{ color: "#fff" }}>Chambre</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Text style={{ color: "#fff" }}>Expiré</Text>
            </DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>
              <Entypo name="user" size={14} color="black" />
              Ice cream sandwich
            </DataTable.Cell>
            <DataTable.Cell numeric>Chambre</DataTable.Cell>
            <DataTable.Cell numeric>Réglé</DataTable.Cell>
          </DataTable.Row>

        </DataTable>
      </View>
    );
  }
}



const styles = StyleSheet.create({

    container:{
        marginHorizontal:5,
        borderRadius:10,
        elevation:1,
        justifyContent:"space-between",
        backgroundColor:"#fff",
        marginBottom:5
    },
    header:{
        borderBottomLeftRadius:10,
        borderTopRightRadius:10,
        marginBottom:5,
        fontWeight:"bold",
        fontSize:18
        
    },
    ko:{
        backgroundColor:"#fc5f53",
         borderTopStartRadius:10,
         borderBottomRightRadius:10
    },
    good:{
         backgroundColor:"#53fc8e",
         marginTop:5
    },

})