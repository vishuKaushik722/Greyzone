import React, { PureComponent } from 'react'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { View, Text, Image, StatusBar, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import color from '../../constants/colors'

class MainCarousel extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            activeSlide: 0,
            entries: [
                {
                    imagePath: require('../../assets/find_happiness.png'),
                    heading: 'Find happiness',
                    subHeading: 'A one stop solution for your all mental health & day to day problems'
                },
                {
                    imagePath: require('../../assets/online_consultation.png'),
                    heading: 'Online consultation',
                    subHeading: 'Connected with therapist from all across the globe with just a one click'
                },
                {
                    imagePath: require('../../assets/transform_yourself.png'),
                    heading: 'Transform yourself',
                    subHeading: 'Get amazing changes with our custom built programmes'
                }
            ],
        }
    }
    _renderItem = ({ item, index }) => {
        return (
            <View style={{ ...styles.carouselBox }} key={index}>
                <Image resizeMode="contain" style={{ width: DeviceWidth, height: DeviceWidth * 0.746 }} source={item.imagePath} />
                <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 30 }}>
                    <Text style={{ color: color.TEXT_PRIMARY, fontSize: 28, fontWeight: 'bold' }}>{item.heading}</Text>
                    <Text style={{ color: color.TEXT_PRIMARY, fontSize: 14, fontWeight: '600', marginTop: 10 }}>{item.subHeading}</Text>
                </View>
            </View>
        )
    }

    Pagination = () => {
        const { entries, activeSlide } = this.state;
        return (
            <Pagination
                dotsLength={this.state.entries.length}
                activeDotIndex={this.state.activeSlide}
                containerStyle={{ backgroundColor: 'transparent' }}
                dotStyle={{
                    width: 12,
                    height: 6,
                    borderRadius: 10,
                    //   marginHorizontal: 0.5,
                    backgroundColor: color.PURPLE_LIGHT
                }}
                inactiveDotStyle={{
                    // Define styles for inactive dots here
                    width: 6,
                    height: 6,
                    borderRadius: 5,
                    //   marginHorizontal: 0.5,
                    backgroundColor: color.TEXT_SECONDARY
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    }


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: color.WHITE }}>
                <TouchableOpacity style={{ marginVertical: 20, alignItems: 'flex-end', paddingRight: 20 }}>
                    <Text style={{ color: color.TEXT_SECONDARY, fontSize: 14 }}>Skip</Text>
                </TouchableOpacity>
                <View>
                    <Carousel
                        data={this.state.entries}
                        renderItem={this._renderItem}
                        onSnapToItem={(index) => this.setState({ activeSlide: index })}
                        sliderWidth={DeviceWidth}
                        itemWidth={DeviceWidth}
                        activeSlideAlignment='center'
                        //    layout="stack"
                        //    layoutCardOffset={2} 
                        //   autoplay={true}
                        layout="default"
                        loop={true}
                        windowSize={1}
                    />
                    <this.Pagination />
                </View>
                <TouchableOpacity style={{ ...styles.primaryBtn }} onPress={() => this.props.navigation.navigate('Enter Details', {
                    mobileNo: 9696805422,
                    signup: true
                })}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: color.TEXT_WHITE, letterSpacing: 0.8 }}>Sign Up</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 50 }}>
                    <Text style={{ fontSize: 14, color: color.TEXT_PRIMARY }}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={{ color: color.PINK, fontSize: 14, }}>  Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default MainCarousel;
const DeviceWidth = Dimensions.get('window').width
const DeviceHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
    carouselBox: {
        borderRadius: 8,
        elevation: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    primaryBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.PURPLE_LIGHT,
        marginHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 6,
        marginVertical: 30
    }
})