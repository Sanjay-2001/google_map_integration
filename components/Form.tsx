import { LocationModel } from "@/models/location.model";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import * as Location from "expo-location";

interface Props {
  location: LocationModel;
}

const Form = ({ location }: Props) => {
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  //function to extract adress from latitude and longitude using reverse geocoding
  const reverseGeoCode = async (latitude: number, longitude: number) => {
    setLoading(true);
    try {
      const result = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      //extracting address
      if (result.length > 0) {
        const { city, region, street, postalCode } = result[0];
        const address = `${street ? street + ", " : ""}${
          city ? city + ", " : ""
        }${region ? region + ", " : ""}${postalCode || ""}`;
        setAddress(address);
      }
    } catch (error) {
      console.error("Error during reverse geocoding:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.latitude && location.longitude) {
      reverseGeoCode(location.latitude, location.longitude);
    }
  }, [location.latitude, location.longitude]);

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Latitude:</Text>
      <TextInput
        style={styles.input}
        value={location.latitude?.toString() || ""}
        editable={false}
      />
      <Text style={styles.label}>Longitude:</Text>
      <TextInput
        style={styles.input}
        value={location.longitude?.toString() || ""}
        editable={false}
      />
      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={styles.input}
        value={!loading ? address : "Loading..."} //loader until address is recieved
        editable={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
});

export default Form;
