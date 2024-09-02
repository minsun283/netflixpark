
import React, {useState} from 'react'
import "./ReviewArea.style.css"


const ReviewArea = ({review}) => {

    const [isView, setIsView] = useState(false);

    
  return (
    <div className='review-deco'>
        
            <div className='name-size'><img src="https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/79-128.png" style={{width:20,color:"white"}}/> {review.author_details.username}</div>
            <div className='sub-cont'> {review.content}</div>
            <div className='sub-cont'> {review.created_at}</div>
         </div>
  )
}

export default ReviewArea