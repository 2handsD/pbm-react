import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    Dimensions,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { Button } from 'react-native-elements'
import { ThemeContext } from '../theme-context'
import {
    loginLater,
} from '../actions'
import { formatNumWithCommas } from '../utils/utilityFunctions'

let deviceHeight = Dimensions.get('window').height

const SignupLogin = ({ navigation, allMachinesCount, allLocationsCount, loginLater }) => {
    const { theme } = useContext(ThemeContext)
    const s = getStyles(theme)
    return(
        <ImageBackground source={require('../assets/images/app_logo.jpg')} style={s.backgroundImage}>
            <View style={[s.mask,s.justify]}>
                <View style={s.logoWrapper}>
                    <Image source={require('../assets/images/pinballmapcom_nocom.png')} style={s.logo}/>
                </View>
                <View style={s.outerBorder}>
                    <View style={s.textBg}>
                        <Text style={{fontSize:18,textAlign:"center"}}>
                            <Text>Pinball Map is a user-updated map listing</Text>
                            <Text style={s.bold}> {formatNumWithCommas(allLocationsCount)} </Text>
                            <Text>locations and</Text>
                            <Text style={s.bold}> {formatNumWithCommas(allMachinesCount)} </Text>
                            <Text>machines.</Text>
                            {"\n"}{"\n"}
                            <Text>Please log in to help keep it up to date!</Text>
                            {"\n"}{"\n"}
                            <Text style={{marginTop:15,fontSize:18,textAlign:"center"}}>
                        When prompted, enable locations services to see pinball machines near you!
                            </Text>
                        </Text>
                    </View>
                </View>
                <View style={{paddingVertical:10,paddingHorizontal:15,marginLeft: 15,marginRight: 15}}>
                    <Button
                        onPress={() => navigation.navigate('Login')}
                        raised
                        buttonStyle={s.buttonBlue}
                        titleStyle={s.titleStyle}
                        title="Current User? Log In"
                        accessibilityLabel="Log In"
                        containerStyle={{overflow:'hidden', borderRadius: 25}}
                    />
                    <Button
                        onPress={() => navigation.navigate('Signup')}
                        raised
                        buttonStyle={s.buttonPink}
                        titleStyle={s.titleStyle}
                        title="New User? Sign Up"
                        accessibilityLabel="Sign Up"
                        containerStyle={{marginTop:15,marginBottom:20,overflow:'hidden',borderRadius: 25}}
                    />
                    <Button
                        onPress={() => {
                            loginLater()
                            navigation.navigate('Map')}}
                        title="skip this for now"
                        accessibilityLabel="skip this for now"
                        titleStyle={s.skipTitle}
                        buttonStyle={{backgroundColor:'rgba(255,255,255,.2)',elevation: 0}}
                    />
                </View>
            </View>
        </ImageBackground>
    )
}

const getStyles = theme => StyleSheet.create({
    mask: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,.8)',
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
    },
    bold: {
        fontFamily: 'boldFont',
    },
    outerBorder: {
        marginTop: 10,
        marginBottom: 10,
        marginRight: 20,
        marginLeft: 20,
        borderRadius: 10,
        borderWidth: 4,
        borderColor: 'rgba(0,0,0,.4)',
    },
    textBg: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255,.6)',
    },
    logoWrapper: {
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    logo: {
        width: '100%',
        resizeMode: 'contain',
    },
    buttonPink: {
        backgroundColor: "#fdd4d7",
        elevation: 0,
        borderRadius: 25
    },
    buttonBlue: {
        backgroundColor: "#D3ECFF",
        elevation: 0,
        borderRadius: 25
    },
    titleStyle: {
        color: "#616182",
        fontSize: 16,
        fontFamily: 'boldFont',
    },
    justify: {
        flexDirection: 'column',
        justifyContent: 'center',
        height: deviceHeight
    },
    skipTitle: {
        color: theme.text,
        fontSize: 14,
        textAlign: "center"
    }
})

SignupLogin.propTypes = {
    loginLater: PropTypes.func,
    navigation: PropTypes.object,
    regions: PropTypes.object,
    allMachinesCount: PropTypes.number,
    allLocationsCount: PropTypes.number,
}

SignupLogin.navigationOptions = () => ({
    headerShown: false,
})

const mapStateToProps = ({ regions }) => ({
    allMachinesCount: regions.allMachinesCount,
    allLocationsCount: regions.allLocationsCount
})

const mapDispatchToProps = (dispatch) => ({
    loginLater: () => dispatch(loginLater())
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupLogin)
