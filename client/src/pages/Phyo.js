import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { setEmail, setIsLoggedIn } from '../redux/actions/userActions'
import { setSubreddit, fetchRedditData } from '../redux/actions/redditActions'

const Phyo = ({ dispatch, email, isLoggedIn, subreddit, subredditList }) => {

  const fetch = () => {
    dispatch(fetchRedditData())
  }

  const updateSubreddit = (newSubreddit) => {
    if (newSubreddit.length < 20) {
      dispatch(setSubreddit(newSubreddit))
    }
  }

  const accountLogOut = () => {
    dispatch(setIsLoggedIn(false))
    dispatch(setEmail(''))
  }
  
  if (!isLoggedIn) {
    return <Redirect to="/login" />
  }

  return (
    <div>
      <h2>About Trendy Subreddit</h2><hr />

      <div>
        Welcome { email }<span>  </span>
        <button onClick={ () => accountLogOut() }>
          Log Out
        </button> <hr />
      </div>

      <div>
        <input
          value={ subreddit }
          type="text"
          onChange={ e => updateSubreddit(e.target.value) }
          placeholder="Subreddit lookup..."
        /> <br />

        <button className="button" onClick={ () => fetch() }>
          Fetch
        </button>
      </div>

      {
        subredditList.response &&
        (
          <div>
            { 
              subredditList.response.map((res, ind) => (
                <div key={ ind }>
                  <a href={`https://www.reddit.com/${res}`}>{ res }</a>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  );
};

const mapStateToProps = state => ({
  email: state.userReducer.email,
  isLoggedIn: state.userReducer.isLoggedIn,
  subreddit: state.redditReducer.subreddit,
  subredditList: state.redditReducer.subredditList
})

export default connect(mapStateToProps)(Phyo);
