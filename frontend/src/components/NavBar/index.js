import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { getIsLoggedIn } from "../../utils/helpers";
import Cache from "../../services/cache";

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
                    <StyledNavLink to="/refer">Earn tickets</StyledNavLink>
                </NavBarItem>
                <NavBarItem marginRight={40} marginRightMobile={20}>
                    <StyledNavLink to="/get-started">Settings</StyledNavLink>
                </NavBarItem>
            </React.Fragment>
        ) : (
            <NavBarItem marginRight={40} marginRightMobile={20}>
                <StyledNavLink to="/get-started">Get Started</StyledNavLink>
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
    }
`

const NavBarItem = styled.div`
    margin: 0 20px;
    margin-right: ${props => props.marginRight ? `${props.marginRight}px` : null};

    @media (max-width: 768px) {
        margin-right: ${props => props.marginRightMobile ? `${props.marginRightMobile}px` : null};
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