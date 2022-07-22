const AWS = require("aws-sdk");
const { responseHandler } = require("../lib/response");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const userList = async (event, context) => {

  let params = {};
  params = {
    TableName: process.env.USER_TABLE_NAME,
  };
  
  try {
    let ListUser = await dynamoDb.scan(params).promise();
    return responseHandler({
      statusCode: 200,
      message: "User Listed Successfully",
      data: ListUser,
    });
  } catch (error) {
    console.log("error.....................", error);
    return responseHandler({
      statusCode: 500,
      message: "Something went wrong !!",
      data: "",
    });
  }
};

module.exports.handler = userList;
