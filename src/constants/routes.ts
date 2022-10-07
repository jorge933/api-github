import { RoutesType } from "../models/types.model";
import { IndexPage } from "../pages/index/index.page";

const index = () => document.createElement("ag-index");

const declarations = [IndexPage];

export const ROUTES: RoutesType = {
  index,
};
