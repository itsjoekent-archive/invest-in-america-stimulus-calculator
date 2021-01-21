import React from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';
import mitch from './assets/mitch.png';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  display: block;
  position: fixed;
  bottom: 24px;
  right: 12px;
  z-index: 50;
`;

const Avatar = styled.img`
  width: 148px;
  animation: ${fadeIn} 1.5s forwards;

  @media (min-width: 768px) {
    width: 187px;
  }
`;

const Bubble = styled.div`
  display: block;
  width: 300px;

  padding: 12px;
  border-radius: 8px;

  position: absolute;
  top: -96px;
  right: 0;

  background-color: #FFFFFF;
  z-index: 10;

  &::after {
    display: block;
    content: '';
    position: absolute;
    right: 40px;
    bottom: -14px;
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 20px solid #FFFFFF;

    @media (min-width: 768px) {
      right: 52px;
    }
  }
`;

const BubbleCopy = styled.p`
  font-family: sofia-pro, sans-serif;
  font-weight: 300;
  font-style: normal;
  font-size: 16px;
  text-align: left;
  color: #000000;
`;

const AvatarWrapper = styled.div`
  position: relative;
`;

const Eye = styled.span`
  display: none;
  opacity: 0;
  position: absolute;
  z-index: 10;

  top: 36px;
  left: 54px;

  &:last-of-type {
    left: 78px;
  }

  height: 18px;
  width: 18px;
  border: 1px solid #000000;
  border-radius: 50%;
  background: #FFFFFF;

  &::after {
    position: absolute;
    bottom: 5px;
    right: 9px;
    width: 8px;
    height: 8px;
    background: #000000;
    border-radius: 50%;
    content: '';
  }

  @media (min-width: 768px) and (pointer: fine) {
    display: inline-block;
    animation: ${fadeIn} 1.5s forwards;
  }
`;

export default function Clippy(props) {
  const { message } = props;

  const leftEyeRef = React.useRef(null);
  const rightEyeRef = React.useRef(null);

  React.useEffect(() => {
    function adjustEye(eye, event) {
      const boundingBox = eye.getBoundingClientRect();

      const x = (boundingBox.left) + (boundingBox.width / 2);
      const y = (boundingBox.top) + (boundingBox.height / 2);

      const radians = Math.atan2(event.pageX - x, event.pageY - y);
      const rotation = (radians * (180 / Math.PI) * -1) - 90;

      eye.style.transform = `rotate(${rotation}deg)`;
    }

    function onMouseMove(event) {
      if (leftEyeRef.current) {
        adjustEye(leftEyeRef.current, event);
      }

      if (rightEyeRef.current) {
        adjustEye(rightEyeRef.current, event);
      }
    }

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return ReactDOM.createPortal((
    <Container>
      <AvatarWrapper>
        {message && (
          <Bubble>
            <BubbleCopy>{message}</BubbleCopy>
          </Bubble>
        )}
        <Eye ref={leftEyeRef} />
        <Eye ref={rightEyeRef} />
        <Avatar src={mitch} alt="Senator Mitch McConnell" />
      </AvatarWrapper>
    </Container>
  ), document.getElementById('clippy'));
}
