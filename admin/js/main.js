import { getDetailRole } from "./getDetailRole.js";

const roleDetail = await getDetailRole();
sessionStorage.setItem('dataRole', JSON.stringify(roleDetail["result"]["data"]));

