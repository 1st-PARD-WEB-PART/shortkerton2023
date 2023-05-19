import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { theme } from '../styles/theme';
import styled, { ThemeProvider } from 'styled-components';
import { useState, useEffect } from 'react';

const Div = styled.div`
    margin: 0px auto;
`;

const NavBarWrapper = styled.nav`
 background-color: ${props => props.isScrolled ? (props.scrollPosition >= 1000 ? '#1A1A1A' : 'rgba(0,0,0,0)') : 'rgba(0,0,0,0)'};
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
`;

const Subtitle1 = styled.p`
  font-size: ${props => props.theme.Web_fontSizes.Subtitle1};
  font-weight: ${props => props.theme.fontWeights.Subtitle1};
  color: ${props => props.active ? '#FFFFFF' : 'rgba(255, 255, 255, 0.2)'};
  font-family: 'NanumSquare Neo';
  &:hover{
    color: #FFFFFF;
  }
`;

const Logo = styled.div`
  img {
    height: 45px;
    width: 140px;
  }
  margin-left: 165px;
  margin-right: 500px;
`;

const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  list-style-type: none;
  margin-right: 184px;
`;

const NavItem = styled.li`
  margin-left: 50px;
`;

const NavBar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { pathname } = useLocation(); // 현재 페이지의 URL을 가져옴

  useEffect(() => {
    function handleScroll() {
      const position = window.pageYOffset;
      setScrollPosition(position);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Div>
      <NavBarWrapper isScrolled={scrollPosition >= 30} scrollPosition={scrollPosition}>
        <ThemeProvider theme={theme}>
          <Logo>
            <Link to="/">
              <img src={require("../assets/img/Logo.png")} alt="Logo" />
            </Link>
          </Logo>
          <NavLinks>
            <NavItem>
              <Link to="/About" style={{ textDecoration: "none" }}>
                <Subtitle1 active={pathname === '/About'}>소개</Subtitle1>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/Project" style={{ textDecoration: "none" }}>
                <Subtitle1 active={pathname === '/Project'}>프로젝트</Subtitle1>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/Inquiry" style={{ textDecoration: "none" }}>
                <Subtitle1 active={pathname === '/Inquiry'}>문의</Subtitle1>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/Recruting" style={{ textDecoration: "none" }}>
                <Subtitle1 active={pathname === '/Recruting'}>리쿠르팅</Subtitle1>
              </Link>
            </NavItem>
          </NavLinks>
        </ThemeProvider>
      </NavBarWrapper>
    </Div>
  );
};


export default NavBar;