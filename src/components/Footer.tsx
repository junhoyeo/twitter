import React from 'react';
import styled, { css } from 'styled-components';

export const Footer = React.forwardRef<HTMLElement>((_, ref) => {
  return (
    <Container ref={ref}>
      <Navigation>
        {navigations.map(({ href, name }) => (
          <NavigationLink
            href={href}
            dir="auto"
            rel="noopener noreferrer"
            target="_blank"
            role="link"
            key={`${name}-${href}`}
          >
            <span>{name}</span>
          </NavigationLink>
        ))}
        <Brand>© 2021 Twitter, Inc.</Brand>
      </Navigation>
    </Container>
  );
});

const Container = styled.footer`
  padding: 12px 16px;
  padding-bottom: 24px;
`;
const Navigation = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const footerText = css`
  margin: 4px 0;
  padding-right: 16px;

  line-height: 16px;
  color: rgb(110, 118, 125);
  cursor: pointer;

  font-weight: 400;
  font-size: 13px;
`;
const NavigationLink = styled.a`
  ${footerText}
`;
const Brand = styled.div`
  ${footerText}

  width: 100%;
  display: flex;
  justify-content: center;
`;

const navigations = [
  { href: 'https://about.twitter.com/', name: 'About' },
  { href: 'https://help.twitter.com/', name: 'Help Center' },
  { href: 'https://twitter.com/tos', name: 'Terms of Service' },
  { href: 'https://twitter.com/privacy', name: 'Privacy Policy' },
  {
    href: 'https://support.twitter.com/articles/20170514',
    name: 'Cookie Policy',
  },
  {
    href: 'https://business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html?ref=web-twc-ao-gbl-adsinfo&amp;utm_source=twc&amp;utm_medium=web&amp;utm_campaign=ao&amp;utm_content=adsinfo',
    name: 'Ads info',
  },
  { href: 'https://blog.twitter.com', name: 'Blog' },
  { href: 'https://status.twitterstat.us', name: 'Status' },
  { href: 'https://careers.twitter.com', name: 'Careers' },
  {
    href: 'https://about.twitter.com/press/brand-assets',
    name: 'Brand Resources',
  },
  {
    href: 'https://about.twitter.com/?ref=gl-tw-tw-twitter-advertise',
    name: 'Advertising',
  },
  {
    href: 'https://marketing.twitter.com',
    name: 'Marketing',
  },
  {
    href: 'https://business.twitter.com/?ref=web-twc-ao-gbl-twitterforbusiness&amp;utm_source=twc&amp;utm_medium=web&amp;utm_campaign=ao&amp;utm_content=twitterforbusiness',
    name: 'Twitter for Business',
  },
  {
    href: 'https://developer.twitter.com',
    name: 'Developers',
  },
  {
    href: 'https://twitter.com/i/directory/profiles',
    name: 'Directory',
  },
];
