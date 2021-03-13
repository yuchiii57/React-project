import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  Form,
  Input,
  Select
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import BarcodeTest from "../../API/BarcodeTest";
// import BarcodeProduct from "../../API/BarcodeProduct";

import {
  setStockinId,
  setStockId,
  setPurpose
} from "../../actions";

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
      stockId: $stockId
      productId: $productId
      productNm: $productNm
      spec: $spec
      expiredDays: $expiredDays
      expiredDate: $expiredDate
      unit: $unit
      price: $price
      cost: $cost
      qty: $qty
      stockDate: $stockDate
      type: $type
      status: $status
      memo: $memo
      createDT: $createDT
      createEmp: $createEmp
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

const options01 = [
  { key: "生產入庫", text: "生產入庫", value: "生產入庫" },
  { key: "數量調整", text: "數量調整", value: "數量調整" },
  { key: "退貨入庫", text: "退貨入庫", value: "退貨入庫" },
  { key: "銷售餘量入庫", text: "銷售餘量入庫", value: "銷售餘量入庫" }
];

export default () => {

  const dispatch = useDispatch();
  // const userName = useSelector(state => state.userName);
  const productId = useSelector(state => state.productId);
  const productNm = useSelector(state => state.productNm);
  const spec = useSelector(state => state.spec);
  const unit = useSelector(state => state.unit);
  const cost = useSelector(state => state.cost);
  const price = useSelector(state => state.price);
  const expiredDays = useSelector(state => state.expiredDay);
  const [createDT] = useState(moment());
  const createEmp = useSelector(state => state.userName);
  const [DT] = useState(moment().format("YYYYMMDD"));
  const [stockinId, setStockinId2] = useState("");
  const [inDate] = useState(moment().format("YYYY-MM-DD"));
  const [purpose, setPurpose2] = useState("生產入庫");
  const [status] = useState("");
  const [memo] = useState("");
  const [add, setAdd] = useState("");
  const [qty, setQty] = useState(1);
  const [onCreateStockM] = useMutation(createStockM, {
    variables: {
      stockId: stockinId,
      productId: productId,
      productNm: productNm,
      spec: spec,
      expiredDays: expiredDays,
      expiredDate: moment()
        .add(expiredDays, "days")
        .format("YYYYMMDD"),
      unit: unit,
      price: price,
      cost: cost,
      qty: Number(qty),
      stockDate: inDate,
      type: "入庫",
      status,
      purpose: purpose,
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
      console.log("StockinM", mutationResult);
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

  const handleClickAdd = () => {
    setAdd(false);
    dispatch(setStockinId(""));
    dispatch(setStockId(""));
    refetch();
  };

  const handleSubmit = e => {
    if (productId === "XXXX") {
      alert("請先掃產品條碼");
      return;
    }
    if (qty > 99999) {
      setQty(0);
      alert("請確認數量");
      return;
    }
    if (add === true) {
      // e.preventDefault();
      // console.log("submit");
      onStockinM();
      onCreateStockM();
      setStockId("");
      // setInDate("");
      // setPurpose("");
      // setStatus("");
      // setMemo("");
      // setCreateDT("");
      // setCreateEmp("");
    }
  };
  const handleClick = () => {

    setAdd(true);
    setStockId("");
    setStockinId("");
    setStockinId2("IN" + getSequenceId(DT));
    dispatch(setStockinId("IN" + getSequenceId(DT)));
    dispatch(setPurpose(purpose));
  };

  const getSequenceId = prefix => {
    const sequence = data.stockins.length;
    console.log("sequence", sequence);
    return (
      prefix +
      (sequence + 1).toLocaleString("en-US", {
        minimumIntegerDigits: 6,
        useGrouping: false
      })
    );
  };
  return (
    // <Container style={{ margin: 10 }}>
    <Form onSubmit={handleSubmit}>
      <div  >
        <h1 style={{ color: 'red' }}>產品入庫</h1>
        {/* <BarcodeProduct productId={productId} /> */}
        {/* <BarcodeStockin /> */}
        <BarcodeTest />
        <h2 required>
          品號: {productId} 品名:{productNm} 單位:{unit} 規格: {spec}{" "}
        </h2>
        <h2>保存天數:{expiredDays}</h2>
        <Form.Field
          label="數量"
          name="qty"
          value={qty}
          control={Input}
          type="number"
          min="1"
          required
          onChange={e => {
            setQty(e.target.value);
          }}
          inline
        />
        <Form.Field
          label="入庫原因 ( 一筆入庫單號只能選一種原因 )"
          name="purpose"
          value={purpose}
          widths="1"
          control={Select}
          options={options01}
          search
          required
          onChange={(e, { value }) => {
            setPurpose2(value);
          }}
          inline
        />
        {/* <Form.Field
          label="品號"
          name="productId"
          value={productId}
          control={Input}
          required
          inline
        />
        <Form.Field
          label="品名"
          name="productNm"
          value={productNm}
          control={Input}
          required
          inline
        /> */}

        <Form.Group>
          <Form.Button content="新增" onClick={handleClick} />
          <Form.Button content="入庫" onClick={handleClickAdd} />
        </Form.Group>
      </div>
    </Form >
  );
};
