
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';

import Logo from "../assets/images/logo.svg";
import Fossil0percent from "../assets/images/fossilImages/fossil0percent.svg";
import Fossil30percent from "../assets/images/fossilImages/fossil30percent.svg";
import Fossil60percent from "../assets/images/fossilImages/fossil60percent.svg";
import Fossil100percent from "../assets/images/fossilImages/fossil100percent.svg";
import Brush from "../assets/images/fossilImages/brush.svg";
import globalStyles from '../styles/globalStyles';

const { height, width } = Dimensions.get('window');
//some of this is based on the accelerometer lecture video so there is some overlap
const FossilClean = () => {
  const [data, setData] = useState({
    x:0,
    y:0,
    z:0
  });
  const [cleanPercentage, setCleanPercentage] = useState(0);
  const [subscription, setSubscription] = useState(null);
  const [verticalPositiveCheck, setVerticalPositiveCheck] = useState(true);
  const [verticalNegativeCheck, setVerticalNegativeCheck] = useState(true);
  //this function updates the background image based on the cleanPercentage
  const checkBackgroundImage = () => {
    if (cleanPercentage >= 100)
    {
      return <Fossil100percent height={height * 0.5}/>;
    } else if (cleanPercentage >= 60)
    {
      return <Fossil60percent height={height * 0.5}/>;
    } else if (cleanPercentage >= 30)
    {
      return <Fossil30percent height={height * 0.5}/>;
    }else{
      return <Fossil0percent height={height * 0.5}/>;
    }
  }
  //this useeffect updates the clean percentage based on the user's screen tilt
  useEffect(() => {
    if(data.y >0.5 && verticalPositiveCheck===true && cleanPercentage < 100)
    {
      setCleanPercentage(prevPercentage => prevPercentage + 10);
      setVerticalPositiveCheck(false);
      setVerticalNegativeCheck(true);
    }
    if(data.y <-0.5 && verticalNegativeCheck===true && cleanPercentage < 100)
    {
      setCleanPercentage(prevPercentage => prevPercentage + 10);
      setVerticalNegativeCheck(false);
      setVerticalPositiveCheck(true);
    }
  }, [data]);

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(accelerometerData => {
        setData(accelerometerData);
      })
    )
  }
  const _unsubscribe = () => {
    subscription && subscription.remove();
  }

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return(
    <View style = {styles.container}>
      <View style={styles.topInfo}>
        <Logo height={height * 0.1} />
        <Text style={globalStyles.h1}>Fossil Clean Up</Text>
      </View>
      <Text style={globalStyles.h3}>Twist your phone to clean up the fossil!</Text>
      <View style={styles.fossilImage}>
        {checkBackgroundImage()}
      </View>
      <View style={[styles.ball, {top:scale(data.y, -1,1,0, Dimensions.get("window").height-(height/4)), left:scale(data.x,-1,1,0,Dimensions.get("window").width-(width/3))}]}>
        <Brush height={height * 0.2}/>
      </View>
      <Text style={globalStyles.h3}>{cleanPercentage}% clean!</Text>
      <StatusBar style = "auto"/>
    </View>
  );
}

function scale(number, inMin, inMax, outMin, outMax){
  return (number-inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
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