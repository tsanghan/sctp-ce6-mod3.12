// hello.test.js
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const { hello, hello2, hello3 } = require('../index');

// Mock the SNSClient and send method
jest.mock('@aws-sdk/client-sns', () => {
  const mockSend = jest.fn();
  return {
    SNSClient: jest.fn(() => ({
      send: mockSend,
    })),
    PublishCommand: jest.fn(),
  };
});

describe('Lambda Functions', () => {
  let snsClientMock;

  beforeEach(() => {
    snsClientMock = new SNSClient();
    snsClientMock.send.mockReset();
  });

  describe('hello', () => {
    it('should call sent_to_sns with correct parameters', async () => {
      const mockResponse = { MessageId: '12345' };
      snsClientMock.send.mockResolvedValue(mockResponse);

      process.env.SNS_ARN = 'arn:aws:sns:ap-southeast-1:123456789012:MyTopic';
      process.env.CLASS_NAME = 'TestClass';

      const event = { test: 'data' };
      const response = await hello(event);

      expect(snsClientMock.send).toHaveBeenCalledWith(expect.any(PublishCommand));
      expect(snsClientMock.send).toHaveBeenCalledTimes(1);
      expect(response).toEqual({
        statusCode: 200,
        body: JSON.stringify({
          message: 'Go Serverless v4.0! Your function executed successfully!',
          class_name: 'TestClass',
          snsResponse: mockResponse,
        }),
      });
    });

    it('should return an error response if sns publish fails', async () => {
      snsClientMock.send.mockRejectedValue(new Error('SNS Publish Failed'));

      const response = await hello({});

      expect(response).toEqual({
        statusCode: 500,
        body: JSON.stringify({
          message: 'Error publishing message',
          class_name: process.env.CLASS_NAME,
          error: 'SNS Publish Failed',
        }),
      });
    });
  });

  describe('hello2', () => {
    it('should return a successful response for hello2', async () => {
      process.env.CLASS_NAME = 'TestClass';

      const response = await hello2({});

      expect(response).toEqual({
        statusCode: 200,
        body: JSON.stringify({
          message: 'Go Serverless v4.0! Your function executed successfully! Function 2',
          class_name: 'TestClass',
        }),
      });
    });
  });

  describe('hello3', () => {
    it('should return a successful response for hello3', async () => {
      process.env.CLASS_NAME = 'TestClass';

      const response = await hello3({});

      expect(response).toEqual({
        statusCode: 200,
        body: JSON.stringify({
          message: 'Go Serverless v4.0! Your function executed successfully! Function 3',
          class_name: 'TestClass',
        }),
      });
    });
  });
});
