import React, {useState} from 'react';
import Background from '../components/Background';
import Header from '../components/Header';
import ErrorText from '../components/ErrorText';
import PasswordInput from '../components/PasswordInput';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import {getService} from '../hooks/getService';
import AuthService from '../service/AuthService';

const ResetPasswordScreen = ({navigation, route}) => {
  const {cognitoUser} = route.params;
  const [error, setError] = useState();
  const [password, setPassword] = useState();
  const [showSpinner, setShowSpinner] = useState(false);

  const onResetPassword = () => {
    setShowSpinner(true);
    getService(AuthService)
      .completeNewPasswordChallenge(cognitoUser, password)
      .then(
        () => {
          setShowSpinner(false);
          navigation.reset({
            index: 0,
            routes: [{name: 'HomeScreen'}],
          });
        },
        error => {
          setShowSpinner(false);
          setError(error.message);
        },
      );
  };

  return (
    <Background>
      <Header>Please Reset your Password</Header>
      <ErrorText errorText={error} />
      <PasswordInput
        label={'New Password'}
        value={password}
        returnKeyType={'done'}
        onChange={text => setPassword(text)}
      />
      <Button
        mode="contained"
        onPress={onResetPassword}
        style={{marginTop: 16}}
      >
        Reset password
      </Button>
      <Spinner show={showSpinner} />
    </Background>
  );
};

export default ResetPasswordScreen;
