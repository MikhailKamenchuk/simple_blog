import { useForm } from "react-hook-form";
import { useRouter } from 'next/router'
import styled from 'styled-components';
import Link from 'next/link';
import axios from "axios";


interface IFormInputs {
    title: string,
    body: string,
}

const CreatePostForm = () => {
    const router = useRouter();
    const { register, errors, handleSubmit, reset } = useForm<IFormInputs>();
    const onSubmit = (data: IFormInputs, e: any) => {
        e.preventDefault();
        axios.post('https://simple-blog-api.crew.red/posts', data)
            .then(() => {
                router.push('/posts');
                reset()
            })
    }
    return (
        <Container>
            <Header>
                <Navigation>
                    <Link href="/" as="/">
                        <StyledLink>&larr; Back home</StyledLink>
                    </Link>
                </Navigation>
            </Header>
            <Main>
                <Title> New post creator: </Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormField>
                        <Input name="title" placeholder="Post title" ref={register({ required: true })} />
                        <ValidationError>{errors.title && "Title is required"}</ValidationError>
                    </FormField>
                    <FormField>
                        <TextArea rows={5} name="body" placeholder="Post description" ref={register({ required: true })} />
                        <ValidationError>{errors.body && "Description is required"}</ValidationError>
                    </FormField>
                    <Button type="submit">Create Post</Button>
                </Form>
            </Main>
            <Footer>
                <div>Created by Mikhail Kamenchuk</div>
            </Footer>
        </Container>
    );
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
    flex-direction: column;
    align-items: baseline;
    @media (max-width: 600px) { 
        width: 100%;
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
    @media (max-width: 600px) { 
        width: 100%;
    }
`;

const TextArea = styled.textarea`
    padding: 0.5rem;
    text-align: left;
    outline: none;
    border: 1px solid #eaeaea;
    border-radius: 10px;
    flex: 1;
    line-height: 1.5rem;
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
    color: ${({ theme }) => theme.colors.darkGrey};
    border-color: ${({ theme }) => theme.colors.gray};
    background-color: ${({ theme }) => theme.colors.white};
    width: 200px;
    border-radius: 10px;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    font-weight: bold;
    cursor: pointer;
    width: 100%;
    &:hover {
        color: ${({ theme }) => theme.colors.primary};
        border-color: ${({ theme }) => theme.colors.primary};
    }
`;

const FormField = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-bottom: 1rem;
    width: 100%;
`;
const ValidationError = styled.div`
    color: ${({ theme }) => theme.colors.red}
`;

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

export default CreatePostForm 