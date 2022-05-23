import { useEffect } from "react";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/navigation";
import { StreamChat } from "stream-chat";

const API_KEY = "nxaurv9xrg56";

const client = StreamChat.getInstance(API_KEY);

const connectUser = async () => {
  await client.connectUser(
    {
      id: "jlahey",
      name: "Jim Lahey",
      image: "https://i.imgur.com/fR9Jz14.png",
    },
    client.devToken("jlahey")
  );

  const channel = client.channel("team", "general", {
    members: ["jlahey"],
    name: "Awesome channel about traveling",
  });

  channel.create();
};

export default function App() {
  useEffect(() => {
    connectUser();
  }, []);

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
