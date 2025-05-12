import { filterPaymentData } from "./filterPaymentData.js";
import { renderPaymentTable } from "./renderPaymentTable.js";
import { addPaymentData } from "./addPaymentData.js";

export function updatePaymentTable(dataDetail) {
    filterPaymentData();
    addPaymentData();
    renderPaymentTable(1, dataDetail);
}