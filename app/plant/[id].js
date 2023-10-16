import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View, Text, SafeAreaView } from 'react-native'

import { Stack, useRouter, useSearchParams } from 'expo-router'

import { ScreenHeaderBtn, NearbyJobCard } from '../../components'
import { DEBUG, COLORS, icons, SIZES } from '../../constants'
import styles from '../../styles/search'
import ScreenTitle from '../../components/common/screentitle/ScreenTitle';
import Button from '../../components/common/button/Button';
import DebugBox from '../../components/common/debug/DebugBox'
import useFetch from '../../hook/useFetch'
import { Share } from 'react-native';

import axios from 'axios'

const PlantDetail = () => {

    const params = useSearchParams();
    const router = useRouter();

    const plantId = params.id;

    let { data, isLoading, error, refetch } = useFetch(`http://192.168.178.34:3000/plants/${plantId}`, {});


    useEffect(() => {
        refetch();
    }, [params]);


    const deletePlant = () => {
        axios.delete(`http://192.168.178.34:3000/plants/${plantId}`).then((response) => {
            console.log(response)
            router.push(
                {
                    pathname: '/',
                    params: { message: 'Planta excluída com sucesso!' }
                }
            );
        }
        ).catch((error) => {
            console.log(error)
        })
    }

    const screenStyle = {
        flex: 1,
        backgroundColor: COLORS.lightWhite,
        padding: SIZES.medium,
    };
    const titleStyle = {
    }

    const carouselStyle = {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.small,
        flexDirection: 'row',
    }

    const defaultTextStyle = {
        fontSize: SIZES.large,
    }

    const plantProperties = [
        {
            name: "Espécie",
            field: "species",
            defaultValue: "Espécie não informada",
        }, {
            name: "Anotações",
            field: "notes",
            defaultValue: "Nenhuma anotação",
        }
    ]

    const sharePlant = async () => {
        try {
            const message = "Olha que planta linda!" +
                "\n" + (data.name ?? "") +
                "\n" + (data.species ?? "") +
                "\n" + (data.notes ?? "");

            const result = await Share.share({
                message,
            });
            console.log("result of sharing", result);
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            console.log(error);
        }
    };

    const editPlant = () => {
        router.push(
            {
                pathname: '/plant',
                params: { id: data.id }
            }
        );
    }



    return (
        <View style={screenStyle}>

            {isLoading && <ActivityIndicator size="large" color="#0000ff" />}

            {!isLoading && data != null && <>
                <DebugBox text={data} />

                <ScreenTitle title={data.name} />

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginBottom: SIZES.small
                }}>
                    <View style={{ flex: 1 }}>
                        <Button type="tertiary"
                            size="SMALL" text="Editar" onPress={editPlant}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Button type="tertiary" size="SMALL" text="Excluir" onPress={deletePlant} />
                    </View>
                </View>

                <View style={carouselStyle}>
                    {
                        data?.images?.map((image, index) => {
                            return <View key={index} style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: SIZES.small
                            }}>
                                <Image source={{ uri: image }} style={{ width: 50, height: 100 }} />
                            </View>
                        })
                    }
                </View>

                {plantProperties.map((property, index) => {
                    return <View style={{ marginTop: SIZES.small }} key={index}>
                        <Text style={{ ...defaultTextStyle }}>
                            <Text style={{ ...defaultTextStyle, fontWeight: 'bold' }}>
                                {property.name}
                            </Text>:{' '}
                            {data[property.field] ?? property.defaultValue}
                        </Text>
                    </View>
                })}

                <View style={{ marginTop: SIZES.small }}>
                    <Button text="Compartilhar" onPress={sharePlant} />
                </View>

            </>}
        </View>
    );
}

export default PlantDetail;