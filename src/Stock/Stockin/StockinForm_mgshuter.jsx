import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { CTX } from "../../Store";
import { useDispatch, useSelector } from "react-redux";
import { setStockinId, setProdictId } from "../../actions";
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
import BarcodeTest from "../../API/BarcodeTest";

const createStockM = gql`
  mutation(
    $stockId: String
    $productId: String
    $productNm: String
    $spec: String
    $expiredDays: Int
    $expiredDate: String
    $unit: String
    $price: Float
    $cost: Float
    $qty: Float
    $stockDate: String
    $type: String
    $status: String
    $memo: String
    $createDT: String
    $createEmp: String
  ) {
    createStock(
      stockId: $String
      productId: $String
      productNm: $String
      spec: $String
      expiredDays: $Int
      expiredDate: $String
      unit: $String
      price: $Float
      cost: $Float
      qty: $Float
      stockDate: $String
      type: $String
      status: $String
      memo: $String
      createDT: $String
      createEmp: $String
    ) {
      stockId
      productId
      productNm
      spec
      expiredDays
      expiredDate
      unit
      price
      cost
      qty
      stockDate
      type
      status
      memo
      createDT
      createEmp
    }
  }
`;

const StockinM = gql`
  mutation(
    $inDate: String
    $purpose: String
    $stockinId: String
    $status: String
    $memo: String
    $createDT: DateTime
    $createEmp: String
  ) {
    upsertStockin(
      inDate: $inDate
      purpose: $purpose
      stockinId: $stockinId
      status: $status
      memo: $memo
      createDT: $createDT
      createEmp: $createEmp
    ) {
      inDate
      purpose
      stockinId
      status
      memo
      createDT
      createEmp
    }
  }
`;

const productQ = gql`
  query($first: Int) {
    products(first: $first) {
      productDepKind
      productId
      productNm
      spec
      expiredDays
      unit
      price
      cost
      memo
    }
    stockins(first: $first) {
      stockinId
      inDate
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

export default () => {
  const [appState, updateState] = React.useContext(CTX);
  const dispatch = useDispatch();
  const userName = useSelector(state => state.userName);
  const productId = useSelector(state => state.productId);
  const productNm = useSelector(state => state.productNm);
  const [createDT, setCreateDT] = useState(moment().format("YYYY-MM-DD"));
  const createEmp = useSelector(state => state.userName);
  const setCreateEmp = useState("");
  const [DT, setDT] = useState(moment().format("YYYYMMDD"));

  const [inDate, setInDate] = useState("");
  const [purpose, setPurpose] = useState("");
  const [stockinId, setStockinId] = useState("");
  const [status, setStatus] = useState("");
  const [memo, setMemo] = useState("");

  const [stockId, setStockId] = useState("");

  const [spec, setSpec] = useState("");
  const [expiredDays, setExpiredDays] = useState("");
  const [expiredDate, setExpiredDate] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [cost, setCost] = useState("");
  const [qty, setQty] = useState("");
  const [stockDate, setInoutdate] = useState("");
  const [type, setType] = useState("");
  const [onCreateStockM] = useMutation(createStockM, {
    variables: {
      stockId,
      productId,
      productNm,
      spec,
      expiredDays,
      expiredDate,
      unit,
      price,
      cost,
      qty,
      stockDate,
      type,
      status,
      memo,
      createDT,
      createEmp
    },
    update: (proxy, mutationResult) => {
      // console.log(mutationResult);
      // alert("新增成功");
    }
  });

  const [onStockinM] = useMutation(StockinM, {
    variables: {
      inDate,
      purpose,
      stockinId,
      status,
      memo,
      createDT,
      createEmp
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

  const handleSubmit = e => {
    // e.preventDefault();
    onStockinM();
    onCreateStockM();
    setInDate("");
    setPurpose("");
    setStockinId("");
    setStatus("");
    setMemo("");
    // setCreateDT("");
    // setCreateEmp("");
  };
  const handleClick = () => {
    // setStockinId2("IN" + getSequenceId(DT));
    // dispatch(setStockinId("IN" + getSequenceId(DT)));
  };

  const handleClickAdd = () => {
    dispatch(setStockId(""));
    // setQty("1");
    // setMemo("");
    refetch();
  };

  const getSequenceId = prefix => {
    const sequence = data.stockins.length;
    return (
      prefix +
      (sequence + 1).toLocaleString("en-US", {
        minimumIntegerDigits: 6,
        useGrouping: false
      })
    );
  };
  const handleClickClear = () => {
    setStockinId("");
    // setQty("1");
    // setMemo("");
  };

  return (
    // <Container style={{ margin: 10 }}>
    <Form onSubmit={handleSubmit}>
      <div>
        <h1>產品入庫</h1>
        <BarcodeTest />
        <br />
      </div>
      <Form.Group>
        <Form.Field
          label="編號"
          name="productId"
          value={productId}
          control={Input}
          required
          placeholder="編號"
          //pattern="/^[A-Z]{2}\d{8}$/"
          // onChange={this.handleChange}
          inline
        />
        <Form.Field
          label="名稱"
          name="productNm"
          value={productNm}
          control={Input}
          required
          placeholder="名稱"
          //pattern="/^[A-Z]{2}\d{8}$/"
          // onChange={this.handleChange}
          inline
        />
        <Form.Field
          label="數量"
          name="qty"
          // value={qty}
          control={Input}
          type="number"
          min="1"
          required
          placeholder="數量"
          // onChange={this.handleChange}
          inline
        />
        <Form.Group>
          <Form.Button content="新增" onClick={handleClick} />
          <Form.Button content="清除" onClick={handleClickClear} />
        </Form.Group>
        <Form.Button content="入庫" onClick={handleClickAdd} />
      </Form.Group>
    </Form>
  );
};
