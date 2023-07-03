import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router'
import { getTweetsById } from '../../api/Api'
import Tweet from '../../components/Tweet/Tweet'
import { Link } from 'react-router-dom'

const Tweets = () => {
    const {userName, userId} = useParams()
    const [tweets, setTweets] = useState([])
    const location = useLocation();
      
    useEffect(()=>{
        getTweetsById(userId, 1)
        .then((data)=>{
            setTweets(data)
        })
    },[userId])

  return (
    <>
    <Link to={location.state ?? '/'}>Go back</Link>
    <ul style={{ listStyleType: "none" }}>
        {tweets.map((tweet)=>{
            return <Tweet key={tweet.id} data={tweet} name={userName}/>
        })}
    </ul>
    </>
  )
}

export default Tweets