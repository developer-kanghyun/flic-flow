import { styled } from "styled-components";

export const StyledMovieList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start; /* 항목들을 왼쪽부터 정렬 */

  li {
    background-color: ${({ theme }) => theme.colors.lightGrey};
    border-radius: 8px;
    /* 한 줄에 5개 항목, 20px 간격 */
    width: calc((100% - (4 * 20px)) / 5);
    max-width: calc((100% - (4 * 20px)) / 5);
    aspect-ratio: 2 / 3; /* Common poster aspect ratio */
    overflow: hidden;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.03);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }

    h3, p {
      display: none;
    }

    @media (max-width: 1400px) { /* 4 items per row */
      width: calc((100% - (3 * 20px)) / 4);
      max-width: calc((100% - (3 * 20px)) / 4);
    }

    @media (max-width: 1024px) { /* 3 items per row */
      width: calc((100% - (2 * 20px)) / 3);
      max-width: calc((100% - (2 * 20px)) / 3);
    }

    @media (max-width: 768px) { /* 2 items per row */
      width: calc((100% - (1 * 20px)) / 2);
      max-width: calc((100% - (1 * 20px)) / 2);
    }

    @media (max-width: 480px) { /* 1 item per row */
      width: 100%;
      max-width: 100%;
    }
  }
`;
