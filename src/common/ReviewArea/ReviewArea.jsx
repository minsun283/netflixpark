
import React, {useState} from 'react'
import "./ReviewArea.style.css"


const ReviewArea = ({review, children, maxChars=30}) => {

    const [isShowMore, setIsShowMore] = useState(true); // 더보기 열고 닫는 스위치 
    if(review.content.slice(0, 200) <= maxChars) return <p>{children}</p>

    let text = isShowMore ? review.content.slice(0, 200) : review.content


    
  return (
    <div className='review-deco'>
        
            <div className='name-size'><img src="https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/79-128.png" style={{width:20,color:"white"}}/> {review.author_details.username}</div>
            
            <div className='sub-cont'> {text}</div>
            <div onClick={() => setIsShowMore(!isShowMore)}> 
    {isShowMore?'..[더보기]' : '[닫기]'}
  </div>
            
            <div className='sub-cont'> {review.created_at}</div>

            
         </div>
  )
}

export default ReviewArea