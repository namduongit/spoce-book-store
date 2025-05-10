import { getDetailRole } from "./getDetailRole.js";

const roleDetail = await getDetailRole();
const data = roleDetail["result"]["data"];
console.log(data)
console.log("da chay o day")
sessionStorage.setItem('dataRole', JSON.stringify(roleDetail["result"]["data"]));

