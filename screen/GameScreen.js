import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';

const generateRandomNumber = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const rnNumber = Math.floor(Math.random() * (max - min)) + min;
    if (rnNumber === exclude) {
        return generateRandomNumber(min, max, exclude)
    }
    else {
        return rnNumber;
    }
}

const GameScreen = ({userChoice,onGameOver}) => {

    const [currentGuess, setCurrentGuess] = useState(generateRandomNumber(1, 100, userChoice))
    const [rounds, setRounds] = useState(0)
    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(rounds)
        }
    },[currentGuess,userChoice,onGameOver])

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < userChoice) || (direction === 'upper' && currentGuess > userChoice)) {
            Alert.alert("Don't lie!", "You know this is wrong...", [{
                text: 'Sorry!', style: "cancel"
            }])
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        }
        else {
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomNumber(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber)
        setRounds(curRounds => curRounds+ 1)
    }
    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess </Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} />
                <Button title="GREATER" onPress={nextGuessHandler.bind(this, 'upper')} />
            </Card>
        </View>
    );
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: "space-around",
        width: 300,
        marginTop: 20,
        maxWidth: "80%",
    }
})
export default GameScreen;