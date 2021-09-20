import styled from 'styled-components';

import { MoreButton } from '../Tweet/MoreButton';

export const TrendsForYou = () => {
  return (
    <Container>
      <Header>
        <Title>Trends for you</Title>
      </Header>
      <TrendItem />
      <TrendItem />
      <TrendItem />
      <ShowMoreButton>Show more</ShowMoreButton>
    </Container>
  );
};

const Container = styled.section`
  margin-bottom: 16px;
  background-color: rgb(21, 24, 28);
  border: 1px solid rgb(21, 24, 28);
  border-radius: 16px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
`;
const Title = styled.span`
  font-weight: 800;
  font-size: 20px;
  line-height: 24px;
  -webkit-line-clamp: 3;
  color: rgba(217, 217, 217, 1);
`;

const TrendItem = () => {
  return (
    <ItemContainer>
      <TrendingIn>Trending in South Korea</TrendingIn>
      <TrendingKeyword>추석 당일</TrendingKeyword>
      <TrendingImpact>5,689 Tweets</TrendingImpact>
      <AbsoluteMoreButton></AbsoluteMoreButton>
    </ItemContainer>
  );
};
const ItemContainer = styled.div`
  padding: 12px 16px;

  position: relative;
  display: flex;
  flex-direction: column;

  transition-property: background-color, box-shadow;
  transition-duration: 0.2s;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.03);
  }
`;
const TrendingIn = styled.span`
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  color: rgb(110, 118, 125);
`;
const TrendingKeyword = styled.span`
  padding-top: 4px;
  font-size: 15px;
  font-weight: 700;
  line-height: 20px;
  color: rgba(217, 217, 217, 1);
`;
const TrendingImpact = styled.span`
  margin-top: 4px;
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  color: rgb(110, 118, 125);
`;
const AbsoluteMoreButton = styled(MoreButton)`
  position: absolute;
  top: 12px;
  right: 16px;
`;

const ShowMoreButton = styled.button`
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
