import React, {useState, useEffect} from 'react';
import {Text, View, SafeAreaView, Image, ImageBackground,Dimensions,Pressable} from 'react-native';

import Carousel, {Pagination}from '../react-native-snap-carousel';

export default class ArticleCarou extends React.Component {


    constructor(props){
        super(props);
        this.state = {
          activeIndex:0,
          carouselItems: this.props.carouselArray,
        
      }
    }

    _renderItem({item,index, navigation, carouselArray}){

        return (
        <SafeAreaView>
            <Pressable onPress = {()=>navigation.navigate("Article",{'article':item})}>
                <ImageBackground source={{uri: item.image}} imageStyle= {{borderRadius: 14}}style = {{width: Dimensions.get('window').width - 16, height: 180}}>
                    <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0, .5)',borderRadius: 14}}>
                    <Text style={{fontSize: 25, color:"white", textAlign: 'center', fontWeight: '500',backgroundColor: 'transparent',fontFamily: 'NotoSerifBold'}}>{item.title}</Text>
                    <Text style = {{color:"white", textAlign: 'center', fontWeight: '300', backgroundColor:'transparent',fontFamily: 'NotoSerifRegular',fontSize: 15,margin:10}}>{item.descriptionText}</Text>
                    </View>
                </ImageBackground>
            </Pressable>
        </SafeAreaView>


        )
    }

    get pagination () {
        const { carouselItems , activeIndex } = this.state;
        return (
            <Pagination

              style = {{width: Dimensions.get('window').width - 10, height: 10}}
              dotsLength={carouselItems.length}
              activeDotIndex={activeIndex}
              containerStyle={{  width: Dimensions.get('window').width -10 ,  marginTop: -15, marginBottom: -15}}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.92)'
              }}
              inactiveDotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 0,
                backgroundColor: 'rgba(0, 0, 0, 1)'
              }}
              inactiveDotOpacity={0.2}
              inactiveDotScale={0.6}
            />
        );
    }

    render() {
        return (
         <View>

            <View style={{ flex: 0, flexDirection:'row', justifyContent: 'center', }}>
                <Carousel
                  layout={"default"}
                  ref={ref => this.carousel = ref}
                  data={this.state.carouselItems}
                  sliderWidth={300}
                  itemWidth={380}
                  renderItem={this._renderItem}
                  onSnapToItem = { index => this.setState({activeIndex:index}) }
                  navigation = {this.props.navigation}
                  carouselArray = {this.props.carouselArray}
                  />
                  
            </View>
            {this.pagination}
         </View>
        );
    }
}

