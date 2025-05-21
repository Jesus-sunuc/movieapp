import {useEffect} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getPopularMovies} from '../../utils/services/TMDBService';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import React from 'react';
import {useSharedValue} from 'react-native-reanimated';

const data = [...new Array(6).keys()];
const width = Dimensions.get("window").width;

const Home = () => {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  useEffect(() => {
    getPopularMovies()
    .then((response: any) => {
        console.log(response);
    })
  }, []);

  return (
    <View>
        <View>
            <Text style={styles.titleSection}>My List</Text>
            <Text>Discover</Text>
        </View>
        
      <Carousel
        ref={ref}
        width={width}
        height={width / 2}
        data={data}
        onProgressChange={progress}
        renderItem={({index}) => (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: 'center',
            }}>
            <Text style={{textAlign: 'center', fontSize: 30}}>{index}</Text>
          </View>
        )}
      />
      <View style={styles.buttonSection}>
        <TouchableOpacity >
            <Text>WishList</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text>Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        backgroundColor: '#000000',
    },
    carouselContainer: {
        flex: 1,
        backgroundColor: '#000000',
    },
    carouselSection: {
        position: 'relative',
    },
    overlayContainer: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: 5,
    },
    titleSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    buttonSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    textDesc: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingVertical: 20,
        color: 'white',
    },
    buttonDetail: {
        backgroundColor: '#F2C94C',
        paddingHorizontal: 50,
        paddingVertical: 20,
        borderRadius: 13,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    textWishList: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    buttonWishList: {
        backgroundColor: '#333333',
        paddingHorizontal: 50,
        paddingVertical: 20,
        borderRadius: 13,
        alignItems: 'center',
    },
    textDetails: {
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default Home;
