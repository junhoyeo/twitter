import styled from 'styled-components';
import MoreIcon from '../assets/more.svg';

export const MoreButton = () => {
  return (
    <RelativeContainer>
      <Circle>
        <BlueMore />
      </Circle>
    </RelativeContainer>
  );
};

const RelativeContainer = styled.div`
  width: 18.75px;
  height: 18.75px;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Circle = styled.button`
  width: 34.75px;
  height: 34.75px;
  border-radius: 50%;

  position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  transition-property: background-color, box-shadow;
  transition-duration: 0.2s;
  background-color: transparent;

  &:hover {
    background-color: rgba(29, 155, 240, 0.1);
  }
`;
const BlueMore = styled(MoreIcon)`
  fill: rgb(110, 118, 125);
  width: 18.75px;
  height: 18.75px;

  &:hover {
    fill: rgb(29, 155, 240);
  }
`;
