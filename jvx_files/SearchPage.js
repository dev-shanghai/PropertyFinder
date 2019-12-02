'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,View,TextInput,Button,
    Image,ActivityIndicator,

} from 'react-native';
import {urlForQueryAndPage} from './Utility';
import SearchResults from './SearchResults';

export default class SearchPage extends Component {
    
    // Default Constructor 
    constructor(props) {
        
        super(props);

        this.state = {
          searchString: 'london',
          isLoading: false,
          message: '',
        };
    }

    // Private Methods
    _onSearchTextChanged = (event) => {
        
        console.log('_onSearchTextChanged');
        this.setState({ searchString: event.nativeEvent.text });
        console.log('Current: '+this.state.searchString+', Next: '+event.nativeEvent.text);
    };
    _executeQuery = (query) => {
        console.log(query);
        this.setState({ isLoading: true });

    };  
    _onSearchPressed = () => {
        const query = urlForQueryAndPage('place_name', this.state.searchString, 1);
        this._executeQuery(query);
        fetch(query)
            .then(response => response.json())
            .then(json=>this._handleResponse(json.response))
            .catch(error => this.setState({
                isLoading: false,
                message: 'Something bad happened ' + error,
            }));
            console.log("error");

    };
    _handleResponse = (response) => {
        this.setState({ isLoading: false, message: '', });
        if (response.application_response_code.substr(0,1) === '1') {
            console.log('Properties found : ' + response.listings.length);
            this.props.navigator.push({
                title:'Results',
                component:SearchResults,
                passProps:{listings: response.listings}
            });
        } else {
            this.setState({ message: 'Location not recognized, please try again later. ' });
        }

    };
    
    render() {
        
        const spinner = this.state.isLoading ? 
        <ActivityIndicator size='large'/> : null;
        
        console.log('SearchPage.render');
        return (
            <View style={styles.container}>
              <Text style={styles.description}>
                Search for houses to buy!
              </Text>
              <Text style={styles.description}>
                Search by place-name or postcode.
              </Text>
              <View style={styles.flowRight}>
                <TextInput
                    style={styles.searchInput}
                    value={this.state.searchString}
                    onChange={this._onSearchTextChanged}
                    placeholder='Search via name or postcode' />
                <Button
                    onPress={() => {}}
                    color='#48BBEC'
                    onPress={this._onSearchPressed}
                    title='Go' />
              </View>
              <Image source={require('../img/house.png')} style={styles.image}/>
              {spinner}
              <Text style={styles.description}>{this.state.message}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center',
        flexDirection: 'column',
    },
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flexGrow: 1,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC',
    },
    image: {
        width: 217,
        height: 138,
    },

});