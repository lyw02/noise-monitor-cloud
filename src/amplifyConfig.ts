import { Amplify } from "aws-amplify";

import amplifyconfig from "@/amplifyconfiguration.json";

export default () => {
  Amplify.configure(amplifyconfig);

  const existingConfig = Amplify.getConfig();

  // API config
  Amplify.configure({
    ...existingConfig,
    API: {
      ...existingConfig.API,
      REST: {
        ...existingConfig.API?.REST,
        DataAPI: {
          endpoint: import.meta.env.VITE_NOISE_DATA_API,
          region: "eu-west-1",
        },
      },
    },
  });

  console.log(Amplify.getConfig());
};
