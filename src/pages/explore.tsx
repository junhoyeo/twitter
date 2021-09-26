import axios from 'axios';
import * as DateFns from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ActivityIndicator } from '../components/ActivityIndicator';
import { Layout } from '../components/Layout';
import { NavigationBar } from '../components/NavigationBar';
import { VideoBanner } from '../components/VideoBanner';

type NewsItem = {
  description: string;
  link: string;
  originallink: string;
  pubDate: string;
  title: string;
};
const ExplorePage = () => {
  const [news, setNews] = useState<NewsItem[] | undefined>(undefined);

  useEffect(() => {
    axios.get('/api/news').then(({ data }) => {
      setNews(data.items);
    });
  }, []);

  return (
    <Layout>
      <Head>
        <title>Explore / Twitter</title>
      </Head>
      <NavigationBar title="Explore" />
      <a
        href="https://github.blog/2020-07-16-github-archive-program-the-journey-of-the-worlds-open-source-code-to-the-arctic/"
        target="_blank"
      >
        <VideoBanner
          title="The journey of the world's open source code to the Arctic - GitHub Arctic Code Vault"
          createdAt="LIVE"
          profile={{
            name: 'GitHub',
            avatar: '/images/github-logo-32px.png',
            verified: true,
          }}
          poster="/videos/github-arctic-code-vault.png"
          src="/videos/github-arctic-code-vault.mp4"
        />
      </a>
      <AnimatePresence>
        {typeof news === 'undefined' && <ActivityIndicator />}
        {news?.map((newsItem, index) => {
          return (
            <AnimatedListItem
              key={index}
              initial={{
                opacity: 0,
                transform: 'translate3d(0, 64px, 0)',
              }}
              animate={{
                opacity: 1,
                transform: 'translate3d(0, 0px, 0)',
              }}
              exit={{
                opacity: 0,
                transform: 'translate3d(0, -100px, 0)',
              }}
              transition={{ ease: 'linear' }}
            >
              <a
                href={newsItem.link}
                target="_blank"
                style={{ cursor: 'pointer' }}
              >
                <Container>
                  <Content>
                    <Metadata>
                      NAVER 뉴스 ·{' '}
                      {DateFns.formatDistanceToNow(new Date(newsItem.pubDate))}
                    </Metadata>
                    <Title
                      dangerouslySetInnerHTML={{ __html: newsItem.title }}
                    />
                    <Description
                      dangerouslySetInnerHTML={{ __html: newsItem.description }}
                    />
                  </Content>
                  <Image
                    src={`https://source.unsplash.com/random?sig=${hashCode(
                      newsItem.originallink,
                    )}`}
                  />
                </Container>
              </a>
            </AnimatedListItem>
          );
        })}
      </AnimatePresence>
    </Layout>
  );
};

export default ExplorePage;

const AnimatedListItem = styled(motion.li)`
  list-style-type: none;
`;

const Container = styled.div`
  padding: 12px 16px;
  display: flex;
  width: 100%;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 12px;
  flex: 1;
`;
const Title = styled.span`
  font-weight: 700;
  font-size: 15px;
  line-height: 20px;
  color: rgba(217, 217, 217, 1);
  margin-bottom: 2px;
  margin-top: 2px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
`;
const Metadata = styled.span`
  color: rgb(110, 118, 125);
  font-size: 13px;
  line-height: 16px;
  padding-left: 4px;
  padding-right: 4px;
`;
const Description = styled.span`
  padding-top: 2px;
  color: rgb(110, 118, 125);
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: break-all;
`;
const Image = styled.img`
  width: 85px;
  height: 85px;
  flex-shrink: 0;
  border-radius: 16px;
`;

const hashCode = (str: string) => {
  let hash = 0,
    chr;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
