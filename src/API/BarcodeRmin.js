import React from "react";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/react-hooks";
import { useDispatch } from "react-redux";
import BarcodeReader from "react-barcode-reader";

import {
  setRmId,
  setRmNm,
  setSpec,
  setUnit,
  setCost,
  setExpiredDay
} from "../actions";

const rawMaterialQ = gql`
  query($rmId: String) {
    rawMaterials(rmId: $rmId) {
      rmId
      rmNm
      spec
      unit
      cost
      expiredDays
    }
  }
`;

export default () => {
  const dispatch = useDispatch();
  const [loadOptions, { data, loading, error }] = useLazyQuery(rawMaterialQ);

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>發生錯誤了</div>;
  }
  if (data) {
    dispatch(setRmId(data.rawMaterials[0].rmId));
    dispatch(setRmNm(data.rawMaterials[0].rmNm));
    dispatch(setSpec(data.rawMaterials[0].spec));
    dispatch(setUnit(data.rawMaterials[0].unit));
    dispatch(setCost(data.rawMaterials[0].cost));
    dispatch(setExpiredDay(data.rawMaterials[0].expiredDays));
  }

  const handleScan = d => {
    loadOptions({ variables: { rmId: d } });
  };
  const handleError = err => {
    console.error(err);
  };

  return (
    <div>
      <BarcodeReader onError={handleError} onScan={handleScan} />
    </div>
  );
};
