import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import QuestionData from "../assets/data/dinoDataMain.json";
import TypeData from "../assets/data/dinoDataTypeInfo.json";
import Logo from "../assets/images/logo.svg";
import globalStyles from '../styles/globalStyles';

const { width, height } = Dimensions.get('window');


const QuestionScreen = ({ route, navigation }) => {
  const { selectedDinosaur, chosenQuestion, CategoryImage, SelectedDinoImage } = route.params;
  const [choices, setChoices] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [pressedIndex, setPressedIndex] = useState(null);
  const [answerCorrect, setAnswerCorrect] = useState(null);

  //specific questions to be asked based on the type of the dinosaur
  const dinoQuestions = {
    "TimePeriod": "What time period did it live in?",
    "Size": "How big is it?",
    "Sound": "Typically what sound does this species make?",
    "Teeth": "Typically what shape teeth does this species have?",
    "Food": "Typically what foods does this species eat?",
    "Skin": "Typically what type of skin does this species have?",
    "Location": "Where is this dinosaur found?",
    "Type": "What species does this belong in?",
  };

  //altered item names to match the dataset
  const dinoData2 = {
    "TimePeriod": "era",
    "Size": "length",
    "Sound": "sounds",
    "Teeth": "teeth",
    "Food": "food",
    "Skin": "skin",
    "Location": "lived_in",
    "Type": "type",
  };
  //this picks the other choices from the dataset of that specific question type at random
  const pickQuestionChoicesUsingDataset = (importedData, isQuestionData) => {
    let randomIndexA;
    let randomQuestionChoiceA;
    let randomIndexB;
    let randomQuestionChoiceB;
    let correctQuestionChoice;

    if (isQuestionData) {
      correctQuestionChoice = selectedDinosaur[dinoData2[chosenQuestion]];
      setCorrectAnswer(correctQuestionChoice);
    } else {

      const matchingIndex = importedData.findIndex(
        (item) => item.type === selectedDinosaur["type"]
      );
      if (matchingIndex !== -1) {
        correctQuestionChoice = importedData[matchingIndex][dinoData2[chosenQuestion]];
        setCorrectAnswer(correctQuestionChoice);
      } else {
        console.error("Error: No matching type found in importedData");
      }
    }

    do {
      randomIndexB = Math.floor(Math.random() * importedData.length);
      randomQuestionChoiceB = importedData[randomIndexB][dinoData2[chosenQuestion]];
    } while (randomQuestionChoiceB === correctQuestionChoice);

    do {
      randomIndexA = Math.floor(Math.random() * importedData.length);
      randomQuestionChoiceA = importedData[randomIndexA][dinoData2[chosenQuestion]];
    } while (randomQuestionChoiceB === randomQuestionChoiceA || randomQuestionChoiceA === correctQuestionChoice);

    const newChoices = [randomQuestionChoiceA, randomQuestionChoiceB, correctQuestionChoice];


    for (let i = newChoices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newChoices[i], newChoices[j]] = [newChoices[j], newChoices[i]];
    }

    setChoices(newChoices);
  };
  //this checks if the correct question has been selected on submission of the choice, if not the answer is set to false.
  const checkAnswer = () => {
    if (selectedAnswer === correctAnswer) {
        setAnswerCorrect(true);
    }
    else if (selectedAnswer !== correctAnswer){
        setAnswerCorrect(false);
    }else{
        setAnswerCorrect(null);
    }
  };
  //the response is then called to display the response if correct or incorrect
  const answerResponse = () => {
    if (answerCorrect === true) {
        return (
          <View style={styles.lowerTextBox}>
            <Text style={globalStyles.h3}>
              Answer Correct!
            </Text>
          </View> );
    }
    else if (answerCorrect === false){
        return (
          <View style={styles.lowerTextBox}>
            <Text style={globalStyles.h3}>
              Answer Incorrect.
            </Text>
          </View> );
    }
  }
  //the submit button submits the choice, and if correct it changes to a return button to navigate back to the dinodashboard with the completedCategory, if incorrect it just returns to the dashboard
  const createSubmitButton = () => {
    if (selectedAnswer !== null && answerCorrect === null){
        return (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              checkAnswer();
            }}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        );
    }else if (answerCorrect === true){
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
             navigation.navigate('Dinosaur Dashboard', { selectedDino: selectedDinosaur,
                                                         SelectedDinoImg: SelectedDinoImage,
                                                         completedCategory: chosenQuestion });
            }
          }
        >
          <Text style={styles.buttonText}>Return</Text>
        </TouchableOpacity>
      );
    }else if (answerCorrect === false){
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Return</Text>
        </TouchableOpacity>
      );
    }return null;
  }

  useEffect(() => {
    if (chosenQuestion) {

      if (chosenQuestion === "TimePeriod" || chosenQuestion === "Size" || chosenQuestion === "Location" || chosenQuestion === "Type") {
        pickQuestionChoicesUsingDataset(QuestionData, true);
      } else {
        pickQuestionChoicesUsingDataset(TypeData, false);
      }
    }
  }, [chosenQuestion]);

  return (
    <View style={styles.container}>
      <View style={styles.topInfo}>
        <Logo height={height * 0.1} />
        <Text style={globalStyles.h1}>{selectedDinosaur.name} {chosenQuestion} Test</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.textBox}>
          <Text style={[styles.questionText, globalStyles.h3]}>
            {dinoQuestions[chosenQuestion]}  {correctAnswer}
          </Text>
          <CategoryImage height={75} width={75} />
        </View>
        <View style={styles.answerChoices}>
          {choices.map((choice, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.answerChoice,
                pressedIndex === index && styles.pressedAnswer
              ]}
              onPress={() => {
                console.log('Answer clicked:', choice);
                setSelectedAnswer(choice);
                setPressedIndex(index);
              }}
            >
              <Text style={globalStyles.h3}>
                {choice}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.lowerContent}>
        {answerResponse()}
        {createSubmitButton()}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF5F5",
  },
  topInfo: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    paddingLeft: 20,
    margin: 10,
  },
  contentContainer:{
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  lowerContent:{
    alignItems: 'center',
  },
  questionText: {
    width: "70%",
  },
  textBox: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    borderColor:"#16B2A9",
    borderWidth:1.5,
    paddingTop:10,
    paddingBottom:10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
  },
  lowerTextBox: {
    position:"absolute",
    bottom: height * 0.12,
    width: height * 0.45,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor:"#16B2A9",
    borderWidth:1.5,
    paddingTop:10,
    paddingBottom:10,
  },
  button:{
    backgroundColor: "#008080",
    textAlign:"center",
    width: "30%",
    margin:"5%",
    padding: 10,
    borderRadius: 10,
  },
  buttonText:{
    textAlign:"center",
    fontFamily: "Mako",
    fontSize: 18,
    color: "white",
  },
  answerChoices:{
    width: "100%",
    paddingTop:10,
    paddingBottom:10,
    margin: 30,
  },
  answerChoice:{
    backgroundColor: "white",
    borderRadius: 20,
    borderColor:"#16B2A9",
    borderWidth:1.5,
    paddingTop:10,
    paddingBottom:10,
    margin: 10,
    shadowColor: "#015959",
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 10
  },
  pressedAnswer: {
    borderWidth: 4,
  },
});

export default QuestionScreen;