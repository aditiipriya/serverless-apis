const AWS = require("aws-sdk");
const { responseHandler } = require("../lib/response");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const findUserById = async (event, context) => {
  const data = event.queryStringParameters ;

  let params = {};
    params = {
    TableName: process.env.USER_TABLE_NAME,
    IndexName : "uniqueIndex",
    KeyConditionExpression: "#userId = :userId ",
    ExpressionAttributeNames: { "#userId": "userId" },
    ExpressionAttributeValues: { ":userId":data.userId },
  };

  try {
    let ListUser = await dynamoDb.query(params).promise();
    return responseHandler({
      statusCode: 200,
      message: "User Listed Successfully",
      data: JSON.stringify(ListUser),
    });
  } 
  catch (error) {
    console.log("error.....................", error);
    return responseHandler({
      statusCode: 500,
      message: "Something went wrong !!",
      data: "Error: "+ error,
    });
  }
};

module.exports.handler = findUserById;
