import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Logo from "../assets/images/logo.svg";
import LocationUnselected from "../assets/images/evolutionImages/locationUnselected.svg";
import LocationSelected from "../assets/images/evolutionImages/locationSelected.svg";
import TypeUnselected from "../assets/images/evolutionImages/speciesUnselected.svg";
import TypeSelected from "../assets/images/evolutionImages/speciesSelected.svg";
import globalStyles from '../styles/globalStyles';

const { height, width } = Dimensions.get('window');

const EvolutionExhibit = ({ navigation }) => {

  const [selectedScreenType, setSelectedScreenType] = useState(null);

  //sets the selected screen chosen
  const pickScreenType = (item) => {
    setSelectedScreenType(item);
  };

  //stores which icon is used
  const screenIcons = {
    "Locate Human Arrivals": {
      selected: LocationSelected,
      unselected: LocationUnselected,
    },
    "Species Exhibit": {
      selected: TypeSelected,
      unselected: TypeUnselected,
    }
  }
  //displays text based on icon picked
  const displaySelectedScreen = () => {
    if (selectedScreenType == null) {
      return <Text style={[styles.textBoxBottom,globalStyles.h3]}>Press the icons above</Text>;
    } else {
      return <Text style={[styles.textBoxBottom,globalStyles.h3]}>{selectedScreenType}</Text>;
    }
  };
  //enters the screen
  const enterChosenScreen = () => {
    if (selectedScreenType === null) {
      return;
    } else if (selectedScreenType === "Locate Human Arrivals"){
      navigation.navigate("Locate Human Arrivals");
    }else {
      navigation.navigate("Species Exhibit");
    }
  };
  //icon button rendered based on selectedScreenType
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
        <Text style={globalStyles.h1}>Evolution Exhibit</Text>
      </View>
      {/*buttons calling pickScreenType on press*/}
      <View style={styles.contentContainer}>
        <TouchableOpacity
          onPress={() => pickScreenType("Locate Human Arrivals")}
        >
          <IconButton screenType="Locate Human Arrivals" size={0.2}/>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => pickScreenType("Species Exhibit")}
        >
          <IconButton screenType="Species Exhibit" size={0.2}/>
        </TouchableOpacity>
        {/* Displays selected icon text*/}
        {displaySelectedScreen()}
        {/* Calls navigation to selected screen*/}
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
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    borderColor:"#16B2A9",
    borderWidth:1.5,
    margin:10,
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
export default EvolutionExhibit;