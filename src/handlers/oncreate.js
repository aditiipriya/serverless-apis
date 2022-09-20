const AWS = require("aws-sdk");
const { responseHandler } = require("../lib/response");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const sgMail = require('@sendgrid/mail');
// const SENDGRID_KEY =  process.env.SENDGRID_KEY; 
// const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL; 
// const SENDGRID_TO_EMAIL = process.env.SENDGRID_TO_EMAIL;
const SENDGRID_KEY="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";
const SENDGRID_FROM_EMAIL="aditipriya@yopmail.com";
const SENDGRID_TO_EMAIL="aditi.mobcoder@gmail.com";
sgMail.setApiKey(SENDGRID_KEY);

const oncreate = async (event, context) => {
  console.log("....Oncreate hitted....SENDGRID_FROM_EMAIL..............." , SENDGRID_FROM_EMAIL  );

  const sendCustomMailTemplate = async ( SENDGRID_FROM_EMAIL, SENDGRID_TO_EMAIL) => {
    const msg = {
      to: SENDGRID_TO_EMAIL,
      from: SENDGRID_FROM_EMAIL,
      subject:"A new user got inserted",
        //templateId: templateId,
      text:"inserted new user name",
    };
    await sgMail.send(msg)
    .then((msz) => {
        console.log('Message sent........................................',msz)
    }).catch((error) => {
        console.log("errrrrrrr..........................", error)
    })
  };
  await sendCustomMailTemplate(SENDGRID_FROM_EMAIL, SENDGRID_TO_EMAIL)
};

module.exports.handler = oncreate;
