import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  UserPool,
  UserPoolClient,
  VerificationEmailStyle,
} from "aws-cdk-lib/aws-cognito";
import { AttributeType, Table } from "aws-cdk-lib/aws-dynamodb";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Architecture, Runtime } from "aws-cdk-lib/aws-lambda";
import {
  AuthorizationType,
  CognitoUserPoolsAuthorizer,
  LambdaIntegration,
  RestApi,
} from "aws-cdk-lib/aws-apigateway";

export class NoiseDataAPIStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Cognito
    const userPool = new UserPool(this, "UserPool", {
      selfSignUpEnabled: true,
      userVerification: {
        emailStyle: VerificationEmailStyle.CODE,
      },
      signInAliases: {
        email: true,
      },
    });

    new UserPoolClient(this, "UserPoolClient", {
      userPool,
      authFlows: {
        userSrp: true,
        userPassword: true,
        custom: true,
        adminUserPassword: true,
      },
    });

    // DynamoDB
    const noiseDataTable = new Table(this, "NoiseDataTable", {
      partitionKey: { name: "userId", type: AttributeType.STRING },
      sortKey: { name: "timestamp", type: AttributeType.NUMBER },
    });

    // Lambda
    const uploadDataFn = new NodejsFunction(this, "UploadDataFn", {
      architecture: Architecture.ARM_64,
      runtime: Runtime.NODEJS_18_X,
      entry: `${__dirname}/../lambdas/uploadData.ts`,
      timeout: Duration.seconds(10),
      memorySize: 128,
      environment: {
        NOISE_DATA_TABLE_NAME: noiseDataTable.tableName,
        REGION: "eu-west-1",
        COGNITO_USER_POOL_ID: userPool.userPoolId,
      },
    });

    // API Gateway
    const api = new RestApi(this, "NoiseDataAPI", {
      description: "Noise data api",
      deployOptions: {
        stageName: "dev",
      },
      // Enable CORS
      defaultCorsPreflightOptions: {
        allowHeaders: ["Content-Type", "X-Amz-Date"],
        allowMethods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
        allowCredentials: true,
        allowOrigins: ["*"],
      },
    });

    const authorizer = new CognitoUserPoolsAuthorizer(
      this,
      "CognitoAuthorizer",
      {
        cognitoUserPools: [userPool],
      }
    );

    const dataEndpoint = api.root.addResource("data");

    dataEndpoint.addMethod(
      "POST",
      new LambdaIntegration(uploadDataFn, { proxy: true }),
      {
        authorizer: authorizer,
        authorizationType: AuthorizationType.COGNITO,
      }
    );

    // Permission
    noiseDataTable.grantWriteData(uploadDataFn);
  }
}
