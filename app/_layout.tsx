import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown:false}} />
    </Stack>
  );
}
