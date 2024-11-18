
export const RouteUserRegister = {
  path: "user/register",
};
export const RouteUserLogin = {
  path: "user/login",
};
export const RouteHome = {
  path: "home",
};

export function getPageRoutesName(routes, hash) {
  hash = hash.replace('#', '');
  const rt = routes.find((obj) => {
    if(obj.route?.router) {
      return(hash.startsWith(obj?.route?.router));
    }
    return(obj.route.path === hash);
  });

  if (rt === undefined) {
    return ('');
  } else {
    return rt['route']['navBar'];
  }
}
