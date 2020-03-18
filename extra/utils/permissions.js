import { permissions } from '../constant.js';
export default function hasPermission(moduleName, role, permissionType) {
  console.log("hasPermission", moduleName, role, permissionType);
  if (permissions[moduleName] === undefined)
    return false;
  let data = permissions[moduleName];
  let tmp = false;
  if (data[permissionType] === undefined)
    return false;
  data[permissionType].forEach(element => {
    if (element == role) {
      tmp = true;
    }
  });
  return tmp;
}
