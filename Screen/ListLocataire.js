import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import { connect } from "react-redux";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { list_location } from "../redux/locations/actionLocation";
import moment from "moment";



function ListLocataire({ listLocation , getLocation}) {
  useEffect(() => {
    listLocation();
  }, [listLocation]);

       const [selectedId, setSelectedId] = useState(null);


  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#ecf0f1" : "white";
    // console.log(selectedId);
    return (
      <Item
        item={item}
        onPress={() => console.log("object")}
        style={{ backgroundColor }}
      />
    );
  };
  const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <>
          <Image
            source={require("../assets/avatar.jpg")}
            style={styles.avatar}
          />
        </>
        <View style={{ marginLeft: 5, width: 200 }}>
          <Text style={styles.title}>
            {item.nom} {item.prenom}
          </Text>

          <View>
            <View>
              <>
                <Text style={styles.text}>{item.intitule}</Text>
              </>
              <>
                <Text style={styles.text}>{item.telephone}</Text>
              </>
              <>
                <Text style={styles.text}>
                  Lieu : {item.ville} === {item.quartier}
                </Text>
              </>
              <>
                <Text style={styles.text}>Expire le : {item.validite}</Text>
              </>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {moment().format("DD-MM-YYYY") < item.validite ? (
                <Text
                  style={{
                    backgroundColor: "#27ae60",
                    color: "white",
                    padding: 5,
                    width: 200,
                    alignItems: "center",
                    marginTop: 10,
                    justifyContent: "center",
                  }}
                >
                  En régle
                </Text>
              ) : (
                <Text
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    padding: 5,
                    width: 200,
                    alignItems: "center",
                    marginTop: 10,
                    justifyContent: "center",
                  }}
                >
                  Non réglé
                </Text>
              )}
            </View>
          </View>
        </View>
        <View>
          {moment().format("DD-MM-YYYY") < item.validite ? (
            <MaterialIcons name="insert-emoticon" size={24} color="green" />
          ) : (
            <MaterialCommunityIcons
              name="emoticon-dead"
              size={24}
              color="red"
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={styles.body}>
        <FlatList
          data={getLocation}
          renderItem={renderItem}
          keyExtractor={(item) => item.idLocation}
          extraData={selectedId}
          style={{ backgroundColor: "#bdc3c7" }}
          //onPress={(item)=>console.log(item.id)}
        />
      </View>
    </View>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    listLocation: () => dispatch(list_location()),
  };
};

const mapStateToPross = (state) => {
  return {
    getLocation: state.location.locations,
  };
};

export default connect(mapStateToPross,  mapDispatchToProps )(ListLocataire);

const styles = StyleSheet.create({
  body: {
    flex: 7,
  },
  avatar: {
    width: 100,
    height: 100,
  },

  item: {
    padding: 20,
    marginVertical: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#583bb8",
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    flexWrap: "wrap",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
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
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});