import { View } from "react-native";
import React from "react";
import styled from "styled-components/native";

const ConnectionText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  position: absolute;
  left: 150px;
`;

export const Connection = () => {
  return (
    <View>
      <ConnectionText>No connection</ConnectionText>
    </View>
  );
};
