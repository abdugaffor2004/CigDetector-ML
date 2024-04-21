import React from 'react';


function Card({fileName, isSmoking, accurancy}) {


  return (
    <>
        <div className='flex flex-col w-80'>
            <img className='object-cover object-center-top aspect-[5/4]' src={`./${fileName}`} alt="Photo" />
            <span>Курение {isSmoking === true ? 'обнаружено': "не обнаружено"}</span>
              {isSmoking && <span>Точность: {accurancy.toExponential(2) } </span>}
            
        </div>
        
    </> // ООООчень сильно мучился с этими картинками оказалось они индексируются webpack-ом из папки public :(((
  )
}
export default Card