import React from 'react';
import { StyleSheet, View } from 'react-native';

const Card = (props) => {
    return (
        <View style={{...styles.card,...props.style}}>
            {props.children}
        </View>
    );
};
const styles = StyleSheet.create({
    card: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: .26,
        shadowRadius: 5,
        elevation: 10,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    }
})
export default Card;