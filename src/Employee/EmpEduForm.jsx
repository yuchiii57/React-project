import React,{ useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { CTX } from "../Store";
import {
  Form,
  Container,
  Input,

} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const employeeQ = gql`
  query($empId: String) {
    employee(empId: $empId) {
      empId
      empNm
      school
      subject
      license01
      license02
      license03

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
            label="畢業學校"
            name="school"
            value={empData.school}
            control={Input}
            readOnly={"readOnly"}
            inline
          />
           <Form.Field
          label="畢業科系"
          name="subject"
          value={empData.subject}
          control={Input}
          readOnly={"readOnly"}
          inline
        />
        </Form.Group>
        <Form.Group>
       
        <Form.Field
          label="證照01"
          name="license01"
          value={empData.license01}
          control={Input}
          readOnly={"readOnly"}
          inline
        />
         <Form.Field
          label="證照02"
          name="license02"
          value={empData.license02}
          control={Input}
          readOnly={"readOnly"}
          inline
        /> <Form.Field
        label="證照03"
        name="license03"
        value={empData.license03}
        control={Input}
        readOnly={"readOnly"}
        inline
      />
      </Form.Group>
        </Form>
    </Container>
  );
};
