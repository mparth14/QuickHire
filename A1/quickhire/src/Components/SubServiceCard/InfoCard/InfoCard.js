import React from 'react'
import Profile from "../../../assets/profile.jpg"
import "./InfoCard.css"
import Rating from "../../../assets/rating.png"

const InfoCard = (props) => {
  const { cardInfo } = props;

  return (
    <div>
      <div className='profile-section'>
        <img src={Profile} alt='profile' className='profile-pic' />
        <div className='name-tag'>
          <p className='name-sec'>{cardInfo.name}</p>
          <p className='job-title'>{cardInfo.jobTitle}</p>
        </div>
        <div>
          <div className='card-btn'> Popular </div>
        </div>
      </div>
      <div>
        <p className='card-text'>{cardInfo.description}</p>
      </div>
      <div className='rating-sec'>
        <img src={Rating} alt='Rating-icon' className='rating-icon' />
        <p className='rating-text-sec'>{cardInfo.rating} ({cardInfo.rate})</p>
      </div>
      <p className='price-text-sec'>From <b>CA ${cardInfo.rate}/hr</b></p>
    </div>
  )
}

export default InfoCard