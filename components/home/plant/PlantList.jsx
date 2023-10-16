import React from 'react';
import PlantCard from './PlantCard.jsx';
import { View } from 'react-native';

const PlantList = ({ plants }) => {
    return (
        <View style={{
            paddingTop: 6,
        }}>
            {plants.map((plant, index) => {
                return <PlantCard key={index} plant={plant} />
            })}
        </View>);
}

export default PlantList;