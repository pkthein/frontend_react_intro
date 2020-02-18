// (param) => ({}) // shorthand form to return object
export const setEmail = email => ({
  type: 'SET_EMAIL',
  email
})

export const setIsLoggedIn = isLoggedIn => ({
  type: 'SET_IS_LOGGED_IN',
  isLoggedIn
})
