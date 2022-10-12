import { SearchUserPage } from "../pages/search-user/search-user.page";
import { UserPage } from "../pages/user/user.page";

const search = () => document.createElement("ag-search-user");
const user = (params?: string) => {
  const $page = document.createElement("ag-user");
  $page.setAttribute("params", params!);
  return $page;
};

const declarations = [SearchUserPage, UserPage];

export const ROUTES = {
  search,
  user,
};
