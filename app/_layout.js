import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// import fonts 

import {
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_700Bold
} from '@expo-google-fonts/open-sans'

import {
  Quicksand_700Bold
} from '@expo-google-fonts/quicksand'

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "/",
};

const Layout = () => {
  const [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_700Bold,
    Quicksand_700Bold
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="/" />
    </Stack>
  )
};

export default Layout;
