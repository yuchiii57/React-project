import counterReducer from "./counter";
import loggedReducer from "./logged";
import capacityReducer from "./capacity";
import stationNoReducer from "./stationNo";
import totalGenEnergyReducer from "./totalGenEnergy";
import carbonReductionReducer from "./carbonReduction";
import updateTimeReducer from "./updateTime";
import userNameReducer from "./userName";

import privilegeReducer from "./privilege";
import priAddReducer from "./priAdd";
import priMdyReducer from "./priMdy";
import priDelReducer from "./priDel";

import productIdReducer from "./productId";
import productNmReducer from "./productNm";
import productBOMReducer from "./productBOM";

import rmIdReducer from "./rmId";
import rmNmReducer from "./rmNm";

import unitReducer from "./unit";
import specReducer from "./spec";
import costReducer from "./cost";
import priceReducer from "./price";
import expiredDayReducer from "./expiredDay";

import soAmountReducer from "./soAmount";
import invoiceReducer from "./invoice";
import soInvoiceReducer from "./soInvoice";
import soIdReducer from "./soId";
import soPrintReducer from "./soPrint";

import stockIdReducer from "./stockId";
import stockinIdReducer from "./stockinId";
import purposeReducer from "./purpose";
import stockoutIdReducer from "./stockoutId";
import { combineReducers } from "redux";

import empIdReducer from "./empId";
import empNmReducer from "./empNm";
import createDTReducer from "./createDT";
import addReducer from "./add";

const allReducers = combineReducers({
  counter: counterReducer,
  logged: loggedReducer,
  capacity: capacityReducer,
  stationNo: stationNoReducer,
  totalGenEnergy: totalGenEnergyReducer,
  carbonReduction: carbonReductionReducer,
  updateTime: updateTimeReducer,
  userName: userNameReducer,
  privilege: privilegeReducer,
  priAdd: priAddReducer,
  priMdy: priMdyReducer,
  priDel: priDelReducer,
  productId: productIdReducer,
  productNm: productNmReducer,
  productBOM: productBOMReducer,
  rmId: rmIdReducer,
  rmNm: rmNmReducer,
  unit: unitReducer,
  spec: specReducer,
  cost: costReducer,
  price: priceReducer,
  expiredDay: expiredDayReducer,
  soAmount: soAmountReducer,
  invoice: invoiceReducer,
  soInvoice: soInvoiceReducer,
  soId: soIdReducer,
  soPrint: soPrintReducer,
  stockId: stockIdReducer,
  stockinId: stockinIdReducer,
  stockoutId: stockoutIdReducer,
  purpose: purposeReducer,
  empId: empIdReducer,
  empNm: empNmReducer,
  createDT: createDTReducer,
  add: addReducer
});

export default allReducers;
