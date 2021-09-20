import styled from 'styled-components';

export const ActionItem = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
`;
export const ActionCircle = styled.div`
  width: 34.75px;
  height: 34.75px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  transition-property: background-color, box-shadow;
  transition-duration: 0.2s;
`;
