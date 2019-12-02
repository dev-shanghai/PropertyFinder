'use strict';
import React, {Component,} from 'react';
import {
    StyleSheet, View,
    TouchableHighlight, FlatList, Text,
} from 'react-native';
import ListItem from './ListItem';

class SearchResults extends Component {

    // Private Methods and Properties
    _keyExtractor = (item, index) => index; 
    _renderItem = ({item, index}) => (
        <ListItem
          item={item}
          index={index}
          onPressItem={this._onPressItem}
        />
    );

    _onPressItem = (index) => {
        console.log("Pressed row: "+index);
        console.log("Did selected.")
    };

    /*
    _renderItem = ({item}) => {
        return (
            <TouchableHighlight
            underlayColor='#dddddd'
            >
                <View>
                    <Text>
                        {item.title}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    };
    */

    render() {

        return (
            <FlatList
            data={this.props.listings}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            > 

            </FlatList>
        );
    }
}

export default SearchResults;