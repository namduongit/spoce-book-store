import { filterPayment } from "./filterPaymentData.js";
import { renderPaymentTable } from "./renderPaymentTable.js";

export function updatePaymentTable(dataDetail) {
    filterPayment();
    renderPaymentTable(1, dataDetail);
}