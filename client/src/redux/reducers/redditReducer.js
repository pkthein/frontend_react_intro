const INITIAL_STATE = {
  subreddit: '',
  subredditList: []
}

const redditReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'REDDIT_GET_SUBREDDITS':
      return {
        ...state,
        subredditList: action.subredditList
      }
    case 'REDDIT_SET_SUBREDDIT':
      return {
        ...state,
        subreddit: action.subreddit
      }
    default:
      return state
  }
}

export default redditReducer
