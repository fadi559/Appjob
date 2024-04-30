import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import { useLoading } from './LoadingContext';


const CustomLoadingSpinner = ({style}) => {
    const { isLoading } = useLoading();

    if (!isLoading) return null;

    
    const dot1 = useRef(new Animated.Value(0)).current;
    const dot2 = useRef(new Animated.Value(0)).current;
    const dot3 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animate = (dot, delay) => Animated.loop(
            Animated.sequence([
                Animated.timing(dot, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                    delay,
                }),
                Animated.timing(dot, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true,
                })
            ])
        );

        animate(dot1, 0).start();
        animate(dot2, 200).start();
        animate(dot3, 400).start();
    }, [dot1, dot2, dot3]);

    const dotStyle = (dot) => ({
        width: 8,
        height: 8,
        backgroundColor: '#8A2BE2',
        borderRadius: 4,
        margin: 3,
        transform: [{
            translateY: dot.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -14]  // Dot moves up by 14 pixels
            })
        }],
        opacity: dot.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1]  // Adjust the opacity change for more subtle effect
        })
    });

    return (
        <View style={[styles.container,style]}>
            <Animated.View style={dotStyle(dot1)} />
            <Animated.View style={dotStyle(dot2)} />
            <Animated.View style={dotStyle(dot3)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default CustomLoadingSpinner;
