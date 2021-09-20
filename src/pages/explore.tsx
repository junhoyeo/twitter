import React from 'react';

import { Layout } from '../components/Layout';
import { VideoBanner } from '../components/VideoBanner';

const ExplorePage = () => {
  return (
    <Layout>
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
    </Layout>
  );
};

export default ExplorePage;
