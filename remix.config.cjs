/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  serverBuildPath: "build/server/index.js",
  publicPath: "/build/",
  serverDependenciesToBundle: ["@remix-run/vercel"],
  serverModuleFormat: "cjs",
  serverPlatform: "node",
  server: "@remix-run/vercel",
};
