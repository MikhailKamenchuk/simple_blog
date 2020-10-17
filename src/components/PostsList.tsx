import styled from 'styled-components';
import Post from './Post';

interface IPost {
    id: number,
    title: string,
    body: string,
    comments: string[]
}

interface IPostsListProps {
    posts: IPost[]
}

const PostsList = ({ posts }: IPostsListProps) => (
    <Grid>
        {!posts ? null : posts.map(post => <Post key={post.id} {...post} />)}
    </Grid>
)

const Grid = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 800px;
    @media (max-width: 600px) { 
        width: 100%;
        flex-direction: column;
    }
`;

export default PostsList