const AWS = require("aws-sdk");
const { responseHandler } = require("../lib/response");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const userSearch = async (event, context) => {
  const data = event.queryStringParameters ;

  let params = {};
    params = {
    TableName: process.env.USER_TABLE_NAME,
    KeyConditionExpression: "#email = :email and #userName = :userName",
    ExpressionAttributeNames: { "#email": "email","#userName":"userName" },
    ExpressionAttributeValues: { ":email":data.email,":userName":data.userName },
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

module.exports.handler = userSearch;
