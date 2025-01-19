import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Map from "@/components/Map";
import Form from "@/components/Form";
import { LocationModel } from "@/models/location.model";
import * as Location from "expo-location";
import { Image } from "react-native";

export default function Index() {
  const [location, setLocation] = useState<LocationModel>({
    latitude: null,
    longitude: null,
  });

  //Permission for location
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permissions are required to use this feature."
        );
      }
    };
    requestPermissions();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Map location={location} setLocation={setLocation} />
      </View>
      <View style={styles.titleContainer}>
        <Image
          source={require("@/assets/images/location-pin.webp")}
          style={styles.icon}
        />
        <Text style={styles.title}>Location Details</Text>
      </View>
      <View style={styles.formContainer}>
        <Form location={location} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 10,
  },
  mapContainer: {
    flex: 2,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 15,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginRight: 8,
  },
  icon: {
    width: 30,
    height: 30,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});
