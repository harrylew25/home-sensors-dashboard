if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  import("./mocked/browser").then(({ worker }) => {
    worker.start();
  });
}
