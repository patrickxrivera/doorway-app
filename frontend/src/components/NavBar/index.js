import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Cache from "../../services/cache";
import ConnectTwitterButton from "../ConnectTwitterButton";

function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = Cache.getToken();
        setIsLoggedIn(Boolean(token));
    }, []);

    const renderAuthNav = () => (
        isLoggedIn ? (
            <React.Fragment>
                <NavBarItem >
                    <StyledNavLink to="/refer">Your tickets</StyledNavLink>
                </NavBarItem>
                <NavBarItem marginRight={40} marginRightMobile={20}>
                    <StyledNavLink to="/settings">Settings</StyledNavLink>
                </NavBarItem>
            </React.Fragment>
        ) : (
            <NavBarItem marginRight={40} marginRightMobile={20}>
                <ConnectTwitterButton
                    marginTop={0}
                    fontSize={20}
                    padding={"25px 20px"}
                    width={145}
                    mobileWidth={"auto"}
                    mobileFontSize={20}
                    mobilePadding={"0px"}
                    background="none"
                    boxShadow="none"
                    border="none"
                    strokeWidth={"1px"}
                    strokeColor={"#12688D"}
                />
            </NavBarItem>
        )
        
    )

    return (
      <NavBarContainer>
          <LogoImageContainer>
              <StyledNavLink exact to="/">
                  <LogoImage src="/images/logo.png" />
              </StyledNavLink>
          </LogoImageContainer>
          <NavBarItemContainer>
            <NavBarItem>
                <StyledNavLink exact to="/">How does this work?</StyledNavLink>
            </NavBarItem>
            <NavBarItem>
                <StyledNavLink to="/leaderboard">Leaderboard</StyledNavLink>
            </NavBarItem>
            {renderAuthNav()}
          </NavBarItemContainer>
      </NavBarContainer>
    )
}
  
const StyledNavLink = styled(NavLink)`
    color: #fff;
    -webkit-text-stroke-color: #12688D;
    -webkit-text-stroke-width: 1px;

    &:hover {
        text-decoration: none;
        color: #fff;
        opacity: 0.6;
    }
`

const NavBarItem = styled.div`
    margin: 0 20px;
    margin-right: ${props => props.marginRight ? `${props.marginRight}px` : null};
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
        margin-right: ${props => props.marginRightMobile ? `${props.marginRightMobile}px` : null};
        justify-content: flex-end;
        margin-bottom: 10px;
    }
`

const NavBarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 24px;
    font-size: 20px;
    font-family: "Patua One";
    margin-bottom: 24px;
`

const NavBarItemContainer = styled.div`
    display: flex;

    @media (max-width: 768px) {
        flex-direction: column;
        text-align: right;
    }
`

const LogoImage = styled.img`
    height: 50px
`

const LogoImageContainer = styled.div`
    margin-left: 60px;

    @media (max-width: 768px) {
        margin-left: 20px;
    }
`

export default NavBar;