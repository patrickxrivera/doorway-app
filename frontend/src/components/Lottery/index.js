import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import queryStringParser from "qs"
import ClipLoader from "react-spinners/ClipLoader";
import {
  TwitterBoardImage,
  CountdownTimerText,
  HowItWorksContainer,
  SmallHeader,
  PatuaText,
  PointItemContainer,
  PointItem,
  JoinContainer,
  PinkButton,
} from "./styles";
import NavBar from '../NavBar';
import Cache from '../../services/cache';
import { getRequestToken } from '../../api/twitter';
import { TWITTER_OAUTH_URL } from '../../utils/endpoints';

const END_DATE = new Date("10/30/2020");

function Lottery() {
    const [showRequestTokenErrorMessage, setShowRequestTokenErrorMessage] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const url = window.location.href.split("?")[1];
        const res = queryStringParser.parse(url, { ignoreQueryPrefix: true });
        
        if (Object.keys(res).length === 0) {
            return;
        }

        const { code: referralCode } = res;
        
        if (referralCode) {
            Cache.saveReferralCode(referralCode);
            return;
        }
    })

    const handleGetStartedClick = async () => {
        setLoading(true);
        
        const requestToken = await getRequestToken();

        if (!requestToken) {
            setShowRequestTokenErrorMessage(true);
            return;
        }

        window.location.href = `${TWITTER_OAUTH_URL}?oauth_token=${requestToken}`;
    }

  return (
    <div style={{
        backgroundImage: `url("/images/lottery-background-v2.png")`,
        backgroundSize: "cover",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        position: "relative"
    }}>
        <NavBar />
        <TwitterBoardImage src="/images/twitter-board.png" />
        <div style={{
            color: "#fff",
            position: "relative",
            display: "flex",
            width: 710,
            justifyContent: "center",
            marginBottom: 100,
            marginTop: -300,
            fontSize: 50
        }}>
            <CountdownTimerText daysInHours date={END_DATE} />
        </div>
        <HowItWorksContainer>
            <SmallHeader>
                How it works:
            </SmallHeader>
            <PatuaText>
                On October 28th at 8am PT, the ✨ Twitter Follower Lottery ✨ will begin.
            </PatuaText>
            <PatuaText>
                You will have 24 hours to connect your Twitter account on this site and gain as many points as possible.
            </PatuaText>
            <PatuaText>
                At the end of the 24 hours, your points will be converted to lottery tickets and we will randomly select one person to receive a follow from everybody that joined.
            </PatuaText>
            <SmallHeader style={{marginTop: 40}}>
                Point System
            </SmallHeader>
            <PointItemContainer>
                <PointItem>10 points - Connect your Twitter account</PointItem>
                <PointItem>10 points - Refer a friend</PointItem>
                <PointItem>5 points - Join using referral link</PointItem>
            </PointItemContainer>
        </HowItWorksContainer>
        <JoinContainer>
            <SmallHeader>
                Ready to join?
            </SmallHeader>
            <PinkButton width={250} onClick={handleGetStartedClick} role="button" tabIndex="0">
                {loading ? <ClipLoader color="white" size={30} /> : "Connect Twitter"}
            </PinkButton>
        </JoinContainer>
    </div>
  );
}

export default Lottery;