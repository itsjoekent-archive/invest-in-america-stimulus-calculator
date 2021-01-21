import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import Nav from './Nav';
import Calculator, { Container as CalculatorContainer } from './Calculator';
import CallToAction, { Container as CallToActionContainer } from './CallToAction';
import money from './assets/money-bg.png';

const fadeOut = keyframes`
  from { opacity: 1 };
  to { opacity: 0; };
`;

const fadeIn = keyframes`
  from { opacity: 0; };
  to { opacity: 1; };
`;

const BackgroundLayer = styled.div`
  display: block;

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-image: url(${money});
  background-size: cover;

  z-index: 0;
`;

const Page = styled.div`
  display: block;
  width: 100%;
  min-height: 100vh;
  position: relative;

  background-color: ${({ hasReachedCta }) => hasReachedCta ? '#000000' : '#264D43'};
  transition: background-color 1.5s linear;

  ${CallToActionContainer} {
    opacity: 0;
  }

  ${({ hasReachedCta }) => hasReachedCta && css`
    ${CalculatorContainer} {
      animation: ${fadeOut} 1s forwards;
    }

    ${BackgroundLayer} {
      animation: ${fadeOut} 1s forwards;
    }

    ${CallToActionContainer} {
      animation: ${fadeIn} 1s 1s forwards;
    }
  `};
`;

const Main = styled.main`
  display: block;
  box-sizing: border-box;

  width: 100%;
  max-width: 960px;

  padding-top: 124px;
  padding-left: 24px;
  padding-right: 24px;

  margin-left: auto;
  margin-right: auto;

  position: relative;
  z-index: 1;
`;

function App() {
  const [hasReachedCta, setHasReachedCta] = React.useState(false);
  const [hideCalculator, setHideCalculator] = React.useState(false);

  React.useEffect(() => {
    if (hasReachedCta) {
      const timeoutId = setTimeout(() => setHideCalculator(true), 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [
    hasReachedCta,
    setHideCalculator,
  ]);

  return (
    <Page hasReachedCta={hasReachedCta}>
      <BackgroundLayer />
      <Nav />
      <Main>
        {!hideCalculator && (
          <Calculator fadeToCta={() => setHasReachedCta(true)} />
        )}
        {hideCalculator && (
          <CallToAction />
        )}
      </Main>
    </Page>
  );
}

export default App;
