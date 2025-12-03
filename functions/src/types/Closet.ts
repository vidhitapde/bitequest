import { Clothing } from "./Clothing";
import { Decor } from "./Decor";

export interface Closet {
  clothing: Clothing[];
  decor: Decor[];
}
