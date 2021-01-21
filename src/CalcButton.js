import React from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';

const PrimaryLabel = styled.span`
  display: block;
  width: 100%;
  font-family: sofia-pro, sans-serif;
  font-weight: 900;
  font-style: normal;
  font-size: 18px;
  line-height: 1.1;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  color: #FFFFFF;
  position: relative;
  z-index: 10;
`;

const DetailLabel = styled.span`
  display: block;
  width: 100%;
  font-family: sofia-pro, sans-serif;
  font-weight: 300;
  font-style: normal;
  font-size: 12px;
  line-height: 1.1;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  color: #FFFFFF;
  position: relative;
  z-index: 10;
`;

const GradientLayer = styled.span`
  display: block;
  width: 100%;
  height: 100%;

  cursor: pointer;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;

  border-radius: 8px;
  background-color: ${rgba('#00B68E', 0.75)};

  transition: background-color 0.5s;
`;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  width: 100%;
  height: 96px;
  margin-bottom: 24px;
  padding: 24px;

  text-align: center;

  border-radius: 8px;
  border: none;
  box-shadow: 0px 4px 8px 4px ${rgba('#000000', 0.25)};
  background-color: #264D43;
  background-image: url(${({ backgroundSrc }) => backgroundSrc});

  cursor: pointer;

  transition: box-shadow 0.5s, background-color 0.5s;

  @media (min-width: 768px) {
    width: calc(50% - 12px);
  }

  @media (min-width: 1024px) {
    width: calc(33.33% - 12px);
  }

  &:hover {
    box-shadow: none;

    ${GradientLayer} {
      background-color: ${rgba('#019D7B', 0.85)};
    }
  }

  &:disabled {
    background-color: #000000;
    box-shadow: none;

    cursor: disabled;

    ${PrimaryLabel} {
      margin-bottom: 12px;
    }

    ${GradientLayer} {
      background-color: ${rgba('#000000', 0.75)};
    }
  }
`;

export default function CalcButton(props) {
  const {
    id = '',
    label = '',
    detail = '',
    backgroundSrc = '',
    onClick = () => {},
  } = props;

  const [hasPressed, setHasPressed] = React.useState(false);

  function onClickWrapper() {
    if (!hasPressed) {
      setHasPressed(true);
      onClick(id);
    }
  }

  return (
    <Button
      backgroundSrc={backgroundSrc}
      onClick={onClickWrapper}
      disabled={hasPressed}
      aria-label={label}
    >
      <GradientLayer />
      <PrimaryLabel>{label}</PrimaryLabel>
      {hasPressed && (
        <DetailLabel>{detail}</DetailLabel>
      )}
    </Button>
  );
}
