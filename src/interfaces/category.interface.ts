import type { baseInitialStateI } from "./baseInitialState.interface";

export interface CategoryI extends baseInitialStateI {
  id: string;
  name: string;
  description: string;
}
