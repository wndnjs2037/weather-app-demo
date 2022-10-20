import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

function App() {
  const [location, setLocation] = useState("");
  const [result, setResult] = useState({}); //오브젝트로 초기화
  const API_KEY = "c3afcae5b3eb9014f38e26bd005537d0";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;

  const searchWeather = async (e) => {
    if (e.key === "Enter") {
      try {
        const data = await axios({
          method: "GET",
          url: url,
        });
        console.log(data);
        setResult(data); // 오브젝트 값을 넣어서 setting
      } catch (err) {
        alert(err);
      }
    }
  };
  return (
    <AppWrap>
      <div className="appContentWrap">
        <input
          placeholder="도시를 입력하세요"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          onKeyDown={searchWeather}
        />
        {/* 빈 오브젝트가 아닐 때를 구분하기 위해 조건을 추가해줌*/}
        {Object.keys(result).length !== 0 && (
          <ResultWrap>
            <div className="city">{result.data.name}</div>
            <div className="tem">{result.data.main.temp}</div>
            <div className="sky">{result.data.weather[0].main}</div>
          </ResultWrap>
        )}
      </div>
    </AppWrap>
  );
}

export default App;

const AppWrap = styled.div`
  width: 100vw;
  height: 100vh;

  .appContentWrap {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    padding: 20px;
  }
  input {
    padding: 16px;
    border: 2px pink solid;
    border-radius: 16px;
  }
`;

const ResultWrap = styled.div`
  margin-top: 60px;
  padding: 10px;
  border: 1px black solid;
  border-radius: 8px;
  
  .city{
    font-size: 24px;
  }
  .tem{
    font-size: 60px;
    margin-top: 8px;
  }
  .sky{
    font-size:20px;
    text-align: right;
    margin-top: 8px;
  }
`;
