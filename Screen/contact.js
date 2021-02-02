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
import * as Contacts from "expo-contacts";

function Contact() {

    const [selectedId, setSelectedId] = useState(null);
    const [data, setData] = useState([]);


      useEffect(() => {
        (async () => {
          const { status } = await Contacts.requestPermissionsAsync();
          if (status === "granted") {
            const { data } = await Contacts.getContactsAsync({
              fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
            });

            if (data.length > 0) {
              console.log(data);
              setData(data)
            }
          }
        })();
      }, []);



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
            source={
              item.imageAvailable
                ? item.imageAvailable
                : require("../assets/avatar.jpg")
            }
            style={styles.avatar}
          />
        </>
        <View style={{ marginLeft: 5, width: 200 }}>
          <Text style={styles.title}>
            {item.firstName} {item.lastName} ====
            {item.phoneNumbers &&
              item.phoneNumbers[0] &&
              "phoneNumbers"}
          </Text>

          <View>
            <View></View>
          </View>
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
          data={data}
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

export default Contact;

const styles = StyleSheet.create({
  body: {
    flex: 7,
  },
  avatar: {
    width: 50,
    height: 50,
  },

  item: {
    padding: 10,
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