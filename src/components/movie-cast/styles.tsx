import styled from "styled-components";

export const CastCard = styled.div`
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

  .cast-section {
    margin-bottom: 24px;

    &:last-child {
      margin-bottom: 0;
    }

    h4 {
      color: ${({ theme }) => theme.colors.text};
      font-size: 1.1rem;
      margin-bottom: 16px;
      font-weight: 600;
    }
  }

  .cast-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;

    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 12px;
    }
  }

  .cast-member {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: ${({ theme }) => theme.colors.background};
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .cast-photo {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
      flex-shrink: 0;
      
      @media (max-width: 768px) {
        width: 50px;
        height: 50px;
      }
    }

    .cast-info {
      flex: 1;
      min-width: 0;

      .cast-name {
        font-weight: 600;
        color: ${({ theme }) => theme.colors.text};
        font-size: 0.95rem;
        margin-bottom: 4px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .cast-role {
        color: ${({ theme }) => theme.colors.text};
        opacity: 0.7;
        font-size: 0.85rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 16px;

    .cast-member {
      padding: 8px;
      gap: 8px;
    }
  }
`;