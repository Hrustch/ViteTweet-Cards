import React from 'react'
import css from './Tweet.module.css'
const Tweet = ({data, name}) => {
  return (
    <li className={css.Post}><h3 className={css.UserName}>{name}</h3>{data.post}</li>
  )
}

export default Tweet