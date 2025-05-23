import {useEffect, useState} from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getPopularMovies} from '../../utils/services/TMDBService';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import React from 'react';
import {useSharedValue} from 'react-native-reanimated';
import {Image} from 'react-native';

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
      console.log(movies);
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
  return (
    <View>
      <View style={styles.carouselSection}>
        <Carousel
          ref={ref}
          width={width}
          height={width * 1.5}
          data={topImages}
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
        data={topImages}
        dotStyle={{
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderRadius: 50,
        }}
        containerStyle={{gap: 5, marginTop: 20}}
        onPress={onPressPagination}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={showDetailModal}
        onRequestClose={closeDetailModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Movie Details</Text>
            <Text style={styles.modalText}>
              Movie description will go here...
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeDetailModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#F2C94C',
    borderRadius: 13,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    paddingHorizontal: 30,
  },
  closeButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
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
