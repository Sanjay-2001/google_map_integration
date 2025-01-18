import { LocationModel } from "@/models/location.model";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import * as Location from "expo-location";

interface Props {
  location: LocationModel;
}

const Form = ({ location }: Props) => {
  const [address, setAddress] = useState<string>("");
  const reverseGeoCode = async (latitude: number, longitude: number) => {
    try {
      const result = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      if (result.length > 0) {
        const { city, region, street, postalCode } = result[0];
        const address = `${street ? street + ", " : ""}${
          city ? city + ", " : ""
        }${region ? region + ", " : ""}${postalCode || ""}`;
        setAddress(address);
      }
    } catch (error) {
      console.error("Error during reverse geocoding:", error);
    }
  };

  useEffect(() => {
    if (location.latitude && location.longitude) {
      reverseGeoCode(location.latitude, location.longitude);
    }
  }, [location.latitude, location.longitude]);

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
      <TextInput style={styles.input} value={address} editable={false} />
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
