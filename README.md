# Noise Monitor Cloud - How to start

Visit the deployed version: [https://noise-monitor-cloud.vercel.app/](https://noise-monitor-cloud.vercel.app/)

Or follow the instructions below to start locally:

## 1. Depoly AWS serverless backend

### Step 1 - Create an AWS account

Create account [here](https://portal.aws.amazon.com/billing/signup?redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/start).

Create an [IAM user](https://us-east-1.console.aws.amazon.com/iam/) in AWS console. Then click into the user and create an access key.

### Step 2 - Set up AWS Amplify

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

Finally push exsisting Amplify resources to AWS Amplify:

```sh
amplify push
```

## 2. Start frontend app

```sh
npm install
npm run dev
```
