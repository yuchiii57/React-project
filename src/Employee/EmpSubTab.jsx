import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import PrivilegeEmpMUIT from "./PrivilegeEmpMUIT"
import EmpEmpForm from "./EmpEmpForm"
import EmpEduForm from "./EmpEduForm"
import EmpContactForm from "./EmpContactForm"


export default () => {
  return (
    <Tabs>
      <TabList>
        <Tab>基本資料</Tab>
        <Tab>聯絡人資料</Tab>
        <Tab>學經歷</Tab>
        <Tab>權限</Tab>
      </TabList>
      <TabPanel>
        <EmpEmpForm/>
      </TabPanel>
      <TabPanel>
         <EmpContactForm  />
          
      </TabPanel>
      <TabPanel>
        <EmpEduForm />
         
      </TabPanel>
      <TabPanel>
        {/* <Grid>
           <Grid.Row>  */}
        <PrivilegeEmpMUIT />
        {/* </Grid.Row> 
        </Grid> */}
      </TabPanel>

    </Tabs>
  );
};
