import * as React from 'react';
import {Text, View, SafeAreaView, Image, ImageBackground,Dimensions} from 'react-native';

import Carousel from 'react-native-snap-carousel';

export default class ArticleCarou extends React.Component {

 
    constructor(props){
        super(props);
        this.state = {
          activeIndex:0,
          carouselItems: [
          {
              title:"The Amazon Fire",
              text: "What REALLY happened in the fight against the Fire.",
              image: 'https://static.scientificamerican.com/sciam/cache/file/C1CBDCD7-0471-4C47-846607ADAF8585F4_source.jpg'
          },
          {
              title:"A Hustler's View on Life",
              text: "What life means to someone who is striving for success",
              image: 'https://images.unsplash.com/photo-1671725501835-afb7bd1f21ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80'
          },
          {
              title:"China's Lack Of Work Life Balance",
              text: "And How today's generation is responding.",
              image: "https://images.unsplash.com/photo-1581252165015-9b5151a6930e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=766&q=80"
          },
        ]
      }
    }

    _renderItem({item,index}){
        return (
        <SafeAreaView>
            <ImageBackground source={{uri: item.image}} style = {{width: Dimensions.get('window').width - 15, height: 180}}>
                <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0, .5)'}}>
                  <Text style={{fontSize: 30, color:"white", textAlign: 'center', fontWeight: '500',backgroundColor: 'transparent'}}>{item.title}</Text>
                  <Text style = {{color:"white", textAlign: 'center', fontWeight: '300', backgroundColor:'transparent' }}>{item.text}</Text>
                </View>
            </ImageBackground>
        </SafeAreaView>


        )
    }

    render() {
        return (
         
            <View style={{ flex: 0, flexDirection:'row', justifyContent: 'center', }}>
                <Carousel
                  layout={"default"}
                  ref={ref => this.carousel = ref}
                  data={this.state.carouselItems}
                  sliderWidth={300}
                  itemWidth={380}
                  renderItem={this._renderItem}
                  onSnapToItem = { index => this.setState({activeIndex:index}) } />
            </View>
        );
    }
}

