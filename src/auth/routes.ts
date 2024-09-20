export const routes = {
  auth: {
    apiPrefix: "/api/auth",
    routes: ["/signin", "/signup", "/auth-error"],
  },
  publicRoutes: ["/"],
  DEFAULT_LOGIN_REDIRECT: "/home",
  LOGIN: "/signin",
};
