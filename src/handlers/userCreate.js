const AWS = require("aws-sdk");
const { responseHandler } = require("../lib/response");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const userCreate = async (event, context) => {
  const data = JSON.parse(event.body);

  if(!data.isDeleted){ data.isDeleted = 0 }
  if(!data.createdAt){ data.createdAt =  Date.now() }
  if(data.email && !data.name){ data.name = (data.email.charAt(0).toUpperCase() + data.email.slice(1)).substring(0,data.email.indexOf('@')) }

  let params = {};
  params = {
    TableName: process.env.USER_TABLE_NAME,
    Item: data
  };
  try {
    let createUser =await dynamoDb.put(params).promise();
    return responseHandler({
      statusCode: 200,
      message: "User Created Successfully",
      data:  params.Item ,
    });
  } catch (error) {
    console.log("error.....................", error);
    return responseHandler({
      statusCode: 500,
      message: "User Not Created",
      data: '',
    });
  }
  
};

module.exports.handler = userCreate;
