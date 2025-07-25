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
    max-width: 250px; /* Adjust max-width as desired */
    width: 100%; /* Ensure it takes full width up to max-width */
    aspect-ratio: 2 / 3; /* Common poster aspect ratio */
    overflow: hidden; /* Hide overflow if image is larger */
    position: relative; /* For positioning content inside */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4); /* Add some shadow */
    transition: transform 0.2s ease-in-out; /* Smooth hover effect */

    &:hover {
      transform: scale(1.03);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover; /* Cover the area, cropping if necessary */
      border-radius: 4px;
    }
  }

  @media (max-width: 768px) {
    padding: 15px;
    h1 {
      font-size: 2em;
    }
  }
`;
