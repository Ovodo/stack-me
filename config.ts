export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://stack-me.vercel.app"
    : "http://localhost:3000";
