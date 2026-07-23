#!/usr/bin/env node
"use strict";
async function startPJS() {
  const profoundjs = require("profoundjs");
  await profoundjs.applyConfig();
  await profoundjs.server.listen();
  const express = profoundjs.server.express;
  const app = profoundjs.server.app;
  app.use(express.json());
}
startPJS();
