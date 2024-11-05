import { Amplify } from "aws-amplify";

import amplifyconfig from "@/amplifyconfiguration.json";

export default () => {
  Amplify.configure(amplifyconfig);
  console.log(Amplify.getConfig());
};
