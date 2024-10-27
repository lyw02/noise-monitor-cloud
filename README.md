# Noise Monitor Cloud - How to start

## 1. Depoly AWS serverless backend

Install aws-cli [here](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html). Use command to check the installation:

```shell
aws --version
```

Create an [IAM user](https://us-east-1.console.aws.amazon.com/iam/) in AWS console. Then click into the user and create an access key. Use command to configure access key ID and secrete access key:

```shell
aws configure
```

Enter `aws` directory:

```shell
cd aws
```

Install dependencies:

```shell
npm install
```

Deploy AWS stack:

```shell
npx cdk synth
npx cdk bootstrap
npx cdk deploy
```
