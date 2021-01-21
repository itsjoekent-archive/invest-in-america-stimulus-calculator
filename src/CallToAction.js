import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 48px;
`;

const Title = styled.h1`
  font-family: sofia-pro, sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 28px;
  line-height: 1.1;
  text-align: center;
  color: #FFFFFF;
  margin-bottom: 24px;

  @media (min-width: 1020px) {
    font-size: 48px;
  }
`;

const Subtitle = styled.p`
  font-family: sofia-pro, sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 22px;
  text-align: center;
  color: #FFFFFF;
`;

const PhoneTitle = styled.h2`
  font-family: sofia-pro, sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 28px;
  line-height: 1.1;
  text-align: center;
  color: #FFFFFF;
  margin-bottom: 16px;

  @media (min-width: 1020px) {
    font-size: 36px;
  }
`;

const Phone = styled.p`
  font-family: sofia-pro, sans-serif;
  font-weight: 900;
  font-style: normal;
  font-size: 28px;
  text-align: center;
  letter-spacing: 1px;
  color: #FFFFFF;
`;

export default function CallToAction(props) {
  return (
    <Container>
      <TitleContainer>
        <Title>Thanks for spending your stimulus check! Now demand more:</Title>
        <Subtitle>With over 300,000 businesses closed and ten million unemployed, the American people need much more than $600 and patchwork relief. We need robust investments in our communities and in our economy — including direct checks, renter’s and homeowner’s aid, help for small businesses, and money for state and local governments.</Subtitle>
      </TitleContainer>
      <PhoneTitle>Call your members of Congress now and demand they pass more relief and a bold stimulus package — now:</PhoneTitle>
      <Phone>(202) 224-3121</Phone>
    </Container>
  );
}
