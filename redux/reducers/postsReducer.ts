import {AnyAction} from 'redux';
import { HYDRATE } from "next-redux-wrapper";

import * as t from "../types";

export interface IPost {
    id: number,
    title: string,
    body: string,
    comments: string[]
}

export interface IState {
    error: any,
    posts: IPost[],
    post: IPost
}

const initialState = {
  posts: [],
  post: null,
  error: null
}

export const postsReducer = (state: IState = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
        if (action.payload.posts === []) delete action.payload.posts;
        if (action.payload.posts === null) delete action.payload.post;
        if (action.payload.error === null) delete action.payload.error;
        return { ...state, ...action.payload };
      case t.POSTS_DATA_RECIEVED:
          return {
              ...state,
              posts: action.payload.posts,
              error: null
          }
      case t.POST_BY_ID_DATA_RECIEVED:
          return {
              ...state,
              post: action.payload.post,
              error: null
          }
      case t.POSTS_DATA_FAILURE:
          return {
              ...state,
              posts: [],
              error: action.payload.error
          }
      default:
          return state
  }
}

export default postsReducer;