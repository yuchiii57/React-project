import React from "react";
import {
  Grid
} from "semantic-ui-react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import StockinForm from "./StockinForm";
import "../../index.css";
import StockinTable from "./StockinTable";
import StockinMaster from "./StockinSearch/StockinMasterMUIT";
import StockinDetail from "./StockinSearch/StockinDetailTable";
import StockSummaryMUIT from "../../Stock/StockSummary/StockSummaryMUIT";

import { useSelector } from "react-redux";

export default () => {

  const privilege = useSelector(state => state.privilege);

  return (
    <Tabs>
      <TabList>
        <Tab>產品入庫</Tab>
        <Tab>入庫查詢</Tab>
        <Tab>庫存查詢</Tab>
      </TabList>
      <TabPanel>
        {privilege.some(e => e.program === "stockin" && e.priAdd === "Y") &&
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <div>
                  <StockinForm />
                </div>
                <div>
                  <StockinTable />
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>}
      </TabPanel>
      <TabPanel>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <StockinMaster />
            </Grid.Column>
            <Grid.Column>
              <StockinDetail />
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
    </Tabs>
  );
};
