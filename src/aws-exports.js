const awsConfig = {
  Auth: {
    Cognito:{
      region: 'us-east-1',
      userPoolId: 'us-east-1_zje05xr1v',
      userPoolClientId: '7hkcod4gn79mq2bvjv5pod2v3p',
      mandatorySignIn: true,
      authenticationFlowType: 'USER_PASSWORD_AUTH',
    }
  },
};

export default awsConfig;
