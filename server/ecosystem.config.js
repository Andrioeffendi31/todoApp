module.exports = {
  apps: [
    {
      name: "todoApp",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};