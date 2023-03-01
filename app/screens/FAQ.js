import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import {
    StyleSheet,
    View,
} from 'react-native'
import { ThemeContext } from '../theme-context'
import {
    Screen,
    Text,
} from '../components'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as WebBrowser from 'expo-web-browser'

const FAQ = ({ navigation, }) => {
    const { theme } = useContext(ThemeContext)
    const s = getStyles(theme)

    return (
        <SafeAreaView edges={['right', 'bottom', 'left']} style={s.background}>
            <Screen>
                <View style={s.container}>
                    <View style={s.child}>
                        <Text style={s.bold}>{`How do I search for a particular machine?`}</Text>
                        <Text style={s.text}>{`When you're on the map screen, click the "filter" button in the upper right, then choose a machine. Then go back to the map and it will only show places with that machine.`}</Text>
                        <Text style={s.bold}>{`This location closed/no longer has machines. What do I do - do I need to tell you?`}</Text>
                        <Text style={s.text}>{`Simply remove all the machines from it. Empty locations are periodically removed.`}</Text>
                        <Text style={s.bold}>{`How do I get listed as an operator?`}</Text>
                        <Text style={s.text}>{<Text onPress={() => navigation.navigate('Contact')} style={s.textLink}>{"Contact us"}</Text>}{` and we'll add you. Once you tag all of your locations, you'll be able to quickly see all your locations using the "Filter". You can also choose to be notified about comments made to your machines. Let us know if you want those notifications!`}</Text>
                        <Text style={s.bold}>{`How do I remove a machine from a location?`}</Text>
                        <Text style={s.text}>{`You have to be logged in (if you don't have account, please create one). Click on the machine name, and then look for the "remove" button or the trash can icon.`}</Text>
                        <Text style={s.bold}>{`This location is temporarily closed. Should I remove the machines from it?`}</Text>
                        <Text style={s.text}>{`No. If a place is seasonal or closed due to restrictions, and is expected to re-open, please do not remove the machines from it. Just edit the location description to say it's temporarily closed. You can also make sure the phone number is listed, so that people can easily call and check on the status.`}</Text>
                        <Text style={s.bold}>{`I see you have a ranking system for contributors. How do I earn a contributor badge and title?`}</Text>
                        <Text style={s.text}>{`Great question! As a small token of acknowledgement of your contributions to the map, if you make more than 50 contributions, we christen you a "Super Mapper". After 250 contributions, you are a "Legendary Mapper". And after 500 amazing map contributions, you are a "Grand Champ Mapper"!`}</Text>
                        <Text style={s.bold}>{`How can I submit a backglass photo to the “machine details” screen?`}</Text>
                        <Text style={s.text}>The photos we display come from the Open Pinball Database (OPDB), and so you should upload your high quality photo using <Text style={s.textLink} onPress={() => WebBrowser.openBrowserAsync('https://opdb.org/images/create')}>this form</Text> (you must first create an OPDB account). The photos you upload will not immediately appear in this app.</Text>
                        <Text style={s.text}><Text style={{ fontFamily: 'boldFont' }}>General backglass/translite photo guidelines</Text>:
                            Take photo straight on, not at an angle. Crop image to show only artwork. Avoid glare, if possible</Text>
                        <Text style={s.bold}>{`The Location List isn't showing a location that I think it should.`}</Text>
                        <Text style={s.text}>{`The Location List lists what is currently shown on the map. If you pan/zoom the map, it will list different things.`}</Text>
                        <Text style={s.bold}>{`How do I add a new location?`}</Text>
                        <Text style={s.text}>{`Fill out`} <Text onPress={() => navigation.navigate('SuggestLocation')} style={s.textLink}>{"this form"}</Text>! {`You can also reach the submission form by clicking the menu icon in the lower right, and choosing "Submit Location". Our administrators moderate submissions, so please allow 0 - 7 days or so for it to be approved. The more accurate and thorough your submission, the quicker it will get added!`}</Text>
                        <Text style={s.bold}>{`Can I add my private collection to the map?`}</Text>
                        <Text style={s.text}>{`No. Pinball Map only lists publicly-accessible locations. The definition of "public" varies - some places have entrance fees, or limited hours. But overall, the location has to be inclusive and accessible. So please don't submit your house or a private club that excludes people from becoming members.`}</Text>
                        <Text style={s.bold}>{`When I search for a city, the city is listed twice (and maybe the second instance of it is misspelled). Or, I see the same location listed twice. Or, the place is in the wrong spot on the map. Etc.`}</Text>
                        <Text style={s.text}>{`These are data entry mistakes. Please `}<Text onPress={() => navigation.navigate('Contact')} style={s.textLink}>{"contact us"}</Text>{` so we can fix them.`}</Text>
                        <Text style={s.bold}>{`I can't remember my password. How do I reset it?`}</Text>
                        <Text style={s.text}>{`You can reset it via`} <Text onPress={() => navigation.navigate('PasswordReset')} style={s.textLink}>{"this link"}</Text>.</Text>
                        <Text style={s.bold}>{`Can you add a feature that I want?`}</Text>
                        <Text style={s.text}>{`Maybe! We can try. Pinball Map is an open source app. You can submit "issues" to`} <Text style={s.textLink} onPress={() => WebBrowser.openBrowserAsync('https://github.com/pinballmap/pbm-react')}>{`the Github repository`}</Text>{`, and you can also directly contribute code.`}</Text>
                        <Text style={s.bold}>{`What is your privacy policy?`}</Text>
                        <Text style={s.text}>Please see the <Text style={s.textLink} onPress={() => WebBrowser.openBrowserAsync('https://pinballmap.com/privacy')}>detailed privacy policy on our website</Text>. The overview: We do not track or store user locations, nor store any personal information. We do not sell any user data. We do not use third-party analytics. This site is not monetized. We keep a log of map edits that users make.</Text>
                        <Text style={s.bold}>{`Have a question that we didn't cover here?`} <Text onPress={() => navigation.navigate('Contact')} style={s.textLink}>{"Ask us!"}</Text></Text>
                    </View>
                </View>
            </Screen>
        </SafeAreaView>
    )
}

const getStyles = theme => StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: theme.base1
    },
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        flex: 1,
    },
    child: {
        margin: "auto",
    },
    text: {
        fontSize: 16,
        color: theme.text2,
        lineHeight: 22,
        marginBottom: 15,
        marginLeft: 15,
        marginRight: 15,
    },
    bold: {
        fontFamily: 'boldFont',
        fontSize: 17,
        marginBottom: 10,
        padding: 10,
        color: '#ede8fe',
        backgroundColor: '#727290'
    },
    textLink: {
        textDecorationLine: 'underline',
        color: theme.pink1,
    },
})

FAQ.propTypes = {
    navigation: PropTypes.object,
}

export default FAQ
