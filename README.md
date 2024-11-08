# Noise Monitor Cloud - How to start

I use this web application to gather own data and open data. It includes an AWS serverless backend and a React frontend.

To use this app:

Visit the deployed version: [https://noise-monitor-cloud.vercel.app/](https://noise-monitor-cloud.vercel.app/)

Or follow the instructions below to start locally:

## 1. Depoly AWS serverless backend

First create an AWS account:

Create account [here](https://portal.aws.amazon.com/billing/signup?redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/start).

Create an [IAM user](https://us-east-1.console.aws.amazon.com/iam/) in AWS console. Then click into the user and create an access key.

Then set up AWS Amplify:

Install aws-cli [here](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

Use following command to check the installation:

```shell
aws --version
```

Use following command to configure access key ID and secrete access key:

```shell
aws configure
```

Install Amplify CLI:

```sh
npm install -g @aws-amplify/cli
```

Use following command to check installation:

```sh
amplify --version
```

Then use following command to configure access key and secret key of your IAM user:

```sh
amplify configure
```

Then delete `amplify` directory in the repository, because it includes my cloud resource configurations and you are going to create new resources (but save `amplify/function/*/src` to somewhere else and will use them later).

Then use following command to initiate new amplify application, select Gen1 and eu-west-1 region and other relevant configurations:

```sh
amplify init
```

Then use following command to create a Cognito user pool for user authentication:

```sh
amplify add auth
```

Then run following command twice to create 2 DynamoDB tables:

```sh
amplify add storage
```

Then run following command to create API, select REST API, the instructions will also let you to create a lambda function, select NodeJS as runtime and DynamoDB CRUD functions as template:

```sh
amplify add api
```

Then you can run following command to create other API endpoints and Lambda functions:

```sh
amplify update api
```

Then you can replace the generated function with the original `amplify/function/*/src` files, but make sure to replace the table name, partition key name, sort key name, etc., to your actual values.

If any above resources failed to create, you may consider add relevant permissions to your IAM user.

Ideally, you will have following resources now:

+ Auth: 
    + <your_user_pool>
    + <your_identity_pool>
+ Storage:
    + Table: <noise_data_by_user> (for storing own data)
        + Partition key: userId (String)
        + Sort key: timestamp (Number)
    + Table: <noise_data_by_open_api> (for storing open data)
        + Partition key: monitor (String)
        + Sort key: datetime (String)
+ API: NoiseAppAPI
    + Endpoint: /data (for managing own data)
        + Lambda function: dataFn (executing CRUD)
    + Endpoint: /openData (for managing open data)
        + Lambda function: openDataFn (executing CRUD)
        + Lambda function: openDataCronFn (scheduled recurring invocation)

N.B. If your API name and endpoint names are not the same with above, you need to change the names used in frontend code accordingly.

Then use following command to push resources to cloud:

```sh
amplify push
```

And now your resources should be deployed on AWS cloud service successfully! You can manage it on [AWS Amplify](https://eu-west-1.console.aws.amazon.com/amplify/apps) in AWS console.

## 2. Start frontend app

```sh
npm install
npm run dev
```

And now the frontend app should run successfully and you can visit on [http://localhost:5173](http://localhost:5173)!
