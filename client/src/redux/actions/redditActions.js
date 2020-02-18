import axios from 'axios';

const getRedditList = subredditList => ({
  type: 'REDDIT_GET_SUBREDDITS',
  subredditList
})

export const setSubreddit = subreddit => ({
  type: 'REDDIT_SET_SUBREDDIT',
  subreddit 
})

export const fetchRedditData = () => (dispatch, getState) => {  
  const { subreddit } = getState().redditReducer
  
  if (subreddit) {
    axios.get(`/api/phyo?subreddit=${subreddit}`)
      .then(res => {
        dispatch(setSubreddit(''))
        dispatch(getRedditList(res.data))
      })
  } else {
    axios.get('/api/phyo')
      .then(res => dispatch(getRedditList(res.data)))
  }
}
