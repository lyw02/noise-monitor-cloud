import { get, post } from "aws-amplify/api";

export const uploadData = async () => {
  //   const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
  try {
    // const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
    // if (!accessToken) return "Unauthorized";
    const restOperation = get({
      apiName: "NoiseAppAPI",
      path: "/data",
      options: {
        // body: {
        //     msg: "msg"
        // }
        // headers: {
        //   authorization: `Bearer ${accessToken.toString()}`,
        // },
      },
    });
    const response = await restOperation.response;
    console.log("POST call succeeded: ", response);
  } catch (e: any) {
    console.log("POST call failed: ", e);
  }
};
