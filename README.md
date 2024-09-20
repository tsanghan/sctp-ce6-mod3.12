# sctp-ce6-mod3.12

[![CICD for Serverless Application](https://github.com/tsanghan/sctp-ce6-mod3.12/actions/workflows/ci.yaml/badge.svg)](https://github.com/tsanghan/sctp-ce6-mod3.12/actions/workflows/ci.yaml)

This repo container code and workflow pipeline for SCTP CE6 Mod3.12

Since we are having a Node application and utlising Serverless Framwwork for deploymen tto AWS Lambda, we will beuing `npm`.

Command used for initializing this Node application project directory.
```
npm init
npm install aws-sdk
npm install jest --save-dev
npm install supertest --dave-dev
```
For serverless
```
sudo npm install serverless -g
```
OR
```
npm install serverless
```
To create project with Serverless Framework. Do your own adjustment, i.e. directory create and such, we just need the `serverless.yml` file.
```
sls
```
Edit `paskage.json` so we can do `npm test`

Finally, create `.github/workflow/ci.yaml` for pipeline.

GitHub Action Workflow Pipline implemented is as follow;
1) `pre-deploy`
2) `install-dependancies`
3) `npm-audit`
4) `code-unit-testing`
5) `deploy`

![GitHub Action Workflow Pipline](assets/images/serverless-deploy-success.PNG)

To `destroy` all AWS resources created by the workflow pipeline
```
sls remove
```

Sailent points.

1) The Node.js code will forward message received to both `SQS` and `DynamoDB`.
2) This is deployed with `Serverless Framwork v4`.
3) Workflow pipeline is adjusted to have login requirement satisfied for Serverless Framwork to function in pipeline.
4) It seems `Serverless Framwork v4` deploy API Gateway with `2.0 payload format`.
5) Thus, when performing test in Lambda, `API Gateway Http API` template must be selected.
6) With the corresponding code below, our Lambda function will correctly extrace the `2.0 format payload`.
```
JSON.parse(Buffer.from(event.body, 'base64').toString());
```
7) The following code will not be able to extract the corresponding payload from `2.0 payload format`
```
JSON.parse(event.body);
```

There exists in this repo a `send.sh` script that will sent appririate date to the API Endpoint using `curl`.
Check you `SQS` and `DynamoDB` for data received.

