import { LocationModel } from "@/models/location.model";
import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface Props {
  location: LocationModel;
}

const Form: React.FC<Props> = ({ location }) => {
  return (
    <View style={styles.form}>
      <Text>Latitude:</Text>
      <TextInput
        style={styles.input}
        value={location.latitude ? location.latitude.toString() : ""}
        editable={false}
      />
      <Text>Longitude:</Text>
      <TextInput
        style={styles.input}
        value={location.longitude ? location.longitude.toString() : ""}
        editable={false}
      />
      <Text>Address:</Text>
      <TextInput
        style={styles.input}
        value={location.address}
        editable={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 10,
    width: "100%",
    height: "40%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginVertical: 5,
    borderRadius: 5,
  },
});

export default Form;
