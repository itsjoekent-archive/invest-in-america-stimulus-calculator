import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Bar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  background-color: #FFFFFF;
  box-shadow: 0px -6px 4px 0px rgba(0, 0, 0, 0.25%);
  z-index: 100;
`;

const Label = styled.p`
  font-family: sofia-pro, sans-serif;
  font-weight: 900;
  font-style: normal;
  font-size: 14px;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-right: 8px;
`;

const Dollars = styled.span`
  font-family: sofia-pro, sans-serif;
  font-weight: 900;
  font-style: normal;
  font-size: 18px;
  color: ${({ color }) => color};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

function formatDollars(amount) {
  const value = 600 - amount;

  if (value < 0) {
    return [
      `-$${value.toLocaleString().replace('-', '')}`,
      '#FF033B',
    ];
  }

  return [
    `$${value.toLocaleString()}`,
    '#00B68E',
  ];
}

export default function MoneyBar(props) {
  const {
    totalMoneySpent = 0,
  } = props;

  const [dollarsFormatted, dollarsColor] = formatDollars(totalMoneySpent);

  return ReactDOM.createPortal((
    <Bar>
      <Label>remaining stimulus money</Label>
      <Dollars color={dollarsColor}>{dollarsFormatted}</Dollars>
    </Bar>
  ), document.getElementById('money-bar'));
}
