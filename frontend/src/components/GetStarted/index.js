import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getRequestToken } from '../../api/twitter';
import { TWITTER_OAUTH_URL } from "../../utils/endpoints";

import {
    HowItWorksContainer,
    SmallHeader,
    PatuaText,
    PointItemContainer,
    PointItem,
    PinkButton,
} from "../Lottery/styles";
import config from '../../config';

function GetStarted() {
    const [showRequestTokenErrorMessage, setShowRequestTokenErrorMessage] = useState(false);

    const handleGetStartedClick = async () => {
        const requestToken = await getRequestToken();

        if (!requestToken) {
            setShowRequestTokenErrorMessage(true);
            return;
        }

        window.location.href = `${TWITTER_OAUTH_URL}?oauth_token=${requestToken}`;
    }

    return (
        <div style={{
            backgroundImage: `url("/lottery-background-v4.png")`,
            backgroundSize: "cover",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            position: "relative"
        }}>
            <HeaderText>Instant Influencer Lottery</HeaderText>
            <HowItWorksContainer marginTop={20} width={840}>
                <PatuaText fontSize={25}>
                    Welcome to the ✨ Instant Influencer Lottery ✨
                </PatuaText>
                <PatuaText fontSize={25}>
                    The rules are simple. You have until October 30th at 8AM PT to connect your Twitter account and earn points by referring others.
                </PatuaText>
                <PatuaText fontSize={25}>
                    Once the time is up, your points will be converted to lottery tickets and we will randomly select a person to receive a follow from everybody that connected their Twitter account.
                </PatuaText>
                <SmallHeader fontSize={35} style={{marginTop: 40}}>
                    Point System
                </SmallHeader>
                <PointItemContainer>
                    <PointItem fontSize={25}>10 points - Connect your Twitter account</PointItem>
                    <PointItem fontSize={25}>10 points - Refer a friend</PointItem>
                    <PointItem fontSize={25}>5 points - Join using referral link</PointItem>
                </PointItemContainer>
                <ConnectTwitterContainer>
                    <PinkButton onClick={handleGetStartedClick}>Connect Twitter</PinkButton>
                </ConnectTwitterContainer>
            </HowItWorksContainer>
        </div>
    );
}

const StyledLink = styled(Link)`
    &:hover {
        text-decoration: none;
    }
`

const ConnectTwitterContainer = styled.div`
    margin-top: 18px; 
    margin-bottom: 120px;
`

const HeaderText = styled.div`
    font-size: 140px;
  color: #white;
  font-family: Sansita;
  background: -webkit-linear-gradient(213.02deg, #EEB911 16.36%, #D48311 22.95%, #CE6E18 26.29%, #CC661B 29.32%, #D26F19 32.71%, #E08115 35.85%, #EE9611 38.91%, #EEBB11 42.37%, #EBEBA6 49.19%, #EEBB11 64.14%, #D1721A 76.13%, #CC661B 84.72%, #D27419 97.57%, #ECB712 117.14%, #CECC00 150.06%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-color: black;
  -webkit-text-stroke-width: 4px;
`

export default GetStarted;