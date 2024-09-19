const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");

const REGION = "ap-southeast-1";
const DEFAULT_SNS_ARN = "arn:aws:sns:ap-southeast-1:255945442255:MyCustomTopic-node";
const snsClient = new SNSClient({ region: REGION });

// Initialize environment variables
const initializeEnv = () => {
  process.env.SNS_ARN = process.env.SNS_ARN || DEFAULT_SNS_ARN;
  process.env.CLASS_NAME = process.env.CLASS_NAME || "DefaultClassName";
};

// Utility function to create standard responses
const createResponse = (statusCode, message, additionalData = {}) => ({
  statusCode,
  body: JSON.stringify({
    message,
    class_name: process.env.CLASS_NAME,
    ...additionalData,
  }),
});

// Function to send SNS message
const sendSnsMessage = async (params) => {
  try {
    const data = await snsClient.send(new PublishCommand(params));
    return createResponse(200, 'Go Serverless v4.0! Your function executed successfully!', { snsResponse: data });
  } catch (err) {
    return createResponse(500, 'Error publishing message', { error: err.message });
  }
};

// Lambda handler functions
exports.hello = async (event) => {
  initializeEnv();
  console.log("*****HELLO*****");

  const params = {
    Message: JSON.stringify(event, null, 2),
    Subject: "Test SNS From Lambda",
    TopicArn: process.env.SNS_ARN,
  };

  return sendSnsMessage(params);
};

exports.hello2 = async (event) => {
  initializeEnv();
  console.log("*****HELLO-2*****");
  return createResponse(200, 'Go Serverless v4.0! Your function executed successfully! Function 2');
};

exports.hello3 = async (event) => {
  initializeEnv();
  console.log("*****HELLO-3*****");
  return createResponse(200, 'Go Serverless v4.0! Your function executed successfully! Function 3');
};
