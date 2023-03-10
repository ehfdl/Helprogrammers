import React, { useRef, useEffect, Children } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { __getDetail } from '../redux/module/DetailSlice';
import { __deleteDetail } from '../redux/module/QuestionsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import useInput from '../hooks/useInput';
import UpdateComponent from './UpdateComponent';
import DetailMarkDown from './DetailMarkDown';
import CustomButton from './CustomButton';

// props로 받은 question state
const Detail = ({ setEdit, edit }) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { id } = useParams();
  const { hellMode } = useSelector((state) => state.theme);
  const { isLoading, error, question } = useSelector((state) => state.detail); // global state
  const [writer, onChangeWriter] = useInput('');
  const [password, onChangePassword] = useInput('');

  const focusWriter = useRef();
  const focusPassword = useRef();

  useEffect(() => {
    dispatch(__getDetail(id));
  }, []);

  if (isLoading) {
    return <div>로딩중 입니다.</div>;
  }
  if (error) {
    return <div>존재하지 않는 페이지 입니다..</div>;
  }

  // 삭제 버튼
  const deleteButton = (event, id) => {
    event.preventDefault();
    // const reCheck = window.confirm('정말 삭제하시겠습니까?'); // confirm 으로 재확인
    if (writer.replace(/ /g, '') === '') {
      alert('이름을 입력해주세요!');
      focusWriter.current.focus();
      return;
    } else if (question.writer !== writer) {
      alert('이름이 틀렸습니다!');
      return;
    } else if (password.replace(/ /g, '') === '' || password.length !== 4) {
      alert('비밀번호는 4자리 숫자로 입력해주세요!');
      focusPassword.current.focus();
      return;
    } else if (question.password !== Number(password)) {
      alert('비밀번호가 틀렸습니다!');
      return;
    } else if (window.confirm('정말 삭제하시겠습니까?')) {
      dispatch(__deleteDetail(id)); // DetailSlice >> deleteDetail (action)
      navigation('/'); // main page로 돌아가기
    } else {
      return;
    }
  };

  // 수정 버튼
  const updateButton = (event) => {
    event.preventDefault();
    // 토글 수정, 완료
    if (writer.replace(/ /g, '') === '') {
      alert('이름을 입력해주세요!');
      focusWriter.current.focus();
      return;
    } else if (question.writer !== writer) {
      alert('이름이 틀렸습니다!');
      return;
    } else if (password.replace(/ /g, '') === '' || password.length !== 4) {
      alert('비밀번호는 4자리 숫자로 입력해주세요!');
      focusPassword.current.focus();
      return;
    } else if (question.password !== Number(password)) {
      alert('비밀번호가 틀렸습니다!');
      return;
    }
    setEdit(!edit);
  };

  return (
    <>
      {edit ? (
        <UpdateComponent question={question} setEdit={setEdit} />
      ) : (
        <Wrapper>
          <QuestionHead key={question.id}>
            {/* 사이트 네임 태그 */}
            <Place>{question.place}</Place>
            {/* 언어 태그 */}
            <Language hellMode={hellMode}>
              <span className="dot" />
              {question.language}
            </Language>
          </QuestionHead>
          <QuestionTitle>
            <TitleFont>{question.title}</TitleFont>
            <InputButtonForm>
              <InputNamePassword
                type="text"
                placeholder="이름 입력"
                ref={focusWriter}
                onChange={onChangeWriter}
              />
              <InputNamePassword
                type="Number"
                placeholder="비밀번호 입력"
                ref={focusPassword}
                onChange={onChangePassword}
              />
              <CustomButton
                name="updateButton"
                updateButton={(event) => updateButton(event)}
              >
                {Children}
              </CustomButton>
              <CustomButton
                name="deleteButton"
                deleteButton={(event) => deleteButton(event, question.id)}
              >
                {Children}
              </CustomButton>
            </InputButtonForm>
          </QuestionTitle>
          <QuestionLink href={question.url} target="_blank">
            Link
          </QuestionLink>
          <DetailMarkDown content={question.content}></DetailMarkDown>
        </Wrapper>
      )}
    </>
  );
};

export default Detail;

// styled component

const Wrapper = styled.div`
  width: 1000px;
  max-width: 1000px;
  padding: 24px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.colors.card};
`;

const QuestionHead = styled.header`
  display: flex;
  justify-content: space-between;
  padding-bottom: 32px;
`;
const Place = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  font-size: 16px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.children === 'baekjoon'
      ? props.theme.colors.baekjoon
      : props.children === 'programmers'
      ? props.theme.colors.programmers
      : props.theme.colors.swexpert};
  color: black;
`;

const Language = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 0 10px;
  gap: 10px;
  color: ${(props) => (props.hellMode === true ? '#FF2525' : '#FFFFFF')};
  span {
    height: 12px;
    width: 12px;
    background-color: ${(props) => props.theme.colors.pointcolor};
    border-radius: 50%;
  }
`;
const QuestionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  width: 100%;
`;
const TitleFont = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const InputButtonForm = styled.form`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const InputNamePassword = styled.input`
  width: 190px;
  height: 40px;
  background-color: ${(props) => props.theme.colors.insidecard};
  border-radius: 20px;
  position: relative;
  border: none;
  color: ${(props) => props.theme.colors.textcolor};
  padding: 10px 0;
  padding-left: 16px;
  &::placeholder {
    padding-left: 2px;
    color: ${(props) => props.theme.colors.placeholder};
  }
  :focus {
    outline: none;
    box-shadow: 0 0 8px 1px ${(props) => props.theme.colors.pointcolor};
  }
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const QuestionLink = styled.a`
  color: ${(props) => props.theme.colors.pointcolor};
  font-weight: bold;
  display: inline-block;
  padding: 15px;
  cursor: pointer;
  :link {
    color: ${(props) => props.theme.colors.pointcolor};
  }
  :visited {
    color: ${(props) => props.theme.colors.pointcolor};
  }
`;
