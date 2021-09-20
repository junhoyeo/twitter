import React from 'react';
import styled from 'styled-components';

import VerifiedIcon from '../assets/verified.svg';

type Props = {
  src: string;
  poster: string;
  title: string;
  createdAt: 'LIVE';
  profile: {
    name: string;
    avatar: string;
    verified?: boolean;
  };
};
export const VideoBanner: React.FC<Props> = ({
  title,
  createdAt,
  profile,
  ...props
}) => {
  return (
    <VideoContainer>
      <VideoOverlay>
        <VideoMeta>
          <ProfileImage src={profile.avatar} />
          <strong>{profile.name}</strong>
          {!!profile.verified && <VerifiedBadge />}
          <Divider />
          <span>{createdAt}</span>
        </VideoMeta>
        <VideoTitle>{title}</VideoTitle>
      </VideoOverlay>
      <Video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        disablePictureInPicture={true}
        {...props}
      />
    </VideoContainer>
  );
};
const VideoContainer = styled.div`
  width: 100%;
  position: relative;
  aspect-ratio: 1.77;
  border-bottom: 1px solid rgb(47, 51, 54);
`;
const VideoOverlay = styled.div`
  padding: 12px 16px;
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  background-image: linear-gradient(
    transparent 0%,
    transparent 25%,
    rgba(0, 0, 0, 0.7) 75%,
    rgba(0, 0, 0, 0.8) 100%
  );
`;
const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const VideoMeta = styled.div`
  margin-bottom: 4px;
  line-height: 16px;
  font-size: 13px;
  color: white;
  display: flex;
  align-items: center;
`;
const ProfileImage = styled.img`
  width: 16.25px;
  height: 16.25px;
  margin-right: 4px;
  border-radius: 50%;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;
const VerifiedBadge = styled(VerifiedIcon)`
  margin-left: 2px;
  width: 16.25px;
  height: 16.25px;
  fill: white;
`;
const Divider = () => (
  <span style={{ paddingLeft: 4, paddingRight: 4 }}> · </span>
);
const VideoTitle = styled.h2`
  margin: 2px 0;
  font-weight: 800;
  line-height: 28px;
  font-size: 23px;
  color: white;
  -webkit-line-clamp: 3;
`;
