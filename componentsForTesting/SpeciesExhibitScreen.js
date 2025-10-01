import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native';
import Logo from "../assets/images/logo.jpg";
import LeftPointer from "../assets/images/evolutionImages/leftPointer.jpg";
import RightPointer from "../assets/images/evolutionImages/rightPointer.jpg";
import globalStyles from '../styles/globalStyles';

const { height, width } = Dimensions.get('window');

const SpeciesExhibit = ({ navigation }) => {
  const evoData = [
    {
      title: "Australopithecus Afarensis",
      imageUri: require("../assets/images/evolutionImages/Evolution1.jpg"),
      content: [
        {
          "timePeriod": "Time Period: 3.7 million to 3 million years ago",
          "characteristics": "Male: 151 cm, 42 kg, Female: 105 cm, 29kg"
        }
      ]
    },
    {
      title: "Homo Habilis",
      imageUri: require("../assets/images/evolutionImages/Evolution2.jpg"),
      content: [
        {
          "timePeriod": "Time Period: 2.4 million to 1.5 million years ago",
          "characteristics": "100 - 135 cm, 32 kg"
        }
      ]
    },
    {
      title: "Homo Erectus",
      imageUri: require("../assets/images/evolutionImages/Evolution3.jpg"),
      content: [
        {
          "timePeriod": "Time Period: 1.6 million to 250,000 years ago",
          "characteristics": "145 - 185 cm, 40 - 68 kg"
        }
      ]
    },
    {
      title: "Homo Neanderthalis",
      imageUri: require("../assets/images/evolutionImages/Evolution4.jpg"),
      content: [
        {
          "timePeriod": "Time Period: 400,000 to 40,000 years ago",
          "characteristics": "Male: 164 cm, 65 kg, Female: 155cm, 54kg"
        }
      ]
    },
    {
      title: "Homo Sapien",
      imageUri: require("../assets/images/evolutionImages/Evolution5.jpg"),
      content: [
        {
          "timePeriod": "Time Period: 160,000 years ago to present",
          "characteristics": "Male: 170cm, 78kg, Female: 160cm, 62kg"
        }
      ]
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleScroll = (direction) => {
    let newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;

    if (newIndex >= evoData.length) newIndex = 0;
    if (newIndex < 0) newIndex = evoData.length - 1;

    setCurrentIndex(newIndex);
    scrollViewRef.current?.scrollTo({ x: newIndex * width, animated: true });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topInfo}>
        <Image source={Logo} style={styles.image} />
        <Text style={globalStyles.h1}>Species Exhibit</Text>
      </View>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={{ width: "100%" }}
        >
          {evoData.map((item, index) => (
            <View key={index} style={styles.card}>
              <Image source={item.imageUri} style={styles.image} />
              <Text style={[styles.textBox, globalStyles.h4]}>{item.title}</Text>
              {item.content.map((contentItem, idx) => (
                <View key={idx} style={styles.textBox}>
                  <Text style={globalStyles.h4}>{contentItem.timePeriod}</Text>
                  <Text style={globalStyles.h4}>{contentItem.characteristics}</Text>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>

        <View style={styles.navButton}>
          <TouchableOpacity
            testID="left-arrow-button"
            onPress={() => handleScroll("prev")}
            style={styles.arrowButton}
          >
            <Image source={LeftPointer} style={styles.arrowImage} />
          </TouchableOpacity>

          <TouchableOpacity
            testID="right-arrow-button"
            onPress={() => handleScroll("next")}
            style={styles.arrowButton}
          >
            <Image source={RightPointer} style={styles.arrowImage} />
          </TouchableOpacity>
        </View>
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
  navButton:{
    flexDirection: "row",
    position: "absolute",
    width: height * 0.45,
    justifyContent: "space-between",
    top: "30%"
  },
  textBox: {
    width: height * 0.405,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor:"#16B2A9",
    borderWidth:1.5,
    margin:10
  },
  image: {
      margin:10,
      width: height * 0.288,
      height: height * 0.45,
      borderRadius: 20,
      resizeMode: "contain",
      borderColor:"#16B2A9",
      borderWidth:1.5
    },
    card: {
      width,
      alignItems: "center",
    },
  button:{
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
  },
});
export default SpeciesExhibit;