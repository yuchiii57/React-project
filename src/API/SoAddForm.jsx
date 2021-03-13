import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { CTX } from "../Store";
import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  decrement,
  setCapacity,
  setStationno,
  setTotalGenEnergy,
  setCarbonReduction,
  setLogged,
  setUserName,
  setPrivilege,
  setInvoice,
  setSoInvoice,
  setSoAmount,
  setSoId
} from "../actions";
import "./So.css";
import moment from "moment";
import {
  Form,
  Container,
  Input,
  Select,
  Button,
  TextArea,
  Checkbox,
  Dropdown,
  Grid
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import ReceiptModal from "./ReceiptModal";
import BarcodeTest from "./BarcodeTest";
import BarcodeDemo from "./BarcodeDemo";

const createSoDetailM = gql`
  mutation(
    $soId: String
    $soDate: String
    $productId: String
    $productNm: String
    $price: String
    $qty: String
    $memo: String
    $createDT: String
    $createEmp: String
  ) {
    createSoDetail(
      soId: $soId
      soDate: $soDate
      productId: $productId
      productNm: $productNm
      price: $price
      qty: $qty
      memo: $memo
      createDT: $createDT
      createEmp: $createEmp
    ) {
      soId
      soDate
      productId
      productNm
      price
      qty
      memo
      createDT
      createEmp
    }
  }
`;

const SoM = gql`
  mutation(
    $soId: String
    $soDate: String
    $soInvoiceNo: String
    $createDT: String
    $createEmp: String
    $soAmount: Float
    $customerId: String
    $customerNm: String
    $receiptTitle: String
    $invoiceNo: String
    $status: String
    $memo: String
  ) {
    upsertSo(
      soId: $soId
      soDate: $soDate
      soInvoiceNo: $soInvoiceNo
      createDT: $createDT
      createEmp: $createEmp
      soAmount: $soAmount
      customerId: $customerId
      customerNm: $customerNm
      receiptTitle: $receiptTitle
      invoiceNo: $invoiceNo
      status: $status
      memo: $memo
    ) {
      soId
      soDate
      soInvoiceNo
      createDT
      createEmp
      soAmount
      customerId
      customerNm
      receiptTitle
      invoiceNo
      status
      memo
    }
  }
`;

const productQ = gql`
  query($first: Int) {
    products(first: $first) {
      productId
      productNm
      spec
      unit
      price
    }
    customers(first: $first) {
      customerId
      customerNm
      invoiceNo
    }
    soes(first: $first) {
      soId
      soDate
    }
  }
`;

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3)
  },
  group: {
    flexDirection: "row",
    justifyContent: "flex-start"
  }
}));

const options02 = [
  { key: "1", text: "香  園 00968888", value: "00968888" },
  { key: "2", text: "烘培坊 98999793 ", value: "98999793" }
];

