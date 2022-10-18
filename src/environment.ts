/**
 * TODO: this object should be either validated or have a fallback values
 * Non-null assertion to simplify
 */
const environment = {
  http: {
    base: process.env.REACT_APP_HTTP_API_BASE!,
    apiKey: process.env.REACT_APP_HTTP_API_KEY!,
  },
  nodeEnv: process.env.NODE_ENV,
};

export default environment;
