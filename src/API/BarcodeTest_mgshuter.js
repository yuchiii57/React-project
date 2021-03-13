import React from "react";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/react-hooks";
import { useDispatch, useSelector } from "react-redux";
import BarcodeReader from "react-barcode-reader";

import { setProductId, setProductNm } from "../actions";

const productQ = gql`
  query($productId: String) {
    products(productId: $productId) {
      productId
      productNm
      spec
      unit
      price
    }
  }
`;

export default () => {
  const dispatch = useDispatch();
  const [loadOptions, { data, loading, error }] = useLazyQuery(productQ);

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>發生錯誤了</div>;
  }
  if (data) {
    dispatch(setProductId(data.products[0].productId));
    dispatch(setProductNm(data.products[0].productNm));
  }

  const handleScan = d => {
    loadOptions({ variables: { productId: d } });
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
