import React from 'react';
import {View, Dimensions} from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const DEVICE_HEIGHT = Dimensions.get("window").height;

const HomeSkeleton = () => {
    return (
        <SkeletonPlaceholder>
            <View style={{}}>
                {/* <View style={{ height: 184 }} /> */}

                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 23 }}>
                    <View style={{ width: 160, height: 140, marginHorizontal: 10, borderRadius: 10 }} />
                    <View style={{ width: 160, height: 140, marginHorizontal: 5, borderRadius: 10 }} />
                    <View style={{width: 100, height: 140, marginHorizontal: 10, borderRadius: 10}} />
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 23 }}>
                    <View style={{ width: 270, height: 160, marginHorizontal: 10, borderRadius: 10 }} />
                    <View style={{ width: 160, height: 160, marginHorizontal: 5, borderRadius: 10 }} />
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 23 }}>
                    <View style={{ width: 160, height: 140, marginHorizontal: 10, borderRadius: 10 }} />
                    <View style={{ width: 160, height: 140, marginHorizontal: 5, borderRadius: 10 }} />
                    <View style={{width: 100, height: 140, marginHorizontal: 10, borderRadius: 10}} />
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 23 }}>
                    <View style={{ width: 270, height: 140, marginHorizontal: 10, borderRadius: 10 }} />
                    <View style={{ width: 160, height: 140, marginHorizontal: 5, borderRadius: 10 }} />
                </View>

            </View>
        </SkeletonPlaceholder>
    )
}

export default HomeSkeleton;