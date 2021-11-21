import React from 'react'
import { Button, StyleSheet, Text, View} from 'react-native'

export default function GameOverScreen(props) {
    return (
        <View style={styles.screen}>
            <Text>
                The game is over!
            </Text>
            <Text>Number of rounds {props.roundsNumber}</Text>
            <Text>User Number {props.userNumber}</Text>
            <Button title="NEW GAME" onPress={props.reStart} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
