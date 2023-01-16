import React from "react";
import { Text, ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const LoadingView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Loading = () => {
  return (
    <LoadingView>
      <ActivityIndicator size="large" />
      <Text>Загрузка...</Text>
    </LoadingView>
  );
};
