import React from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { LocationModel } from "@/models/location.model";

interface Props {
  location: LocationModel;
  setLocation: (location: LocationModel) => void;
}

export default function Map({ location, setLocation }: Props) {
  // function to set lattude and longitude
  const handlePress = async (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    console.log("Selected Location:", latitude, longitude);

    setLocation({
      latitude,
      longitude,
    });
  };

  return (
    <View style={styles.mapBody}>
      <MapView
        style={styles.map}
        initialRegion={{
          // for India region
          latitude: 20.5937,
          longitude: 78.9629,
          latitudeDelta: 15,
          longitudeDelta: 30,
        }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton
        onPress={handlePress}
      >
        {location.latitude && location.longitude && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapBody: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
