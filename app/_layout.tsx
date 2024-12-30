import '../global.css'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { Theme, ThemeProvider } from '@react-navigation/native'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { Platform } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { NAV_THEME } from '@/lib/constants'
import { useColorScheme } from '@/lib/useColorScheme'

const LIGHT_THEME: Theme = {
	dark: false,
	colors: NAV_THEME.light,
	fonts: {
		regular: {
			fontFamily: '',
			fontWeight: 'normal'
		},
		medium: {
			fontFamily: '',
			fontWeight: '500'
		},
		bold: {
			fontFamily: '',
			fontWeight: 'bold'
		},
		heavy: {
			fontFamily: '',
			fontWeight: '900'
		}
	}
}
const DARK_THEME: Theme = {
	dark: true,
	colors: NAV_THEME.dark,
	fonts: {
		regular: {
			fontFamily: '',
			fontWeight: 'normal'
		},
		medium: {
			fontFamily: '',
			fontWeight: '500'
		},
		bold: {
			fontFamily: '',
			fontWeight: 'bold'
		},
		heavy: {
			fontFamily: '',
			fontWeight: '900'
		}
	}
}

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: '(drawer)'
}

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary
} from 'expo-router'

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme()
	const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false)

	React.useEffect(() => {
		;(async () => {
			const theme = await AsyncStorage.getItem('theme')
			if (Platform.OS === 'web') {
				// Adds the background color to the html element to prevent white background on overscroll.
				document.documentElement.classList.add('bg-background')
			}
			if (!theme) {
				AsyncStorage.setItem('theme', colorScheme)
				setIsColorSchemeLoaded(true)
				return
			}
			const colorTheme = theme === 'dark' ? 'dark' : 'light'
			if (colorTheme !== colorScheme) {
				setColorScheme(colorTheme)

				setIsColorSchemeLoaded(true)
				return
			}
			setIsColorSchemeLoaded(true)
		})().finally(() => {
			SplashScreen.hideAsync()
		})
	}, [])

	if (!isColorSchemeLoaded) {
		return null
	}

	return (
		<ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
			<StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
			<GestureHandlerRootView style={{ flex: 1 }}>
				<Stack>
					<Stack.Screen
						name='(drawer)'
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name='modal'
						options={{ title: 'Modal', presentation: 'modal' }}
					/>
				</Stack>
			</GestureHandlerRootView>
		</ThemeProvider>
	)
}
