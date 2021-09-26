import { useState } from 'react';
import styled, { css } from 'styled-components';

import SearchIcon from '../../assets/search.svg';
import { TrendsForYou } from './TrendsForYou';
import { WhoToFollow } from './WhoToFollow';

type Props = React.HTMLAttributes<HTMLDivElement>;

export const RightSideBar: React.FC<Props> = (props) => {
  const [isFocused, setFocused] = useState<boolean>(false);

  return (
    <Wrapper {...props}>
      <Container>
        <Sticky>
          <SearchBarFixed>
            <SearchBarContainer focused={isFocused}>
              <SearchIcon />
              <SearchBarInput
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Search Twitter"
              />
            </SearchBarContainer>
          </SearchBarFixed>
          <Scroll>
            <TrendsForYou />
            <WhoToFollow />
          </Scroll>
        </Sticky>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  position: relative;
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: sticky;
`;

const Sticky = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  height: 100vh;
`;

const Scroll = styled.div`
  overflow-y: auto;
`;

const SearchBarFixed = styled.div`
  margin-bottom: 12px;
  width: 100%;
  height: 53px;
  min-height: 32px;
  background-color: black;

  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;

  display: flex;
`;

type SearchBarContainerProps = {
  focused: boolean;
};
const SearchBarContainer = styled.div<SearchBarContainerProps>`
  margin: auto;
  width: 100%;
  height: 42px;

  display: flex;
  align-items: center;

  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 99px;
  background-color: rgb(32, 35, 39);

  & > svg {
    padding-left: 12px;
    fill: rgb(110, 118, 125);
    width: 32px;
    min-width: 44px;
    height: 18.75px;
  }

  ${({ focused }) =>
    focused &&
    css`
      border-color: rgb(29, 155, 240);
      background-color: transparent;

      & > svg {
        fill: rgb(29, 155, 240);
      }
    `};
`;

const SearchBarInput = styled.input`
  padding: 12px;
  width: 100%;

  border: 0;
  background-color: transparent;

  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  color: rgb(217, 217, 217);

  &::placeholder {
    color: rgb(110, 118, 125);
  }
`;
