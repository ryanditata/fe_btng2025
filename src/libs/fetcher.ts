// src/services/fetcher.ts
import api from "./api";

export const fetcher = <T>(url: string): Promise<T> =>
  api.get(url).then((res) => res.data);

