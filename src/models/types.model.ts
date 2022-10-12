export type RoutesType = {
  search(): HTMLElement;
  user(params: string): HTMLElement;
};

export interface ReturnParams {
  user: string;
  page?: string;
}

export type Name = keyof ReturnParams;
