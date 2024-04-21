
import '../App.css'
import { InputForm } from './Form';
import Header from './Header';
import { Autoplay, Grid, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from 'react-redux';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';




function HomePage() {

    const images = useSelector((state) => state.images.images);

    return (

        <>
            {!(images.length === 0) && <Header buttonLable='Result' path='/result'/>}

            <div className='flex items-center justify-center h-screen'>

                <InputForm />

                <Swiper
                    slidesPerView={3}
                    grid={{
                        rows: 2,
                    }}
                    autoplay={{
                        delay: 1200,
                        disableOnInteraction: false,
                    }}
                    spaceBetween={30}
                    // pagination={{
                    //   clickable: true,
                    // }}
                    modules={[Grid, Autoplay, Pagination]}
                    className='flex items-center justify-center'
                >

                    
                    
                    {/* <SwiperSlide>Slide 2</SwiperSlide>
                    <SwiperSlide>Slide 3</SwiperSlide>
                    <SwiperSlide>Slide 4</SwiperSlide>
                    <SwiperSlide>Slide 5</SwiperSlide>
                    <SwiperSlide>Slide 6</SwiperSlide>
                    <SwiperSlide>Slide 7</SwiperSlide>
                    <SwiperSlide>Slide 8</SwiperSlide>
                    <SwiperSlide>Slide 9</SwiperSlide> */}
                </Swiper>

            </div>
        </>
        
        
    )
}

export default HomePage
