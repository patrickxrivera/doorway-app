import React, { useState, useEffect } from 'react';
import queryStringParser from "qs"
import ClipLoader from "react-spinners/ClipLoader";
import {
  TwitterBoardImage,
  CountdownTimerText,
  SmallHeader,
  PatuaText,
  PointItemContainer,
  PointItem,
  JoinContainer,
  PinkButton,
} from "./styles";
import styled from "styled-components";
import NavBar from '../NavBar';
import Cache from '../../services/cache';
import { getRequestToken } from '../../api/twitter';
import { TWITTER_OAUTH_URL } from '../../utils/endpoints';
import ConnectTwitterButton from '../ConnectTwitterButton';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'
import { getTopLeaderboard } from '../../api/leaderboard';
import Error from '../Error';

const END_DATE = (new Date("10/30/2020")).getTime() + (1000 * 60 * 60 * 8);

const trim = (screenName, limit) => screenName.length > limit ? screenName.slice(0, limit) + "..." : screenName;

function Lottery() {
    const [showRequestTokenErrorMessage, setShowRequestTokenErrorMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [topLeaderboard, setTopLeaderboard] = useState([]);

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1224px)'
    })

    const trimLimit = isDesktopOrLaptop ? 23 : 13;

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

    useEffect(() => {
        const callGetTopLeaderboard = async () => {
            const topLeaderboard = await getTopLeaderboard();
            
            setTopLeaderboard(topLeaderboard);
        }

        callGetTopLeaderboard();
    }, [])

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
        <TopContainer>
            <SectionContainer>
                <SmallHeader fontSize={50} mobileTextAlign={"center"}>
                    Become an influencer over night!
                </SmallHeader>
                <PatuaText textAlign="left" fontSize={24} mobileTextAlign="center">
                    On October 30th at 8AM PT, we’ll pick a lucky lottery ticket owner to win hundreds of new followers on Twitter
                </PatuaText>
                <PatuaText textAlign="left" fontSize={24} mobileTextAlign="center">
                    Connect your Twitter and refer friends to earn tickets!
                </PatuaText>
                <ConnectTwitterButtonContainer>
                    <ConnectTwitterButton marginTop={24} width={250} />
                </ConnectTwitterButtonContainer>
            </SectionContainer>
            <div>
                <TwitterBoardImage src="/images/twitter-board.png" />
                <div style={{
                    color: "#fff",
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 100,
                    marginTop: -220,
                }}>
                    <CountdownTimerText daysInHours date={END_DATE} />
                </div>
            </div>
        </TopContainer>
        <SectionContainer flexDirection="row" width={1200}>
            {isDesktopOrLaptop && (
                <div>
                    <img src="/images/twitter-token-board.png"/>
                </div>
            )}
            <HowItWorksContainer>
                <SmallHeader mobileTextAlign="center" fontSize={50}>How it works</SmallHeader>
                <PatuaText fontSize={25} textAlign={"left"}>
                    1. Connect your Twitter account to earn 10 tickets
                </PatuaText>
                <PatuaText fontSize={25} textAlign={"left"}>
                    2. Earn 10 more tickets by getting friends to join using your referral link
                </PatuaText>
                <PatuaText fontSize={25} textAlign={"left"}>
                    3. On October 30th at 8AM PT, we will select a winning ticket that will automatically receive a follow from every player
                </PatuaText>
            </HowItWorksContainer>
        </SectionContainer>
        <LeaderboardContainer>
            <SmallHeader fontSize={80} mobileFontSize={50}>
                Leaderboard
            </SmallHeader>
            <div>
                {topLeaderboard.map(({ screenName }, idx) => {
                    return (
                        <LeaderboardItemContainer>
                            <SmallHeader fontSize={90} mobileFontSize={50}>{idx + 1}.</SmallHeader>
                            <TwitterLink href={`https://twitter.com/${screenName}`} target="_blank">
                                <PatuaText fontSize={60} mobileFontSize={35} marginLeft={12} marginTop="none">@{trim(screenName, trimLimit)}</PatuaText>
                            </TwitterLink>
                        </LeaderboardItemContainer>
                    )   
                })}
                <LeaderboardItemContainer justifyContent="center">
                    <div>
                        <PatuaText mobileFontSize={35} fontSize={60} marginTop="none"><StyledNavLink to="/leaderboard">See all <AiOutlineArrowRight /></StyledNavLink></PatuaText>
                    </div>
                </LeaderboardItemContainer>
            </div>
        </LeaderboardContainer>
        <TextContainer>
            <SmallHeader fontSize={50}>
                Who built this?
            </SmallHeader>
            <PatuaText fontSize={25}>
                Influence Lottery is an experiment from Social Studies Labs, a product studio by{" "}
                <StyledLink href="https://twitter.com/thatguybg" target="_blank">
                    Brett Goldstein
                </StyledLink>{" "} and {" "}
                <StyledLink href="https://twitter.com/patrickxrivera" target="_blank">
                    Patrick Rivera
                </StyledLink>{" "}
                 exploring what it means to be human in the context of modern technology.
            </PatuaText>
            <PatuaText fontSize={25}>
                Huge shoutout to {" "}
                <StyledLink href="https://twitter.com/PhilHedayatnia" target="_blank">
                    Phil Hedayatnia
                </StyledLink>{" "}
                 for these designs 🔥🤯🔥
            </PatuaText>
        </TextContainer>
        <JoinContainer>
            <SmallHeader fontSize={50} mobileTextAlign="center">
                Ready to join the lottery?
            </SmallHeader>
            <PinkButton width={250} onClick={handleGetStartedClick} role="button" tabIndex="0">
                {loading ? <ClipLoader color="white" size={30} /> : "Connect Twitter"}
            </PinkButton>
        </JoinContainer>
    </div>
  );
}

const TopContainer = styled.div`
    display: flex;
    width: 1200px;
    justify-content: space-between;

    @media (max-width: 768px) {
        width: 95%;
        flex-direction: column;
    }
`

const StyledLink = styled.a`
    color: #fff;
    -webkit-text-stroke-color: black;
    text-decoration: underline;
    text-decoration-color: white;
`

const SectionContainer = styled.div`
    margin-top: 32px;
    display: flex;
    flex-direction: ${props => props.flexDirection ? props.flexDirection : "column"};
    width: ${props => props.width ? `${props.width}px` : null};

    @media (max-width: 768px) {
        width: 95%;
        margin-top: 0px;
    }
`

const HowItWorksContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    padding: 40px;
    margin-top: 48px;

    @media (max-width: 768px) {
        padding: 0px;
        margin-top: 0px;
    }
`

const LeaderboardItemContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${props => props.justifyContent ? props.justifyContent : null};
`

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 1100px;
    margin-top: 90px;

    @media (max-width: 768px) {
        width: 95%;
    }
`

const StyledNavLink = styled(NavLink)`
    color: #fff;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;

    &:hover {
        text-decoration: none;
        opacity: 0.6;
        color: #fff;
    }
`

const ConnectTwitterButtonContainer = styled.div`
    @media (max-width: 768px) {
        display: flex;
        justify-content: center;
        margin-bottom: 40px;
    }
`

const LeaderboardContainer = styled.div`
    text-align: center;

    @media (max-width: 768px) {
        width: 95%;
        margin-top: 48px;
    }
`

const TwitterLink = styled.a`
    &:hover {
        text-decoration: none;
    }
`

export default Lottery;