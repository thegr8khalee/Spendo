import SafeScreen from '@/components/SafeScreen';
import { Slot } from 'expo-router';
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { StatusBar } from "expo-status-bar";
import Constants from 'expo-constants'; // 1. IMPORT Constants

export default function RootLayout() {
  // 2. GET THE PUBLISHABLE KEY FROM EXTRA
  const clerkPublishableKey = Constants.expoConfig?.extra?.clerkPublishableKey;

  // Ensure the key is available, otherwise throw an error (good for development)
  if (!clerkPublishableKey) {
    throw new Error('Missing Clerk Publishable Key in app.json extra.clerkPublishableKey');
  }

  return (
    // 3. PASS THE KEY TO ClerkProvider
    <ClerkProvider publishableKey={clerkPublishableKey} tokenCache={tokenCache}>
      <SafeScreen>
        <Slot />
      </SafeScreen>
      <StatusBar style="dark" />
    </ClerkProvider>
  );
}