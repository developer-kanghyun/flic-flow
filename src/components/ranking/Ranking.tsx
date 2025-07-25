import React, { useEffect, useState } from "react";
import { StyledRanking } from "./styles";
import { Movie } from "@models/Movie";
import { Link } from "react-router-dom";
import pinkHeart from "../../imgs/pinkheart.png";
import greyHeart from "../../imgs/greyheart.png";

interface RankingProps {
  movie: Movie;
}

const Ranking = (props: RankingProps) => {
  const { movie } = props;

  const [isClicked, setIsClicked] = useState(false); // 하트가 눌렸는지 아닌지 상태를 확인
  // 컴포넌트가 처음 화면에 나타날 때, 이 영화가 찜 목록에 있는지 확인
  useEffect(() => {
    // 로컬스토리지에서 "watchList"라는 이름으로 저장된 데이터 꺼내오기
    const savedList = localStorage.getItem("watchList");
    // 꺼내올 데이터가 없다면 빈 배열을 가져온다
    let watchList = [];
    if (savedList) {
      watchList = JSON.parse(savedList);
    }

    // 찜 목록에 이 영화가 있는지 확인
    const found = watchList.some((item) => item.id === movie.id);
    // 있으면 분홍, 없으면회색
    setIsClicked(found);
    console.log(isClicked);
  }, [movie.id]);

  // 하트 버튼을 눌렀을 때 실행되는 함수
  const handleClick = () => {
    // 로컬스토리지에서 찜 목록 불러오기
    const savedList = localStorage.getItem("watchList");
    let watchList = [];
    if (savedList) {
      watchList = JSON.parse(savedList);
    }

    // 만약 이미 찜한 상태라면
    if (isClicked) {
      // 이 영화만 빼고 나머지만 남기기 (찜 해제)
      const myList = watchList.filter((item) => item.id !== movie.id);
      // 다시 저장
      localStorage.setItem("watchList", JSON.stringify(myList));
      // 하트 상태 변경
      setIsClicked(false);
    } else {
      // 아직 찜하지 않았다면, 기존 목록에 이 영화 추가
      const newList = [...watchList, movie];
      // 다시 저장
      localStorage.setItem("watchList", JSON.stringify(newList));
      // 하트 상태 변경
      setIsClicked(true);
    }
  };

  // 하트 이미지를 결정
  const heartImg = isClicked ? pinkHeart : greyHeart;

  return (
    <StyledRanking>
      <Link to={`/detail/${movie.id}`}>
        <p>{movie.title}</p>
        <p>{movie.thumbnail}</p>
        <p>{movie.id}</p>
      </Link>
      <div>
        <img src={heartImg} onClick={handleClick} alt="Move to Watch List" />
      </div>
    </StyledRanking>
  );
};

export default Ranking;