export default () => {
  const [appState, updateState] = React.useContext(CTX);
  const dispatch = useDispatch();
  const soAmount = useSelector(state => state.soAmount);

  const userName = useSelector(state => state.userName);
  const [createDT, setCreateDT] = useState(moment().format("YYYY-MM-DD"));
  const createEmp = useSelector(state => state.userName);
  const setCreateEmp = useState("");
  const [DT, setDT] = useState(moment().format("YYYYMMDD"));
  const [customerId, setCustomerId] = useState("");
  const [customerNm, setCustomerNm] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [soId, setSoId2] = useState("");
  const [soDate, setSoDate] = useState(moment().format("YYYY-MM-DD"));
  const [soInvoiceNo, setSoInvoiceNo] = useState("");
  const [productId, setProductId] = useState("");
  const [productNm, setProductNm] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("1");
  const [memo, setMemo] = useState("");
  const [receiptTitle, setReceiptTitle] = useState("");
  const [status, setStatus] = useState("");
  const [onCreateSoDetailM] = useMutation(createSoDetailM, {
    variables: {
      soId,
      soDate,
      productId,
      productNm,
      price,
      qty,
      memo,
      createDT,
      createEmp
    },
    update: (proxy, mutationResult) => {
      // console.log(mutationResult);
      // alert("新增成功");
    }
  });

  const [onSoM] = useMutation(SoM, {
    variables: {
      soId,
      soDate,
      soInvoiceNo,
      createDT,
      createEmp,
      soAmount: soAmount + Number(price) * Number(qty),
      customerId,
      customerNm,
      receiptTitle,
      invoiceNo,
      status,
      memo
    },
    update: (proxy, mutationResult) => {
      // console.log(mutationResult);
      // alert("新增成功");
    }
  });

  const { data, loading, error, refetch, networkStatus } = useQuery(productQ, {
    variables: { first: 99999 }
  });

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>發生錯誤了</div>;
  }
  if (networkStatus === 4) {
    return <div>等待資料中…</div>;
  }

  const options00 = data.products.map((product, value, text, index) => {
    return {
      key: index,
      value: product.productId,
      text: product.productId + "/" + product.productNm + "/" + product.price
    };
  });

  const options01 = data.customers.map((customer, value, text, index) => {
    return {
      key: index,
      value: customer.customerId,
      text:
        customer.customerId +
        "/" +
        customer.customerNm +
        "/" +
        customer.invoiceNo
    };
  });

  const handleSubmit = e => {
    // e.preventDefault();

    console.log("handleSubmit");
    onSoM();
    onCreateSoDetailM();
    setProductId("");
    setProductNm("");
    setPrice("");
    setQty("1");
    setMemo("");
  };

  const handleClick = () => {
    setSoId2("SO" + getSequenceId(DT));
    dispatch(setSoId("SO" + getSequenceId(DT)));
  };

  const handleClickAdd = () => {
    dispatch(setSoId(""));
    dispatch(setInvoice(""));
    setCustomerId("");
    setCustomerNm("");
    setInvoiceNo("");
    setQty("1");
    setMemo("");
    refetch();
  };

  const getSequenceId = prefix => {
    const sequence = data.soes.length;
    return (
      prefix +
      (sequence + 1).toLocaleString("en-US", {
        minimumIntegerDigits: 6,
        useGrouping: false
      })
    );
  };

  const handleClickClear = () => {
    setSoId("");
    dispatch(setInvoice(""));
    setSoInvoice("");
    setCustomerId("");
    setCustomerNm("");
    setInvoiceNo("");
    setProductId("");
    setProductNm("");
    setPrice("");
    setQty("1");
    setMemo("");
  };

  return (
    <Container style={{ margin: 20, padding: 20 }}>
      <BarcodeTest />
      <BarcodeDemo />
      <Form onSubmit={handleSubmit}>
        {/* <Form.Group> */}
        <div>
          <Form.Field
            label="開立單位"
            name="soInvoiceNo"
            value={soInvoiceNo}
            control={Select}
            options={options02}
            search
            onChange={(e, { value }) => {
              setSoInvoiceNo(value);
              dispatch(setSoInvoice(value));
            }}
            inline
            required
          />
          <Form.Field
            label="客戶編號"
            name="customerId"
            value={customerId}
            control={Select}
            options={options01}
            search
            onChange={(e, { value }) => {
              setCustomerId(value);
              setCustomerNm(
                e.target.textContent.substr(
                  e.target.textContent.indexOf("/") + 1,
                  e.target.textContent.lastIndexOf("/") -
                  e.target.textContent.indexOf("/") -
                  1
                )
              );
              setInvoiceNo(
                e.target.textContent.substr(
                  e.target.textContent.lastIndexOf("/") + 1,
                  20
                )
              );
              dispatch(
                setInvoice(
                  e.target.textContent.substr(
                    e.target.textContent.lastIndexOf("/") + 1,
                    20
                  )
                )
              );
            }}
            inline
          />
          <Form.Field
            label="客戶名稱"
            name="customerNm"
            value={customerNm}
            control={Input}
            inline
          />
          <Form.Field
            label="統編"
            name="invoiceNo"
            value={invoiceNo}
            control={Input}
            inline
          />
        </div>
        <br />
        {/* </Form.Group>
        <Form.Group> */}
        <div>
          {/* <Form.Field
            label="產品編號"
            name=""
            value={"d"}
            control={Select}
            options={options00}
            search
            onChange={(e, { value }) => {
              setProductId(value);
              console.log("fuck canny everyday", value, productId);
              setProductNm(
                e.target.textContent.substr(
                  e.target.textContent.indexOf("/") + 1,
                  e.target.textContent.lastIndexOf("/") -
                    e.target.textContent.indexOf("/") -
                    1
                )
              );
              setPrice(
                e.target.textContent.substr(
                  e.target.textContent.lastIndexOf("/") + 1,
                  20
                )
              );
            }}
            inline
            required
          /> */}
          <Form.Field
            label="料號測試"
            name="productId"
            value={productId}
            control={Input}
            inline
            required
            onChange={e => {
              setProductId(e.target.value);
            }}
          />
          <Form.Field
            label="產品名稱"
            name="productNm"
            value={productNm}
            control={Input}
            inline
            required
          />
          <Form.Field
            label="單價"
            name="price"
            value={price}
            control={Input}
            inline
            required
          />
          {/* </Form.Group> */}
          <Form.Field
            label="數量"
            name="qty"
            value={qty}
            control={Input}
            type="number"
            inline
            required
            onChange={e => {
              setQty(e.target.value);
            }}
          />
        </div>
        <br />
        <Form.Button content="新增" onClick={handleClick} />
        <Form.Button content="清除" onClick={handleClickClear} />
        <Form.Button content="新增收據" onClick={handleClickAdd} />
      </Form>
      <br />
      {/* <Form.Button content="新增收據" onClick={handleClickAdd} /> */}
      <br />
      <Form>
        <ReceiptModal />
      </Form>
    </Container>
  );
};
