import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import Map from "@/components/Map";
import Form from "@/components/Form";
import { LocationModel } from "@/models/location.model";
import * as Location from "expo-location";

export default function Index() {
  const [location, setLocation] = useState<LocationModel>({
    latitude: null,
    longitude: null,
  });

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
      <Map location={location} setLocation={setLocation} />
      <Form location={location} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
  },
});
