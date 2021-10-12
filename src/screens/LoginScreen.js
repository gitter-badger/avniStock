import React from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import Colors from '../styles/Colors';
import PasswordInput from '../components/PasswordInput';
import {useSelector, useDispatch} from 'react-redux';
import {loginActions} from '../reducers/LoginReducer';
import ErrorText from '../components/ErrorText';

export default function LoginScreen({navigation}) {
  const dispatch = useDispatch();
  const state = useSelector(storeState => storeState.login);

  const onLoginPressed = () => {
    const nextSteps = {
      success: () =>
        navigation.reset({
          index: 0,
          routes: [{name: 'HomeScreen'}],
        }),
      resetPassword: cognitoUser =>
        navigation.navigate('ResetPasswordScreen', {cognitoUser}),
      failure: error => dispatch({type: loginActions.ON_ERROR, error}),
    };
    dispatch({type: loginActions.ON_LOGIN_START, nextSteps});
  };

  return (
    <Background>
      <Header>Avni Stock</Header>
      <ErrorText errorText={state.loginError} />
      <TextInput
        label="Username"
        returnKeyType="next"
        value={state.userId}
        onChangeText={userId =>
          dispatch({type: loginActions.ON_USER_ID_CHANGE, userId})
        }
        autoCapitalize="none"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <PasswordInput
        label={'Password'}
        value={state.password}
        onChange={password =>
          dispatch({type: loginActions.ON_PASSWORD_CHANGE, password})
        }
        returnKeyType={'done'}
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: Colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: Colors.primary,
  },
});
