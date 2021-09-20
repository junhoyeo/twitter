import useWindowSize from '../hooks/useWindowSize';

export const Breakpoints = {
  Handset: 1000,
  Mobile: 600,
};

export const onHandset = `@media (max-width: ${Breakpoints.Handset}px)`;
export const onMobile = `@media (max-width: ${Breakpoints.Mobile}px)`;

export const useIsRelative = (key: keyof typeof Breakpoints) => {
  const { windowWidth } = useWindowSize();

  return windowWidth <= Breakpoints[key];
};
