import * as contenful from "contentful";
import { space } from "postcss/lib/list";

export const clientContentful = contenful.createClient({
  space: import.meta.env.VITE_SPACE_ID,
  accessToken: import.meta.env.VITE_ACCESS_TOKEN,
});

export const contenfulApi = space;
