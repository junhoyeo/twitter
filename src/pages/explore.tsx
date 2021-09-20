import React from 'react';
import styled from 'styled-components';

import { Layout } from '../components/Layout';

const ExplorePage = () => {
  return (
    <Layout>
      <VideoContainer>
        <VideoOverlay>
          <VideoMeta>GitHub · LIVE</VideoMeta>
          <VideoTitle>
            The journey of the world's open source code to the Arctic - GitHub
            Arctic Code Vault
          </VideoTitle>
        </VideoOverlay>
        <Video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture={true}
          poster="/videos/github-arctic-code-vault.png"
          src="/videos/github-arctic-code-vault.mp4"
        />
      </VideoContainer>
    </Layout>
  );
};

export default ExplorePage;

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

const VideoMeta = styled.span`
  line-height: 16px;
  font-size: 13px;
  color: white;
`;
const VideoTitle = styled.h2`
  margin: 2px 0;
  font-weight: 800;
  line-height: 28px;
  font-size: 23px;
  color: white;
  -webkit-line-clamp: 3;
`;
