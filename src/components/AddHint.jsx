import styled from 'styled-components';

const AddHint = () => {
  return (
    <Middle>
      <AddHintBox>
        <LevelCheckLabel>
          <LevelCheckRadio type="radio" name="level" value="상" />
          <LevelCheckSpan>상</LevelCheckSpan>
        </LevelCheckLabel>
        <LevelCheckLabel>
          <LevelCheckRadio type="radio" name="level" value="중" />
          <LevelCheckSpan>중</LevelCheckSpan>
        </LevelCheckLabel>
        <LevelCheckLabel>
          <LevelCheckRadio type="radio" name="level" value="하" />
          <LevelCheckSpan>하</LevelCheckSpan>
        </LevelCheckLabel>
        <InputNamePassword type="text" placeholder="이름 입력" />
        <InputNamePassword type="password" placeholder="비밀번호 입력" />
        <AddButton>확인</AddButton>
        <br />
        <InputHint type="text" placeholder="힌트를 입력해 주세요!" />
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
  background: ${(props) =>
    props.children === '상'
      ? '#0DF0AC'
      : props.children === '중'
      ? '#89F9D7'
      : '#CBFFEF'};
  border-radius: 50%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: black;
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
