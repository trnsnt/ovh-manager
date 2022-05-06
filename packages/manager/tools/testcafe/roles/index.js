import { Role } from 'testcafe';
import AuthLoginPage from '../pages/auth/login';

export function userRole(config, targetUrl) {
  const page = new AuthLoginPage(config);
  return Role(
    page.getLoginUrl(targetUrl),
    async () => {
      await page.login();
    },
    { preserveUrl: true },
  );
}

export async function userRoleDisconnect(config) {
  const page = new AuthLoginPage(config);
  await page.logout();
}

export default {
  userRole,
  userRoleDisconnect,
};
