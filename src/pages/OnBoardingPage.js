import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import onBoardingImage from '../assets/img/onBoarding.svg';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: opacity 0.5s ease;
`;

const Image = styled.img`
    width: 100%;
`;

function OnBoardingPage() {
    const [showOnBoarding, setShowOnBoarding] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowOnBoarding(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!showOnBoarding) {
          // 3초가 지나면 HomePage로 이동
          navigate('/home');
        }
      }, [showOnBoarding, navigate]);

    return (
        <Wrapper show={showOnBoarding}>
            <Image src={onBoardingImage} alt="OnBoarding" />
        </Wrapper>

    );
}

export default OnBoardingPage;