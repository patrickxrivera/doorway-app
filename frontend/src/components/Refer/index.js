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
import { ordinalSuffixOf } from '../../utils/helpers';
import { getReferralCode } from '../../api/referral';
import { getPosition } from '../../api/user';
import { LoadingComponent } from '../Loading';
import ClockLoader from "react-spinners/ClockLoader";

function Refer() {
    const [referralLink, setReferralLink] = useState(null);
    const [position, setPosition] = useState(null);
    const [copied, setCopied] = useState(false);
    
    useEffect(() => {
        const fetchAPI = async () => {
            const referralCodePromise = getReferralCode();
            const positionPromise = getPosition();

            const [referralCode, position] = await Promise.all([
                referralCodePromise,
                positionPromise
            ])
            
            const referralLink = `https://instantinfluencer.com?code=${referralCode}`; 

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
        backgroundImage: `url("/lottery-background-v4.png")`,
        backgroundSize: "cover",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        position: "relative"
    }}>
        <HeaderText>You're {ordinalSuffixOf(position)} In Line!</HeaderText>
        <HowItWorksContainer marginTop={20} width={840}>
            <PatuaText fontSize={25}>
                Congrats on joining the ✨ Instant Influencer Lottery ✨
            </PatuaText>
            <PatuaText fontSize={25}>
                You currently have a 3% chance of winning
            </PatuaText>
            <PatuaText fontSize={25}>
                To increase your odds, get your friends to join using the link below.
            </PatuaText>
            <SmallHeader fontSize={35} style={{marginTop: 40}}>
                Invite your friends
            </SmallHeader>
            <ReferralContainer>
                <ReferralInputContainer>
                    <ReferralInput value={referralLink} />
                </ReferralInputContainer>
                <CopyToClipboard text={referralLink} onCopy={() => setCopied(true)}>
                    <PinkButton width={147} marginTop={0}>{copied ? "Copied" : "Copy"}</PinkButton>
                </CopyToClipboard>
            </ReferralContainer>
            <LeaderboardContainer>
                <SmallHeader fontSize={35} style={{marginTop: 40}}>
                    Leaderboard
                </SmallHeader>
                <PatuaText fontSize={25}>
                    See your position in real-time on <LeaderboardLink to="/leaderboard">the leaderboard</LeaderboardLink>. Remember to check your Twitter account after 8am PT on October 30th to see if you won.
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

export default Refer;