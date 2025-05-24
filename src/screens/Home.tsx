import {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getPopularMovies, getRatedMovies, getUpcomingMovies} from '../utils/services/TMDBService';
import ModalDetail from '../components/modal/modalDetail';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import React from 'react';
import {useSharedValue} from 'react-native-reanimated';
import {Image} from 'react-native';
import SubHeader from '../components/core/SubHeader';
import ListMovies from '../components/core/ListMovies';
import {ScrollView} from 'react-native-gesture-handler';

const width = Dimensions.get('window').width;

const Home = () => {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [topImages, setTopImages] = useState<any>([]);

  useEffect(() => {
    getPopularMovies().then((response: any) => {
      const movies = response.map((item: any) => ({
        posterPath: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
      }));
      setTopImages(movies);
    });
  }, []);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const openDetailModal = () => {
    setShowDetailModal(true);
  };
  const closeDetailModal = () => {
    setShowDetailModal(false);
  };

  const redirectSeeMore = () => {
    console.log('See more');
  };

  return (
    <ScrollView>
      <View>
        <View style={styles.carouselSection}>
          <Carousel
            ref={ref}
            width={width}
            height={width * 1.5}
            data={topImages.slice(0, 5)}
            autoPlay={true}
            autoPlayInterval={3000}
            onProgressChange={progress}
            renderItem={({index}) => (
              <View
                style={{
                  flex: 1,
                  borderWidth: 1,
                  justifyContent: 'center',
                }}>
                <Image
                  source={{uri: topImages[index].posterPath}}
                  style={styles.image}
                />
              </View>
            )}
          />
          <View style={styles.overlayContainer}>
            <View style={styles.titleSection}>
              <Text style={styles.textDesc}>My List</Text>
              <Text style={styles.textDesc}>Discover</Text>
            </View>
            <View style={styles.buttonSection}>
              <TouchableOpacity style={styles.buttonWishList}>
                <Text style={styles.textWishList}>+ WishList</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonDetail}
                onPress={openDetailModal}>
                <Text style={styles.textDetails}>Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Pagination.Basic
          progress={progress}
          data={topImages.slice(0, 5)}
          dotStyle={{
            backgroundColor: '#fff',
            borderRadius: 50,
          }}
          activeDotStyle={{backgroundColor: '#f2c94c'}}
          containerStyle={{gap: 6, marginTop: 25}}
          onPress={onPressPagination}
        />
        <ModalDetail visible={showDetailModal} onClose={closeDetailModal} />
        <SubHeader
          title="Rated Movies"
          titleNav="See more"
          handleNav={redirectSeeMore}
        />
        <ListMovies callbackFn={getRatedMovies}/>
        <SubHeader
          title="Upcoming Movies"
          titleNav="See more"
          handleNav={redirectSeeMore}
        />
        <ListMovies callbackFn={getUpcomingMovies}/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

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
