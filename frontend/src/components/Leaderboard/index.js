import React, { useState, useEffect } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import styled from "styled-components";
import { getLeaderboard } from '../../api/leaderboard';
import { LoadingComponent } from '../Loading';
import ClockLoader from "react-spinners/ClockLoader";
import paginationFactory from 'react-bootstrap-table2-paginator';
import NavBar from '../NavBar';

const buildTwitterLink = (screenName) => `https://twitter.com/${screenName}`;

const trim = (screenName) => screenName.length > 23 ? screenName.slice(0, 23) + "..." : screenName;

const columns = [
  {
    dataField: 'position',
    text: '#'
  }, 
  {
    dataField: 'username',
    text: 'Username'
  }, 
  {
    dataField: 'tickets',
    text: 'Tickets'
  }
];

const buildOptionsFor = (leaderboard) => ({
  paginationSize: 4,
  pageStartIndex: 0,
  firstPageText: 'First',
  prePageText: 'Back',
  nextPageText: 'Next',
  lastPageText: 'Last',
  nextPageTitle: 'First page',
  prePageTitle: 'Pre page',
  firstPageTitle: 'Next page',
  lastPageTitle: 'Last page',
  showTotal: true,
  paginationTotalRenderer: customTotal,
  disablePageTitle: true,
  sizePerPageList: [{
    text: '10', value: 10
  }, {
    text: '25', value: 25
  }, {
    text: 'All', value: leaderboard.length
  }]
})

const customTotal = (from, to, size) => (
  <span className="react-bootstrap-table-pagination-total" style={{color: "white"}}>
    {" "}Showing {from} to {to} of {size} Results
  </span>
);

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState(null);

  useEffect(() => {
    const callGetLeaderboard = async () => {
      // TODO: handle error
      const leaderboard = await getLeaderboard();

      // const formattedLeaderboard = leaderboard.map(({ screenName, points }, idx) => ({
      //   position: idx + 1,
      //   username: <StyledLink href={buildTwitterLink(screenName)} target="_blank">{trim(screenName)}</StyledLink>,
      //   tickets: points
      // }))

      let formattedLeaderboard = [];

      for (let i = 0; i < 100; i++) {
        const screenName = "patrickxrivera";

        formattedLeaderboard.push({
          position: i + 1,
          username: <StyledLink href={buildTwitterLink(screenName)} target="_blank">{trim(screenName)}</StyledLink>,
          tickets: 350 - i + 10
        })
      }

      setLeaderboard(formattedLeaderboard);
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

  const options = buildOptionsFor(leaderboard);

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
        <HeaderText>Leaderboard</HeaderText>
        <TableContainer>
          <BootstrapTable 
            keyField={"position"}
            columns={columns}
            data={leaderboard}
            rowStyle={{color: "white", fontWeight: "bold"}}
            headerClasses="__leaderboard-white-font"
            pagination={paginationFactory(options)}
          />
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
  flex-direction: column;
  width: 700px;
  margin: 48px 0;
  margin-bottom: 100px;
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

  @media (max-width: 768px) {
    width: 98%;
    font-size: 70px;
    text-align: center;
  }
`

export default Leaderboard;