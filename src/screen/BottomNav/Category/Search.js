import React, { PureComponent } from 'react'
import { Text, View, FlatList, Image, Dimensions, ImageBackground, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import color from '../../../constants/colors'


class Search extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            search: '',
            filteredDataSource: [],
            masterDataSource: []
        }
    }

    componentDidMount() {
        fetch('https://softezi-greyzon-rishav.herokuapp.com/v1/newItems/')
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({filteredDataSource: responseJson})
          this.setState({masterDataSource: responseJson})
      })
      .catch((error) => {
        console.error(error);
      });
    }
    changeShowSubCategories = (index) => {
        const { categoryList } = this.state
        console.log('categoryList:', categoryList)
        categoryList[index].showSubCategories = !categoryList[index].showSubCategories;
        console.log('categoryList[index].showSubCategories:', categoryList[index].showSubCategories)
        this.setState({ categoryList: categoryList })
    }

    ItemView = ({ item }) => {
        return (
          // Flat List Item
          <Text style={styles.itemStyle} onPress={() => getItem(item)}>
            {item.itemName.toUpperCase()}
          </Text>
        );
      };

    searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
          // Inserted text is not blank
          const newData = this.state.masterDataSource.filter(function (item) {
            // Applying filter for the inserted text in search bar
            const itemData = item.itemName
              ? item.itemName.toUpperCase()
              : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          this.setState({filteredDataSource: newData})
          this.setState({search: text})
        } else {
          // Inserted text is blank
          this.setState({filteredDataSource: this.state.masterDataSource})
          this.setState({search: text})
        }
      };

      ItemSeparatorView = () => {
        return (
          // Flat List Item Separator
          <View
            style={{
              height: 0.5,
              width: '100%',
              backgroundColor: '#C8C8C8',
            }}
          />
        );
      };

      
    render() {
        const theme = color
        const { search } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: color.BACKGROUND }}>
                <View style={{ backgroundColor: theme.PRIMARY_GREEN, paddingHorizontal: 20, paddingTop: 30, borderBottomRightRadius: 30, borderBottomLeftRadius: 30, paddingBottom: 40 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                        <TouchableOpacity
                            style={{ paddingRight: 5 }}
                            onPress={() => { this.props.navigation.goBack() }}>
                            <Image
                                source={require('../../../assets/arrow-left-white2.png')}
                                style={{ width: 16, height: 16, }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 18, letterSpacing: 0.54, lineHeight: 22, color: theme.TEXT_WHITE, fontWeight: 'bold' }}>Category</Text>
                        <Image
                            source={require('../../../assets/cart.png')}
                            style={{ width: 30, height: 30, }}
                            resizeMode="contain"
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: theme.WHITE, borderRadius: 10, paddingHorizontal: 10, marginVertical: 10, marginHorizontal: 20, marginTop: -20, }}>
                    <Image
                        source={require('../../../assets/Mic.png')}
                        style={{ width: 12, height: 19, }}
                        resizeMode="contain"
                    />
                    <TextInput
                        style={{ flex: 1, color: theme.TEXT_PRIMARY, height: 40, fontSize: 12 }}
                        value={search}
                        onChangeText={(text) => this.searchFilterFunction(text)}
                        placeholderTextColor={theme.TEXT_SECONDARY_LIGHT}
                        // autoFocus
                        placeholder='Search your daily needs anytime...'
                    />
                </View>

                <FlatList
                    data={this.state.filteredDataSource}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.ItemSeparatorView}
                    renderItem={this.ItemView}
                />
            </View>
        )
    }
}

export default Search

const DeviceWidth = Dimensions.get('window').width
const DeviceHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
    primaryBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.PRIMARY_BLUE,
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 25,
        marginTop: 20,
        marginBottom: 30
    },
    textInputContainer: {
        backgroundColor: color.WHITE,
        elevation: 5,
        marginHorizontal: 20,
        paddingHorizontal: 5,
        paddingVertical: 3,
        borderRadius: 10,
        marginVertical: 10
    },
    textInputStyle: {
        // borderWidth: 1,
        paddingHorizontal: 15,
        fontSize: 14,
        backgroundColor: color.WHITE,
        color: color.TEXT_PRIMARY,
        letterSpacing: 0.5,
        borderRadius: 5,
        // borderColor: color.BORDER_PURPLE
    }
});
