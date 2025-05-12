import { filterPaymentData } from "./filterPaymentData.js";
import { renderPaymentTable } from "./renderPaymentTable.js";

export function updatePaymentTable(dataDetail) {
    filterPaymentData();
    renderPaymentTable(1, dataDetail);
}