import React from "react";

const CTX = React.createContext();
export { CTX };
export default function Store(props) {
  const stateHook = React.useState({
    caseId: "C201909040001",
    adbDate: "2019-12-01",
    assetId: "A1000004",
    customerId: "C0000",
    customerNm: "TEST2020",
    invoiceNo: "00000000",
    customerKind: "公司",
    empId: "104092501",
    ID: "26320253126443008",
    /*     productId: "BB0110003", */
    productId: "HD0009999",
    productDepKind: "BB",
    sysName: "單位類別",
    status: "使用中",
    placeId: "A1P01",
    custodianId: "079031201",
    assets: [],
    isReFetch: true,
    addable: true,
    adcStatus: "暫存",
    soId: "XXXX",
    isLevel01Clicked: false,
    isLevel02Clicked: false,
    isLevel03Clicked: false,
    isLevel04Clicked: false,
    isLevel05Clicked: false,
    stockId: "XXXX",
    isDelivery: false

    // custodianId: "790312"
  });
  return <CTX.Provider value={stateHook}>{props.children}</CTX.Provider>;
}
