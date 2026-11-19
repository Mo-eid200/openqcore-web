// Per-request options read by the interceptors in app/lib/api/core/qxtClient.ts.
import "axios";

declare module "axios" {
  interface AxiosRequestConfig {
    /** Send the request in personal context, ignoring the selected workspace. */
    __forcePersonalContext?: boolean;
  }
}
