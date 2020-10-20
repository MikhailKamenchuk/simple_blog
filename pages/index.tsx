import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { connect, useSelector } from 'react-redux';
import styled from 'styled-components';
import { IState } from '../redux/store';
import { fetchPostsList } from '../redux/actions';

import PostsList from '../src/components/PostsList';


const Home = ({ error }: IState) => {
    if (error) {
        return <div>Something wrong...</div>
    }
    const lastPosts = useSelector((state: IState) => state.posts.slice(state.posts.length - 4).reverse())
    return (
        <Container>
            <Head>
                <title>Create Next App</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <Header>
                <Description>
                    You can see:
                    <Link href="/posts" as="/posts">
                        <StyledLink>All posts &rarr;</StyledLink>
                    </Link>
                </Description>
            </Header>
            <Main>
                <Title>
                    Welcome to Simple Blog
                </Title>
                <Description>
                    Latest posts
                </Description>
                <PostsList posts={lastPosts} />
            </Main>
            <Footer>
                <div>Created by Mikhail Kamenchuk</div>
            </Footer>
        </Container>
    )
}

Home.getInitialProps = ({ store }) => store.dispatch(fetchPostsList());

const Container = styled.div`
    min-height: 100vh;
    padding: 0 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Header = styled.header`
    padding: 0 0.5rem;
    display: flex;
`;

const Main = styled.main`
    padding: 2rem 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Footer = styled.footer`
    width: 100%;
    height: 50px;
    border-top: 1px solid #eaeaea;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Title = styled.h1`
    margin: 0;
    line-height: 1.15;
    font-size: 4rem;
    text-align: center;
    & a:hover,
    & a:focus,
    & a:active {
        text-decoration: underline;
        }

`;
const Description = styled.p`
    text-align: center;
    line-height: 1.5;
    font-size: 1.5rem;
`;


const StyledLink = styled.a`
    color: ${({ theme }) => theme.colors.primary}};
    font-weight: bold;
    cursor: pointer;
    margin-left: 10px;
`;

export default connect(state => state)(Home);