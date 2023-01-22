import { StyleSheet, Text, View } from 'react-native';
import { WINDOW_HEIGHT } from './constants';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    //login screen style
    loginBg: {
        backgroundColor: 'black',
        flex: 1,
        width: '100%',
    },
    svgContainer: {
        position: 'absolute',
        right: 0,
    },
    landingTextCnt: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flex: 1,
        paddingBottom: 20,
    },
    formInputContainer: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        zIndex: 10,
        width: '100%',
        paddingBottom: 10,
    },
    field: {
        paddingVertical: 7,
        width: '80%',
    },
    TextInput: {
        flexDirection: 'row',
        borderBottomWidth: 1.7,
        width: '88%',
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    forgetPwd: {
        width: '88%',
        marginTop: 15,
        alignSelf: 'center',
    }
});
  