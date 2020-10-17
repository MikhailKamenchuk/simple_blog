import Link from 'next/link';
import styled from 'styled-components';
import axios from 'axios';
import PostsList from '../../src/components/PostsList';

interface Post {
    id: number,
    title: string,
    body: string,
    comments: string[]
}

interface PostsProps {
    posts: Post[]
}

const Posts = ({ posts }: PostsProps) => {
  return (
      <Container>
          <Header>
              <Navigation>
                  <Link href="/" as="/">
                      <StyledLink>&larr; Back home</StyledLink>
                  </Link>
                  <Link href="/posts/new" as="/posts/new">
                      <StyledLink>Create post &rarr;</StyledLink>
                  </Link>
              </Navigation>
          </Header>
          <Main>
              <Title>Posts</Title>
              <PostsList posts={posts} />
          </Main>
          <Footer>
              <div>
                  Created by 
                  {" "}
                  <a href='https://www.linkedin.com/in/mikhail-kamenchuk-6a1611158/'>
                      Mikhail Kamenchuk
                  </a>
              </div>
          </Footer>
      </Container>
  )
}
export async function getServerSideProps() {
    const postsRequest = await axios.get(`https://simple-blog-api.crew.red/posts`);
    const posts = await postsRequest.data;
    return { props: { posts } }
}

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
const Navigation = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.5rem;
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
    a{
      color: ${({ theme }) => theme.colors.primary}};
    }
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

const StyledLink = styled.a`
    color: ${({ theme }) => theme.colors.primary}};
    font-weight: bold;
    cursor: pointer;
    margin-left: 10px;
`;

export default Posts