import { StyledOttLink } from "./styles";
import { OTT_SEARCH_URLS } from "@src/api/tmdbApi"; // OTT_SEARCH_URLS import

interface OttLinkProps {
  providerName: string;
  logoPath: string;
  link: string; // Keep this for now, but it will be overridden if a search URL exists
  movieTitle: string; // Add movieTitle prop
  type?: string; // 스트리밍, 대여, 구매 등
}

const OttLink = ({ providerName, logoPath, link, movieTitle, type }: OttLinkProps) => {
  const ottSearchBaseUrl = OTT_SEARCH_URLS[providerName];
  const finalLink = ottSearchBaseUrl ? `${ottSearchBaseUrl}${encodeURIComponent(movieTitle)}` : link;

  return (
    <StyledOttLink href={finalLink} target="_blank" rel="noopener noreferrer">
      <div className="provider-info">
        <img src={`https://image.tmdb.org/t/p/original${logoPath}`} alt={providerName} />
        <div className="provider-text">
          <span className="provider-name">{providerName}</span>
          {type && <span className="provider-type">{type}</span>}
        </div>
      </div>
    </StyledOttLink>
  );
};

export default OttLink;
