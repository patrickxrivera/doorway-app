import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { PinkButton } from "../Lottery/styles";
import { getRequestToken } from "../../api/twitter";
import { TWITTER_OAUTH_URL } from "../../utils/endpoints";

function ConnectTwitterButton(props) {
    const [loading, setLoading] = useState(false);

    const handleGetStartedClick = async () => {
        setLoading(true);

        const requestToken = await getRequestToken();

        if (!requestToken) {
            // TODO: handle error
            return;
        }
        
        window.location.href = `${TWITTER_OAUTH_URL}?oauth_token=${requestToken}`;
    }
    
    return (
        <PinkButton
            {...props}
            role="button" 
            tabIndex="0"
            onClick={handleGetStartedClick}
        >
            {loading ? <ClipLoader color="white" size={30} /> : "Connect Twitter"}
        </PinkButton>
    )
}

export default ConnectTwitterButton;