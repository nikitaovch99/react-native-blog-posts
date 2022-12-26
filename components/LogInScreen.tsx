import styled from "styled-components/native";
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Snackbar } from "react-native-paper";
import { Loading } from "./Loading";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/RootParams";

const LogInForm = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  height: 100%;
`;

const TextInputForm = styled.TextInput.attrs({
  placeholderTextColor: "gray",
})`
  font-size: 14px;
  font-weight: 700;
  line-height: 21px;
  color: black;
  placeholdertextcolor: black;

  background-color: white;
  border: none;
  width: 270px;
  height: 40px;
  margin-top: 15px;
  border-bottom-width: 1px;
  boreder-bottom-color: black;
  border-bottom-style: solid;
`;

const ButtonForm = styled.TouchableOpacity`
    margin-top: 60px;
    display: flex;
    width: 200px;
    height: 48px;
    justify-content: center;
    align-items: center;

    border-width: 1px;
    boreder-color: black;
    border-style: solid;

    color: black;
    background: white;
    text-align: center;
    cursor: pointer;
`;

const ButtonText = styled.Text`
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
`;

const TextInputError = styled.Text`
  margin-left: 20px;
  color: darkred;
  font-weight: 700;
  font-size: 12px;
  text-align: left;
  width: 288px;
`;

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LogIn"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};


export const LogInScreen = ({ navigation }: Props) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [usersFromServer, setUsersFromServer] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isVisible, setIsVisible] = React.useState(false);

  const fetchUsers = () => {
  setIsLoading(true);
  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then(({ data }) => {
      setUsersFromServer(data);
    })
    .catch(() => {
      setIsVisible(true);
    })
    .finally(() => {
      setIsLoading(false);
    });
};

  const correctEmail = usersFromServer.find(user => user['email'] === email);
  const correctPassword = usersFromServer.find(
    (user) => user['phone'] === password
  );

  const correctUser = usersFromServer.find(
    (user) => user['email'] === email && user['phone'] === password
  );

  const storeData = async () => {
    try {
      await AsyncStorage.setItem("@userId", JSON.stringify(correctUser?.['id']));
      navigation.replace("HomeScreen");
      setEmail("");
      setPassword("");
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmitButton = () => {
    if (correctUser) {
      storeData();
    }

    if(!correctEmail) {
      setEmailError(true);
    }

    if(!correctPassword) {
      setPasswordError(true);
    }
  }

  const OnlyPublicRoute = async () => {
      try {
        const value = await AsyncStorage.getItem("@userId") || 0;
        if(+value > 0) {
          navigation.replace("HomeScreen");
        }
      } catch (e) {
        throw new Error("Error from storage");
      }
  };

  const ShowLoginButton = email.length > 3 && password.length > 3;

  React.useEffect(() => {
    fetchUsers();
    OnlyPublicRoute();
  }, []);


  return isLoading
  ? <Loading />
  : (
    <LogInForm>
      <TextInputForm
        onChangeText={(val) => {
          setEmail(val);
        }}
        value={email}
        placeholder="Enter Email"
      ></TextInputForm>
      {emailError ? <TextInputError>Incorrect Email</TextInputError> : null}
      <TextInputForm
        onChangeText={(val) => {
          setPassword(val);
        }}
        value={password}
        placeholder="Enter Password"
        secureTextEntry={true}
      ></TextInputForm>
      {passwordError ? (
        <TextInputError>Incorrect Password</TextInputError>
      ) : null}
      {ShowLoginButton && (
        <TouchableOpacity>
          <ButtonForm onPress={onSubmitButton}>
            <ButtonText>Log In</ButtonText>
          </ButtonForm>
        </TouchableOpacity>
      )}
      <Snackbar
        visible={isVisible}
        onDismiss={() => {}}
        action={{
          label: "Повторити запит",
          onPress: () => {
            fetchUsers();
          },
        }}
        style={{ backgroundColor: "gray" }}
      >
        <View>
          <Text>Сталася помилка</Text>
        </View>
      </Snackbar>
    </LogInForm>
  );
}
