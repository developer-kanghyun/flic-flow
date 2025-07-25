import React, { useEffect, useState } from "react";
import { StyledBody } from "./styles";
import { Movie } from "@models/Movie";
import { StyledRanking } from "@components/ranking/styles";
import { StyledRankingContainer } from "@components/ranking-container/styles";
import { StyledRankingList } from "@components/ranking-list/styles";

const WatchList = () => {
  // 1. 화면에 보여줄 영화 목록을 저장할 상태 만들기
  const [movies, setMovies] = useState<Movie[]>([]);

  // 2. 컴포넌트가 처음 화면에 나타날 때 실행되는 부분
  useEffect(() => {
    // 2-1. 로컬스토리지에서 "WatchList"라는 이름으로 저장된 데이터 꺼내오기
    const saved = localStorage.getItem("watchList");
    let watchList = [];
    if (saved) {
      // 2-2. 문자열로 저장된 데이터를 실제 배열로 변환
      watchList = JSON.parse(saved);
    }
    // 2-3. 상태에 저장 (화면에 보여주기 위해)
    setMovies(watchList);
  }, []); // []는 컴포넌트가 처음 나타날 때만 실행

  return (
    <StyledBody>
      {/*3. 찜한 영화가 없으면 안내 메시지 보여주기 */}
      {movies.length === 0 ? (
        <h1>저장된 콘텐츠가 없습니다.</h1>
      ) : (
        // 4. 찜한 영화가 있으면 목록으로 보여주기
        <ul>
          <StyledRankingContainer>
            <StyledRankingList>
              <StyledRanking>
                {movies.map((movie) => (
                  <li key={movie.id}>
                    <p>{movie.title}</p>
                    <p>{movie.thumbnail}</p>
                    <p>{movie.id}</p>
                  </li>
                ))}
              </StyledRanking>
            </StyledRankingList>
          </StyledRankingContainer>
        </ul>
      )}
    </StyledBody>
  );
};

export default WatchList;
