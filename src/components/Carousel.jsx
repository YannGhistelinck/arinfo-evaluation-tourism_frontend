import React, { useState, useEffect } from 'react'

import carousel1 from '../assets/images/carousel1.jpg'
import carousel2 from '../assets/images/carousel2.jpg'
import carousel3 from '../assets/images/carousel3.jpg'
import carousel4 from '../assets/images/carousel4.jpg'

function Carousel() {

    const images = [carousel1, carousel2, carousel3, carousel4]
    const [currentImg, setCurrentImg] = useState(0)

    const changeImage = (img)=>{
        if(img==='next'){
            if(currentImg < images.length-1){
               setCurrentImg(currentImg + 1) 
            }else{
                setCurrentImg(0)
            }
            
        }else if(img === 'prev'){
            if(currentImg > 0){
                setCurrentImg(currentImg - 1) 
            }else{
                setCurrentImg(images.length)
            }
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            changeImage('next');
        }, 3000);

        return () => clearInterval(interval);
    }, [currentImg]);
    

  return (
    <div className='carousel'>
        <img src={images[currentImg]} alt="carousel de présentation" className='carousel__img'/>
        <div className='carousel__layout'>
            <div className='carousel__layout__content'>
                <div className='carousel__layout__content__texts'>
                    <span className='carousel__layout__content__texts__subtitle'>Explorer</span>
                    <span className='carousel__layout__content__texts__title'>La Sarthe<span className='carousel__layout__content__texts__point'>.</span></span>
                </div>

                <div className='carousel__layout__content__buttons'>
                    {currentImg > 0 ? 
                        <div className='carousel__layout__content__buttons__btn' onClick={() => changeImage('prev')}></div>
                    :
                       <div className='carousel__layout__content__buttons__btn carousel__layout__content__buttons__btn--grey'></div> 
                    }
                    
                    {currentImg < images.length-1 ? 
                        <div className='carousel__layout__content__buttons__btn' onClick={() => changeImage('next')}></div>
                    :
                        <div className='carousel__layout__content__buttons__btn carousel__layout__content__buttons__btn--grey'></div>
                    }                    

                    
                    
                </div>

            </div>
        </div>
    </div>
  )
}

export default Carousel