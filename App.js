import { StatusBar } from "expo-status-bar";
import { StyleSheet, ImageBackground, View, Dimensions } from "react-native";
import { useState, useCallback } from "react";
import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function App() {
  const [statusLog, setStatusLog] = useState(false);
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  const chengeLog = () => setStatusLog(!statusLog);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ImageBackground
        source={require("./assets/img/BG.jpg")}
        style={styles.image}
      ></ImageBackground>

      <View style={styles.container} onLayout={onLayoutRootView}>
        {statusLog ? (
          <LoginScreen chengeLog={chengeLog} />
        ) : (
          <RegistrationScreen chengeLog={chengeLog} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
