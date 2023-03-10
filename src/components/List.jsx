import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __getQuestions } from '../redux/module/QuestionsSlice';
import styled from 'styled-components';
import ListCard from './ListCard';
import { useLocation } from 'react-router-dom';

const List = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const searchTerm = decodeURI(location.search.slice(3).toLowerCase());

  useEffect(() => {
    dispatch(__getQuestions());
  }, [dispatch]);

  const { error, isLoading, questions } = useSelector(
    (state) => state.questions,
  );

  const searchedQuestions = searchTerm
    ? questions.filter(
        (question) =>
          question.place.includes(searchTerm) ||
          question.language.includes(searchTerm) ||
          question.title.includes(searchTerm) ||
          question.content.includes(searchTerm),
      )
    : questions;

  if (isLoading) {
    return <div>로딩 중....</div>;
  }

  if (error) {
    return <div>{questions.error.message}</div>;
  }

  return (
    <MainDiv>
      <NewsFeed>
        {searchedQuestions.map((question) => (
          <ListCard question={question} key={question.id} />
        ))}
      </NewsFeed>
    </MainDiv>
  );
};

export default List;

const MainDiv = styled.main`
  display: flex;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
`;

const NewsFeed = styled.section`
  display: flex;
  justify-content: flex-end;
  flex-direction: column-reverse;
  width: 868px;
  height: fit-content;
  gap: 24px;
`;
