import React, { createContext, useState, useEffect } from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import QuestionData from "../assets/data/dinoDataMain.json";
import Logo from "../assets/images/logo.svg";
import { categorizerIcons } from '../assets/CategorizerIcons';
import { useCategories } from "../components/CategoriesProvider";
import globalStyles from '../styles/globalStyles';

const { width, height } = Dimensions.get('window');
const radius = height * 0.15;

import { getFirestore, doc, setDoc, updateDoc, getDoc, increment } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

const DinoDashboard = ({ route, navigation }) => {
  const { selectedDino, SelectedDinoImg } = route.params;

  const buttons = ["TimePeriod", "Size", "Sound", "Teeth", "Food", "Skin", "Location", "Type"];

  //this uses CategoriesProvider for this information
  const { categories, setCategories, markCategoryComplete, allCategoriesComplete } = useCategories();

  const [dinosaurSubmitted, setDinosaurSubmitted] = useState(false);

  //marks markCategoryComplete based on if completedCategory is true
  useEffect(() => {
    if (route.params?.completedCategory) {
      markCategoryComplete(route.params.completedCategory);
      navigation.setParams({ completedCategory: null });
    }
  }, [route.params?.completedCategory]);
  //log to check if all categories completed state has occurred
  useEffect(() => {
    if (allCategoriesComplete) {
      console.log("all categories completed!");
    }
  }, [allCategoriesComplete]);

  const [selectedQuestionType, setSelectedQuestionType] = useState(null);

  //gets the correct icon based on if the question is complete or not from CategoriesProvider
  const getIcon = (category) => {
    const { isSelected, isComplete } = categories[category];

    if(isSelected && isComplete)
    {
        return categorizerIcons[category].selected.complete
    }
    else if (isSelected && !isComplete)
    {
        return categorizerIcons[category].selected.incomplete
    }
    else if (!isSelected && !isComplete)
    {
        return categorizerIcons[category].unselected.incomplete
    }
    else{
        return categorizerIcons[category].unselected.complete
    }
  };
  //selects question type based on type pressed
  const pickQuestionType = (item) => {
    setSelectedQuestionType(item);
  };

  //set category when selected from categoriesProvider
  const toggleCategory = (category) => {
    setCategories((prev) => {
      const updatedCategories = Object.keys(prev).reduce((acc, key) => {
        acc[key] = { ...prev[key], isSelected: key === category };
        return acc;
      }, {});
      return updatedCategories;
    });
  };

  const enterQuiz = () => {
    navigation.navigate('Question Screen', { selectedDinosaur: selectedDino , chosenQuestion: selectedQuestionType, CategoryImage: categorizerIcons[selectedQuestionType].unselected.incomplete, SelectedDinoImage: SelectedDinoImg});
  };

  //if user signed in, submits data to the firebase
  const submitDinosaur = async (userId, dinosaur, type) => {
    const userRef = doc(db, 'users', userId);
    setDinosaurSubmitted(true);

    try {
      // get the user data
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const identifiedDinosaurs = userData.identifiedDinosaurs || {};
        const dinosaurTypeCount = userData.dinosaurTypeCount || {};

        // If this dinosaur is not identified yet, add it to the identifiedDinosaurs
        if (!identifiedDinosaurs[dinosaur]) {
          identifiedDinosaurs[dinosaur] = type;
          dinosaurTypeCount[type] = (dinosaurTypeCount[type] || 0) + 1;

          console.log("Adding dinosaur to Firestore:", identifiedDinosaurs, dinosaurTypeCount);

          // updates firebase with the new data
          await updateDoc(userRef, {
          identifiedDinosaurs,
          dinosaurTypeCount,
        });
        } else {
          // when dinosaur is already identified, it just increments the type count in firebase
          await updateDoc(userRef, {
            [`dinosaurTypeCount.${type}`]: increment(1),
          });
        }
      } else {
        // create a new document if the user document doesn't exist
        await setDoc(userRef, {
          identifiedDinosaurs: { [dinosaur]: type },
          dinosaurTypeCount: { [type]: 1 },
        });
        console.log("User document created:", { [dinosaur]: type }, { [type]: 1 }); // Debug log
      }
    } catch (error) {
      console.error("Error submitting dinosaur:", error);
    }
  };

  return (
      <View style={styles.container}>
        <View style={styles.topInfo}>
          <Logo height={height * 0.1} />
          <Text style={globalStyles.h1}>Dinosaur Categorizer</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.textBox}>
            <Text style={globalStyles.h3}>A new dinosaur has arrived at the exhibit.</Text>
            <Text style={globalStyles.h2}>{selectedDino.name}</Text>
          </View>
          {/* Adds in entry button for the dinosaur summary screen*/}
          <TouchableOpacity
            style={styles.imageButton}
            onPress={() => navigation.navigate('Dinosaur Summary', { selectedDinosaur: selectedDino, SelectedDinoImage: SelectedDinoImg})}
          >
          {SelectedDinoImg && (
            <SelectedDinoImg width={height*0.2} height={height*0.2} style={styles.dinoImg}
            />
          )}
          </TouchableOpacity>
          {/*Creates circular buttons*/}
          <View style={styles.circle}>
            {buttons.map((item, index) => {
              const angle = (index / buttons.length) * (2 * Math.PI);
              const x = radius * Math.cos(angle);
              const y = radius * Math.sin(angle);
              const IconComponent = getIcon(item);

              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.circleButton, { top: y + radius, left: x + radius }]}
                  onPress={() => {
                    pickQuestionType(item);
                    toggleCategory(item);
                  }}
                >
                  <IconComponent/>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        {/*changes lower button and text based on if allCategoriesCOmplete and the selectedQuestionType and if dinosaur is submitted*/}
        <View style={styles.lowerContent}>
          <Text style={[styles.textBox,globalStyles.h3]}>
            {allCategoriesComplete ? 'Submit dinosaur below'
            : !selectedQuestionType ? 'Select a question type from above'
            : selectedQuestionType==="TimePeriod" ? 'Selected question type is: Time Period'
            : `Selected question type is: ${selectedQuestionType}`}</Text>
          <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (!allCategoriesComplete) {
                  enterQuiz(); // Calls enterQuiz if all categories are not complete
                }else if (dinosaurSubmitted===false){
                  submitDinosaur(auth.currentUser.uid, selectedDino.name, selectedDino.type);
                }else{
                    navigation.navigate("Dinosaur Exhibit");
                }
              }}
          >
            <Text style={styles.buttonText}>{allCategoriesComplete ? "Submit to Collection" : "Enter"}</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF5F5",
  },
  contentContainer:{
    flex: 1,
    alignItems: 'center',
  },
  lowerContent:{

    alignItems: 'center',
  },
  topInfo: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    paddingLeft: 20,
    margin: 10,
  },
  textBox: {
    width: height * 0.45,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: "center",
    borderColor:"#16B2A9",
    borderWidth:1.5,
    paddingTop:10,
    paddingBottom:10,
    margin: 30,
  },
  image: {
    position: 'relative',
    width: height * 0.18,
    height: height * 0.18,
    borderRadius: height * 0.09,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 10
  },
  imageButton: {
    top: height/10,
    width: height*0.16,
    height: height*0.16,
    backgroundColor: "white",
    borderRadius: height*0.1,
    borderColor: "#008080",
    borderWidth: 6,
    shadowColor: "#015959",
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 10
  },
  dinoImg: {
    left:- (height * 0.03),
    top:- (height * 0.02),
  },
  circle: {
    width: height *0.45,
    height: height *0.45,
    position: 'relative',
    borderRadius: radius,
    top: -height/6,
    left: height * 0.0375,
  },
  button:{
    backgroundColor: "#008080",
    textAlign:"center",
    width: height*0.27,
    margin: height*0.0225,
    padding: 10,
    borderRadius: 10,
  },
  buttonText:{
    textAlign:"center",
    fontFamily: "Mako",
    fontSize: 18,
    color: "white",
  },
  circleButton: {
    position: 'absolute',
    width: height * 0.075,
    height: height * 0.075,
    borderRadius: height * 0.0375,
    backgroundColor: '#ff6347',
    alignItems: 'center',
    justifyContent: "center",
    shadowColor: "#015959",
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 10
  },
});

export default DinoDashboard;