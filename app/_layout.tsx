import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Light Theme
  const LightThemeCustom = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#ffffff', // White background for light mode
      text: '#111111', // Dark text for better readability
      primary: '#0a7ea4', // Light blue as primary color
    },
  };

  // Dark Theme
  const DarkThemeCustom = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: '#000000', // Black background for dark mode
      text: '#ECEDEE', // Light text for better readability
      primary: '#FFD700', // Gold color as primary color
    },
  };

  useEffect(() => {
    SplashScreen.hideAsync(); // Hide splash screen when app is ready
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkThemeCustom : LightThemeCustom}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
