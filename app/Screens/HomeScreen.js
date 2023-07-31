import { StyleSheet, Text, View, Button, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";


const HomeScreen = () => {
  const navigate = useNavigation();

  return (
    <ImageBackground
      source={require("../assets/36687.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <TouchableOpacity 
      onPress={() => navigate.navigate('Tabs')}
      style={{ width: '40%', alignSelf: 'center', top: '90%', backgroundColor: '#a77d54', padding: 15, borderRadius: 25}}>
        <Text style={{textAlign: 'center'}}>Start snapping!</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
