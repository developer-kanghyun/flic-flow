import styled from "styled-components";

export const StyledSelectedOttsDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  .label {
    font-size: 18px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
    min-width: 80px;
  }

  .otts-list {
    display: flex;
    gap: ${({ theme }) => theme.spacing.sm};
    align-items: center;
    flex-wrap: wrap;
  }

  .ott-item {
    width: 58px;
    height: 58px;
    border-radius: 8px;
    object-fit: cover;
    border: 1px solid ${({ theme }) => theme.colors.border};
    transition: all 0.2s ease;
    cursor: default;

    &:hover {
      border-color: ${({ theme }) => theme.colors.primary};
      transform: scale(1.1);
      box-shadow: 0 4px 12px rgba(255, 133, 0, 0.3);
    }
  }

  .no-selection {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 16px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.sm};

    .label {
      min-width: auto;
    }

    .ott-item {
      width: 48px;
      height: 48px;
    }
  }
`;
