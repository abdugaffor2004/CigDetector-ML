import React from 'react'
import Header from './Header'
import { useSelector } from 'react-redux'
import Card from './Card'

function ResultPage() {

  const images = useSelector( (state) => state.images.images )

  return (
    <div>
      <Header buttonLable='Home' path='/' />

        <div className='flex flex-wrap mt-16 justify-evenly gap-y-10'>
          {Array.from(images).map( element => <Card key={element.fileName} fileName={element.fileName} isSmoking={element.isSmoking} accurancy = {element.accurancy}/> )}
        </div>
        

    </div>
  )
}

export default ResultPage