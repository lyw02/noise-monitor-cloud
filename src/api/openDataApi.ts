import { OpenDataRecord } from "@/types";
import { post } from "aws-amplify/api";

export const uploadOpenData = async (data: OpenDataRecord[]) => {
  try {
    const restOperation = post({
      apiName: "NoiseAppAPI",
      path: "/openData",
      options: {
        body: data,
      },
    });
    const response = await restOperation.response;
    console.log("POST call succeeded: ", response);
    return response;
  } catch (e: any) {
    console.log("POST call failed: ", e);
  }
};
