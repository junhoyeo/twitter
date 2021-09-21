import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import { Breakpoints, onMobile } from '../utils/relatives';

type Props<T> = {
  selected: T;
  items: T[];
  onChangeTab?: (tab: T) => void;
};

export const Tab = <T extends string>({
  selected,
  onChangeTab,
  items,
}: Props<T>) => {
  const tabIndex = useMemo(() => items.indexOf(selected), [items, selected]);
  const [left, setLeft] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const tabItemsRef = useRef<HTMLLIElement[]>([]);
  const tabItemTitlesRef = useRef<HTMLSpanElement[]>([]);

  const [windowWidth, setWindowWidth] = useState<number>(1280);
  const [tabWidth, setTabWidth] = useState<number>(0);

  useEffect(() => {
    const resizeHandler = () => {
      setWindowWidth(window.innerWidth);
      setTabWidth(containerRef.current.offsetWidth / items.length);
    };

    resizeHandler();

    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, [items]);

  const indicatorContainerWidth =
    tabItemsRef.current?.[tabIndex]?.offsetWidth ?? 0;
  const indicatorWidth = tabItemTitlesRef.current?.[tabIndex]?.offsetWidth ?? 0;
  useEffect(() => {
    if (windowWidth <= Breakpoints.Mobile) {
      containerRef.current.scrollLeft =
        tabItemsRef.current[tabIndex].offsetLeft;
      const accumulatedLeft = tabItemsRef.current
        .slice(0, tabIndex)
        .reduce((acc, item) => (acc += item.offsetWidth), 0);
      setLeft(accumulatedLeft);
      return;
    }
    setLeft(tabIndex * tabWidth);
  }, [tabIndex, tabWidth]);

  return (
    <Container ref={containerRef}>
      <TabList>
        {items.map((item, index) => {
          const isTabDisabled = onChangeTab === undefined;

          return (
            <TabItem
              ref={(ref) => {
                tabItemsRef.current[index] = ref;
              }}
              key={`tab-${index}`}
              selected={selected === item}
              disabled={isTabDisabled}
              onClick={() => onChangeTab?.(item)}
              width={tabWidth}
            >
              <span
                ref={(ref) => {
                  tabItemTitlesRef.current[index] = ref;
                }}
              >
                {item}
              </span>
            </TabItem>
          );
        })}
        <TabIndicatorContainer
          desktopWidth={tabWidth}
          mobileWidth={indicatorContainerWidth}
          style={{ left }}
        >
          <TabIndicator style={{ width: indicatorWidth }} />
        </TabIndicatorContainer>
      </TabList>
    </Container>
  );
};

const Container = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 52px;
  border-bottom: 1px solid rgb(47, 51, 54);

  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  position: relative;

  ${onMobile} {
    overflow-x: auto;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const TabList = styled.ul`
  margin: 0;
  padding: 0;

  display: flex;
  width: max-content;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
`;

type TabItemProps = {
  selected: boolean;
  disabled: boolean;
  width: number;
};
const TabItem = styled.li<TabItemProps>`
  flex: 1;

  font-size: 15px;
  font-weight: 500;
  line-height: 20px;
  color: rgb(110, 118, 125);

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: rgba(217, 217, 217, 0.1);
  }

  ${({ selected }) =>
    selected &&
    css`
      font-weight: 700;
      color: rgb(217, 217, 217);
    `};

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: default;
    `};

  ${({ width }) => css`
    width: ${width}px;

    ${onMobile} {
      max-width: ${width}px;
      padding: 16px;
      width: fit-content;
      max-width: unset;
      flex: unset;
    }
  `};
`;

type TabIndicatorContainerProps = {
  desktopWidth: number;
  mobileWidth: number;
};
const TabIndicatorContainer = styled.div<TabIndicatorContainerProps>`
  height: 4px;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  transition: all 0.2s ease-in-out;

  ${({ desktopWidth, mobileWidth }) => css`
    width: ${desktopWidth}px;

    ${onMobile} {
      width: ${mobileWidth}px;
    }
  `};
`;

const TabIndicator = styled.div`
  height: 100%;
  border-radius: 2px;
  transition: all 0.2s ease-in-out;
  background-color: rgb(29, 155, 240);
`;
