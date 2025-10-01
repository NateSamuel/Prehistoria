import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import SauropodSVG from "../assets/images/dinosaurImages/sauropod.svg";
import LargeTherapodSVG from "../assets/images/dinosaurImages/largeTherapod.svg";
import SmallTherapodSVG from "../assets/images/dinosaurImages/smallTherapod.svg";
import EuornithopodSVG from "../assets/images/dinosaurImages/euornithopod.svg";
import CeratopsianSVG from "../assets/images/dinosaurImages/ceratopsian.svg";
import ArmouredDinosaurSVG from "../assets/images/dinosaurImages/armouredDinosaur.svg";
import QuestionData from "../assets/data/dinoDataMain.json";
import Logo from "../assets/images/logo.svg";
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import globalStyles from '../styles/globalStyles';

const { height, width } = Dimensions.get('window');

const DinoCollections = ({navigation}) => {
  const dinoImages = {
    "sauropod": SauropodSVG,
    "large theropod": LargeTherapodSVG,
    "ceratopsian": CeratopsianSVG,
    "euornithopod": EuornithopodSVG,
    "small theropod": SmallTherapodSVG,
    "armoured dinosaur": ArmouredDinosaurSVG,
  };
  const [dinosaursIdentified, setDinosaursIdentified] = useState({});
  const [loading, setLoading] = useState(true);
  //this gets the user data from the firebase if the user is logged in an puts it in dinosaursIdentified
  const fetchUserData = async () => {
    const userId = auth.currentUser.uid;

    try {
      const userDocRef = doc(db, 'users', userId);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setDinosaursIdentified(userData.identifiedDinosaurs || {});
      } else {
        setDinosaursIdentified({});
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  //calls fetch user data on navigation to this screen
  useEffect(() => {
    fetchUserData();
  }, []);
  //creates load icon if loading/no data if the user isn't logged in
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  //adds up all the types of dinosaur from the dataset
  const typeCounts = QuestionData.reduce((acc, dino) => {
    acc[dino.type] = (acc[dino.type] || 0) + 1;
    return acc;
  }, {});
  //adds up the amount of each type collected from firebase
  const userTypeCounts = Object.values(dinosaursIdentified).reduce((acc, type) => {
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  return (
    <ScrollView style={{ height: "100%" }}>
      <View style={styles.container}>
        <View style={styles.topInfo}>
          <Logo height={height * 0.1} style={styles.image} />
          <Text style={globalStyles.h1}>Collections</Text>
        </View>
        <Text style={globalStyles.h3}>The info below shows how many unique dinosaurs from each species you have categorised.</Text>
        //creates amountCollected based on firebase and the QuestionData dataset
        {Object.entries(typeCounts).map(([type, totalCount]) => {
          const userCount = userTypeCounts[type] || 0;
          const amountCollected = `${userCount}/${totalCount}`;
          const DinoIcon = dinoImages[type];

          return (
            <View key={type} style={styles.row}>
              <View style={styles.icon}>
                {DinoIcon && <DinoIcon width={height * 0.36} height={height * 0.18} style={styles.iconImg} />}
              </View>
              {/*displays amountCollected */}
              <Text style={[globalStyles.h3, styles.textBox]}>
                {type}: {amountCollected}
              </Text>
            </View>
          );
        })}
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
  header: {
    fontSize: 22,
    marginTop: 20,
    fontWeight: 'bold',
  },
  statText: {
    fontSize: 16,
    marginVertical: 5,
  },
  noDataText: {
    fontSize: 16,
    color: 'gray',
  },
  row: {
    alignItems: "center",
    marginVertical: 5,
  },
  icon: {

    width: height * 0.18,
    height: height * 0.18,
    backgroundColor: "white",
    borderRadius: height * 0.09,
    borderColor: "#008080",
    borderWidth: 6,

  },
  iconImg: {
    left: - (0.09 * height),
  },
  textBox: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    borderColor:"#16B2A9",
    borderWidth:1.5,
    paddingTop:10,
    paddingBottom:10,
    margin: 30,
  }
});
export default DinoCollections;