import { registerRootComponent } from 'expo'
import React, { useState, useEffect } from 'react'
import { Appearance } from 'react-native'
import { retrieveItem } from './app/config/utils'
import { ThemeContext } from './app/theme-context'
import { Provider } from 'react-redux'
import { PbmStack } from './app/config/router'
import { dark, standard } from './app/utils/themes'
import { StatusBar } from 'expo-status-bar'
import {
    useFonts,
    Lato_400Regular,
    Lato_400Regular_Italic,
    Lato_700Bold,
} from '@expo-google-fonts/lato'
import {
    Nunito_700Bold,
} from '@expo-google-fonts/nunito'
import AppLoading from 'expo-app-loading'
import store from './app/store'
import * as SplashScreen from 'expo-splash-screen'
import { AppWrapper } from './app/components'

const defaultTheme = Appearance.getColorScheme()

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
    let [fontsLoaded] = useFonts({
        regularFont: Lato_400Regular,
        regularBoldFont: Lato_700Bold,
        regularItalicFont: Lato_400Regular_Italic,
        boldFont: Nunito_700Bold,
    })

    if (!fontsLoaded) {
        return <AppLoading />
    }
    return (
        <ThemeContext.Provider value={{
            toggleDefaultTheme,
            toggleDarkTheme,
            theme: selectedTheme === 'dark' ? dark : standard
        }}>
            <Provider store={store}>
                <AppWrapper>
                    <PbmStack theme={selectedTheme === 'dark' ? 'dark' : 'light'} />
                </AppWrapper>
            </Provider>
            <StatusBar style={selectedTheme === 'dark' ? 'light' : 'dark'} translucent={true} />
        </ThemeContext.Provider>
    )
}

export default registerRootComponent(App)
