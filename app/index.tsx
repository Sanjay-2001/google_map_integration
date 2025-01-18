import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Map from "@/components/Map";
import Form from "@/components/Form";
import { LocationModel } from "@/models/location.model";

export default function Index() {
  const [location, setLocation] = useState<LocationModel>({
    latitude: null,
    longitude: null,
    address: "",
  });

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
