import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { Snackbar } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { Comment } from "./Comment";
import { Loading } from "./Loading";

const ModalView = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const ViewModal = styled.TouchableOpacity`
  width: 400px;
  height: 500px;
  background-color: white;
  border-radius: 20px;
  padding: 15px;
  shadow-color: #000;
  border-width: 1px;
  boreder-color: black;
  border-style: solid;
  overflow: hidden;
`;

const PostTitle = styled.Text`
  font-size: 16px;
  font-weight: 800;
`;

const PostText = styled.Text`
  font-size: 16px;
  font-weight: 400;
`;

const CommentsView = styled.View`
  border-width: 1px;
  boreder-color: black;
  border-style: solid;
  height: 400px
  width: 370px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 800;
`;

type Props = {
  modalVisible: boolean;
  handleVisibleModal: (value: boolean) => void;
  postId: number;
};

interface Post {
  title: string;
  body: string;
}

export const ModalScreen = ({
  modalVisible,
  handleVisibleModal,
  postId,
}: Props) => {
  const [commentsFromServer, setCommentsFromServer] = useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [postFromServer, setPostFromServer] = React.useState<Post | null>(null);

  const fetchPost = () => {
    setIsLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/posts/" + postId)
      .then(({ data }) => {
        setPostFromServer(data);
      })
      .catch((error) => {
        console.log('Error', error);
          setIsVisible(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchComments = () => {
    setIsLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then(({ data }) => {
        setCommentsFromServer(data);
      })
      .catch(() => { 
        setIsVisible(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const postsComments = commentsFromServer.filter(
    (comment) => comment["postId"] === +postId
  );

  React.useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        handleVisibleModal(false);
      }}
    >
      <ModalView onPress={() => handleVisibleModal(false)} activeOpacity={1}>
        <ViewModal activeOpacity={1}>
          {isLoading ? (
            <Loading></Loading>
          ) : (
            <>
              <PostTitle>{postFromServer?.title}</PostTitle>
              <PostText>{postFromServer?.body}</PostText>
              <Title>Comments:</Title>
              <CommentsView>
                <FlatList
                  data={postsComments}
                  renderItem={({ item }) => (
                    <Comment name={item["name"]} body={item["body"]} />
                  )}
                />
              </CommentsView>
              <Snackbar
                visible={isVisible}
                onDismiss={() => {}}
                action={{
                  label: "Повторити запит",
                  onPress: () => {
                    fetchPost();
                    fetchComments();
                  },
                }}
                style={{
                  backgroundColor: "gray",
                  transform: [{ translateX: 15 }],
                }}
              >
                <View>
                  <Text>Сталася помилка</Text>
                </View>
              </Snackbar>
            </>
          )}
        </ViewModal>
      </ModalView>
    </Modal>
  );
};
