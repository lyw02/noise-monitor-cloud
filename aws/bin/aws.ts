#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { NoiseDataAPIStack } from "../lib/noise-data-api-stack";

import * as dotenv from "dotenv";
dotenv.config();

const app = new cdk.App();
new NoiseDataAPIStack(app, "NoiseDataAPIStack", {
  env: { region: "eu-west-1" },
});
