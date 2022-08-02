const AWS = require("aws-sdk");
const { responseHandler } = require("../lib/response");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const userUpdate = async (event, context) => {
  const data = JSON.parse(event.body);
  data.updatedAt = Date.now();
  let params = {};
  params = {
    TableName: process.env.USER_TABLE_NAME,
    Key: { email: data.email, userName: data.userName },
    ExpressionAttributeNames: { "#name": "name", "#updatedAt": "updatedAt" },
    ConditionExpression: 'attribute_exists(email)',
    ExpressionAttributeValues: {
      ":name": data.name,
      ":updatedAt": data.updatedAt,
    },
    UpdateExpression: "SET #name = :name, #updatedAt = :updatedAt",
  };


  try {
    let updateUser = await dynamoDb.update(params).promise();
    return responseHandler({
      statusCode: 200,
      message: "User Updated Successfully",
      data: data,
    });
  } catch (error) {
    console.log("error.....................", error);
    return responseHandler({
      statusCode: 500,
      message: "User Not Updated",
      data: "Error: "+ error,
    });
  }
};

module.exports.handler = userUpdate;
