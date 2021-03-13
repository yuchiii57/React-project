import React from "react";
import {
  Grid
} from "semantic-ui-react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import StockoutForm from "./StockoutForm";
import "../../index.css";
import StockoutTable from "./StockoutTable";
import StockoutMaster from "./StockoutSearch/StockoutMasterMUIT";
import StockoutDetail from "./StockoutSearch/StockoutDetailTable";
import StockSummaryMUIT from "../../Stock/StockSummary/StockSummaryMUIT";

import { useSelector } from "react-redux";

export default () => {

  const privilege = useSelector(state => state.privilege);

  return (
    <Tabs>
      <TabList>
        <Tab>產品出庫</Tab>
        <Tab>出庫查詢</Tab>
        <Tab>庫存查詢</Tab>
      </TabList>
      <TabPanel>
        {privilege.some(e => e.program === "stockout" && e.priAdd === "Y") &&
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <div>
                  <StockoutForm />
                </div>
                <div>
                  <StockoutTable />
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>}
      </TabPanel>
      <TabPanel>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <StockoutMaster />
            </Grid.Column>
            <Grid.Column>
              <StockoutDetail />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </TabPanel>
      <TabPanel>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <div>
                <StockSummaryMUIT />
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </TabPanel>
      {/* <TabPanel>
        <Grid>
          <Grid.Row>
          </Grid.Row>
        </Grid>
      </TabPanel> */}


    </Tabs>
  );
};
