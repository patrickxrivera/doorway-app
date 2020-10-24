import React, { useState, useEffect } from 'react';
import Modal from "../Modal";
import styled from "styled-components";
import queryStringParser from "qs"
import { getAccessToken } from '../../api/twitter';
import InitialStep from '../Modal/InitialStep';
import ConnectTwitterSuccess from '../Modal/ConnectTwitterSuccess';
import Loading from '../Modal/Loading';
import ErrorLogger from '../../services/error-logger';
import Cache from '../../services/cache';
import { getReferralCode } from '../../api/referral';

const STEPS = {
  INITIAL_STEP: () => InitialStep,
  CONNECT_TWITTER_SUCCESS: () => ConnectTwitterSuccess,
  LOADING: () => Loading
}

function Widget() {
  const [show, setShow] = useState(true);
  const [StepComponent, setStepComponent] = useState(STEPS.INITIAL_STEP);
  const [referralCode, setReferralCode] = useState(null);

  useEffect(() => {
    const handleQueryParams = async () => {
      const url = window.location.href.split("?")[1];
      const res = queryStringParser.parse(url, { ignoreQueryPrefix: true });
      
      if (Object.keys(res).length === 0) {
        return;
      }

      try {
        setStepComponent(STEPS.LOADING);

        const { oauth_token, oauth_verifier } = res;
        
        const { token } = await getAccessToken({
          oAuthToken: oauth_token,
          oAuthVerifier: oauth_verifier
        });
        
        Cache.saveToken(token);

        const referralCode = await getReferralCode();

        setReferralCode(referralCode);

        setStepComponent(STEPS.CONNECT_TWITTER_SUCCESS);
      } catch (e) {
        ErrorLogger.send(e);
        // TODO: create error step
        setStepComponent(STEPS.INITIAL_STEP);
      }
    }
    
    handleQueryParams();
  }, []);
  
  return (
    <Container>
      <Modal 
        show={show} 
        setShow={setShow} 
        StepComponent={StepComponent}
        referralCode={referralCode}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center; 
  margin-top: 16px;
  flex-direction: column;
  align-items: center;
`

export default Widget;
