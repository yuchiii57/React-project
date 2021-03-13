import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import moment from "moment";
import { useSelector } from "react-redux";
import { CTX } from "../Store";
import {
  Form,
  Container,
  Input,
  Select
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const createPrivilegeMangM = gql`
  mutation(
    # 宣告欄位
      $program: String!
      $programNm: String!
      $empId: String!
      $empNm: String!
      $privilege: String!
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
    createPrivilegeMang(
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

const sysvarQ = gql`
  query($varName: String) {
    sysvars(varName: $varName) {
      varName
      varValue
      varItem
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

export default () => {
  const classes = useStyles();
  const [appState, updateState] = React.useContext(CTX);
  const [program, setProgram] = useState("");
  const [programNm, setProgramNm] = useState("");
  const [empId] = useState(appState.empId);
  const [privilege, setPrivilege] = useState("Read");
  const [priAdd, setPriAdd] = useState("N");
  const [priMdy, setPriMdy] = useState("N");
  const [priDel, setPriDel] = useState("N");
  const [priRead, setPriRead] = useState("Y");
  const [memo, setMemo] = useState("");
  const [empNm] = useState(appState.empNm);
  const [updateDT, setUpdateDT] = useState(moment().format("YYYY-MM-DD HH:mm:ss"));
  const [updateType, setUpdateType] = useState("新增");
  const [createDT, setCreateDT] = useState(moment().format("YYYY-MM-DD"));
  const createEmp = useSelector(state => state.userName); //抓登入cookie
  const updateEmp = useSelector(state => state.userName); //抓登入cookie  
  const { data, loading, error } = useQuery(sysvarQ, {
    variables: { varName: "程式名稱" },
  });

  const [onCreatePrivilegeMangM] = useMutation(createPrivilegeMangM, {
    variables: {
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
      updateDT,
      updateType,
      updateEmp,
      createDT,
      createEmp
    },
    update: (proxy, mutationResult) => {
      alert("新增成功");
    }
  });


  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>發生錯誤了</div>;
  }

  const options02 = data.sysvars.map((sysvar, index) => {
    return {
      key: index,
      value: sysvar.varValue,
      text: sysvar.varValue + "/" + sysvar.varItem
    };
  });


  const handleSubmit = e => {
    e.preventDefault();
    if (program === "") {
      alert("程式名稱不能空白");
      return;
    }
    if (privilege === "") {
      alert("權限不能空白!!");
      return;
    }
    onCreatePrivilegeMangM();
    setProgram("");
    setProgramNm("");
    setPrivilege("");
    setPriAdd("");
    setPriMdy("");
    setPriDel("");
    setPriRead("");
    setMemo("");
    //setUpdateDT("");
    setUpdateType("新增");
    //setCreateDT("");
    updateState({
      ...appState,
      isLevel01Clicked: false
    });
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
            label="程式名稱"  //要變成帶入程式名稱
            name="program"
            value={program}
            control={Select}
            options={options02}
            search
            onChange={(e, { value }) => {
              setProgram(value);
              setMemo(e.target.textContent.substr(e.target.textContent.lastIndexOf("/") + 1, 20));
              setProgramNm(e.target.textContent.substr(e.target.textContent.lastIndexOf("/") + 1, 20));
            }}
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