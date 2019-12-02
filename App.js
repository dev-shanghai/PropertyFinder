/**
 * 
 * Asim Khan
 * 
 */
'use strict';
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,NavigatorIOS} from 'react-native';
import SearchPage from './jvx_files/SearchPage'

export default class App extends Component {
  render() {
    
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Property Finder',
          component: SearchPage,
        }}/>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});

