import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import {
    HowItWorksContainer,
    PatuaText,
    Button,
} from "../Lottery/styles";
import NavBar from '../NavBar';
import { disconnectTwitter } from '../../api/twitter';
import Cache from '../../services/cache';
import { useHistory } from 'react-router-dom';

function Settings() {
  const history = useHistory();

  const handleDisconnectTwitter = async () => {
    Cache.removeToken();
    await disconnectTwitter();
    history.push("/")
  }

  return (
    <BackgroundImage imgHeight={window.screen.height}>
        <NavBar />
        <HeaderText>Settings</HeaderText>
        <HowItWorksContainer marginTop={20} width={840}>
            <PatuaText fontSize={25}>
                By disconnecting Twitter, you forfeit your lottery tickets. 
            </PatuaText>
            <PatuaText fontSize={25}>
                Are you sure you want to proceed?
            </PatuaText>
            <Button onClick={handleDisconnectTwitter} marginTop={48} background="#F32013">
                Disconnect Twitter
            </Button>
        </HowItWorksContainer>
    </BackgroundImage>
  );
}

export const BackgroundImage = styled.div`
  background-image: url("/images/lottery-background-v4.png");
  background-size: cover;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: ${props => props.imgHeight ? `${props.imgHeight}px` : `${window.screen.height}px`};
`

export const HeaderText = styled.div`
    font-size: 140px;
  text-align: center;
  font-family: Sansita;
  background: -webkit-linear-gradient(213.02deg, #EEB911 16.36%, #D48311 22.95%, #CE6E18 26.29%, #CC661B 29.32%, #D26F19 32.71%, #E08115 35.85%, #EE9611 38.91%, #EEBB11 42.37%, #EBEBA6 49.19%, #EEBB11 64.14%, #D1721A 76.13%, #CC661B 84.72%, #D27419 97.57%, #ECB712 117.14%, #CECC00 150.06%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-color: black;
  -webkit-text-stroke-width: 4px;

    @media (max-width: 768px) {
        font-size: 80px;
        -webkit-text-stroke-width: 2px;
    }
`

export default Settings;