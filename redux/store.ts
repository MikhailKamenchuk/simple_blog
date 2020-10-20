import thunk from "redux-thunk"
import {MakeStore, createWrapper, Context} from 'next-redux-wrapper';
import { createStore, applyMiddleware } from "redux";
import { postsReducer } from "./reducers/postsReducer"

export interface IPost {
    id: number,
    title: string,
    body: string,
    comments: string[]
}

export interface IState {
    isFetching: boolean,
    error: any,
    posts: IPost[]
}

export const makeStore: MakeStore<IState> = (context: Context) =>
  createStore(postsReducer, applyMiddleware(thunk));

const wrapper = createWrapper<IState>(makeStore, { debug: true });

export default wrapper