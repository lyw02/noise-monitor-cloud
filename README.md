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

Enter `aws` directory in this project:

```shell
cd aws
```

Install dependencies:

```shell
npm install
```

If this is the first time to deploy and you haven't bootstrap CDKToolkit, attach following permission policies to you IAM user in AWS console:

```json
{
  "AttachedPolicies": [
    {
      "PolicyName": "AmazonEC2ContainerRegistryFullAccess",
      "PolicyArn": "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryFullAccess"
    },
    {
      "PolicyName": "AmazonSSMFullAccess",
      "PolicyArn": "arn:aws:iam::aws:policy/AmazonSSMFullAccess"
    },
    {
      "PolicyName": "AmazonEC2FullAccess",
      "PolicyArn": "arn:aws:iam::aws:policy/AmazonEC2FullAccess"
    },
    {
      "PolicyName": "IAMFullAccess",
      "PolicyArn": "arn:aws:iam::aws:policy/IAMFullAccess"
    },
    {
      "PolicyName": "AmazonESCognitoAccess",
      "PolicyArn": "arn:aws:iam::aws:policy/AmazonESCognitoAccess"
    },
    {
      "PolicyName": "IAMUserChangePassword",
      "PolicyArn": "arn:aws:iam::aws:policy/IAMUserChangePassword"
    },
    {
      "PolicyName": "AmazonDynamoDBFullAccess",
      "PolicyArn": "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
    },
    {
      "PolicyName": "AmazonS3FullAccess",
      "PolicyArn": "arn:aws:iam::aws:policy/AmazonS3FullAccess"
    },
    {
      "PolicyName": "AWSCloudFormationFullAccess",
      "PolicyArn": "arn:aws:iam::aws:policy/AWSCloudFormationFullAccess"
    },
    {
      "PolicyName": "AmazonCognitoReadOnly",
      "PolicyArn": "arn:aws:iam::aws:policy/AmazonCognitoReadOnly"
    }
  ]
}
```

Then run command to bootstrap:

```shell
npx cdk bootstrap
```

Finally, deploy AWS stack:

```shell
npx cdk synth
npx cdk deploy
```

## 2. Start frontend app

Exit `aws` directory i.e. back to root directory:

```shell
cd ..
```

Use command to retrieve user pool properties you just created:

```shell
aws cognito-idp list-user-pools --max-results 10
aws cognito-idp list-user-pool-clients --user-pool-id <your_user_pool_id>
aws cognito-idp describe-user-pool-client --user-pool-id <your_user_pool_id> --client-id <your_client_id>
aws cognito-identity list-identity-pools --max-results 10
```

Also create a Cognito domain in [console](https://eu-west-1.console.aws.amazon.com/cognito/v2/idp/user-pools).

Then create a `.env` file and add above properties:

```
VITE_USER_POOL_ID=<your_user_pool_id>
VITE_USER_POOL_CLIENT_ID=<user_pool_client_id>
VITE_IDENTITY_POOL_ID=<your_identity_pool_id>
VITE_COGNITO_DOMAIN=<your_cognito_domain>
```
