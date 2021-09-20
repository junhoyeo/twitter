import React from 'react';
import styled from 'styled-components';

import { Layout } from '../components/Layout';
import { NavigationBar } from '../components/NavigationBar';

const ProfilePage = () => {
  return (
    <Layout>
      <NavigationBar title="Junho Yeo" subtitle="@_junhoyeo" />
      <CoverImage src="/images/profile-background.png" />
      <ProfileContainer>
        <ProfileImage src="https://github.com/junhoyeo.png" />
        <DisplayName>Junho Yeo</DisplayName>
        <Username>@_junhoyeo</Username>
      </ProfileContainer>
    </Layout>
  );
};

export default ProfilePage;

const CoverImage = styled.img`
  width: 100%;
  aspect-ratio: 3;
  object-fit: cover;
`;

const ProfileContainer = styled.div`
  padding: 12px 16px 16px;
`;
const ProfileImage = styled.img`
  margin-top: -18%;
  width: 140px;
  height: 140px;

  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: rgb(0 0 0 / 2%) 0px 0px 2px inset;
  background-color: black;
  background-color: black;
`;

const DisplayName = styled.h2`
  margin: 4px 0 0;
  font-weight: 800;
  font-size: 20px;
  line-height: 24px;
  color: rgba(217, 217, 217, 1);
`;
const Username = styled.p`
  margin: 0 0 12px;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  color: rgb(110, 118, 125);
`;
