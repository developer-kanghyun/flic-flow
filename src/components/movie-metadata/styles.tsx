import styled from "styled-components";

export const MetadataCard = styled.div`
  background: ${({ theme }) => theme.colors.lightGrey};
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;

  h3 {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.4rem;
    margin-bottom: 20px;
    font-weight: 600;
  }

  .metadata-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }

    .label {
      font-weight: 600;
      color: ${({ theme }) => theme.colors.text};
      font-size: 0.95rem;
    }

    .value {
      color: ${({ theme }) => theme.colors.text};
      opacity: 0.9;
    }

    .ratings {
      display: flex;
      flex-direction: column;
      gap: 6px;

      .tmdb-rating,
      .imdb-rating,
      .rt-rating {
        font-size: 0.9rem;
        padding: 4px 8px;
        border-radius: 4px;
        display: inline-block;
        width: fit-content;
      }

      .tmdb-rating {
        background: #01b4e4;
        color: white;
      }

      .imdb-rating {
        background: #f5c518;
        color: black;
      }

      .rt-rating {
        background: #fa320a;
        color: white;
      }
    }

    .genres {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      .genre {
        background: ${({ theme }) => theme.colors.primary};
        color: white;
        padding: 6px 12px;
        border-radius: 16px;
        font-size: 0.85rem;
        font-weight: 500;
      }
    }

    .watch-providers {
      display: flex;
      flex-direction: column;
      gap: 12px;

      .provider-link {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        background: ${({ theme }) => theme.colors.background};
        border-radius: 8px;
        text-decoration: none;
        color: ${({ theme }) => theme.colors.text};
        transition: all 0.3s ease;

        &:hover {
          background: ${({ theme }) => theme.colors.primary};
          color: white;
          transform: translateY(-2px);
        }

        .provider-logo {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          object-fit: cover;
        }

        span {
          font-weight: 500;
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 16px;

    .metadata-item {
      .ratings {
        .tmdb-rating,
        .imdb-rating,
        .rt-rating {
          font-size: 0.8rem;
        }
      }
    }
  }
`;