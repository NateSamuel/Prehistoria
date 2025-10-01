import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Location from "expo-location";
import CountryCodeToContinent from "../assets/data/countryToContinent.json";
import Logo from "../assets/images/logo.jpg";
import globalStyles from '../styles/globalStyles';

const { height, width } = Dimensions.get('window');
const LocHumanArrivals = ({ navigation }) => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [continent, setContinent] = useState("Fetching...");

    const continentToYear = {
        "Africa": "200,000-100,000",
        "Antarctica": "1,300",
        "Asia": "70,000-25,000",
        "Europe": "40,000-25,000",
        "North America": "15,000-4,500",
        "Oceania": "50,000-1,500",
        "South America": "12,000"
    };

    const getContinent = async (latitude, longitude) => {
      let address = await Location.reverseGeocodeAsync({ latitude, longitude });

      if (address.length > 0) {
        const countryCode = address[0].isoCountryCode;
        const continentConverted = CountryCodeToContinent[countryCode] || "Unknown";
        setContinent(continentConverted);
      }
    };

    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);

        if (currentLocation) {
          getContinent(currentLocation.coords.latitude, currentLocation.coords.longitude);
        }
      })();
    }, []);

    return (
      <View style={styles.container}>
        <View style={styles.topInfo}>
          <Image source={Logo} style={styles.image} />
          <Text style={globalStyles.h1}>Locate Human Arrivals</Text>
        </View>
        <View style={styles.contentContainer}>
            <Text style={[globalStyles.h2]}>When did the modern human arrive in your current continent?</Text>
            {errorMsg ? (
              <Text style={[globalStyles.h3, styles.textBox]}>{errorMsg}</Text>
            ) : (
              <Text style={[globalStyles.h3, styles.locationTextBox]}>{location ? `The modern human arrived in ${continent} at around ${continentToYear[continent]} thousand years ago` : "Fetching location..."}</Text>
            )}
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
  locationTextBox: {
    width: height * 0.45,
    alignItems: 'center',
    backgroundColor: "white",
    borderRadius: 10,
    marginTop:50,
    borderColor:"#16B2A9",
    borderWidth:1.5,
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

export default LocHumanArrivals;