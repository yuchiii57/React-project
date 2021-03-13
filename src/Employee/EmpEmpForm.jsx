import React,{ useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { CTX } from "../Store";
import {
  Form,
  Container,
  Input,
  Label, Select
} from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import { options } from "date-fns/locale/af";
// import { Label } from "@material-ui/icons";


const employeeQ = gql`
  query($empId: String) {
    employee(empId: $empId) {
      empId
      empNm
      gender
      birth
      age
      marriage
      residenceAddr
      contactTel
      cellphone
      depManager
      privateEmail
      officialEmail

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
            label="性別"
            name="gender"
            value={empData.gender}
            control={Input}
            readOnly={"readOnly"}
            inline
          />
           <Form.Field
          label="生日"
          name="birth"
          value={empData.birth}
          control={Input}
          readOnly={"readOnly"}
          inline
        />
        </Form.Group>
        <Form.Group>
       
        <Form.Field
          label="年齡"
          name="age"
          value={empData.age}
          control={Input}
          readOnly={"readOnly"}
          inline
        />
         <Form.Field
          label="婚姻狀況"
          name="marriage"
          value={empData.marriage}
          control={Input}
          readOnly={"readOnly"}
          inline
        /> 
       <Form.Field
            label="戶籍地址"
            name="residenceAddr"
            value={empData.residenceAddr}
            control={Input}
            readOnly={"readOnly"}
            inline
          />
           <Form.Field
          label="通訊地址"
          name="contactAddr"
          value={empData.contactAddr}
          control={Input}
          readOnly={"readOnly"}
          inline
        />
      </Form.Group>
      <Form.Group>
      <Form.Field
          label="連絡電話"
          name="contactTel"
          value={empData.contactTel}
          control={Input}
          readOnly={"readOnly"}
          inline
        />
        <Form.Field
            label="手機號碼"
            name="cellphone"
            value={empData.cellphone}
            control={Input}
            readOnly={"readOnly"}
            inline
          />
           <Form.Field
          label="私人電子信箱"
          name="privateEmail"
          value={empData.privateEmail}
          control={Input}
          readOnly={"readOnly"}
          inline
        />
        <Form.Field
            label="公務電子信箱"
            name="officialEmail"
            value={empData.officialEmail}
            control={Input}
            readOnly={"readOnly"}
            inline
          />
      </Form.Group>
        </Form>
    </Container>
  );
}