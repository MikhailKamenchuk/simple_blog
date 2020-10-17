import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import styled from 'styled-components';
import axios from "axios";

interface IComment {
    id: string,
    body: string,
}

interface AddCommentFormProps {
    postId: number,
}

const AddCommentForm = ({ postId }: AddCommentFormProps) => {
    const { register, errors, handleSubmit, reset } = useForm<IComment>();
    const router = useRouter();
    const onSubmit = (data: IComment, e: any) => {
        e.preventDefault();
        axios.post('https://simple-blog-api.crew.red/comments', { ...data, postId })
            .then(() => {
                router.reload();
                reset()
            })
    }
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormField>
                <Input type="text" name="body" id="body" ref={register({ required: true })} placeholder="Write comment here" />
                <ValidationError>{errors.body && "Comment is required"}</ValidationError>
            </FormField>
            <Button type="submit">Add comment</Button>
        </Form>
    )
}

const Form = styled.form`
    min-width: 30rem;
    margin: 1rem;
    padding: 1.5rem;
    text-align: left;
    border: 1px solid #eaeaea;
    border-radius: 10px;
    transition: color 0.15s ease, border-color 0.15s ease;
    display:flex;
    flex-direction: row;
    align-items: baseline;
    @media (max-width: 600px) { 
        width: 100%;
        flex-direction: column;
    }
`;
const Input = styled.input`
    padding: 0.5rem;
    text-align: left;
    outline: none;
    border: 1px solid #eaeaea;
    border-radius: 10px;
    flex: 1;
    line-height: 1.5rem;
    margin-right: 2rem;
    @media (max-width: 600px) { 
        width: 100%;
    }
`;

const Button = styled.button`
    padding: 0.5rem;
    text-align: center;
    outline: none;
    border: 1px solid #eaeaea;
    line-height: 1.5rem;
    min-width: fit-content;
    color: ${({ theme }) => theme.colors.darkGrey};
    border-color: ${({ theme }) => theme.colors.gray};
    background-color: ${({ theme }) => theme.colors.white};
    width: 200px;
    border-radius: 10px;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    font-weight: bold;
    cursor: pointer;
    width: 20%;
    &:hover {
        color: ${({ theme }) => theme.colors.primary};
        border-color: ${({ theme }) => theme.colors.primary};
    }
    @media (max-width: 600px) { 
        width: 100%;
    }
`;

const FormField = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-bottom: 1rem;
    @media (max-width: 600px) { 
        width: 100%;
    }
`;
const ValidationError = styled.div`
    color: ${({ theme }) => theme.colors.red}
`;

export default AddCommentForm