import { IndexPage } from "../pages/index/index.page";
import { UserPage } from "../pages/user/user.page";

const index = () => document.createElement("ag-index");
const user = (params?: string) => {
  const $page = document.createElement("ag-user");
  $page.setAttribute("params", params!);
  return $page;
};

const declarations = [IndexPage, UserPage];

export const ROUTES = {
  index,
  user,
};
