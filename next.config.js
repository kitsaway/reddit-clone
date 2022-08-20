/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    AWS_PROJECT_REGION: process.env.AWS_PROJECT_REGION,
    AWS_APPSYNC_GRAPHQLENDPOINT: process.env.AWS_APPSYNC_GRAPHQLENDPOINT,
    AWS_APPSYNC_REGION: process.env.AWS_APPSYNC_REGION,
    AWS_APPSYNC_AUTHTYPE: process.env.AWS_APPSYNC_AUTHTYPE,
    AWS_APPSYNC_APIKEY: process.env.AWS_APPSYNC_APIKEY,
    AWS_COGNITO_IDENTITY_POOL_ID: process.env.AWS_COGNITO_IDENTITY_POOL_ID,
    AWS_COGNITO_REGION: process.env.AWS_COGNITO_REGION,
    AWS_USER_POOLS_ID: process.env.AWS_USER_POOLS_ID,
    AWS_USER_POOLS_WEB_CLIENT_ID: process.env.AWS_USER_POOLS_WEB_CLIENT_ID,
    AWS_COGNITO_SIGNUP_ATTRIBUTES: process.env.AWS_COGNITO_SIGNUP_ATTRIBUTES,
    AWS_COGNITO_MFA_CONFIGURATION: process.env.AWS_COGNITO_MFA_CONFIGURATION,
    AWS_COGNITO_MFA_TYPES: process.env.AWS_COGNITO_MFA_TYPES,
    AWS_COGNITO_VERIFICATION_MECHANISMS:
      process.env.AWS_COGNITO_VERIFICATION_MECHANISMS,
    AWS_USER_FILES_S3_BUCKET: process.env.AWS_USER_FILES_S3_BUCKET,
    AWS_USER_FILES_S3_BUCKET_REGION:
      process.env.AWS_USER_FILES_S3_BUCKET_REGION,
  },
};