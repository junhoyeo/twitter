import firebase from 'firebase/app';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import router from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import TwitterLogoIcon from '../assets/twitter.svg';

import { Footer } from '../components/Footer';
import { MobileContainer } from '../components/MobileContainer';

import useWindowSize from '../hooks/useWindowSize';

import { useFirebase } from '../utils/firebase';
import { Breakpoints, onHandset, onMobile } from '../utils/relatives';

const LandingPage = () => {
  const { windowWidth, windowHeight } = useWindowSize();
  const isHandset = windowWidth <= Breakpoints.Handset;

  const [containerHeight, setContainerHeight] = useState<number | string>(
    'auto',
  );
  const footerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!isHandset) {
      return;
    }
    if (!!windowHeight && !!footerRef.current) {
      const height = windowHeight - footerRef.current.offsetHeight;
      if (height) {
        setContainerHeight(height);
      }
    }
  }, [isHandset, windowHeight, windowWidth]);

  const auth = useFirebase('auth');
  const onClickSignUp = useCallback(
    async (
      AuthProvider:
        | typeof firebase.auth.GoogleAuthProvider
        | typeof firebase.auth.GithubAuthProvider,
    ) => {
      try {
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const authProvider = new AuthProvider();
        const credentials = await auth.signInWithPopup(authProvider);
        const user = credentials.user;

        const previousUser = await firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .get();

        if (!previousUser.exists) {
          const userObj = {
            joinedAt: Date.now(),
            uid: user.uid,
            username: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          };
          await firebase
            .firestore()
            .collection('users')
            .doc(user.uid)
            .set(userObj);
        }

        router.push('/');
      } catch (error) {
        console.error(error);
        window.alert('An unknown error has occurred - please try again later');
      }
    },
    [],
  );

  return (
    <Page>
      <Head>
        <title>Twitter. It’s what’s happening / Twitter</title>
      </Head>
      <Container style={{ height: containerHeight }}>
        <Content>
          <Section
            initial={{ opacity: 0, transform: 'translate3d(0, 120px, 0)' }}
            animate={{ opacity: 1, transform: 'translate3d(0, 0px, 0)' }}
            transition={{ type: 'spring', damping: 80, duration: 0.5 }}
          >
            <TwitterLogo />
            <Title>
              Happening
              <Dynamic>{!isHandset ? ' ' : <br />}</Dynamic>
              now
            </Title>
            <Subtitle>Join Twitter today.</Subtitle>
            <SignUpButton
              onClick={() => onClickSignUp(firebase.auth.GoogleAuthProvider)}
            >
              Sign up with Google
            </SignUpButton>
            <SignUpButton
              onClick={() => onClickSignUp(firebase.auth.GithubAuthProvider)}
            >
              Sign up with GitHub
            </SignUpButton>
          </Section>
        </Content>
        <RelativeCover>
          <CoverImage src="/images/landing-cover.png" />
          <AbsoluteCoverContent>
            <motion.div
              animate={{ scale: 1 }}
              transition={{
                from: 0.95,
                ease: 'linear',
                duration: 1,
                repeat: Infinity,
                repeatType: 'mirror',
              }}
            >
              <WhiteBlueBird />
            </motion.div>
          </AbsoluteCoverContent>
        </RelativeCover>
      </Container>
      <Footer ref={footerRef} />
    </Page>
  );
};

export default LandingPage;

const _Dynamic = styled.span``;
const Dynamic = dynamic(async () => _Dynamic, {
  ssr: false,
  loading: () => <span>' '</span>,
});

const Page = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;

  ${onHandset} {
    height: auto;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row-reverse;
  flex: 1;
  width: 100%;

  ${onHandset} {
    flex-direction: column;
  }
`;

const Content = styled(MobileContainer)`
  margin-top: 36px;
  padding: 16px;
  min-width: 45vw;

  ${onHandset} {
    margin-top: 16px;
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
      padding: 20px;
      max-width: 600px;
      align-items: flex-start;
    }

    ${onMobile} {
      padding: 16px;
    }
  }
`;

const Section = styled(motion.section)`
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
  margin-bottom: 32px;
  font-size: 31px;
  font-weight: 700;
  font-family: 'TwitterChirpExtendedHeavy', Verdana;

  ${onMobile} {
    font-size: 23px;
  }
`;

const SignUpButton = styled.button`
  margin-bottom: 20px;
  padding: 0 16px;
  max-width: 300px;
  width: 100%;
  height: 40px;

  background-color: rgba(255, 255, 255, 1);
  border: 1px solid rgb(47, 51, 54);
  border-radius: 99px;

  transition-property: background-color, box-shadow;
  transition-duration: 0.2s;

  font-weight: 700;
  font-size: 15px;
  line-height: 20px;
  color: rgb(15, 20, 25);

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgb(230, 230, 230);
  }
`;

const RelativeCover = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  flex: 1;
  background-color: rgb(29, 155, 240);

  ${onHandset} {
    height: 45vh;
    flex: unset;
  }
`;
const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: rgb(29, 155, 240);
`;
const AbsoluteCoverContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;
`;
const WhiteBlueBird = styled(TwitterLogoIcon)`
  fill: white;
  padding: 32px;
  width: 100%;
  height: 100%;
  max-height: 380px;
`;
