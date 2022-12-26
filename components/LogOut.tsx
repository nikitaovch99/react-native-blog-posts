import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/RootParams";


const Touchable = styled.TouchableOpacity`
  padding: 10px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  boreder-color: black;
  border-style: solid;

`;

const ButtonText = styled.Text`
font-size: 14px;
font-weight: 500;
`;

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "HomeScreen"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export const LogOut = ({ navigation }: Props) => {
  const ClearStorage = () => {
    AsyncStorage.clear();
    navigation.replace("LogIn");
  };

  return (
    <Touchable onPress={ClearStorage}>
      <ButtonText>Log Out</ButtonText>
    </Touchable>
  );
};