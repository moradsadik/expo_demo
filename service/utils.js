import { Alert } from "react-native";

const parse = (input) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let str = input.replace(/=+$/, '');
    let output = '';

    if (str.length % 4 == 1) {
        throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (let bc = 0, bs = 0, buffer, i = 0;
        buffer = str.charAt(i++);

        ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
        buffer = chars.indexOf(buffer);
    }
    
    return output;
}

const tokenToJson = (token) => {
    return JSON.parse(parse(token))
}


const alert = (title, msg) => {
    Alert.alert(
        title,
        msg,
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
    );
}

const isEmpty = (obj) => {
    return Object.keys(obj).length === 0
}


export {tokenToJson,alert, isEmpty}