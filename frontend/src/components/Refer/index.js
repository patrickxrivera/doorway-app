import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
    HowItWorksContainer,
    SmallHeader,
    PatuaText,
    ReferralInput,
    PinkButton,
    ReferralInputContainer,
} from "../Lottery/styles";
import { getReferralCode } from '../../api/referral';
import { getPosition } from '../../api/user';
import { LoadingComponent } from '../Loading';
import ClockLoader from "react-spinners/ClockLoader";
import NavBar from '../NavBar';
import config from '../../config';

function Refer() {
    const [referralLink, setReferralLink] = useState(null);
    const [position, setPosition] = useState(null);
    const [copied, setCopied] = useState(false);
    
    useEffect(() => {
        const fetchAPI = async () => {
            const referralCodePromise = getReferralCode();
            const positionPromise = getPosition();

            const [referralCode, { position }] = await Promise.all([
                referralCodePromise,
                positionPromise
            ])
            
            const referralLink = `${config.webAppUrl}?code=${referralCode}`; 

            setReferralLink(referralLink);
            setPosition(position);
        }

        fetchAPI();
    }, []);
    
    if (!position) {
        return (
            <LoadingComponent
              headerText="Getting Your Lottery Tickets Ready..."
              Icon={ClockLoader}
            />
        );
    }

  return (
    <div style={{
        backgroundImage: `url("/images/lottery-background-v4.png")`,
        backgroundSize: "cover",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        position: "relative"
    }}>
        <NavBar />
        <HeaderText>You Received Ticket #{position}!</HeaderText>
        <HowItWorksContainer marginTop={20} width={840}>
            <PatuaText fontSize={25}>
                Congrats on joining the ✨ Instant Influencer Lottery ✨
            </PatuaText>
            <PatuaText fontSize={25}>
                On October 30th at 8am PT we will we will randomly select a winning lottery ticket. Whoever has it will automatically receive a follow from everybody that connected their Twitter account.
            </PatuaText>
            <SmallHeader fontSize={35} style={{marginTop: 40}}>
                Get More Tickets By Referring Friends
            </SmallHeader>
            <ReferralContainer>
                <ReferralInputContainer>
                    <ReferralInput value={referralLink} />
                </ReferralInputContainer>
                <CopyToClipboard text={referralLink} onCopy={() => setCopied(true)}>
                    <PinkButton mobileWidth={"100%"} width={147} marginTop={0}>{copied ? "Copied" : "Copy"}</PinkButton>
                </CopyToClipboard>
            </ReferralContainer>
            <LeaderboardContainer>
                <SmallHeader fontSize={35} style={{marginTop: 40}}>
                    Leaderboard
                </SmallHeader>
                <PatuaText fontSize={25}>
                    See your position in real-time on <LeaderboardLink to="/leaderboard">the leaderboard</LeaderboardLink>. We will DM the winner at 8am PT on October 30th.
                </PatuaText>
            </LeaderboardContainer>
        </HowItWorksContainer>
    </div>
  );
}

const LeaderboardLink = styled(Link)`
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
    color: rgb(255, 255, 255);
    text-decoration: underline;

    &:hover {
        color: #fff;
    }
`

const LeaderboardContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 200px;
    margin-top: 24px;
    align-items: center;
`

const ReferralContainer = styled.div`
    margin-top: 18px; 
    display: flex;
    align-items: center;

    @media (max-width: 768px) {
        flex-direction: column;
        width: 98%;
    }
}
`

const HeaderText = styled.div`
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

export default Refer;