import styled from "styled-components/native";

const CommentName = styled.Text`
  font-size: 16px;
  font-weight: 800;
`;

const CommentView = styled.View`
  flex-direction: column;
  padding: 15px;
  border-bottom-width: 1px;
  boreder-bottom-color: black;
  border-bottom-style: solid;
`;

const CommentText = styled.Text`
  font-size: 16px;
  font-weight: 400;
`;

type Props = {
  name: string;
  body: string;
}

export const Comment = ({ name, body }: Props) => {
  return (
    <CommentView>
      <CommentName>{name}</CommentName>
      <CommentText>{body}</CommentText>
    </CommentView>
  );
};
