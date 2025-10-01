import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { getGeminiResponse } from "../utils/gemini";
import Logo from "../assets/images/logo.svg";
import globalStyles from '../styles/globalStyles';

const { width, height } = Dimensions.get('window');

const DinoSummary = ({ navigation, route }) => {
  const { selectedDinosaur, SelectedDinoImage } = route.params;
  const [geminiResponse, setGeminiResponse] = useState("");
  //this prewritten question has values that are inputted from the dataset in the data folder that are passed from the dinodashboard screen
  const prewrittenQuestion = `What are the characteristics of a ${selectedDinosaur.name}? Please include that it lived in ${selectedDinosaur.lived_in}, that is a ${selectedDinosaur.type}, the era it lived was ${selectedDinosaur.era}, and it was ${selectedDinosaur.diet}, and was ${selectedDinosaur.length} metres in length (provide a response in less than 200 words)`;

  //this useeffect creates a response from the prewritten question for the Gemini API and cleans it up a bit
  useEffect(() => {
    const fetchData = async () => {
      const aiResponse = await getGeminiResponse(prewrittenQuestion);

      const cleanedResponse = aiResponse.replace(/\*\*/g, "");

      setGeminiResponse(cleanedResponse);
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={[{ height: "100%"}, styles.container]}>
      <View>
        <View style={styles.topInfo}>
          <Logo height={height * 0.1} style={styles.image} />
          <Text style={globalStyles.h1}>{selectedDinosaur.name} Summary</Text>
        </View>

        {/* This displays the selected dino image icon */}
        <View style={styles.contentContainer}>
          <View style={styles.icon}>
            {SelectedDinoImage && (
              <SelectedDinoImage width={4 * width / 5} height={150} style={styles.iconImg}
              />
            )}
          </View>
            {/* Display the prewritten question's response from Gemini */}
            {geminiResponse ? (
              <Text style={[globalStyles.h3, styles.textBox]}>
                {geminiResponse}
              </Text>
            ) : (
              <Text style={[globalStyles.h3, styles.textBox]}>Loading summary from Gemini...</Text>
            )}
         </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF5F5",
  },
  contentContainer:{
    width: "100%",
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
  textBox: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    borderColor:"#16B2A9",
    borderWidth:1.5,
    paddingTop:10,
    paddingBottom:10,
    margin: 30,
  },
  icon: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "#008080",
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: "center",
  },
  iconImg: {
  },

});
export default DinoSummary;