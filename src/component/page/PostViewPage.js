import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import CommentList from '../list/CommentList';
import TextInput from '../ui/TextInput';
import Button from '../ui/Button';
// import data from '../../data.json';

const Wrapper = styled.div`
  padding: 16px;
  width: calc(100% - 35px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 720px;

  :not(:last-child) {
      margin-bottom: 16px;
  }
`;

const PostContainer = styled.div`
  padding: 8px 16px;
  border: 1px solid grey;
  border-radius: 8px;
`;

const TitleText = styled.p`
  font-size: 28px;
  font-weight: 500;
`;

const ContentText = styled.p`
  font-size: 20px;
  line-height: 32px;
  white-space: pre-wrap;
`;

const CommentLabel = styled.p`
  font-size: 16px;
  font-weight: 500;
`;

function PostViewPage(props) {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data2 = await fetch(`http://localhost:8080/post/${postId}`);
      const res = await data2.json();
      setData(res);
    }
    fetchData();
  }, []);

  // const post = data.find((item) => {
  //   return item.id == postId;
  // });

  const [comment, setComment] = useState('');

  return (
    <Wrapper>
      <Container>
        <Button
          title='뒤로 가기'
          onClick={() => {
            navigate('/');
          }}
        />
        <PostContainer>
          <TitleText>{data.title}</TitleText>
          <ContentText>{data.content}</ContentText>
        </PostContainer>

        <CommentLabel>댓글</CommentLabel> 
        <CommentList comments={data.comments} />

        <TextInput
          height={40}
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
          }}
        />
        <Button
          title='댓글 작성하기'
          onClick={async () => {
            const data = await fetch(`http://localhost:8080/comment-write?postId=${postId}`, {
              method: 'post',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify({content: comment})
            });
            const res = await data.json();
            alert(res.msg);
            if(res.code == 200) {
              navigate('/');
            }
          }}
        />
      </Container>
    </Wrapper>
  );
}

export default PostViewPage;