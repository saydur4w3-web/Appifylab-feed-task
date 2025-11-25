import { SERVER_URL } from "../constants/app.constant";

type T_param = {
  url: string;
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  data?: { [key: string]: any };
  options?: RequestInit;
  headers?: { [key: string]: any };
  outside_server?: boolean;
  form?: FormData;
};

export async function Fetch<T>({
  url,
  method = "GET",
  data,
  options,
  headers,
  outside_server = false,
  form,
}: T_param): Promise<T> {
  let targetUrl = url;

  let headersData: any = {
    "Content-Type": "application/json",
  };

  // override custom headers
  if (headers) headersData = headers;

  // IMPORTANT: remove JSON content-type for FormData
  if (form) {
    // headersData["Content-Type"] = "multipart/form-data";
      delete headersData["Content-Type"];
  }

  // append base url
  if (!outside_server) {
    if (!url.startsWith("/")) {
      targetUrl = `/${url}`;
    }
    targetUrl = SERVER_URL + targetUrl;
  }

  const resS = await fetch(targetUrl, {
    method: method,
    headers: headersData,
    credentials: "include",

    ...(["POST", "PATCH"].includes(method) &&
      (data || form) && {
        body: form ? form : JSON.stringify(data),
      }),

    ...(options ? options : {}),
  });

  if (!resS.ok) {
    const errRes = await resS.json();
    let errMsg = "Something went wrong";

    if (errRes && errRes.error) {
      if (typeof errRes.error === "string") {
        errMsg = errRes.error;
      }
    }

    throw new Error(errMsg);
  }

  const resSData = (await resS.json()) as T;
  return resSData;
}
