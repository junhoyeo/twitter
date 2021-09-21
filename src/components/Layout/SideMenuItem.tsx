import Link from 'next/link';
import React from 'react';
import styled, { css } from 'styled-components';

type Props = {
  name: string;
  path: string;
  selected: boolean;
  solidIcon: React.ReactNode;
  outlineIcon: React.ReactNode;
};

export const SideMenuItem: React.FC<Props> = ({
  name,
  path,
  selected,
  solidIcon,
  outlineIcon,
}) => {
  return (
    <Link href={path}>
      <Container selected={selected}>
        {!selected ? outlineIcon : solidIcon}
        <span>{name}</span>
      </Container>
    </Link>
  );
};

type ContainerProps = {
  selected: boolean;
};
const Container = styled.li<ContainerProps>`
  display: flex;
  align-items: center;
  min-width: 100%;
  margin-left: auto;
  border-radius: 36px;
  padding: 16px 12px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  list-style-type: none;

  @media (max-width: 1400px) {
    min-width: 220px;
  }

  @media (max-width: 1265px) {
    min-width: fit-content;
    justify-content: center;
  }

  @media (max-width: 500px) {
    margin-left: 0;
    flex: 1;
  }

  & > * {
    transition: all 0.1s ease-in-out;
  }

  & svg {
    width: 26.25px;
    height: 26.25px;
    fill: rgba(217, 217, 217, 1);
  }

  span {
    margin-left: 20px;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #d9d9d9;

    @media (max-width: 1265px) {
      display: none;
    }
  }

  &:hover {
    background-color: rgba(217, 217, 217, 0.1);
  }

  ${({ selected }) =>
    selected &&
    css`
      span {
        font-weight: 700;
      }
    `};
`;
