import {Dimensions} from 'react-native';

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.95;
export const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.35;
export const MAX_UPWORD_TRANSLATE_Y = BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT;
export const MAX_DOWNWORD_TRANSLATE_Y = 0;