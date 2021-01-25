import React from 'react';
import styled from 'styled-components';
import CalcButton from './CalcButton';
import MoneyBar from './MoneyBar';
import Clippy from './Clippy';

import rentGraphic from './assets/rent.png';
import groceriesGraphic from './assets/groceries.png';
import universityGraphic from './assets/uni.png';
import doctorGraphic from './assets/doctor.png';
import childCareGraphic from './assets/childcare.png';
import classroomGraphic from './assets/classroom.png';
import carGraphic from './assets/car.png';
import houseGraphic from './assets/house.png';
import computerGraphic from './assets/computer.png';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 48px;
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
  margin-bottom: 12px;

  @media (min-width: 1020px) {
    font-size: 64px;
  }
`;

const Subtitle = styled.p`
  font-family: sofia-pro, sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 18px;
  text-align: center;
  color: #FFFFFF;
`;

const CtaContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

const Cta = styled.h2`
  font-family: sofia-pro, sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 24px;
  line-height: 1.3;
  text-align: center;
  color: #00B68E;
  margin-bottom: 12px;
`;

const ButtonsGrid = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

const options = {
  'rent': {
    label: 'Pay rent',
    detail: 'Median monthly rent payment: $1,229',
    backgroundSrc: rentGraphic,
    cost: 1299,
    message: `Oops, sorry! That’s not gonna be enough to cover monthly rent pretty much anywhere in the country.`,
  },
  'groceries': {
    label: 'Buy groceries',
    detail: 'Average monthly grocery bill for a family of four: $920',
    backgroundSrc: groceriesGraphic,
    cost: 920,
    message: `Great! That’ll get you and your family about 2 ½ weeks worth of food. You’ll figure out the rest, I’m sure.`,
  },
  'student-loans': {
    label: 'Pay student loans',
    detail: 'Average number of years to pay off student loans: 18.5',
    backgroundSrc: universityGraphic,
    cost: 400,
    message: `Good choice! One month down, 221 more to go...`,
  },
  'doctor': {
    label: 'Go to the doctor',
    detail: 'Monthly out-of-pocket cost for insulin: $150 to $200',
    backgroundSrc: doctorGraphic,
    cost: 200,
    message: `Fine, but just for a regular check-up, okay? Nothing fancy like insulin.`,
  },
  'child-care': {
    label: 'Pay for child care',
    detail: 'Average weekly cost of a daycare center: $215',
    backgroundSrc: childCareGraphic,
    cost: 215,
    message: `Cool! That’ll cover approximately three weeks of child care, provided your local center hasn’t been shut down due to lack of funding...`,
  },
  'computer': {
    label: 'New computer',
    detail: 'Average cost of a laptop: $700',
    backgroundSrc: computerGraphic,
    cost: 700,
    message: `Oooh, so close, but not quite enough to cover it. Can’t you just do remote learning on your phone?`,
  },
  'car': {
    label: 'Car payment',
    detail: 'Average monthly car payment (new): $568',
    backgroundSrc: carGraphic,
    cost: 558,
    message: `Nice! Go buy yourself something fun like a bobblehead for your dashboard.`,
  },
  'mortgage': {
    label: 'Mortgage payment',
    detail: 'Average mortgage payment (30-year fixed): $1,275',
    backgroundSrc: houseGraphic,
    cost: 1275,
    message: `That’ll get you about halfway there, congrats! Pro-tip: By making your coffee at home you’ll have the rest of that saved up in no time.`,
  },
  'school-supplies': {
    label: 'School Supplies',
    detail: 'Average annual cost of school supplies per child: $529',
    backgroundSrc: classroomGraphic,
    cost: 529,
    message: `Great! That should (just barely) cover everything you need… as long as you only have one kid.`,
  },
};

const optionsList = Object.keys(options).reduce((acc, id) => [...acc, { id, ...options[id] }], []);

export default function Calculator(props) {
  const { fadeToCta } = props;

  const [totalSelections, setTotalSelections] = React.useState(0);
  const [totalMoneySpent, setTotalMoneySpent] = React.useState(0);
  const [message, setMessage] = React.useState(null);

  const hasReachedEnd = totalSelections >= optionsList.length;

  React.useEffect(() => {
    if (hasReachedEnd) {
      const timeoutId = setTimeout(() => {
        fadeToCta();
        setMessage(null);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }

    return () => {};
  }, [
    fadeToCta,
    setMessage,
    hasReachedEnd,
  ]);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => setMessage(null), 4000);
    return () => clearTimeout(timeoutId);
  }, [
    message,
    setMessage,
  ]);

  function onOptionClick(id) {
    setTotalSelections(totalSelections + 1);
    setTotalMoneySpent(totalMoneySpent + options[id].cost);
    setMessage(options[id].message);
  }

  return (
    <Container>
      <TitleContainer>
        <Title>Spend your stimulus check!</Title>
        <Subtitle>
          <em>Congratulations!</em> After months of suffering through a pandemic and economic collapse, you just got a whopping $600 from the United States Government to help you get by.
        </Subtitle>
      </TitleContainer>
      <CtaContainer>
        <Cta>How are you going to spend this incredible new influx of wealth?</Cta>
        <Subtitle><em>Click around below to see just how far you can streeeeeetch that check:</em></Subtitle>
      </CtaContainer>
      <ButtonsGrid>
        {optionsList.map((option) => (
          <CalcButton
            key={option.id}
            onClick={onOptionClick}
            {...option}
          />
        ))}
      </ButtonsGrid>
      <MoneyBar totalMoneySpent={totalMoneySpent} />
      <Clippy message={message} />
    </Container>
  );
}
