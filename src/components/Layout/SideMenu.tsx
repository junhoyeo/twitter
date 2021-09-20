import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import BookmarksOutlineIcon from '../../assets/sidemenu/bookmarks-outline.svg';
import BookmarksSolidIcon from '../../assets/sidemenu/bookmarks-solid.svg';
import ExploreOutlineIcon from '../../assets/sidemenu/explore-outline.svg';
import ExploreSolidIcon from '../../assets/sidemenu/explore-solid.svg';
import HomeOutlineIcon from '../../assets/sidemenu/home-outline.svg';
import HomeSolidIcon from '../../assets/sidemenu/home-solid.svg';
import ProfileOutlineIcon from '../../assets/sidemenu/profile-outline.svg';
import ProfileSolidIcon from '../../assets/sidemenu/profile-solid.svg';
import TwitterLogoIcon from '../../assets/twitter.svg';
import WriteIcon from '../../assets/write.svg';
import { SideMenuItem } from './SideMenuItem';

const sideMenuItems = [
  {
    name: 'Home',
    path: '/',
    solidIcon: <HomeSolidIcon />,
    outlineIcon: <HomeOutlineIcon />,
  },
  {
    name: 'Explore',
    path: '/explore',
    solidIcon: <ExploreSolidIcon />,
    outlineIcon: <ExploreOutlineIcon />,
  },
  {
    name: 'Bookmarks',
    path: '/bookmarks',
    solidIcon: <BookmarksSolidIcon />,
    outlineIcon: <BookmarksOutlineIcon />,
  },
  {
    name: 'Profile',
    path: '/profile',
    solidIcon: <ProfileSolidIcon />,
    outlineIcon: <ProfileOutlineIcon />,
  },
];

export const SideMenu = () => {
  const { asPath: pathname } = useRouter();

  return (
    <Wrapper>
      <Container>
        <Sticky>
          {/* FIXME: move to /landing if not logged in */}
          <Link href="/">
            <TwitterLogoContainer>
              <TwitterLogo />
            </TwitterLogoContainer>
          </Link>
          <SidemenuList>
            {sideMenuItems.map((props) => {
              const selected = pathname === props.path;
              return (
                <SideMenuItem key={props.path} selected={selected} {...props} />
              );
            })}
          </SidemenuList>
          <TweetButton type="button">
            <Desktop>Tweet</Desktop>
            <WriteTweetIcon />
          </TweetButton>
        </Sticky>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  flex-grow: 1;
  justify-content: flex-end;
  display: flex;
`;

const Sticky = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 275px;
  padding: 0 12px;

  list-style-type: none;
  position: sticky;
  top: 0;

  @media (max-width: 1200px) {
    width: fit-content;
  }
`;

const Container = styled.div``;

const TwitterLogoContainer = styled.div`
  width: 52px;
  height: 52px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const TwitterLogo = styled(TwitterLogoIcon)`
  fill: rgb(217, 217, 217);
  width: 50px;
  height: 30px;
`;

const SidemenuList = styled.ul`
  margin: 0;
  margin-top: 2px;
  margin-bottom: 4px;
  padding: 0;

  @media (max-width: 1200px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const TweetButton = styled.button`
  margin-bottom: 16px;
  margin-top: 16px;
  padding: 0 32px;

  width: 90%;
  min-height: 52px;

  background-color: rgb(29, 155, 240);
  box-shadow: rgb(0 0 0 / 8%) 0px 8px 28px;
  outline-style: none;
  transition-property: background-color, box-shadow;
  transition-duration: 0.2s;

  font-weight: 700;
  font-size: 17px;
  line-height: 20px;
  color: rgb(255, 255, 255);

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid black;
  border-radius: 45px;

  &:hover {
    background-color: rgb(26, 140, 216);
  }

  @media (max-width: 1200px) {
    margin-left: auto;
    margin-right: auto;
    padding: 0;

    width: 50px;
    height: 50px;
    min-height: unset;
  }
`;

const Desktop = styled.span`
  @media (max-width: 1200px) {
    display: none;
  }
`;

const WriteTweetIcon = styled(WriteIcon)`
  display: none;
  width: 24px;
  height: 24px;
  fill: white;

  @media (max-width: 1200px) {
    display: block;
  }
`;
