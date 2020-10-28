import React,{useContext} from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import {SafeAreaView} from 'react-navigation';

const AccountScreen = () => {
    const {signout } = useContext(
        AuthContext
    );

    return (
        <SafeAreaView forceInset={{top:'always'}}>
            <Text>hello</Text>
            <Spacer>
                <Button title="Sign out" onPress={signout} />
            </Spacer>
        </SafeAreaView>
    );
};

const style = StyleSheet.create({});

export default AccountScreen;
