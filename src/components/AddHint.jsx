import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { __addHint } from '../redux/module/HintsSlice';

const AddHint = ({ question }) => {
  const dispatch = useDispatch();
  const [hint, onChangeHint] = useInput('');
  const [writer, onChangeWriter] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [addlevel, onChangeAddLevel] = useInput('');

  const newhint = {
    id: uuidv4(),
    hint: hint,
    writer: writer,
    password: password,
    level: addlevel,
    questionId: question.id,
  };

  const onClickAddHint = (event) => {
    event.preventDefault();
    dispatch(__addHint(newhint));
  };
  return (
    <Middle>
      <AddHintBox>
        <LevelCheckLabel>
          <LevelCheckRadio
            type="radio"
            name="level"
            value="상"
            onChange={onChangeAddLevel}
          />
          <LevelCheckSpan>상</LevelCheckSpan>
        </LevelCheckLabel>
        <LevelCheckLabel>
          <LevelCheckRadio
            type="radio"
            name="level"
            value="중"
            onChange={onChangeAddLevel}
          />
          <LevelCheckSpan>중</LevelCheckSpan>
        </LevelCheckLabel>
        <LevelCheckLabel>
          <LevelCheckRadio
            type="radio"
            name="level"
            value="하"
            onChange={onChangeAddLevel}
          />
          <LevelCheckSpan>하</LevelCheckSpan>
        </LevelCheckLabel>
        <InputNamePassword
          type="text"
          placeholder="이름 입력"
          onChange={onChangeWriter}
        />
        <InputNamePassword
          type="password"
          placeholder="비밀번호 입력"
          onChange={onChangePassword}
        />
        <AddButton onClick={onClickAddHint}>확인</AddButton>
        <br />
        <InputHint
          type="text"
          placeholder="힌트를 입력해 주세요!"
          onChange={onChangeHint}
        />
      </AddHintBox>
    </Middle>
  );
};

export default AddHint;

//styled-components

const Middle = styled.section`
  display: flex;
  position: relative;
  justify-content: center;
  flex-direction: column;
  padding-top: 20px;
  min-width: 1000px;
  /* border: 1px solid red; */
  /* background-color: yellow; */
`;

const AddHintBox = styled.form`
  width: 100%;
  min-height: 200px;
  background-color: #44454a;
  border-radius: 20px;
  padding: 24px;
`;
const LevelCheckLabel = styled.label`
  width: 40px;
  height: 40px;
  float: left;
  margin-left: 5px;
`;
const LevelCheckSpan = styled.span`
  font-size: 18px;
  width: 36px;
  height: 36px;
  background: #2f2f33;
  border-radius: 50%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #ffffff;
`;

const LevelCheckRadio = styled.input.attrs({ type: 'radio' })`
  &:checked {
    display: inline-block;
    background: none;
    text-align: center;
    display: none;
  }
  &:checked + ${LevelCheckSpan} {
    scale: 1.1;
    color: black;
    background-color: ${(props) =>
      props.value === '상'
        ? '#0DF0AC'
        : props.value === '중'
        ? '#89F9D7'
        : '#CBFFEF'};
  }

  display: none;
`;

const InputNamePassword = styled.input`
  width: 190px;
  height: 40px;
  background-color: #2f2f33;
  border-radius: 20px;
  position: relative;
  border: none;
  color: #ffffff;
  left: 36%;
  margin-left: 10px;
  padding-left: 16px;
  &::placeholder {
    padding-left: 2px;
    color: #90969e;
  }
  &:focus {
    box-shadow: 3px 3px 5px #aaa;
    scale: 1.01;
  }
`;
const AddButton = styled.button`
  width: 60px;
  height: 40px;
  background-color: #0df0ac;
  border-radius: 20px;
  border: transparent;
  position: relative;
  left: 37%;
  cursor: pointer;
`;
const InputHint = styled.textarea`
  margin-top: 30px;
  width: 100%;
  min-height: 70px;
  background-color: #2f2f33;
  border: transparent;
  font-size: 20px;
  color: #ffffff;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 10px;
  resize: none;
  &::placeholder {
    padding-left: 2px;
    color: #90969e;
    font-size: 20px;
  }
`;
