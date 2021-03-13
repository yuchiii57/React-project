import React,{ useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { CTX } from "../Store";
import {
  Form,
  Container,
  Input,
  Select,
  TextArea, Label
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";



const employeeQ = gql`
  query($empId: String) {
    employee(empId: $empId) {
      empId
      empNm
      contact01
      contactTel01
      contact02
      contactTel02
     

    }
  }
`;


export default () => {
  

  const [appState] = React.useContext(CTX);
  const { data, loading, error } = useQuery(employeeQ, {
    variables: { empId: appState.empId },
    pollInterval: 500
  });
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>發生錯誤了</div>;
  }

  const empData = data.employee;
 

return (
  <Container style={{ margin: 20 }}>
    <Form >
      <Form.Group>
        <Form.Field
          label="員工編號"
          name="empId"
          value={empData.empId}
          control={Input}
          readOnly={"readOnly"}
          inline
        />
        <Form.Field
          label="員工姓名"
          name="empNm"
          value={empData.empNm}
          control={Input}
          readOnly={"readOnly"}
          inline
        />
           <Form.Field
          label="緊急聯絡人01"
          name="contact01"
          value={empData.contact01}
          control={Input}
          readOnly={"readOnly"}
          inline
        />
        <Form.Field
          label="緊急聯絡人電話01"
          name="contactTel01"
          value={empData.contactTel01}
          control={Input}
          readOnly={"readOnly"}
          inline
        />
        
        </Form.Group>
        <Form.Group>
        <Form.Field
            label="緊急聯絡人02"
            name="contact02"
            value={empData.contact02}
            control={Input}
            readOnly={"readOnly"}
            inline
          />
          <Form.Field
          label="緊急聯絡人電話02"
          name="contactTel02"
          value={empData.contactTel02}
          control={Input}
          readOnly={"readOnly"}
          inline
        />
        
       
        </Form.Group>
     
        </Form>
    </Container>
  );
}
