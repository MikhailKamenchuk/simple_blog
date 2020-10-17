import styled from 'styled-components';
import { useRouter } from 'next/router';
import { GetStaticPropsContext } from 'next';
import axios from 'axios';
import Comment from '../../src/components/Comment';
import AddCommentForm from '../../src/components/AddCommentForm';

interface IComment {
    postId: number,
    body: string,
    id: number
}
interface IPost {
    id: number,
    title: string,
    body: string,
    comments: IComment[]
}

interface PostProps {
    post: IPost
}


const PostCard = ({ post }: PostProps) => {
    const router = useRouter();
    const { id, title, body, comments }: IPost = post;
    return (
        !id
            ? (<PostNotFound> &#9785; Post Not Found</PostNotFound>)
            : (
                <Post>
                    <StyledLink onClick={() => router.back()}> &larr; Click here to go back</StyledLink>
                    <h3>
                        {title}
                        {' '}
                    </h3>
                    <p>{body}</p>
                    {comments.map(comment => <Comment key={comment.id} {...comment} />)}
                    <AddCommentForm postId={id} />
                </Post>
            )
    )
}
export async function getServerSideProps({ params }: GetStaticPropsContext) {
    const postsRequest = await axios.get(`https://simple-blog-api.crew.red/posts/${params.postId}?_embed=comments`);
    const post = await postsRequest.data;
    return { props: { post } }
}

const Post = styled.div`
    margin: 1rem;
    flex-basis: 45%;
    padding: 1.5rem;
    text-align: left;
    color: inherit;
    text-decoration: none;
    border: 1px solid #eaeaea;
    border-radius: 10px;
    transition: color 0.15s ease, border-color 0.15s ease;
   
    p {
        margin: 0;
        font-size: 1.25rem;
        line-height: 1.5;
      }

    h3 {
        margin: 1rem 0;
        font-size: 1.5rem;
    }
`;

const PostNotFound = styled.div`
    text-align: center;
    margin-top: 10rem;
    font-size: 3rem
`
const StyledLink = styled.a`
    color: ${({ theme }) => theme.colors.primary}};
    font-weight: bold;
    cursor: pointer;
    margin-left: 10px;
`;

export default PostCard