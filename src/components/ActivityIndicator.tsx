import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const ActivityIndicator = () => {
  return (
    <Container>
      <Svg>
        <Circle style={{ stroke: '#1e9bef' }} />
        <Circle
          style={{
            stroke: '#081f30',
            strokeDasharray: 80,
            strokeDashoffset: 10,
          }}
        />
      </Svg>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
`;

const Svg = styled.svg.attrs({
  width: 24,
  height: 24,
  viewBox: '0 0 32 32',
  xmlns: 'http://www.w3.org/2000/svg',
})`
  animation: ${rotate} linear infinite 0.75s;
`;

const Circle = styled.circle.attrs({
  cx: 16,
  cy: 16,
  fill: 'none',
  r: 14,
  strokeWidth: 4,
})``;
