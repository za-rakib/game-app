import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import GameOverScreen from './screen/GameOverScreen';
import GameScreen from './screen/GameScreen';
import StartGameScreen from './screen/StartGameScreen';

const fetchFonts = () => {
  Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {

  const [userNumber, setUserNumber] = useState()
  const [guessRound, setGuessRound] = useState(0)
  const [dataLoading, setDataLoading] = useState(false)

  if (!dataLoading) {
    return (
      <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoading(true)}
        onError={(err) => console.log(err)} />
    );
  }
  const configureNewGame = () => {
    setGuessRound(0);
    setUserNumber(null);
  }
  const userNumberHandler = (selectedNumber) => {
    setUserNumber(selectedNumber)
  }

  const gameOverHandler = (numberOfRound) => {
    setGuessRound(numberOfRound)
  }

  let content = <StartGameScreen onStartGame={userNumberHandler} />

  if (userNumber && guessRound <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  }
  else if (guessRound > 0) {
    content = <GameOverScreen roundsNumber={guessRound} userNumber={userNumber} reStart={configureNewGame} />
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  image:{
    height:300,
    width:300
  }
});
