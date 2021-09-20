import styled from 'styled-components';

import { MoreButton } from '../Tweet/MoreButton';
import { Container, Header, ShowMoreButton, Title } from './RightSideBarSections';

export const WhoToFollow = () => {
  return (
    <Container>
      <Header>
        <Title>Who to follow</Title>
      </Header>
      <ProfileItem />
      <ProfileItem />
      <ProfileItem />
      <ShowMoreButton>Show more</ShowMoreButton>
    </Container>
  );
};

const ProfileItem = () => {
  return (
    <ItemContainer>
      <Avatar src="https://pbs.twimg.com/profile_images/1428382494823489536/Bu6PalHo_x96.jpg" />
      <ProfileInformation>
        <DisplayName>Numbrs</DisplayName>
        <Username>@Numbrs</Username>
      </ProfileInformation>
      <FollowButton type="button">Follow</FollowButton>
    </ItemContainer>
  );
};
const ItemContainer = styled.div`
  padding: 12px 16px;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  transition-property: background-color, box-shadow;
  transition-duration: 0.2s;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.03);
  }
`;
const Avatar = styled.img`
  margin-right: 12px;
  height: 48px;
  width: 48px;

  background-color: black;
  border-radius: 24px;
`;
const ProfileInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;
const DisplayName = styled.span`
  font-size: 15px;
  font-weight: 700;
  line-height: 20px;
  color: rgba(217, 217, 217, 1);
`;
const Username = styled.span`
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  color: rgb(110, 118, 125);
`;

const FollowButton = styled.button`
  margin-left: 12px;
  min-width: 77px;
  min-height: 32px;
  height: fit-content;
  padding: 0 16px;

  background-color: rgb(239, 243, 244);
  transition-property: background-color, box-shadow;
  transition-duration: 0.2s;
  user-select: none;

  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 99px;

  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
  color: rgb(15, 20, 25);

  &:hover {
    background-color: rgb(215, 219, 220);
  }
`;
