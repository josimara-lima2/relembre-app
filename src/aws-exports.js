const awsConfig = {
  Auth: {
    Cognito:{
      region: 'us-east-1',
      userPoolId: 'us-east-1_zje05xr1v',
      userPoolClientId: '29brgqjjls0v16g57ja93bmrkb',
      mandatorySignIn: true,
      authenticationFlowType: 'USER_PASSWORD_AUTH',
    }
  },
};

export default awsConfig;
