import { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView, ScrollView, View, Image, RefreshControl,

  StyleSheet,
  Text,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";

import { COLORS, icons, images, SIZES } from "../constants";
import {
  Mygarden,
  ScreenHeaderBtn,
} from "../components";
import useFetch from "../hook/useFetch.js";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);

  const router = useRouter();
  const params = useSearchParams();

  const now = new Date();

  const { data, isLoading, error, refetch } = useFetch('http://192.168.178.34:3000/plants', {
    timestamp: now.getTime(),
  });


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  useEffect(() => {
    refetch();
  }, [params]);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerTitle: "PlantBasedApp",

        }}
      />

      <ScrollView showsVerticalScrollIndicator={false} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      } >
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Mygarden data={data} isLoading={isLoading} error={error} />
        </View>
      </ScrollView>
    </SafeAreaView >
  );
};

export default Home;
