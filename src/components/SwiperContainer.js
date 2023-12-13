import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'swiper/css/effect-coverflow'; 

import { A11y, Autoplay,Pagination,Scrollbar,Navigation } from 'swiper/modules';
import SwiperData from './static/SwiperData';



const SwiperContainer = () => {
 
  return (
    <Swiper
      modules={[Pagination, A11y, Autoplay,Scrollbar,Navigation]}
      spaceBetween={50}
      slidesPerView={'auto'}
      grabCursor={true}
      loop={true}
      centeredSlides={true}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      className='container-xxl'
    > 
        {
          SwiperData.map((element,i)=>{
          return <SwiperSlide className='slider'>
           <div className='row' key={i}>
          <div className="col-12 position-relative">
            <img src={element?.img} alt="" className='homepageswiper' />
            <div className="swiper-content position-absolute" style={{top:0}}>
            </div>
          </div>
        </div>  
      </SwiperSlide>
          })
        }
    </Swiper>
  );
}

export default SwiperContainer;
