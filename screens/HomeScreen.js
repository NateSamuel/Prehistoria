import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, Dimensions, TouchableOpacity } from 'react-native';
import Logo from "../assets/images/logo.svg";
import Museum from "../assets/images/museum_unselected.svg";
import MuseumLeft from "../assets/images/museum_left.svg";
import MuseumCentral from "../assets/images/museum_central.svg";
import MuseumRight from "../assets/images/museum_right.svg";
import globalStyles from '../styles/globalStyles';
const { height, width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [selectedExhibitionType, setSelectedExhibitionType] = useState(null);

  const pickExhibitionType = (item) => {
    setSelectedExhibitionType(item);
  };
  //changes the museum image based on what is clicked
  const displayMuseumImage = () => {
    if (selectedExhibitionType == null) {
      return <Museum height={height * 0.2} style={styles.museumImg} />;
    } else if (selectedExhibitionType == "Dinosaur Exhibit"){
      return <MuseumCentral height={height * 0.2} style={styles.museumImg} />;
    } else if (selectedExhibitionType == "Fossil Clean-Up"){
      return <MuseumLeft height={height * 0.2} style={styles.museumImg} />;
    } else {
      return <MuseumRight height={height * 0.2} style={styles.museumImg} />;
    }
  };
  //changes the text below the museum image based on what is chosen
  const displayExhibition = () => {
    if (selectedExhibitionType == null) {
      return <Text style={[styles.textBoxBottom,globalStyles.h3]}>Press the different areas of the museum above</Text>;
    } else {
      return <Text style={[styles.textBoxBottom,globalStyles.h3]}>{selectedExhibitionType} Selected</Text>;
    }
  };
  //navigates to specific exhibition
  const enterExhibition = () => {
    if (selectedExhibitionType == null) {
      return;
    } else {
      navigation.navigate(selectedExhibitionType);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topInfo}>
        <Logo height={height * 0.1} style={styles.image} />
        <Text style={globalStyles.h1}>Museum Home</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={[styles.textBox,globalStyles.h3]}>You have arrived at the museum. Where would you like to go?</Text>
        {/*Calls the function to set the museum image*/}
        <View style={styles.museumContainer}>
          {displayMuseumImage()}
        </View>
        {/* Invisible buttons over the top of the museum images*/}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.museumButton}
            onPress={() => setSelectedExhibitionType('Fossil Clean-Up')}/>
          <TouchableOpacity
            style={styles.museumButton}
            onPress={() => setSelectedExhibitionType('Dinosaur Exhibit')}/>
          <TouchableOpacity
            style={styles.museumButton}
            onPress={() => setSelectedExhibitionType('Evolution Exhibit')}/>
        </View>
        {/*Calls the function to set the text below the museum image*/}
        {displayExhibition()}
        <TouchableOpacity
          style={styles.button}
          onPress={() => enterExhibition()}
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
  museumContainer: {
    position:"absolute",
    top: (height * 0.2),
    flex: 1,
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
    position:"absolute",
    top: (height * 0.2),
    flexDirection: 'row',
    width: height * 0.45,
    backgroundColor: "transparent",
  },
  image: {
  },
  textBox: {
    width: height * 0.45,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor:"#16B2A9",
    borderWidth:1.5,
    paddingTop:10,
    paddingBottom:10,
    margin: 30,
  },
  textBoxBottom: {
    position:"absolute",
    bottom: height * 0.2,
    width: height * 0.45,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor:"#16B2A9",
    borderWidth:1.5,
    paddingTop:10,
    paddingBottom:10,
  },
  museumButton: {
    alignItems: 'center',
    width: height * 0.15,
    height: height * 0.2,
    backgroundColor: "transparent",
    textAlign: "center",
    borderRadius: 10,
    zIndex: 2,
  },
  museumImg: {
    zIndex: 1,
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

export default HomeScreen;