import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, Alert, Keyboard } from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import Color from '../constant/Colors';

const StartGameScreen = (props) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [conformed, setConformed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState()

    const numberInputHandler = (inputText) => {
        setEnteredValue(inputText.replace(/[^0-9]/g,''))
    }
    const resetInputHandler = () => {
        setEnteredValue('');
        setConformed(false);
    }
    const conformInputHandler = () => {
        const chosenNumber = parseInt(enteredValue)
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 999) {
            Alert.alert('Invalid number!',
                'Number has to be between 1-999!',
                [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }])
            return;
        }
        setConformed(true);
        setSelectedNumber(chosenNumber)
        setEnteredValue('')
        Keyboard.dismiss()
    }

    let conformedOutput;
    if (conformed) {
        conformedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>Chosen Number: </Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button title="START GAME" onPress={() =>props.onStartGame(selectedNumber)} />
            </Card>
        ) 
    }
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Start A New Game</Text>
            <Card style={styles.inputContainer}>
                <Text>Select a number</Text>
                <Input style={styles.input} blurOnSubmit autoCorrect={false} keyboardType="number-pad" maxLength={3}
                    onChangeText={numberInputHandler} value={enteredValue} />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}><Button title="Reset" onPress={resetInputHandler} color={Color.secondary} /></View>

                    <View style={styles.button}><Button title="Conform" onPress={conformInputHandler} color={Color.primary} /></View>
                </View>
            </Card>
            {conformedOutput}
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily:'open-sans-bold',
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',

    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    },
    button: {
        width: 100,
    },
    input: {
        width: 50,
        textAlign: 'center',
    },
    summaryContainer:{
        marginTop:20,
        alignItems: 'center',
    }
})

export default StartGameScreen;