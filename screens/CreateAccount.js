import React, { useState, useEffect } from 'react';
import { TextInput, Dimensions, StyleSheet, View, Text, Button, Image, TouchableOpacity } from 'react-native';
import Logo from "../assets/images/logo.svg";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import globalStyles from '../styles/globalStyles';

const { width, height } = Dimensions.get('window');
const CreateAccount = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  {/*Creates account with Firebase or sends error*/}
  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setMessage('Account created successfully!');
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Logo style={styles.image}/>
      <Text style={globalStyles.h2}>Welcome to </Text>
      <Text style={globalStyles.h1}>Prehistoria</Text>
      {/*Create text inputs*/}
      <Text style={globalStyles.h3}>Understand how life was before the modern human.</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {/*Call handle sign up on button press*/}
          <TouchableOpacity
            style={styles.button}
            onPress={handleSignUp}
          >
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
          {message && <Text>{message}</Text>}
          {error && <Text style={styles.errorText}>{error}</Text>}
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
  errorText: {
    color: 'red',
    marginTop: 10,
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

export default CreateAccount;