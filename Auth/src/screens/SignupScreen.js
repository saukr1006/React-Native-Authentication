import React, { useContext} from "react";
import { View, StyleSheet } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import Navlink from "../components/NavLink";
import { NavigationEvents } from "react-navigation";

const SignupScreen = ({ navigation }) => {
    const { state, signup, clearErrorMessage } = useContext(
        AuthContext
    );

    return (
        <View style={styles.container}>
            <NavigationEvents
                onWillBlur={() => {
                    clearErrorMessage;
                }}
            />
            <AuthForm
                headerText="Sign Up"
                errorMessage={state.errorMessage}
                submitButtonText="Sign Up"
                onSubmit={({ email, password }) => signup({ email, password })}
            />
            <Navlink routeName="Signin" text="Already have an account? Sign in" />
        </View>
    );
};

SignupScreen.navigationOptions = () => {
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

export default SignupScreen;
