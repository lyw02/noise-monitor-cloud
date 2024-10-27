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
