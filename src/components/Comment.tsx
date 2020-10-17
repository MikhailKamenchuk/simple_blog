import styled from 'styled-components';

interface IComment {
    body: string,
}

const Comment = ({ body }: IComment) => {
    return (
        <CommentComponent>
            <img src='https://w7.pngwing.com/pngs/686/219/png-transparent-youtube-user-computer-icons-information-youtube-hand-silhouette-avatar-thumbnail.png' alt="avatar" />
            <div>{body}</div>
        </CommentComponent>
    )
}

const CommentComponent = styled.div`
    display: flex;
    align-items: center;
    margin-top: 1rem;
    margin-left: 4rem;
    img{
        max-width: 3rem;
        margin-right: 1rem;
    }
`
export default Comment