import {AsyncStorage} from "react-native";

const TOKEN = "token";
const getToken = async ()=>{
    try {
        let token = await AsyncStorage.getItem(TOKEN);
        return new Promise((resolve, reject) => {resolve(token)});
    } catch (error) {
        console.log('GET AsyncStorage error: ' + error.message);
    }
}

const setToken = async (token) =>{
    try {
        await AsyncStorage.setItem(TOKEN, token);
    } catch (error) {
        console.log('SET AsyncStorage error: ' + error.message);
    }
}

const get = async (key)=>{
    try {
        let value = await AsyncStorage.getItem(key);
        return new Promise((resolve, reject) => {resolve(value)});
    } catch (error) {
        console.log('GET AsyncStorage error: ' + error.message);
    }
}

const set = async (key, value) =>{
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log('SET AsyncStorage error: ' + error.message);
    }
}

export {get, set, setToken, getToken}