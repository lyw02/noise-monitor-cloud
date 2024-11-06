import { DataRecord } from "@/types";
import { get, post } from "aws-amplify/api";

export const uploadData = async (data: DataRecord) => {
  console.log(`Data:: ${JSON.stringify(data)}`);
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key as keyof DataRecord].toString());
  });
  console.log(`Data:: ${JSON.stringify(formData)}`);
  try {
    const restOperation = post({
      apiName: "NoiseAppAPI",
      path: "/data",
      options: {
        body: formData,
      },
    });
    const response = await restOperation.response;
    console.log("POST call succeeded: ", response);
  } catch (e: any) {
    console.log("POST call failed: ", e);
  }
};

export const getData = async (userId: string) => {
  try {
    const restOperation = get({
      apiName: "NoiseAppAPI",
      path: `/data/${userId}`,
    });
    const response = await restOperation.response;
    console.log("GET call succeeded: ", response);
    return response;
  } catch (e: any) {
    console.log("GET call failed: ", JSON.parse(e));
  }
};
