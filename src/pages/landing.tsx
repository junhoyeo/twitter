import React from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';

import { MobileContainer } from '../components/MobileContainer';
import { onMobile, onHandset, useIsRelative } from '../utils/relatives';

import TwitterLogoIcon from './twitter.svg';

const LandingPage = () => {
  const isHandset = useIsRelative('Handset');

  return (
    <Container>
      <Content>
        <Section>
          <TwitterLogo />
          <Title>
            Happening
            <Dynamic>{!isHandset ? ' ' : <br />}</Dynamic>
            now
          </Title>
          <Subtitle>Join Twitter today.</Subtitle>
        </Section>
      </Content>
      <CoverImage src="/images/landing-cover.png" />
    </Container>
  );
};

export default LandingPage;

const _Dynamic = styled.span``;
const Dynamic = dynamic(async () => _Dynamic, {
  ssr: false,
  loading: () => <span>' '</span>,
});

const Container = styled.div`
  display: flex;
  flex-direction: row-reverse;
  height: 100vh;
  width: 100%;

  ${onHandset} {
    flex-direction: column;
  }
`;

const Content = styled(MobileContainer)`
  margin-top: 36px;
  padding: 16px;
  min-width: 45vw;
  width: 100%;

  ${onHandset} {
    flex: 1;
  }

  & > div.container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 100%;
    padding: 20px;

    ${onHandset} {
      padding: 0;
      max-width: 600px;
      align-items: flex-start;
    }
  }
`;

const Section = styled.section`
  width: 100%;
`;

const TwitterLogo = styled(TwitterLogoIcon)`
  fill: rgb(217, 217, 217);
  height: 3rem;
`;
const Title = styled.h1`
  font-size: 64px;
  font-weight: 700;
  letter-spacing: -1.2px;
  font-family: 'TwitterChirpExtendedHeavy', Verdana;

  ${onMobile} {
    font-size: 40px;
  }
`;
const Subtitle = styled.h2`
  font-size: 31px;
  font-weight: 700;
  font-family: 'TwitterChirpExtendedHeavy', Verdana;

  ${onMobile} {
    font-size: 23px;
  }
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  object-fit: cover;

  ${onHandset} {
    height: 45vh;
    flex: unset;
  }
`;
