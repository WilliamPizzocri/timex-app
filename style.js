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
        borderTopEndRadius: 40,
        borderTopLeftRadius: 40,
        paddingTop: 20,
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
    },
    AddContainer: {
        width: '90%',
        height: '90%',
        shadowColor: "#171717",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity:  0.17,
        shadowRadius: 3.05,
        elevation: 4,
        backgroundColor: 'white',
        borderRadius: 10,
        position: 'relative',
        top: 50,
        paddingHorizontal: 20, 
        paddingVertical: 15,
        marginBottom: 70,
        alignSelf: 'center',
    },
    AddField: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        width: '100%',
        backgroundColor: '#DFE2E5',
        borderRadius: 5,
        marginTop: 5,
    },
    TimeDataLabel: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        alignSelf: 'center',
        marginTop: 5,
        flexDirection: 'row',
        backgroundColor: '#DFE2E5',
        borderRadius: 5,
        flex: 1,
    },
    TimeDateContainer: {
        flexDirection: 'row',
    },
    selectItem: {
        backgroundColor: '#DFE2E5',
        paddingVertical: 10,
        paddingHorizontal: 10,
        elevation: 5,
    }
});
  