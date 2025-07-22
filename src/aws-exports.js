const awsConfig = {
  Auth: {
    Cognito:{
      region: 'us-east-1',
      userPoolId: import.meta.env.VITE_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID,
      mandatorySignIn: true,
      authenticationFlowType: 'USER_PASSWORD_AUTH',
    }
  },
};

export default awsConfig;
