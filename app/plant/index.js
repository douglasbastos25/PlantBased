import react, { useEffect, useState } from "react";


import {
    View,
    Text,
    TextInput,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
} from "react-native";

import { SIZES, COLORS } from "../../constants";
import { Button, ScreenTitle } from "../../components";
import DateField from 'react-native-datefield';

import { useRouter, useSearchParams } from "expo-router";

import useFetch from "../../hook/useFetch";
import DebugBox from "../../components/common/debug/DebugBox";

const creation = () => {

    const router = useRouter();

    const params = useSearchParams();
    const plantId = params?.id ?? null;

    const { data, isLoading, error, refetch } = useFetch(`http://192.168.178.34:3000/plants/${plantId}`, {});
    const [plant, setPlant] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [callToActionText, setCallToActionText] = useState("Adicionar");

    useEffect(() => {
        setPlant(data);
        if (plantId != null) {
            setCallToActionText("Atualizar");
        }
    }, [data]);


    const [errorMessage, setErrorMessage] = useState(null);

    const screenStyle = {
        flex: 1,
        backgroundColor: COLORS.lightWhite,
        padding: SIZES.medium,
    };

    const inputStyle = {
        borderColor: COLORS.gray2,
        borderWidth: 1,
        borderRadius: SIZES.xSmall,
        marginBottom: SIZES.small,
        padding: SIZES.small,
        borderRadius: SIZES.xSmall,
    }

    const labelStyle = {
        fontSize: SIZES.medium,
        fontWeight: "bold",
        marginTop: SIZES.small,
        marginBottom: SIZES.xxSmall,
    }

    const dateInputStyle = {
        width: '30%',
        borderRadius: SIZES.xSmall,
        borderColor: COLORS.gray2,
        borderWidth: 1,
        marginBottom: 20,
        marginLeft: 0,
        marginRight: 0,
        padding: 10,
    }

    return (
        <View style={screenStyle}>
            <ScreenTitle title="Adicionar Planta" />

            {/* <View style={{ border: 1, backgroundColor: "red" }}><Text>{JSON.stringify(data)}</Text></View>

            <View style={{ border: 1, backgroundColor: "tomato" }}><Text>{JSON.stringify(params)}</Text></View>

            <View style={{ border: 1, backgroundColor: "yellow" }}><Text>{JSON.stringify(plant)}</Text></View> */}

            <View>
                <Text style={labelStyle}>Nome / Identificação</Text>
                <TextInput
                    style={inputStyle}
                    onChangeText={
                        (text) => {
                            setPlant({ ...plant, name: text })
                        }

                    }
                    defaultValue={plant?.name}
                />
            </View>

            <View>
                <Text style={labelStyle}>Espécie</Text>
                <TextInput
                    style={inputStyle}
                    onChangeText={
                        (text) => {
                            setPlant({ ...plant, species: text })
                        }
                    }
                    defaultValue={plant?.species}
                />
            </View>

            <View>
                <Text style={labelStyle}>Adiquirida em</Text>
                <DateField
                    labelDate="dd"
                    labelMonth="mm"
                    labelYear="aaaa"
                    styleInput={dateInputStyle}
                    onSubmit={(date) => {
                        setPlant({ ...plant, acquired_at: date })
                    }}
                    
                />
            </View>


            <View>
                <Text style={labelStyle}>Anotações</Text>
                <TextInput
                    style={inputStyle}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={
                        (text) => {
                            setPlant({ ...plant, notes: text })
                        }
                    }
                    defaultValue={plant?.notes}
                />
            </View>

            {errorMessage && <Text style={{ marginVertical: 10, color: "red" }}>{errorMessage}</Text>}

            <Button text={callToActionText} onPress={() => {

                if (plant == null || plant.name == null || plant.name == "") {
                    setErrorMessage("Preencha o nome da planta")
                } else {
                    var url = "http://192.168.178.34:3000/plants";

                    var method = "POST";
                    if (plantId != null) {
                        url += `/${plantId}`;
                        method = "PUT";
                    }


                    let options = {
                        method: method,
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(plant),
                    };

                    fetch(url, options)
                        .then((response) => {
                            console.log(response);
                            response.json().then((data) => {
                                const route = plantId ? "/" : "/plant/photo";
                                router.push({ pathname: route, params: data });
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }



            }} />
        </View>
    );
}

export default creation;

