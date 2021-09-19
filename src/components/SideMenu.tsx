import { useRouter } from 'next/dist/client/router';
import React from 'react';
import styled from 'styled-components';

import BookmarksOutlineIcon from '../assets/sidemenu/bookmarks-outline.svg';
import BookmarksSolidIcon from '../assets/sidemenu/bookmarks-solid.svg';
import ExploreOutlineIcon from '../assets/sidemenu/explore-outline.svg';
import ExploreSolidIcon from '../assets/sidemenu/explore-solid.svg';
import HomeOutlineIcon from '../assets/sidemenu/home-outline.svg';
import HomeSolidIcon from '../assets/sidemenu/home-solid.svg';
import ProfileOutlineIcon from '../assets/sidemenu/profile-outline.svg';
import ProfileSolidIcon from '../assets/sidemenu/profile-solid.svg';
import TwitterLogoIcon from '../assets/twitter.svg';

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
          <TwitterLogoContainer>
            <TwitterLogo />
          </TwitterLogoContainer>
          <SidemenuList>
            {sideMenuItems.map((props) => {
              const selected = pathname === props.path;
              return (
                <SideMenuItem key={props.path} selected={selected} {...props} />
              );
            })}
          </SidemenuList>
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
  padding: 0;
`;
