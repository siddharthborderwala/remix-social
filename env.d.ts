declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // final protocol:hostname to be used in a deployment
      // is set in next.config.js using some logic
      // for a local dev environment it is set right from the .env.development.local file
      VERCEL_URL: string;
      COOKIES_SECRET: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
