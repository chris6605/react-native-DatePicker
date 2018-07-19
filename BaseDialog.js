
import React, { Component } from 'react';

import {
    View,
    Text,
    StatusBar,
    Animated,
    TouchableOpacity,
    Dimensions,
    Keyboard,
    Easing
} from 'react-native';

import BaseComponent from '../base/BaseComponent';

import Const from '../Const';

import SvgUri from 'react-native-svg-uri';

/**
 * Compnent基類,
 * 父類
 */
export default class BaseDialog extends BaseComponent {

    mScreenHeight = Dimensions.get('window').height;

    _path = new Animated.Value(0);

    bgCanPress = true

    constructor(props) {
        super(props);
        this.state = {
            _isShow: false
        }
    }

    isShowing() {
        return this.state._isShow;
    }

    show(state = {}, callback) {
        Keyboard.dismiss();
        this.setState({ _isShow: true, ...state }, () => {
            if (this.bottom) {
                Animated.timing(this._path, {
                    toValue: 1,
                    duration: this._getAnimateDuration(),
                    easing: Easing.linear
                }).start(() => {
                    callback && callback();
                });
            } else {
                Animated.spring(this._path, { toValue: 1 }).start(() => {
                    callback && callback();
                });
            }
        });

    }

    dismiss(callback) {
        Animated.timing(this._path, {
            toValue: 0,
            duration: this._getAnimateDuration(),
            easing: Easing.linear
        }).start(() => {
            this.setState({ _isShow: false }, () => {
                callback && callback();
            });
        });
    }

    /**
     * 重写前景动画效果
     * @param {*} path 
     */
    _getContentInterpolate(path) {
        return [
            {
                translateY: path.interpolate(
                    {
                        inputRange: [0, 0.5, 1],
                        outputRange: [this._getSize(200), this._getSize(200), 0]
                    }
                )
            }
        ]
    }

    _getAnimateDuration() {
        return 300
    }


    _setBGCanPress(isCan) {
        this.bgCanPress = isCan
        return this
    }

    //  前景位置
    _getContentPosition() {
        return { justifyContent: 'center', alignItems: 'center' }
    }

    /**
     * 绘制前景控件
     */
    renderContent() {
        return null;
    }


    //  修改背景的範圍 為當前頁面的寬高
    render() {
        if (this.state._isShow) {
            return <Animated.View
                style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 0x00000050, opacity: this._path.interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [0, 1, 1]
                    }), ...this._getContentPosition(),
                    transform: [
                        {
                            translateX: this._path.interpolate(
                                {
                                    inputRange: [0, 0.01, 1],
                                    outputRange: [-this.mScreenWidth, 0, 0]
                                }
                            )
                        }
                    ]
                }}>
                <TouchableOpacity
                    onPress={() => {
                        if (this.bgCanPress) {
                            this.dismiss();
                        }
                    }}
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, }}
                />

                <Animated.View style={{
                    alignItems: 'center',
                    opacity: this._path.interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [0, 0, 1]
                    }),
                    transform: this._getContentInterpolate(this._path),
                }}>
                    {this.renderContent()}
                </Animated.View>

            </Animated.View>
        } else {
            return null;
        }
    }

}
