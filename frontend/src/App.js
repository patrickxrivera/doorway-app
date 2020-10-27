import React, { useState, useEffect } from 'react';
import Lottery from './components/Lottery';
import GetStarted from "./components/GetStarted";
import Refer from "./components/Refer";
import Loading from "./components/Loading";
import Leaderboard from "./components/Leaderboard";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import styled from "styled-components"
import BeatLoader from "react-spinners/BeatLoader";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';

const AppLoadingContainer = styled.div`
  height: ${props => props.height ? `${props.height}px` : "1050px"};
  background: radial-gradient(322.42% 116.32% at 50.02% 0%, #2AA9E0 0%, #75D5FF 18.54%, #026A97 34.43%, #012A3C 63.07%, #000000 85.88%), #000000;
  display: flex;
  justify-content: center;
  padding-top: 20%;
`

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cacheImages = async (srcArray) => {
      const promises = await srcArray.map((src) => {
        return new Promise(function (resolve, reject) {
          const img = new Image();

          img.src = src;

          img.onload = resolve();
          img.onerror = reject();
        })
      })

      await Promise.all(promises);

      setIsLoading(false);
    }

    const images = [
      "/images/lottery-background-v4.png",
      "/images/lottery-background-v2.png"
    ];

    cacheImages(images);
  }, [])

  if (isLoading) {
    return (
      <AppLoadingContainer>
        <BeatLoader color="#fff" size={60} />
      </AppLoadingContainer>
    )
  }

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Lottery />
          </Route>
          <Route path="/get-started">
            <GetStarted />
          </Route>
          <Route path="/refer">
            <Refer />
          </Route>
          <Route path="/loading">
            <Loading />
          </Route>
          <Route path="/leaderboard">
            <Leaderboard />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
