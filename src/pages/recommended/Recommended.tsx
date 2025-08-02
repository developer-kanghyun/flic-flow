import { StyledBody, StyledRecommended, StyledRecommendResult } from '@src/pages/recommended/styles';
import { useParams } from "react-router-dom";

const Recommended = () => {
  const { genre } = useParams();

  return (
    <>
      <StyledBody>
        <StyledRecommendResult>추천된 영화 목록</StyledRecommendResult>
        <StyledRecommended>{genre}</StyledRecommended>
      </StyledBody>
    </>
  );
};

export default Recommended;
