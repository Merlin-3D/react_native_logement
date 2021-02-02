import React, { Component } from 'react'
import { View,StyleSheet,Text,TouchableOpacity } from 'react-native'


export default class Dashbord extends Component {



    render() {
        return (
          <View style={styles.container}>
            <View style={styles.line}>
              <View>
                <Text style={styles.count}> {this.props.count1} </Text>
                <Text style={styles.text}>Mes biens</Text>
              </View>
              <View>
                <Text style={styles.count}>{this.props.count2}</Text>
                <Text style={styles.text}>Locataires</Text>
              </View>
              <View>
                <Text style={styles.count}>{this.props.count3}</Text>
                <Text style={styles.text}>Locations</Text>
              </View>
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({

    container:{
    },
    line:{
        flexDirection:"row",
        marginHorizontal:5,
        borderRadius:10,
        elevation:1,
        justifyContent:"space-between",
        backgroundColor:"#fff",
        marginTop:5,
        height:80,
    },
    count:{
        marginTop:10,
        alignSelf:"center",
        fontSize:24
    },
    text:{
        alignSelf:"center",
        marginLeft:5,
        marginRight: 5,
    },
 

})