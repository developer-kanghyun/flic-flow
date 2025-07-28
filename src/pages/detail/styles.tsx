import { styled } from "styled-components";

export const StyledDetailPage = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  .loading,
  .error {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
    font-size: 1.2rem;
    text-align: center;
  }
`;

export const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 20px;
  }
`;

export const MainContent = styled.main`
  h2 {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.8rem;
    margin-bottom: 20px;
    font-weight: 600;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.9;
  }
`;

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const RecommendationsSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
`;