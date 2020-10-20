import axios from "axios";
import * as t from "../types";

export const postsDataRecieved = posts => {
  return {
      type: t.POSTS_DATA_RECIEVED,
      payload: {
          posts
      }
  }
}
export const postByIdDataRecieved = post => {
  return {
      type: t.POST_BY_ID_DATA_RECIEVED,
      payload: {
          post
      }
  }
}

export const postsDataError = error => {
  return {
      type: t.POSTS_DATA_FAILURE,
      payload: {
          error
      }
  }
}

export const fetchPostsList = () => async dispatch => {
  await axios.get(`https://simple-blog-api.crew.red/posts`)
      .then(res => dispatch(postsDataRecieved(res.data)))
      .catch(error => dispatch(postsDataError(error.message)))
}

export const fetchPostById = postId => async dispatch => {
  await axios.get(`https://simple-blog-api.crew.red/posts/${postId}?_embed=comments`)
      .then(res => dispatch(postByIdDataRecieved(res.data)))
      .catch(error => dispatch(postsDataError(error.message)))
}

export const addNewPost = postData => async dispatch => {
  await axios.post('https://simple-blog-api.crew.red/posts', postData)
      .catch(error => dispatch(postsDataError(error.message)))
}
export const addComment = (comment, postId) => async dispatch => {
  await axios.post('https://simple-blog-api.crew.red/comments', { ...comment, postId })
      .catch(error => dispatch(postsDataError(error.message)))
}

