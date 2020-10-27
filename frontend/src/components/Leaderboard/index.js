import React, { useState, useEffect } from 'react';
import Table from "react-bootstrap/Table";
import styled from "styled-components";
import { getLeaderboard } from '../../api/leaderboard';
import { LoadingComponent } from '../Loading';
import ClockLoader from "react-spinners/ClockLoader";

const buildTwitterLink = (screenName) => `https://twitter.com/${screenName}`;

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState(null);

  useEffect(() => {
    const callGetLeaderboard = async () => {
      // TODO: handle error
      const leaderboard = await getLeaderboard();
      setLeaderboard([
          {
              screenName: "patrickxrivera",
              points: 10
          },
          {
            screenName: "patrickxrivera",
            points: 10
        },
        {
            screenName: "patrickxrivera",
            points: 10
        },
        {
            screenName: "patrickxrivera",
            points: 10
        },
        {
            screenName: "patrickxrivera",
            points: 10
        },
        {
            screenName: "patrickxrivera",
            points: 10
        },
        {
            screenName: "patrickxrivera",
            points: 10
        },
        {
            screenName: "patrickxrivera",
            points: 10
        },
        {
            screenName: "patrickxrivera",
            points: 10
        },
        {
            screenName: "patrickxrivera",
            points: 10
        },
        {
            screenName: "patrickxrivera",
            points: 10
        },
        {
            screenName: "patrickxrivera",
            points: 10
        },
        {
            screenName: "patrickxrivera",
            points: 10
        },
        {
            screenName: "patrickxrivera",
            points: 10
        },
        {
            screenName: "patrickxrivera",
            points: 10
        },
        {
            screenName: "patrickxrivera",
            points: 10
        },
      ]);
    }

    callGetLeaderboard();
  }, []);

  if (!leaderboard) {
    return (
        <LoadingComponent
          headerText="Calculating the leaderboard   ..."
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
        <HeaderText>Leaderboard</HeaderText>
        <TableContainer>
        <Table bordered responsive style={{color: "white", fontWeight: "bold"}}>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map(({ screenName, points }, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td><StyledLink href={buildTwitterLink(screenName)} target="_blank">{screenName}</StyledLink></td>
                <td>{points}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

const StyledLink = styled.a`
    color: #fff;
    font-weight: bold;

    &:hover {
        color: #fff;
        opacity: 0.8;
    }
`

const Header = styled.h2`
  margin-bottom: 24px;
`

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 600px;
  margin: 48px 0;
`

const Container = styled.div`
  display: flex;
  justify-content: center; 
  margin-top: 16px;
  align-items: center;
  flex-direction: column;
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

export default Leaderboard;