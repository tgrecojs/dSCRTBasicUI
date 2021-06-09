import {useEffect, useState} from 'react';
import {getFromLS, setToLS} from '../utils/storage';
import _ from 'lodash';

export const useTheme = () => {
    const themes = getFromLS('all-themes');
    const [theme, setTheme] = useState(themes.data.light);
    const [themeLoaded, setThemeLoaded] = useState(false);

    const setMode = mode => {
        setToLS('theme', mode)
        setTheme(mode);
    };

    const getFonts = () => {
        return _.values(_.mapValues(themes.data, 'font'));
    }

    useEffect(() =>{
        const localTheme = getFromLS('theme');
        localTheme ? setTheme(localTheme) : setTheme(themes.data.light);
        setThemeLoaded(true);
    }, []);

    return { theme, themeLoaded, setMode, getFonts };
};
