import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

import Logo from "../assets/images/logo.svg";
import TickIcon from "../assets/images/tickIcon.svg";
import SauropodSVG from "../assets/images/dinosaurImages/sauropod.svg";
import LargeTherapodSVG from "../assets/images/dinosaurImages/largeTherapod.svg";
import SmallTherapodSVG from "../assets/images/dinosaurImages/smallTherapod.svg";
import EuornithopodSVG from "../assets/images/dinosaurImages/euornithopod.svg";
import CeratopsianSVG from "../assets/images/dinosaurImages/ceratopsian.svg";
import ArmouredDinosaurSVG from "../assets/images/dinosaurImages/armouredDinosaur.svg";
import { Cell, Section, TableView } from 'react-native-tableview-simple';

import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import globalStyles from '../styles/globalStyles';

const { height, width } = Dimensions.get('window');

//uses cell to create each progress cell item
const ProgressCell = ({ title, items, dinoSpeciesAmounts }) => {

  const checkSpeciesAmounts = (number, type) => {
    if (dinoSpeciesAmounts[type] >= number) {
      return <TickIcon style={styles.image} />;
    } else {
      return;
    }
  };

  return (
    <Cell
      backgroundColor={"transparent"}
      cellContentView={
        <View>
          <View style={styles.cellContainer}>
            {items.map((itemObj, index) => (
              <View style={styles.cellTextBox} key={index}>
                <Text style={globalStyles.h3}>
                  Identify {itemObj.number} {itemObj.type}s
                </Text>
                {checkSpeciesAmounts(itemObj.number, itemObj.type)}
              </View>
            ))}
          </View>
          <View style={styles.cellTitleContainer}>
            <Text style={styles.cellTitle}>{title}</Text>
          </View>
        </View>
      }
    />
  );
};

const DinoProgressTracker = ({ navigation }) => {
  const [dinosaursCompletedAmount, setDinosaursCompletedAmount] = useState({});
  const [loading, setLoading] = useState(true);
  const [progressTitle, setProgressTitle] = useState("Dino Beginner");
  //checks firebase for the specified user to assign how many dinosaurs have been categorized of each type
  const checkProgressTitle = () => {
    if(dinosaursCompletedAmount["sauropod"] >= 30 &&
       dinosaursCompletedAmount["small theropod"] >= 30 &&
       dinosaursCompletedAmount["large theropod"] >= 30 &&
       dinosaursCompletedAmount["ceratopsian"] >= 30 &&
       dinosaursCompletedAmount["euornithopod"] >= 30 &&
       dinosaursCompletedAmount["armoured dinosaur"] >= 30)
    {
      setProgressTitle("Dino Expert");
    }else if(dinosaursCompletedAmount["sauropod"] >= 15 &&
             dinosaursCompletedAmount["small theropod"] >= 15 &&
             dinosaursCompletedAmount["large theropod"] >= 15 &&
             dinosaursCompletedAmount["ceratopsian"] >= 15 &&
             dinosaursCompletedAmount["euornithopod"] >= 15 &&
             dinosaursCompletedAmount["armoured dinosaur"] >= 15)
    {
      setProgressTitle("Dino Adept");
    }else if(dinosaursCompletedAmount["sauropod"] >= 1 &&
             dinosaursCompletedAmount["small theropod"] >= 1 &&
             dinosaursCompletedAmount["large theropod"] >= 1 &&
             dinosaursCompletedAmount["ceratopsian"] >= 1 &&
             dinosaursCompletedAmount["euornithopod"] >= 1 &&
             dinosaursCompletedAmount["armoured dinosaur"] >= 1)
    {
      setProgressTitle("Dino Student");
    }
  };

  const fetchUserData = async () => {
    const userId = auth.currentUser.uid;

    try {
      const userDocRef = doc(db, 'users', userId);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        console.log("Fetched user data after update:", userData);
        setDinosaursCompletedAmount(userData.dinosaurTypeCount || {});

      } else {
        setDinosaursCompletedAmount({});
        console.log("User document not found, setting empty data");
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    } finally {
      setLoading(false);
    }
  };
  //fetches user data
  useEffect(() => {
    fetchUserData();
  }, []);
  //monitors dinosaursCompletedAmount and calls checkProgressTitle
  useEffect(() => {
    checkProgressTitle();
  }, [dinosaursCompletedAmount]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  //data to be used for the cell view
  const progressData = [
    {
      title: "Dino Student",
      complete: false,
      items: [
        { type:"sauropod", number: 1 },
        { type:"small theropod", number: 1 },
        { type:"large theropod", number: 1 },
        { type:"ceratopsian", number: 1 },
        { type:"euornithopod", number: 1 },
        { type:"armoured dinosaur", number: 1 },
      ],
    },
    {
      title: "Dino Adept",
      complete: false,
      items: [
        { type:"sauropod", number: 15 },
        { type:"small theropod", number: 15 },
        { type:"large theropod", number: 15 },
        { type:"ceratopsian", number: 15 },
        { type:"euornithopod", number: 15 },
        { type:"armoured dinosaur", number: 15 },
      ],
    },
    {
      title: "Dino Expert",
      complete: false,
      items: [
        { type:"sauropod", number: 30 },
        { type:"small theropod", number: 30 },
        { type:"large theropod", number: 30 },
        { type:"ceratopsian", number: 30 },
        { type:"euornithopod", number: 30 },
        { type:"armoured dinosaur", number: 30 },
      ],
    },
  ];

  return (
    <ScrollView style={[{ height: "100%"}, {backgroundColor:"#EEF5F5"}]}>

      <View style={styles.topInfo}>
        <Logo height={height * 0.1} style={styles.image} />
        <Text style={globalStyles.h1}>Progress Tracker</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={[styles.textBox, globalStyles.h3]}>You are currently a {progressTitle}!</Text>
          <Text style={styles.cellTitle}>Dino Beginner</Text>
          {/* maps over progress data to create each required cell*/}
          <TableView>
            <Section hideSeparator={true} separatorTintColor="#ccc">
              {progressData.map((progressPosition, index) => (
                <ProgressCell
                  key={index}
                  title={progressPosition.title}
                  items={progressPosition.items}
                  dinoSpeciesAmounts={dinosaursCompletedAmount}
                />
              ))}
            </Section>
          </TableView>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  contentContainer:{
    width: height * 0.45,
    flex: 1,
    alignItems: 'center',
  },
  museumContainer: {
    justifyContent: "center",
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
    top: "-20%",
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: "#EEF5F5",

  },
  image: {
    padding:15,
  },
  textBox: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    borderColor:"#16B2A9",
    borderWidth:1.5,
    paddingTop:10,
    paddingBottom:10,
    margin: 30,
  },
  cellTextBox: {
    flexDirection: 'row',
    width: "100%",
    borderRadius: 10,
    borderWidth:1.5,
    backgroundColor: "white",
    borderColor:"#16B2A9",
    margin: 10,
    alignItems: 'center',
    justifyContent: "center",
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
  cellContainer: {
    flex: 1,
  },
  cellTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  cellTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#015959",
    marginBottom: 5,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "#16B2A9",
    borderWidth: 1.5,
    padding: 15,
    marginVertical: 10,
  },
  cellItem: {
    fontSize: 16,
    color: "#333",
    paddingVertical: 2,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "#16B2A9",
    borderWidth: 1.5,
    padding: 15,
    marginVertical: 10,
  },
});

export default DinoProgressTracker;