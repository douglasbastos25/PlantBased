import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

import ScreenTitle from "../../common/screentitle/ScreenTitle.jsx";
import Button from "../../common/button/Button.jsx";

import PlantList from "../plant/PlantList.jsx";
import EmptyState from "../plant/EmptyState.jsx";


import { COLORS } from "../../../constants";

const Mygarden = ({ data, isLoading, error }) => {
    const router = useRouter();

    const params = useSearchParams();


    return (
        <View>
            <ScreenTitle title="Meu Jardim" />
            {isLoading ? (
                <ActivityIndicator size='large' color={COLORS.primary} />
            ) : error ? (
                <Text>Something went wrong {JSON.stringify(error)}</Text>
            ) : (
                data && data.length ? <PlantList plants={data} /> : <EmptyState />
            )}
            <Button text="Adicionar Planta" onPress={() => {
                router.push("/plant");
            }} />
        </View>
    );

}

export default Mygarden;