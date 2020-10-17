import styled from 'styled-components';
import Link from 'next/link';

interface IPost {
    id: number,
    title: string,
    body: string,
    comments: string[]
}

const Post = ({ id, title, body }: IPost) => {
    const titleShort = !title
        ? null
        : `${title.substring(0, 44)}...`
    const bodyShort = !body
        ? null
        : `${body.substring(0, 24)}...`;
    return (
        <Link href='/posts/[postId]' as={`/posts/${id}`}>
            <Card>
                <h3>
                    {titleShort}
                    {' '}
                    &rarr;
                </h3>
                <p>{bodyShort}</p>
            </Card>
        </Link>
    )
}

const Card = styled.a`
    min-height: 12rem;
    margin: 1rem;
    flex-basis: 45%;
    padding: 1.5rem;
    text-align: left;
    color: inherit;
    text-decoration: none;
    border: 1px solid #eaeaea;
    border-radius: 10px;
    transition: color 0.15s ease, border-color 0.15s ease;
    cursor: pointer;
    &:hover,
    &:focus,
    &:active {
        color: #0070f3;
        border-color: #0070f3;
    }
    p {
        margin: 0;
        font-size: 1.25rem;
        line-height: 1.5;
      }
    h3 {
        margin: 0 0 1rem 0;
        font-size: 1.5rem;
    }
`;

export default Post