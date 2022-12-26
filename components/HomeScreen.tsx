import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Text,View,FlatList,RefreshControl,TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/RootParams";
import { Post } from './Post';
import { Loading } from './Loading';
import { LogOut } from "./LogOut";
import { Snackbar } from 'react-native-paper';
import { ModalScreen } from './ModalScreen';
import { Connection } from './Connection';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "HomeScreen"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export  const HomeScreen = ({ navigation }: Props) => {
  const [postsFromServer, setPostsFromServer] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isVisible, setIsVisible] = React.useState(false);
  const [userId, setUserId] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [postId, setPostId] = React.useState(0);
  const [isConnected, setIsConnected] = React.useState<boolean | null>(false);
  const handleVisibleModal = (value: boolean) => {
    setModalVisible(value);
  }

  const handlePostPress = (valueBoolean: boolean, valuePostId: number) => {
    setModalVisible(valueBoolean);
    setPostId(valuePostId);
  }

  useEffect( () => {
    const internetConnection = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
  });

  return () => {
    internetConnection();
  }
  }, [isConnected])

React.useLayoutEffect(() => {
  navigation.setOptions({
    headerRight: () => <LogOut navigation={navigation} />,
    headerLeft: () => (isConnected ? null : <Connection />),
  });
}, [isConnected]);

const fetchPosts = () => {
  setIsLoading(true);
  axios
    .get('https://jsonplaceholder.typicode.com/posts')
    .then(({ data }) => {
      setPostsFromServer(data);
    })
    .catch(() => {
      setIsVisible(true);
    })
    .finally(() => {
      setIsLoading(false);
    });
};


const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("@userId");
    if(value !== null) {
      setUserId(+value);
    }
  } catch (e) {
      throw new Error("Error from storage");
  }
};

const userPosts = postsFromServer.filter((post) => post['userId'] === userId);

React.useEffect(() => {
  fetchPosts();
  getData();
}, []);

  return isLoading 
  ? <Loading />
  : (
    <View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />
        }
        data={userPosts}
        renderItem={({ item }) => (
            <TouchableOpacity 
            onPress={() => handlePostPress(true, item['id'])}
            >
              <Post title={item['title']} body={item['body']} />
            </TouchableOpacity>
        )}
      />
      <Snackbar
        visible={isVisible}
        onDismiss={() => {}}
        action={{
          label: "Повторити запит",
          onPress: () => {
            fetchPosts();
          },
        }}
        style={{ backgroundColor: "gray" }}
      >
        <View>
          <Text>Сталася помилка</Text>
        </View>
      </Snackbar>
      {modalVisible ? (
      <ModalScreen
        modalVisible={modalVisible}
        handleVisibleModal={handleVisibleModal}
        postId={postId}
    />
      )
    : null}

    </View>
  );
}
