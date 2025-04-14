import * as Font from "expo-font";

export const loadFonts = () =>
  Font.loadAsync({
    PressStart2P: require("./assets/fonts/PressStart2P-Regular.ttf"),
  });