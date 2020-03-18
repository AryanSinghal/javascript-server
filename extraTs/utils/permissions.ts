import { permissions } from '../constant.js';

export default function hasPermission(moduleName: string, role: string, permissionType: string): boolean {
  console.log('hasPermission', moduleName, role, permissionType);
  if (permissions[moduleName] === undefined || permissions[moduleName] === null)
    return false;
  const data = permissions[moduleName];
  let tmp: boolean = false;
  if (data[permissionType] === undefined || data[permissionType] === null)
    return false;

  data[permissionType].forEach(element => {
    if (element === role) {
      tmp = true;
    }

  });
  return tmp;
}
