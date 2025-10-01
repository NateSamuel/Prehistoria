import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';

import globalStyles from '../styles/globalStyles';

const { height, width } = Dimensions.get('window');


const logo = require("../assets/images/logo.jpg");
const fossil0percent = require("../assets/images/fossilImages/fossil0percent.png");
const fossil30percent = require("../assets/images/fossilImages/fossil30percent.png");
const fossil60percent = require("../assets/images/fossilImages/fossil60percent.png");
const fossil100percent = require("../assets/images/fossilImages/fossil100percent.png");
const brush = require("../assets/images/fossilImages/brush.png");

const FossilClean = () => {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [cleanPercentage, setCleanPercentage] = useState(0);
  const [subscription, setSubscription] = useState(null);
  const [verticalPositiveCheck, setVerticalPositiveCheck] = useState(true);
  const [verticalNegativeCheck, setVerticalNegativeCheck] = useState(true);

  const checkBackgroundImage = () => {
    if (cleanPercentage >= 100) {
      return fossil100percent;
    } else if (cleanPercentage >= 60) {
      return fossil60percent;
    } else if (cleanPercentage >= 30) {
      return fossil30percent;
    } else {
      return fossil0percent;
    }
  };

  useEffect(() => {
    if (data.y > 0.5 && verticalPositiveCheck === true && cleanPercentage < 100) {
      setCleanPercentage((prevPercentage) => prevPercentage + 10);
      setVerticalPositiveCheck(false);
      setVerticalNegativeCheck(true);
    }
    if (data.y < -0.5 && verticalNegativeCheck === true && cleanPercentage < 100) {
      setCleanPercentage((prevPercentage) => prevPercentage + 10);
      setVerticalNegativeCheck(false);
      setVerticalPositiveCheck(true);
    }
  }, [data]);

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        setData(accelerometerData);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topInfo}>
        <Image source={logo} style={{ height: height * 0.1, resizeMode: 'contain' }} />
        <Text style={globalStyles.h1}>Fossil Clean Up</Text>
      </View>
      <Text style={globalStyles.h3}>Twist your phone to clean up the fossil!</Text>
      <View style={styles.fossilImage}>
        <Image source={checkBackgroundImage()} style={{ height: height * 0.5, resizeMode: 'contain' }} />
      </View>
      <View
        style={[
          styles.ball,
          {
            top: scale(data.y, -1, 1, 0, Dimensions.get('window').height - height / 4),
            left: scale(data.x, -1, 1, 0, Dimensions.get('window').width - width / 3),
          },
        ]}
      >
        <Image source={brush} style={{ height: height * 0.2, resizeMode: 'contain' }} />
      </View>

      <Text style={globalStyles.h3}>{cleanPercentage}% clean!</Text>
      <StatusBar style="auto" />
    </View>
  );
};

function scale(number, inMin, inMax, outMin, outMax) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
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
  fossilImage: {
    alignItems: 'center',
  },
  ball: {
    position:"absolute",
  }
});

export default FossilClean;