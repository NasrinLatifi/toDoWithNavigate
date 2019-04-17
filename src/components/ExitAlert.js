import {Alert , BackHandler} from 'react-native';

const ExitAlert = () => {
  Alert.alert(
    'Confirm exit',
    'Do you want to quit the app?'
    [
      {text: 'CANCEL', style: 'cancel'},
      {text: 'OK', onPress: () => BackHandler.exitApp()}
    ],
    {cancelable: false},
  );
};
export default ExitAlert;
