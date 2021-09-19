import styled from 'styled-components';

import { SideMenu } from './SideMenu';

export const Layout: React.FC = ({ children }) => {
  return (
    <PageContainer>
      <SideMenu />
      <MainWrapper>
        <MainContainer>
          <Main>
            <Container>{children}</Container>
            <RightContent />
          </Main>
        </MainContainer>
      </MainWrapper>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  height: 100%;
  min-height: 100vh;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-shrink: 1;
  flex-grow: 1;
  align-items: flex-start;

  @media (max-width: 600px) {
    width: -webkit-fill-available;
  }
`;
const MainContainer = styled.div`
  width: 990px;
  min-height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: stretch;

  @media (max-width: 600px) {
    width: 100%;
  }
`;
const Main = styled.main`
  width: 100%;
  min-height: 100%;

  display: flex;
  align-items: stretch;
  justify-content: space-between;
  flex-grow: 1;
  flex-direction: row;
`;

const Container = styled.div`
  flex: 1;

  max-width: 600px;
  border-left: 1px solid rgb(47, 51, 54);
  border-right: 1px solid rgb(47, 51, 54);

  @media (max-width: 600px) {
    width: 100%;
    max-width: unset;
  }
`;

const RightContent = styled.div`
  margin-right: 10px;
  width: 350px;

  @media (max-width: 600px) {
    display: none;
  }
`;
