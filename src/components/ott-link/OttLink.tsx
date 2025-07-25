import React from "react";
import { StyledOttLink } from "./styles";
import { OTT_SEARCH_URLS } from "@src/api/tmdbApi"; // OTT_SEARCH_URLS import

interface OttLinkProps {
  providerName: string;
  logoPath: string;
  link: string; // Keep this for now, but it will be overridden if a search URL exists
  movieTitle: string; // Add movieTitle prop
}

const OttLink = ({ providerName, logoPath, link, movieTitle }: OttLinkProps) => {
  const ottSearchBaseUrl = OTT_SEARCH_URLS[providerName];
  const finalLink = ottSearchBaseUrl ? `${ottSearchBaseUrl}${encodeURIComponent(movieTitle)}` : link;

  return (
    <StyledOttLink href={finalLink} target="_blank" rel="noopener noreferrer">
      <img src={`https://image.tmdb.org/t/p/original${logoPath}`} alt={providerName} />
      <span>{providerName}</span>
    </StyledOttLink>
  );
};

export default OttLink;
