import React, { useState, useRef, Children } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { __updateDetail } from '../redux/module/DetailSlice';
import CustomButton from '../hooks/CustomButton';

const UpdateComponent = ({ question, setEdit }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(question.title);
  const [content, setContent] = useState(question.content);
  const [url, setUrl] = useState(question.url);
  const [place, setPlace] = useState(question.place);
  const [language, setLanguage] = useState(question.language);

  const focusTitle = useRef();
  const focusContent = useRef();
  const focusUrl = useRef();
  const focusPlace = useRef();
  const focusLanguege = useRef();

  const selectSiteList = ['baekjoon', 'programmers', 'SW Expert Academy'];
  const selectLanguageList = ['javacript', 'python', 'c++', 'java'];

  const updateQuestion = {
    title,
    content,
    url,
    place,
    language,
    writer: question.writer,
    password: question.password,
    id: question.id,
  };

  const onSubmitEditor = (id, updateQuestion) => {
    let reg_url =
      /^(https?:\/\/)?([a-z\d\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$/;

    if (place.replace(/ /g, '') === '') {
      alert('사이트 선택을 해주세요!');
      focusPlace.current.focus();
      return;
    } else if (language.replace(/ /g, '') === '') {
      alert('언어를 선택해주세요!');
      focusLanguege.current.focus();
      return;
    } else if (url.replace(/ /g, '') === '') {
      alert('url을 입력해주세요!');
      focusUrl.current.focus();
      return;
    } else if (!reg_url.test(url)) {
      alert('URL 형식에 맞게 입력해주세요!');
      return;
    } else if (title.replace(/ /g, '') === '') {
      alert('제목을 입력해주세요!');
      focusTitle.current.focus();
      return;
    } else if (content.replace(/ /g, '') === '') {
      alert('내용을 입력해주세요!');
      focusContent.current.focus();
      return;
    }
    if (window.confirm('수정을 완료하시겠습니까??') === true) {
      dispatch(__updateDetail({ id, updateQuestion }));
      setEdit(false);
    } else {
      return;
    }
  };

  return (
    <>
      <Layout>
        <InputBoxs>
          <div>
            <DropdownButton>
              <DropdownButtonbox
                onChange={(e) => setPlace(e.target.value)}
                ref={focusPlace}
              >
                <option value="">{place}</option>
                {selectSiteList.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </DropdownButtonbox>
              <DropdownButtonbox
                onChange={(e) => setLanguage(e.target.value)}
                ref={focusLanguege}
              >
                <option value="">{language}</option>
                {selectLanguageList.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </DropdownButtonbox>
            </DropdownButton>

            <ContentsBox>
              <InputTag
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
                ref={focusUrl}
                type="text"
                placeholder="url을 입력해 주세요"
              ></InputTag>
              <InputTag
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                ref={focusTitle}
                type="text"
                placeholder="제목을 입력해 주세요"
              />
              <InputContent
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                ref={focusContent}
                type="text"
                placeholder="내용을 입력해 주세요"
              />
              <ButtonBox>
                <CustomButton
                  name="updateBackButton"
                  setEdit={() => {
                    setEdit(false);
                  }}
                >
                  {Children}
                </CustomButton>
                <CustomButton
                  name="updateSuccessButton"
                  onSubmitEditor={() =>
                    onSubmitEditor(question.id, updateQuestion)
                  }
                >
                  {Children}
                </CustomButton>
              </ButtonBox>
            </ContentsBox>
          </div>
        </InputBoxs>
      </Layout>
    </>
  );
};

export default UpdateComponent;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 32px;
  margin: 0 auto;
  background: ${(props) => props.theme.colors.card};
  border-radius: 20px;
`;

const InputBoxs = styled.div`
  display: flex;
  /* padding: 0px; */
  gap: 32px;
`;

const DropdownButton = styled.div`
  display: flex;
  gap: 30px;
  width: 279px;
  padding: 15px 0;
  /* height: -webkit-fill-available; */
`;

const DropdownButtonbox = styled.select`
  padding: 0px 10px 0px 16px;
  width: 190px;
  height: 39px;
  color: ${(props) => props.theme.colors.textcolor};
  border-radius: 20px;
  background: ${(props) => props.theme.colors.insidecard};
  border: none;
  cursor: pointer;
`;

const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  /* Inside auto layout */
`;

const InputTag = styled.input`
  padding: 22px;
  width: 1000px;
  height: 68px;
  color: ${(props) => props.theme.colors.textcolor};
  background: ${(props) => props.theme.colors.insidecard};
  border-radius: 20px;
  border: none;
`;

const InputContent = styled.textarea`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 22px;
  gap: 32px;
  width: 1000px;
  height: 300px;
  color: ${(props) => props.theme.colors.textcolor};
  background: ${(props) => props.theme.colors.insidecard};
  border-radius: 20px;
  border: none;
  white-space: pre-wrap;
  resize: none;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
