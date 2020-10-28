import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationEvents } from "react-navigation";
import AuthForm from "../components/AuthForm";
import Navlink from "../components/NavLink";
import { Context as AuthContext } from "../context/AuthContext";
import {SafeAreaView} from 'react-navigation';

const SigninScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{top:'always'}} style={styles.container}>
      <NavigationEvents
        onWillBlur={() => {
          clearErrorMessage
        }}
      />
      <AuthForm
        headerText="Sign In to your Account"
        errorMessage={state.errorMessage}
        submitButtonText="Sign In"
        onSubmit={({ email, password }) => signin({ email, password })}
      />
      <Navlink text="Don't have an account? Sign in" routeName="Signup" />
    </SafeAreaView>
  );
};

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
});

export default SigninScreen;
