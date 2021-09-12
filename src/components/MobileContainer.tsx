import styled from 'styled-components';

type MobileContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export const MobileContainer: React.FC<MobileContainerProps> = ({
  children,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      <Container className="container">{children}</Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  max-width: 600px;
  width: 100%;
`;
