import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import moment from "moment";
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import {
  Form,
  Container,
  Input,
  Select
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";


const updatePrivilegeMang = gql`
  mutation(
      $ID: ID!
      $program: String
      $programNm: String
      $empId: String
      $empNm: String
      $privilege: String
      $priAdd: String
      $priMdy: String
      $priDel: String
      $priRead: String
      $memo: String
      $createDT: String
      $createEmp: String
      $updateEmp: String
      $updateDT: String
      $updateType: String
  ) {
    updatePrivilegeMang(
      ID: $ID
      program: $program
      programNm: $programNm
      empId: $empId
      empNm: $empNm
      privilege: $privilege
      priAdd: $priAdd
      priMdy: $priMdy
      priDel: $priDel
      priRead: $priRead
      memo: $memo
      createDT: $createDT
      createEmp: $createEmp
      updateEmp: $updateEmp
      updateDT: $updateDT
      updateType: $updateType
    ) {
      ID
      program
      programNm
      empId
      empNm
      privilege
      priAdd
      priMdy
      priDel
      priRead
      memo
      createDT
      createEmp
      updateEmp
      updateDT
      updateType
    }
  }
`;

const options01 = [
  { key: "1", text: "Full", value: "Full" },
  { key: "2", text: "Read", value: "Read" },
  { key: "3", text: "Partial", value: "Partial" }
];

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
    //labelPlacement: "start"
  },
  group: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  }
}));

export default props => {
  const classes = useStyles();
  const [ID] = useState(props.priData.ID);
  const [program, setProgram] = useState(props.priData.program);
  const [programNm, setProgramNm] = useState(props.priData.programNm);
  const [empId, setEmpId] = useState(props.priData.empId);
  const [empNm, setEmpNm] = useState(props.priData.empNm);
  const [privilege, setPrivilege] = useState(props.priData.privilege);
  const [priAdd, setPriAdd] = useState(props.priData.priAdd);
  const [priMdy, setPriMdy] = useState(props.priData.priMdy);
  const [priDel, setPriDel] = useState(props.priData.priDel);
  const [priRead, setPriRead] = useState(props.priData.priRead);
  const [memo, setMemo] = useState(props.priData.memo);
  const updateEmp = useSelector(state => state.userName); //抓登入cookie  
  const [updateDT, setUpdateDT] = useState(moment().format("YYYY-MM-DD HH:mm:ss"));
  const [updateType, setUpdateType] = useState("修改");

  const [onUpdatePrivilegeMang] = useMutation(updatePrivilegeMang, {
    variables: {
      ID,
      program,
      programNm,
      empId,
      privilege,
      priAdd,
      priMdy,
      priDel,
      priRead,
      memo,
      empNm,
      updateEmp,
      updateDT,
      updateType

    },
    update: (proxy, mutationResult) => {
      console.log(mutationResult);
      alert("修改成功");
    }
  });

  const handleSubmit = e => {
    e.preventDefault();
    if (privilege === "") {
      alert("權限不能空白!!");
      return;
    }

    onUpdatePrivilegeMang();
    setEmpId("");
    setProgram("");
    setProgramNm("");
    setPrivilege("");
    setPriAdd("");
    setPriMdy("");
    setPriDel("");
    setPriRead("");
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
            label="員工編號"
            name="empId"
            value={empId}
            control={Input}
            inline
            required
          />
          <Form.Field
            label="員工姓名"
            name="empNm"
            value={empNm}
            control={Input}
            inline
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Field
            label="程式"
            name="program"
            value={program}
            control={Input}
            inline
            required
          />
          <Form.Field
            label="程式名稱"
            name="programNm"
            value={programNm}
            control={Input}
            inline
            required
          />
          <Form.Field
            label="權限"
            name="privilege"
            value={privilege}
            control={Select}
            placeholder="權限不能空白"
            options={options01}
            onChange={(e, { value }) => {
              setPrivilege(value);
              {
                if (value === "Full") {
                  setPriAdd("Y");
                  setPriMdy("Y");
                  setPriDel("Y");
                  setPriRead("N");
                }
              };
              {
                if (value === "Read") {
                  setPriAdd("N");
                  setPriMdy("N");
                  setPriDel("N");
                  setPriRead("Y");
                }
              };
              {
                if (value === "Partial") {
                  setPriRead("N");
                }
              };
            }}
            inline
            required
          />
        </Form.Group>
        <FormControl>
          <Form.Group>
            <FormLabel >新增</FormLabel>
            <RadioGroup aria-label="priAdd"
              name="priAdd"
              checked={priAdd}
              value={priAdd}
              className={classes.group}
              onChange={(e) => {
                setPriAdd(e.target.value);
              }} >
              <FormControlLabel value="Y" control={<Radio />} label="是" />
              <FormControlLabel value="N" control={<Radio />} label="否" />
            </RadioGroup>
            <FormLabel>修改</FormLabel>
            <RadioGroup aria-label="priMdy"
              name="priMdy"
              checked={priMdy}
              value={priMdy}
              className={classes.group}
              onChange={(e) => {
                setPriMdy(e.target.value);
              }} >
              <FormControlLabel value="Y" control={<Radio />} label="是" />
              <FormControlLabel value="N" control={<Radio />} label="否" />
            </RadioGroup>
            <FormLabel>刪除</FormLabel>
            <RadioGroup aria-label="priDel"
              name="priDel"
              checked={priDel}
              value={priDel}
              className={classes.group}
              onChange={(e) => {
                setPriDel(e.target.value);
              }} >
              <FormControlLabel value="Y" control={<Radio />} label="是" />
              <FormControlLabel value="N" control={<Radio />} label="否" />
            </RadioGroup>
            <FormLabel>只有讀取權限</FormLabel>
            <RadioGroup aria-label="priRead"
              name="priRead"
              checked={priRead}
              value={priRead}
              className={classes.group}
              onChange={(e) => {
                setPriRead(e.target.value);
                {
                  if (e.target.value === "Y") {
                    setPrivilege("Read");
                    setPriAdd("N");
                    setPriMdy("N");
                    setPriDel("N");
                  }
                };
                {
                  if (e.target.value === "N") {
                    setPrivilege("");
                    setPriAdd("");
                    setPriMdy("");
                    setPriDel("");
                  }
                };
              }} >
              <FormControlLabel value="Y" control={<Radio />} label="是" />
              <FormControlLabel value="N" control={<Radio />} label="否" />
            </RadioGroup>
          </Form.Group>
        </FormControl >
        <Form.Field
          label="註記"
          name="memo"
          value={memo}
          control={Input}
          inline
          required
        />

        <Form.Button content="儲存" />
      </Form>
    </Container>
  );
}       