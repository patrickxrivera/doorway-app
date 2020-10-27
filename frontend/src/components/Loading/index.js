import React, { useEffect } from 'react';
import styled from "styled-components";
import ClockLoader from "react-spinners/ClockLoader";
import queryStringParser from "qs"
import ErrorLogger from '../../services/error-logger';
import { getAccessToken } from '../../api/twitter';
import { redeemReferralCode } from '../../api/referral';
import { useHistory } from "react-router-dom";
import Cache from "../../services/cache";
import NavBar from '../NavBar';

function Loading() {
    const history = useHistory();

    useEffect(() => {
        const handleTwitterRedirect = async ({ oauth_token, oauth_verifier }) => {
            const { token } = await getAccessToken({
              oAuthToken: oauth_token,
              oAuthVerifier: oauth_verifier
            });
            
            Cache.saveToken(token);
      
            const existingReferralCode = Cache.getReferralCode();
            
            if (existingReferralCode) {
              await redeemReferralCode(existingReferralCode)
              Cache.removeReferralCode();
            }

            history.push("/refer");
          }

        const handleQueryParams = async () => {
            const url = window.location.href.split("?")[1];
            const res = queryStringParser.parse(url, { ignoreQueryPrefix: true });
            
            if (Object.keys(res).length === 0) {
              return;
            }
      
            try {
              const { oauth_token, oauth_verifier, referral_code } = res;
      
              if (oauth_token && oauth_verifier) {
                handleTwitterRedirect({
                  oauth_token,
                  oauth_verifier
                });
                return;
              }
            } catch (e) {
              ErrorLogger.send(e);
              // TODO: redirect to error page
            }
          }
          
          handleQueryParams();
    }, [history]);

    return (
        <LoadingComponent
          headerText="Getting Your Lottery Tickets Ready..."
          Icon={ClockLoader}
        />
    );
}

export function LoadingComponent({ headerText, Icon }) {
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
      <HeaderText>{headerText}</HeaderText>
      <LoadingIconContainer>
          <Icon size={250} color="#fff" />
      </LoadingIconContainer>
    </div>
  )
}

const LoadingIconContainer = styled.div`
    margin-top: 120px;
    margin-bottom: 420px;
`

const HeaderText = styled.div`
    font-size: 100px;
  text-align: center;
  font-family: Sansita;
  background: -webkit-linear-gradient(213.02deg, #EEB911 16.36%, #D48311 22.95%, #CE6E18 26.29%, #CC661B 29.32%, #D26F19 32.71%, #E08115 35.85%, #EE9611 38.91%, #EEBB11 42.37%, #EBEBA6 49.19%, #EEBB11 64.14%, #D1721A 76.13%, #CC661B 84.72%, #D27419 97.57%, #ECB712 117.14%, #CECC00 150.06%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-color: black;
  -webkit-text-stroke-width: 4px;

  @media (max-width: 768px) {
    font-size: 65px;
}
`

export default Loading;