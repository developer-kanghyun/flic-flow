import { styled } from "styled-components";

export const StyledBody = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 20px;
  min-height: 100vh;
  box-sizing: border-box;

  h1 {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 2.5em;
    margin-bottom: 20px;
    text-align: center;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }

  li {
    background-color: ${({ theme }) => theme.colors.lightGrey};
    border-radius: 8px;
    max-width: 250px;
    width: 100%;
    aspect-ratio: 2 / 3;
    overflow: hidden;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    transition: all 0.3s ease-in-out;
    animation: slideIn 0.5s ease-out;

    &:hover {
      transform: scale(1.03);
      box-shadow: 0 8px 25px rgba(192, 192, 192, 0.15), 
                  0 0 15px rgba(192, 192, 192, 0.1),
                  inset 0 0 10px rgba(192, 192, 192, 0.05);
      filter: brightness(1.05);
    }

    .watchlist-button-wrapper {
      position: absolute;
      top: 8px;
      right: 8px;
      z-index: 10;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
      transition: all 0.3s ease-in-out;
    }

    &:hover img {
      filter: brightness(1.02);
    }
  }

  .empty-state {
    text-align: center;
    padding: 60px 20px;
    max-width: 500px;
    margin: 0 auto;

    .empty-icon {
      font-size: 4em;
      margin-bottom: 20px;
      opacity: 0.7;
    }

    h2 {
      color: ${({ theme }) => theme.colors.text};
      font-size: 1.8em;
      margin-bottom: 15px;
      font-weight: 600;
    }

    p {
      color: ${({ theme }) => theme.colors.text};
      font-size: 1.1em;
      line-height: 1.6;
      margin-bottom: 30px;
      opacity: 0.8;
    }

    .empty-actions {
      .discover-btn {
        background: ${({ theme }) => theme.colors.primary};
        color: white;
        text-decoration: none;
        padding: 12px 24px;
        border-radius: 25px;
        font-weight: 600;
        transition: all 0.3s ease-in-out;
        display: inline-block;

        &:hover {
          background: ${({ theme }) => theme.colors.secondary};
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
      }
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    padding: 15px;
    h1 {
      font-size: 2em;
    }
  }
`;
