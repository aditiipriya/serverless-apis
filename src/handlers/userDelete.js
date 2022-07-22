const AWS = require("aws-sdk");
const { responseHandler } = require("../lib/response");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const userDelete = async (event, context) => {
  const data = event.queryStringParameters;

  let params = {};
  params = {
    TableName: process.env.USER_TABLE_NAME,
    Key: { email: data.email, userName: data.userName },
  };
  try {
    let deleteUser = await dynamoDb.delete(params).promise();
    return responseHandler({
      statusCode: 200,
      message: "User Deleted Successfully",
      data: params.Key,
    });
  } catch (error) {
    console.log("error.....................", error);
    return responseHandler({
      statusCode: 500,
      message: "User Not Deleted",
      data: "",
    });
  }
};

module.exports.handler = userDelete;
