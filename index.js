import 'react-native-gesture-handler'
import { registerRootComponent } from 'expo'
import React, { useCallback, useState, useEffect } from 'react'
import { Appearance, Platform } from 'react-native'
import { retrieveItem } from './app/config/utils'
import { ThemeContext } from './app/theme-context'
import { Provider } from 'react-redux'
import { NavigationContainer } from "@react-navigation/native"
import { dark, standard } from './app/utils/themes'
import { StatusBar } from 'expo-status-bar'
import {
    useFonts,
    Lato_400Regular,
    Lato_400Regular_Italic,
    Lato_700Bold,
} from '@expo-google-fonts/lato'
import {
    Nunito_400Regular,
    Nunito_700Bold,
} from '@expo-google-fonts/nunito'
import store from './app/store'
import * as SplashScreen from 'expo-splash-screen'
import { AppWrapper } from './app/components'
import MapNavigator from './app/config/router'
import * as Sentry from 'sentry-expo'

Sentry.init({
    dsn: 'https://057bae9b04f2410db6e4f1bd8d3eff2c@o1352308.ingest.sentry.io/6633526',
    enableInExpoDevelopment: true,
    debug: false
})

SplashScreen.preventAutoHideAsync()

const defaultTheme = Appearance.getColorScheme()

// https://github.com/facebook/react-native/issues/19410
if (Platform.OS === 'android') {
    require('intl')
    require('intl/locale-data/jsonp/en-US')
}

const App = () => {
    const [selectedTheme, setSelectedTheme] = useState(defaultTheme === 'dark' ? 'dark' : '')

    useEffect(() => {
        retrieveItem('defaultThemeOverride')
            .then(defaultThemeOverride => defaultTheme !== 'dark' && defaultThemeOverride && setSelectedTheme('dark'))

        retrieveItem('darkThemeOverride')
            .then(darkThemeOverride => defaultTheme === 'dark' && darkThemeOverride && setSelectedTheme(''))

        async function prepare() {
            await SplashScreen.preventAutoHideAsync()
        }
        prepare()

    }, [])

    const toggleDefaultTheme = () => defaultTheme !== 'dark' && setSelectedTheme(selectedTheme === 'dark' ? '' : 'dark')
    const toggleDarkTheme = () => defaultTheme === 'dark' && setSelectedTheme(selectedTheme === 'dark' ? '' : 'dark')
    const [fontsLoaded] = useFonts({
        regularFont: Lato_400Regular,
        regularBoldFont: Lato_700Bold,
        regularItalicFont: Lato_400Regular_Italic,
        mediumFont: Nunito_400Regular,
        boldFont: Nunito_700Bold,
    })

    if (!fontsLoaded) {
        return null
    }

    return (
        <ThemeContext.Provider value={{
            toggleDefaultTheme,
            toggleDarkTheme,
            theme: selectedTheme === 'dark' ? dark : standard
        }}
        >
            <Provider store={store}>
                <AppWrapper>
                    <NavigationContainer theme={selectedTheme === 'dark' ? dark : standard}>
                        <MapNavigator />
                    </NavigationContainer>
                </AppWrapper>
            </Provider>
            <StatusBar style={selectedTheme === 'dark' ? 'light' : 'dark'} translucent={true} />
        </ThemeContext.Provider>
    )
}

export default registerRootComponent(App)
