import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';

class FlatListDemo extends Component{

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false
        };
    }


   componentWillMount(){
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        
        const { page, seed } = this.state;
        const url = 'https://randomuser.me/api/?seed=${seed}&page=${page}&results=20';
        this.setState({ loading: true });
        fetch(url).then(res => res.json())
        .then(res => {
            this.setState({
                data: page === 1 ? res.results : [...this.state.data, ...res.results],
                error: res.error || null,
                loading: false,
                refreshing: false
            });
        })
        .catch(error => {
            this.setState({error, loading: false});
        });
    };

    renderSeparator = () => {
        return(
            <View
                style = {{
                    height: 1,
                    width: '86%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '14%'
                }}
            />
        );
    }

    renderHeader = () => {
        return <SearchBar placeholder = "Type here..." lightTheme round />;
    };

    renderFooter =() => {
        return (
            <View style={{paddingVertical: 20, borderTopWidth: 1, borderTopColor: '#CED0CE'}}>
                <ActivityIndicator animating size="large"/>
            </View>
        );
    }

    render(){
        return(
           
            <List containerStyle = {{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                <FlatList
                data={this.state.data}
                renderItem={({ item }) => (
                    <TouchableOpacity>
                    <ListItem
                    roundAvatar
                    title={`${item.name.first} ${item.name.last}`}
                    subtitle={item.email}
                    avatar={{ uri: item.picture.thumbnail }}
                    containerStyle={{ borderBottomWidth: 0 }}
                    />
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.email }
                ItemSeparatorComponent={this.renderSeparator}
                ListHeaderComponent={this.renderHeader}
                ListFooterComponent={this.renderFooter}
                />
                
            </List>
        );
    }
}

export default FlatListDemo;