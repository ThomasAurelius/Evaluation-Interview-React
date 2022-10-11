import ky from "ky";
import { environment } from "./environment";

const http = ky.create({
  prefixUrl: environment.http.base,
  credentials: "omit",
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set("Authorization", environment.http.apiKey);
      },
    ],
  },
});

export { http };
