import styled from 'styled-components';

export const Container = styled.section`
  margin-bottom: 16px;
  background-color: rgb(21, 24, 28);
  border: 1px solid rgb(21, 24, 28);
  border-radius: 16px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.span`
  font-weight: 800;
  font-size: 20px;
  line-height: 24px;
  -webkit-line-clamp: 3;
  color: rgba(217, 217, 217, 1);
`;

export const ShowMoreButton = styled.button`
  padding: 16px;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  color: rgb(29, 155, 240);

  transition-property: background-color, box-shadow;
  transition-duration: 0.2s;
  cursor: pointer;
  text-align: left;

  &:hover {
    background-color: rgba(255, 255, 255, 0.03);
  }
`;
