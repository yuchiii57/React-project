import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import {
  Form,
  Container,
  Input,
  Select,
  TextArea
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { useSelector } from "react-redux";
import moment from "moment";

const updateEmployee = gql`
  mutation(
     # 宣告欄位
      $empId: String
      $empNm: String
      $dep: String
      $depNm: String
      $title: String
      $gender: String
      $ext: String
      $attendanceClass: String
      $fullorPartTime: String
      $status: String
      $createDT: String
      $createEmp: String
      $updateDT: String
      $updateEmp: String
      $updateType: String
      $age: Int
      $birth: String
      $empIdNo: String
      $marriage: String
      $school: String
      $subject: String
      $residenceAddr: String
      $contactAddr: String
      $contactTel: String
      $cellphone: String  
      $contact01: String
      $contactTel01: String
      $contact02: String
      $contactTel02: String
      $privateEmail: String
      $officialEmail: String
      $license01: String
      $license02: String
      $license03: String
      $lineManager: String
      $depManager: String
      $deputy: String
      $resignDT: String
      $memo: String
    
  ) {
    updateEmployee(
      empId: $empId
      empNm: $empNm
      dep: $dep
      depNm: $depNm
      title: $title
      gender: $gender
      ext: $ext
      attendanceClass: $attendanceClass
      fullorPartTime: $fullorPartTime
      status: $status
      createDT: $createDT
      createEmp: $createEmp
      updateDT: $updateDT
      updateEmp: $updateEmp
      updateType: $updateType
      age: $age
      birth: $birth
      empIdNo: $empIdNo
      marriage: $marriage
      school: $school
      subject: $subject
      residenceAddr: $residenceAddr
      contactAddr: $contactAddr
      contactTel: $contactTel
      cellphone: $cellphone
      contact01: $contact01
      contactTel01: $contactTel01
      contact02: $contact02
      contactTel02: $contactTel02
      privateEmail: $privateEmail
      officialEmail: $officialEmail
      license01: $license01
      license02: $license02
      license03: $license03
      lineManager: $lineManager
      depManager: $depManager
      deputy: $deputy
      resignDT: $resignDT
      memo: $memo

    ) {
      empId
      empNm
      depNm
      dep
      title
      gender
      ext
      attendanceClass
      fullorPartTime
      status
      createDT
      createEmp
      updateDT
      updateEmp
      updateType
      age
      birth
      empIdNo
      marriage
      school
      subject
      residenceAddr
      contactAddr
      contactTel
      cellphone 
      contact01
      contactTel01
      contact02
      contactTel02
      privateEmail
      officialEmail
      license01
      license02
      license03
      lineManager
      depManager
      deputy
      resignDT
      memo
  
    }
  }
`;

const options01 = [
  { key: "1", text: "男", value: "男" },
  { key: "2", text: "女", value: "女" }
];
const options02 = [
  { key: "1", text: "全職", value: "全職" },
  { key: "2", text: "兼職", value: "兼職" }
];
const options03 = [
  { key: "1", text: "日", value: "日" },
  { key: "2", text: "夜", value: "夜" }
];
const options04 = [
  { key: "1", text: "在職", value: "在職" },
  { key: "2", text: "離職", value: "離職" }
];

//婚姻狀況
const options05 = [
  { key: "未婚", text: "未婚", value: "未婚" },
  { key: "已婚", text: "已婚", value: "已婚" },
  { key: "分居", text: "分居", value: "分居" },
  { key: "離婚", text: "離婚", value: "離婚" },
  { key: "喪偶", text: "喪偶", value: "喪偶" }
];

//部門
const options06 = [
  { key: "1", text: "", value: "" },
  { key: "院長室", text: "院長室", value: "院長室" },
  { key: "專業服務部", text: "專業服務部", value: "專業服務部" },
  { key: "行政管理部", text: "行政管理部", value: "行政管理部" }
];

//組別
const options07 = [
  { key: "1", text: "", value: "" },
  { key: "護理組", text: "專業服務部-護理組", value: "護理組" },
  { key: "社工組", text: "專業服務部-社工組", value: "社工組" },
  { key: "教保組", text: "專業服務部-教保組", value: "教保組" },
  { key: "生活服務組", text: "專業服務部-生活服務組", value: "生活服務組" },
  { key: "外展推廣組", text: "專業服務部-外展推廣組", value: "外展推廣組" },
  { key: "行政組", text: "行政管理部-行政組", value: "行政組" },
  { key: "總務組", text: "行政管理部-總務組", value: "總務組" }
];

export default props => {
  const [empId, setEmpId] = useState(props.empData.empId); //帶欄位 
  const [empNm, setEmpNm] = useState(props.empData.empNm);
  const [dep, setDep] = useState(props.empData.dep);
  const [depNm, setDepNm] = useState(props.empData.depNm);
  const [title, setTitle] = useState(props.empData.title);
  const [gender, setGender] = useState(props.empData.gender);
  const [ext, setExt] = useState(props.empData.ext);
  const [attendanceClass, setAttendanceClass] = useState(props.empData.attendanceClass);
  const [fullorPartTime, setFullorPartTime] = useState(props.empData.fullorPartTime);
  const [status, setStatus] = useState(props.empData.status);
  const updateEmp = useSelector(state => state.userName);
  const [updateDT] = useState(moment().format("YYYY-MM-DD"));
  const [updateType] = useState("修改");
  const [age, setAge] = useState(props.empData.age);
  const [birth, setBirth] = useState(props.empData.birth);
  const [empIdNo, setEmpIdNo] = useState(props.empData.empIdNo);
  const [marriage, setMarriage] = useState(props.empData.marriage);
  const [school, setSchool] = useState(props.empData.school);
  const [subject, setSubject] = useState(props.empData.subject);
  const [residenceAddr, setResidenceAddr] = useState(props.empData.residenceAddr);
  const [contactAddr, setContactAddr] = useState(props.empData.contactAddr);
  const [contactTel, setContactTel] = useState(props.empData.contactTel);
  const [cellphone, setCellphone] = useState(props.empData.cellphone);
  const [contact01, setContact01] = useState(props.empData.contact01);
  const [contactTel01, setContactTel01] = useState(props.empData.contactTel01);
  const [contact02, setContact02] = useState(props.empData.contact02);
  const [contactTel02, setContactTel02] = useState(props.empData.contactTel02);
  const [privateEmail, setPrivateEmail] = useState(props.empData.privateEmail);
  const [officialEmail, setOfficialEmail] = useState(props.empData.setOfficialEmail);
  const [license01, setLicense01] = useState(props.empData.license01);
  const [license02, setLicense02] = useState(props.empData.license02);
  const [license03, setLicense03] = useState(props.empData.license03);
  const [lineManager, setLineManager] = useState(props.empData.lineManager);
  const [depManager, setDepManager] = useState(props.empData.depManager);
  const [deputy, setDeputy] = useState(props.empData.deputy);
  const [resignDT, setResignDT] = useState(props.empData.resignDT);
  const [memo, setMemo] = useState(props.empData.memo);

  const [onUpdateEmpMdyForm] = useMutation(updateEmployee, {
    variables: {
      empId,
      empNm,
      dep,
      depNm,
      title,
      gender,
      ext,
      attendanceClass,
      fullorPartTime,
      status,
      updateEmp,
      updateDT,
      updateType,
      age: parseInt(moment(resignDT).format('YYYY') - moment(birth).format('YYYY')),
      birth,
      empIdNo,
      marriage,
      school,
      subject,
      residenceAddr,
      contactAddr,
      contactTel,
      cellphone,
      contact01,
      contactTel01,
      contact02,
      contactTel02,
      privateEmail,
      officialEmail,
      license01,
      license02,
      license03,
      lineManager,
      depManager,
      deputy,
      resignDT,
      memo
    },
    update: (proxy, mutationResult) => {
      alert("修改成功");
    }
  });

  const handleSubmit = e => {
    e.preventDefault();

    onUpdateEmpMdyForm();
    setEmpId("");
    setEmpNm("");
    setDepNm("");
    setExt("");
    setGender("");
    setTitle("");
    setFullorPartTime("");
    setAttendanceClass("");
    setStatus("");
    setBirth("");
    setAge(0);
    setEmpIdNo("");
    setMarriage("");
    setSchool("");
    setSubject("");
    setCellphone("");
    setResidenceAddr("");
    setResignDT("");
    setContactAddr("");
    setContactTel("");
    setContact01("");
    setContactTel01("");
    setContact02("");
    setContactTel02("");
    setPrivateEmail("");
    setOfficialEmail("");
    setLicense01("");
    setLicense02("");
    setLicense03("");
    setLineManager("");
    setDepManager("");
    setDeputy("");
    setResignDT("");
    setMemo("");
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
            required
            inline
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
            required
          />
          <Form.Field
            label="性別"
            name="gender"
            value={gender}
            control={Select}
            options={options01}
            onChange={(e, { value }) => {
              setGender(value);
            }}
            inline
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Field
            label="年齡"
            name="age"
            value={age}
            control={Input}
            inline

          />
          <Form.Field
            label="出生日期"
            name="birth"
            value={birth}
            control={Input}
            type="date"
            inline
            onChange={e => {
              setBirth(e.target.value);
              if (isNaN(resignDT) && isNaN(birth)) {
                setAge(moment(resignDT).format('YYYY') - moment(birth).format('YYYY'));
              }
            }}
            required
          />
          <Form.Field
            label="身分證字號"
            name="empIdNo"
            value={empIdNo}
            control={Input}
            pattern="^[A-Z][12]\d{8}$"
            placeholder="輸入格式: A12345689"
            required
            onChange={e => {
              setEmpIdNo(e.target.value);
            }}
            required
            inline
          />
        </Form.Group>
        <Form.Group>
          <Form.Field
            label="婚姻狀況"
            name="marriage"
            value={marriage}
            control={Select}
            options={options05}
            inline
            onChange={(e, { value }) => {
              setMarriage(value);
            }}
          />
          <Form.Field
            label="畢業學校"
            name="school"
            value={school}
            control={Input}
            inline
            onChange={e => {
              setSchool(e.target.value);
            }}
          />
          <Form.Field
            label="科系"
            name="subject"
            value={subject}
            control={Input}
            onChange={e => {
              setSubject(e.target.value);
            }}
            inline
          />
        </Form.Group>
        <hr />
        <Form.Group>
          <Form.Field
            label="連絡電話"
            name="contactTel"
            value={contactTel}
            control={Input}
            placeholder="輸入格式: 02-12345678"
            title="輸入格式: 02-12345678"
            onChange={e => {
              setContactTel(e.target.value);
            }}
            inline
          />
          <Form.Field
            label="手機"
            name="cellphone"
            value={cellphone}
            control={Input}
            placeholder="輸入格式: 0912345678"
            title="輸入格式: 0912345678"
            pattern="09\d{8}$"
            inline
            required
            onChange={e => {
              setCellphone(e.target.value);
            }}

          />
        </Form.Group>
        <Form.Group>
          <Form.Field
            label="聯絡人01"
            name="contact01"
            value={contact01}
            control={Input}
            inline
            onChange={e => {
              setContact01(e.target.value);
            }}
            required
          />
          <Form.Field
            label="聯絡人電話01"
            name="contactTel01"
            value={contactTel01}
            control={Input}
            placeholder="輸入格式: 02-12345678"
            title="輸入格式: 02-12345678"
            onChange={e => {
              setContactTel01(e.target.value);
            }}
            required
            inline
          />
        </Form.Group>
        <Form.Group>
          <Form.Field
            label="聯絡人02"
            name="contact02"
            value={contact02}
            control={Input}
            inline
            onChange={e => {
              setContact02(e.target.value);
            }}
          />
          <Form.Field
            label="聯絡人電話02"
            name="contactTel02"
            value={contactTel02}
            control={Input}
            placeholder="輸入格式: 02-12345678"
            title="輸入格式: 02-12345678"
            inline
            onChange={e => {
              setContactTel02(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Field
            label="戶籍地址"
            name="residenceAddr"
            value={residenceAddr}
            control={Input}
            width={6}
            inline
            onChange={e => {
              setResidenceAddr(e.target.value);
            }}
            required
          />
          <Form.Field
            label="通訊地址"
            name="contactAddr"
            value={contactAddr}
            control={Input}
            width={6}
            inline
            onChange={e => {
              setContactAddr(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Field
            label="個人信箱"
            name="privateEmail"
            value={privateEmail}
            control={Input}
            width={6}
            type="email"
            placeholder="輸入格式: abc@aaa.bbb"
            title="輸入格式: abc@aaa.bbb"
            pattern="^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]"
            onChange={e => {
              setPrivateEmail(e.target.value);
            }}
            inline
          />
          <Form.Field
            label="公務信箱"
            name="officialEmail"
            value={officialEmail}
            control={Input}
            width={6}
            type="email"
            placeholder="輸入格式: abc@aaa.bbb"
            title="輸入格式: abc@aaa.bbb"
            pattern="^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]"
            onChange={e => {
              setOfficialEmail(e.target.value);
            }}
            inline
          />
        </Form.Group>
        <hr />
        <Form.Group>
          <Form.Field
            label="證照01"
            name="license"
            value={license01}
            control={Input}
            inline
            onChange={e => {
              setLicense01(e.target.value);
            }}
          />
          <Form.Field
            label="證照02"
            name="license02"
            value={license02}
            control={Input}
            onChange={e => {
              setLicense02(e.target.value);
            }}
            inline
          />
          <Form.Field
            label="證照03"
            name="license03"
            value={license03}
            control={Input}
            onChange={e => {
              setLicense03(e.target.value);
            }}
            inline
          />
        </Form.Group>
        <hr />
        <Form.Group>
          <Form.Field
            label="到職日"
            name="resignDT"
            value={resignDT}
            control={Input}
            type="date"
            inline
            onChange={e => {
              setResignDT(e.target.value);
              if (isNaN(resignDT) && isNaN(birth)) {
                setAge(moment(resignDT).format('YYYY') - moment(birth).format('YYYY'));
              }
            }}
            required
          />
          <Form.Field
            label="部門"
            name="dep"
            value={dep}
            control={Select}
            options={options06}
            inline
            onChange={(e, { value }) => {
              setDep(value);
            }}
          />
          <Form.Field
            label="組別"
            name="depNm"
            value={depNm}
            control={Select}
            options={options07}
            inline
            onChange={(e, { value }) => {
              setDepNm(value);
            }}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Field
            label="職稱"
            name="title"
            value={title}
            control={Input}
            inline
            onChange={e => {
              setTitle(e.target.value);
            }}
            required
          />
          <Form.Field
            label="分機"
            name="ext"
            value={ext}
            control={Input}
            inline
            onChange={e => {
              setExt(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Field
            label="班別"
            name="attendanceClass"
            value={attendanceClass}
            control={Select}
            options={options03}
            search
            onChange={(e, { value }) => {
              setAttendanceClass(value);
            }}
            inline
          />
          <Form.Field
            label="全/兼職"
            name="fullorPartTime"
            value={fullorPartTime}
            control={Select}
            options={options02}
            search
            onChange={(e, { value }) => {
              setFullorPartTime(value);
            }}
            inline
            required
          />
          <Form.Field
            label="狀態"
            name="status"
            value={status}
            control={Select}
            options={options04}
            search
            onChange={(e, { value }) => {
              setStatus(value);
            }}
            inline
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Field
            label="直屬主管"
            name="lineManager"
            value={lineManager}
            control={Input}
            inline
            onChange={e => {
              setLineManager(e.target.value);
            }}
          />
          <Form.Field
            label="單位主管"
            name="depManager"
            value={depManager}
            control={Input}
            onChange={e => {
              setDepManager(e.target.value);
            }}
            inline
          />
          <Form.Field
            label="職務代理人"
            name="deputy"
            value={deputy}
            control={Input}
            inline
            onChange={e => {
              setDeputy(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Field
          label="備註"
          name="memo"
          value={memo}
          control={TextArea}
          onChange={e => {
            setMemo(e.target.value);
          }}
          inline
        />
        <br />
        <Form.Button content="儲存" />
      </Form>
    </Container>
  );
}       