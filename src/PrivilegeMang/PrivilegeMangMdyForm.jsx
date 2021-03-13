import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { CTX } from "../Store";
import moment from "moment";

import {
  Form,
  Container,
  Input,
  Select,
  Button,
  TextArea,
  Checkbox,
  Dropdown
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";


const updatePrivilegeMang = gql`
  mutation(
    $ID:String
      $program:String
      $empId:String
      $privilege:String
      $priAdd:String
      $priMdy:String
      $priDel:String
      $memo:String
      $empNm:String
      $updateDT:String
      $updateType:String
      $createDT:String
      $createEmp:String

    
  ) {
    updatePrivilegeMang(
      ID:$ID
      program:$program
      empId:$empId
      privilege:$privilege
      priAdd:$priAdd
      priMdy:$priMdy
      priDel:$priDel
      memo:$memo
      empNm:$empNm
      updateDT:$updateDT
      updateType:$updateType
      createDT:$createDT
      createEmp:$createEmp

    ) {
      ID,
      program,
      empId,
      privilege,
      priAdd,
      priMdy,
      priDel,
      memo,
      empNm,
      updateDT,
      updateType,
      createDT,
      createEmp

    }
  }
`;


const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
  },
  group: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  }
}));



export default props => {
const [appState, updateState] = React.useContext(CTX);
 // const classes = useStyles();
const [value, setValue] = React.useState("");

const [ID, setID] = useState(props.priData.ID);  //設定欄位
const [program, setProgram] = useState(props.priData.program);
const [empId, setEmpId] = useState(props.priData.empId);
const [privilege, setPrivilege] = useState(props.priData.privilege);
const [priAdd, setPriAdd] = useState(props.priData.priAdd);
const [priMdy, setPriMdy] = useState(props.priData.priMdy);
const [priDel, setPriDel] = useState(props.priData.priDel);
const [memo, setMemo] = useState(props.priData.memo);
const [empNm, setEmpNm] = useState(props.priData.empNm);
const [updateDT, setUpdateDT] = useState(moment().format("YYYY-MM-DD"));
const [updateType, setUpdateType] = useState("");
//const [createDT, setCreateDT] = useState(moment().format("YYYY-MM-DD"));
//const [createEmp, setCreateEmp] = useState(""); 

const options01 = [
  { key: "1", text: "Full", value: "Full" },
  { key: "2", text: "Read", value: "Read" }
];



  const [onUpdateEmpMdyForm] = useMutation(updatePrivilegeMang, {
    variables: {
      ID,
      program,
      empId,
      privilege,
      priAdd,
      priMdy,
      priDel,
      memo,
      empNm,
      updateDT,
      updateType,
      //createDT,
      //createEmp

    },
    update: (proxy, mutationResult) => {
      console.log(mutationResult);
      alert("修改成功");
    }
  });

  const handleSubmit = e => {
    e.preventDefault();
    if(privilege === "Full"){
      setPriAdd("Add");
      setPriMdy("Mdy");
      setPriDel("Del");
    }
    if(privilege === "Read"){
      setPriAdd("0");
      setPriMdy("0");
      setPriDel("0");
    }
    onUpdateEmpMdyForm();
    setEmpId("");
    setProgram("");
    setEmpId("");
    setPrivilege("");
    setPriAdd("");
    setPriMdy("");
    setPriDel("");
    setMemo("");
    setEmpNm("");
    setUpdateDT("");
    setUpdateType("");
    //setCreateDT("");
    //setCreateEmp("");
  };

  return (
    <Container style={{ margin: 20 }}>
      <Form onSubmit={handleSubmit}>
      <Form.Group>
          <Form.Field
            label="程式名稱"
            name="program"
            value={program}
            control={Input}
            inline
            onChange={e => {
              setProgram(e.target.value);
            }}
            required
          />
          <Form.Field
            label="員工編號"
            name="empId"
            value={empId}
            control={Input}
            inline
            // onChange={e => {
            //   setEmpId(e.target.value);
            //}}不更改員工編號 要的話刪除再新增
          />
           <Form.Field
            label="員工姓名"
            name="empNm"
            value={empNm}
            control={Input}
            inline
             onChange={e => {
              setEmpNm(e.target.value);
             }}
          />
          <Form.Field
            label="權限"
            name="privilege"
            select={privilege}
            value={privilege}
            control={Select}
            // className={classes.gender}
            options={options01}
            onChange={(e, { value }) => {
              setPrivilege(value);
            }}
            inline
          />
        </Form.Group>
        {/* <Form.Group>
        <Checkbox
            label="新增"
            name="priAdd"
            value={priAdd}
            checked={priAdd}
            control={Input}
            inline
          />
           <Checkbox
            label="修改"
            name="priMdy"
            value={priMdy}
            checked={priMdy}
            control={Input}
            inline
          />
          <Checkbox
            label="刪除"
            name="priDel"
            value={priDel}
            checked={priDel}
            control={Input}
            inline
          />
        </Form.Group> */}
        <Form.Group>
          <Form.Field
            label="註記"
            name="memo"
            value={memo}
            control={Input}
            inline
            onChange={e => {
              setMemo(e.target.value);
            }}
          />
         
        </Form.Group>
        
        <Form.Button content="儲存" />
      </Form>
    </Container>
  );
}       