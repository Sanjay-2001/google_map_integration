import { Stack } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Google Map Integration",
          headerTitle: () => (
            <View style={styles.headerTitle}>
              <Image
                source={require("@/assets/images/map-icon.png")}
                style={styles.icon}
              />
              <Text style={styles.title}>Google Map Integration</Text>
            </View>
          ),
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
