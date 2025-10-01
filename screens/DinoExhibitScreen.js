import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Dimensions, } from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import QuestionData from "../assets/data/dinoDataMain.json";
import Logo from "../assets/images/logo.svg";
import Museum from "../assets/images/museum_unselected.svg";
import ProgressTrackerSelected from "../assets/images/progress_tracker_selected.svg";
import ProgressTrackerUnselected from "../assets/images/progress_tracker_unselected.svg";
import CategorizerSelected from "../assets/images/categorizer_selected.svg";
import CategorizerUnselected from "../assets/images/categorizer_unselected.svg";
import CollectionsSelected from "../assets/images/collections_selected.svg";
import CollectionsUnselected from "../assets/images/collections_unselected.svg";
import SauropodSVG from "../assets/images/dinosaurImages/sauropod.svg";
import LargeTherapodSVG from "../assets/images/dinosaurImages/largeTherapod.svg";
import SmallTherapodSVG from "../assets/images/dinosaurImages/smallTherapod.svg";
import EuornithopodSVG from "../assets/images/dinosaurImages/euornithopod.svg";
import CeratopsianSVG from "../assets/images/dinosaurImages/ceratopsian.svg";
import ArmouredDinosaurSVG from "../assets/images/dinosaurImages/armouredDinosaur.svg";
import globalStyles from '../styles/globalStyles';

const { height, width } = Dimensions.get('window');


const DinoExhibit = ({ navigation }) => {
  //assigns image data to be passed into navigation of dinodashboard
  const dinoImages = {
    "sauropod": SauropodSVG,
    "large theropod": LargeTherapodSVG,
    "ceratopsian": CeratopsianSVG,
    "euornithopod": EuornithopodSVG,
    "small theropod": SmallTherapodSVG,
    "armoured dinosaur": ArmouredDinosaurSVG,
  };

  //data to change icon to selected or unselected
  const screenIcons = {
    "Progress Tracker": {
      selected: ProgressTrackerSelected,
      unselected: ProgressTrackerUnselected,
    },
    "Dinosaur Categorizer": {
      selected: CategorizerSelected,
      unselected: CategorizerUnselected,
    },
    "Collections": {
      selected: CollectionsSelected,
      unselected: CollectionsUnselected,
    }
  }

  const [selectedDino, setSelectedDino] = useState(null);
  const [selectedDinoImage, setSelectedDinoImage] = useState(null);
  const [selectedScreenType, setSelectedScreenType] = useState(null);

  //when the enter button is pressed and the selectedScreenType is Dinodashboard, this picks a random dinosaur from the dataset
  const pickRandomDino = () => {
    const randomIndex = Math.floor(Math.random() * QuestionData.length);
    const randomDino = QuestionData[randomIndex];
    setSelectedDino(randomDino);
  };

  //tracks selectedDino so that when this changes it navigates to dinodashboard it passes the correct data for the specific dinosaur
  useEffect(() => {
    if (selectedDino) {
      console.log("Updated Selected Dino:", selectedDino);

      const selectedImage = dinoImages[selectedDino.type];

      console.log("Updated Selected Dino Image:", selectedImage);

      setSelectedDinoImage(selectedImage);

      navigation.navigate('DinoNavStack', { screen: 'Dinosaur Dashboard', params: { selectedDino, SelectedDinoImg: selectedImage } });
    }
  }, [selectedDino]);


  const pickScreenType = (item) => {
    setSelectedScreenType(item);
  };
  //displays text about what screen type has been selected
  const displaySelectedScreen = () => {
    if (selectedScreenType == null) {
      return <Text style={[styles.textBox,globalStyles.h3]}>Press the icons above</Text>;
    } else {
      return <Text style={[styles.textBox,globalStyles.h3]}>{selectedScreenType}</Text>;
    }
  };

  //navigates to progress tracker or collections screen or calls pickRandomDino
  const enterChosenScreen = () => {
    if (selectedScreenType === null) {
      return;
    } else if (selectedScreenType === "Dinosaur Categorizer"){
      pickRandomDino();
    } else if(selectedScreenType === "Progress Tracker"){
      navigation.navigate("Dinosaur Progress Tracker");
    } else {
      navigation.navigate("Dinosaur Collections");
    }
  };
  //changes the icon based on if it has been pressed or not
  const IconButton = ({ screenType, size }) => {
    const Icon = selectedScreenType === screenType
      ? screenIcons[screenType].selected
      : screenIcons[screenType].unselected;

    return (
      <TouchableOpacity onPress={() => pickScreenType(screenType)}>
        <Icon height={height * size} />
      </TouchableOpacity>
    );
  };


  return (
      <View style={styles.container}>
        <View style={styles.topInfo}>
          <Logo height={height * 0.1} />
          <Text style={globalStyles.h1}>Dinosaur Exhibit</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={[styles.textBox,globalStyles.h3]}>Are you ready to start your research at the dinosaur exhibit?</Text>
          {/* Items to be pressed */}
          <TouchableOpacity
            onPress={() => pickScreenType("Progress Tracker")}
          >
            <IconButton screenType="Progress Tracker" size={0.1}/>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => pickScreenType("Dinosaur Categorizer")}
          >
            <IconButton screenType="Dinosaur Categorizer" size={0.2}/>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => pickScreenType("Collections")}
          >
            <IconButton screenType="Collections" size={0.1}/>
          </TouchableOpacity>
        {displaySelectedScreen()}
        {/* Enter button calls enterChosenScreen on click*/}
        <TouchableOpacity
          style={styles.button}
          onPress={() => enterChosenScreen()}
        >
          <Text style={styles.buttonText}>Enter</Text>
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
  topInfo: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    paddingLeft: 20,
    margin: 10,
  },
  buttonContainer: {
    top: "-20%",
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    backgroundColor: "#EEF5F5",

  },
  textBox: {
    width: height * 0.45,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor:"#16B2A9",
    borderWidth:1.5,
    paddingTop:10,
    paddingBottom:10,
    margin: 10,
  },
  image: {
    width: '90%',
    marginTop:10,
    height: 200,
    borderRadius: 10,
  },
  button:{
    position:"absolute",
    bottom: height * 0.003,
    backgroundColor: "#008080",
    textAlign:"center",
    width: "30%",
    margin:"10%",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    fontFamily: "Mako",
    fontSize: 18,
    color: "white",
  }
});


export default DinoExhibit;