import React, { useState, useEffect } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import styled from "styled-components";
import { getLeaderboard } from '../../api/leaderboard';
import { LoadingComponent } from '../Loading';
import ClockLoader from "react-spinners/ClockLoader";
import paginationFactory from 'react-bootstrap-table2-paginator';
import NavBar from '../NavBar';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const { SearchBar } = Search;

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
  sizePerPageList: [
    {
      text: '25', value: 25
    }, 
    {
      text: '50', value: 50
    },
    {
      text: '100', value: 100
    }, 
    {
      text: 'All', value: leaderboard.length
    }
  ]
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

      const formattedLeaderboard = leaderboard.map(({ screenName, points }, idx) => ({
        position: idx + 1,
        username: trim(screenName),
        tickets: points
      }))

      // let formattedLeaderboard = [];

      // for (let i = 0; i < 100; i++) {
      //   const screenName = "patrickxrivera";

      //   formattedLeaderboard.push({
      //     position: i + 1,
      //     username: trim(screenName),
      //     tickets: 350 - i + 10,
      //     // twitterProfile: <StyledLink href={buildTwitterLink(screenName)} target="_blank">Link</StyledLink>,
      //   })
      // }

      setLeaderboard(formattedLeaderboard);
    }

    callGetLeaderboard();
  }, []);

  if (!leaderboard) {
    return (
        <LoadingComponent
          headerText="Leaderboard"
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
        <TableContainer mobileWidth={window.screen.width - 15}>
          <ToolkitProvider
            keyField="username"
            data={leaderboard}
            columns={columns}
            search
          >
            {(props) => (
              <div>
                <SearchBar { ...props.searchProps } />
                <hr />
                <BootstrapTable
                  keyField={"position"}
                  rowClasses="__leaderboard-row"
                  headerClasses="__leaderboard-white-font"
                  pagination={paginationFactory(options)}
                  { ...props.baseProps }
                />
              </div>
            )}
          </ToolkitProvider>
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

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 700px;
  margin: 48px 0;
  margin-bottom: 100px;

  @media (max-width: 768px) {
    width: ${props => props.mobileWidth ? `${props.mobileWidth}px` : null};
  }
`

const HeaderText = styled.div`
    font-size: 140px;
  color: #white;
  font-family: Sansita;
  text-align: center;
  background: -webkit-linear-gradient(213.02deg, #EEB911 16.36%, #D48311 22.95%, #CE6E18 26.29%, #CC661B 29.32%, #D26F19 32.71%, #E08115 35.85%, #EE9611 38.91%, #EEBB11 42.37%, #EBEBA6 49.19%, #EEBB11 64.14%, #D1721A 76.13%, #CC661B 84.72%, #D27419 97.57%, #ECB712 117.14%, #CECC00 150.06%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-color: black;
  -webkit-text-stroke-width: 4px;

  @media (max-width: 768px) {
    font-size: 70px;
    -webkit-text-stroke-width: 2px;
  }
`

export default Leaderboard;