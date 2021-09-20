import styled from 'styled-components';

import { TrendsForYou } from './TrendsForYou';

type Props = React.HTMLAttributes<HTMLDivElement>;

export const RightSideBar: React.FC<Props> = (props) => {
  return (
    <Container {...props}>
      <TrendsForYou />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
