import React, { useState, useEffect } from 'react';
import { TextInput, Dimensions, StyleSheet, View, Text, Button, Image, TouchableOpacity } from 'react-native';
import Logo from "../assets/images/logo.svg";
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import globalStyles from '../styles/globalStyles';

const { width, height } = Dimensions.get('window');

const Entry = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [enterButton, setEnterButton] = useState('Enter Without Login');

  //deals with login and sends 'login successful or 'error response
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('Login successful!');
      setEnterButton("Enter");
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Logo style={styles.image}/>
      <Text style={globalStyles.h2}>Welcome to </Text>
      <Text style={globalStyles.h1}>Prehistoria</Text>
      <Text style={globalStyles.h3}>Understand how life was before the modern human.</Text>
      {/*Text inputs for login*/}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {/*Response message*/}
      {message && <Text>{message}</Text>}

      <Text style={globalStyles.h3}>Or</Text>
      {/*Navigates to create account screen*/}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Create Account')}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
      {/*Enter the app*/}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>{enterButton}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: "#EEF5F5",
  },

  image: {
    width: height * 0.405,
    marginTop:height * 0.0045,
    height: height * 0.405,
    borderRadius: 10,
  },
  button:{
    backgroundColor: "#008080",
    textAlign:"center",
    width: height * 0.225,
    margin:height * 0.009,
    padding: 10,
    borderRadius: 10,
  },
  buttonText:{
    textAlign:"center",
    fontFamily: "Mako",
    fontSize: 18,
    color: "white",
  },
  input: {
    backgroundColor: "white",
    width: height * 0.36,
    height: height * 0.05,
    borderRadius:height * 0.18,
    borderColor: 'gray',
    borderWidth: 1,
    margin: height * 0.009,
    paddingLeft: 8,
  },
});
export default Entry;