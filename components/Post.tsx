import React from "react";
import styled from "styled-components/native";

const PostTitle = styled.Text`
  font-size: 16px;
  font-weight: 800;
`;

const PostView = styled.View`
  flex-direction: column;
  padding: 15px;
  border-bottom-width: 1px;
  boreder-bottom-color: black;
  border-bottom-style: solid;
`;

const PostText = styled.Text`
  font-size: 16px;
  font-weight: 400;
`;

type Props = {
  title: string;
  body: string;
};

export const Post = ({ title, body }: Props) => {
  return (
    <PostView>
      <PostTitle>{title}</PostTitle>
      <PostText>{body}</PostText>
    </PostView>
  );
};
