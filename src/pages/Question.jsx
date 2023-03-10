import React, { useEffect, useState } from 'react';
import AddHint from '../components/AddHint';
import Detail from '../components/Detail';
import HintList from '../components/HintList';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { __getHints } from '../redux/module/HintsSlice';

function Question() {
  const dispatch = useDispatch();
  // qeustion state
  const { question } = useSelector((state) => state.detail);
  const [edit, setEdit] = useState(false);

  const { isLoading, error, hints } = useSelector((state) => state.hints);

  useEffect(() => {
    dispatch(__getHints());
  }, [dispatch]);

  if (isLoading) {
    return <div>로딩 중....</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  const questionHints = hints?.filter(
    (hint) => hint.questionId === question.id,
  );

  return (
    <QuestionContainer>
      {/* 상세 페이지 */}
      <Detail setEdit={setEdit} edit={edit} />

      {/*  댓글 */}
      {!edit && (
        <>
          <AddHint question={question} />
          <HintList questionHints={questionHints} key={question.id} />
        </>
      )}
    </QuestionContainer>
  );
}

export default Question;

const QuestionContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
`;
