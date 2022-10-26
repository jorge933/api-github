import { SearchUserPage } from "../pages/search-user/search-user.page";
import { UserPage } from "../pages/user/user.page";

const search = () => renderPage("ag-search-user", SearchUserPage);

const user = () => renderPage("ag-user", UserPage);

const renderPage = <T>(tagName: string, classReference: T) => {
  return document.createElement(tagName);
};

export const ROUTES = {
  search,
  user,
};
