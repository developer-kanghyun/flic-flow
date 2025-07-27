import { useEffect, useState } from "react";
import { StyledOttLinkContainer } from "./styles";
import { OttLink } from "@components/index";
import { getContentWatchProviders } from "@src/api/tmdbApi";
import type { WatchProviderDetails } from "@src/types/api";

interface OttLinkContainerProps {
  movieId: number;
  movieTitle: string;
  mediaType?: 'movie' | 'tv';
}

const OttLinkContainer = ({ movieId, movieTitle, mediaType }: OttLinkContainerProps) => {
  const [watchProviders, setWatchProviders] = useState<WatchProviderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWatchProviders = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getContentWatchProviders(movieId, mediaType);
        setWatchProviders(data);
        console.log("Watch Providers Data:", data); // 디버깅을 위한 콘솔 로그 추가
      } catch (err) {
        console.error("Error fetching watch providers:", err);
        setError("시청 가능한 OTT 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchWatchProviders();
  }, [movieId, mediaType]);

  if (loading) return <p>시청 가능한 OTT 정보 로딩 중...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!watchProviders || !watchProviders.link || !watchProviders.flatrate) {
    return <p>시청 가능한 OTT 정보가 없습니다.</p>;
  }

  // 스트리밍 플랫폼만 표시 (Netflix Standard with Ads 제외)
  const streamingProviders = (watchProviders.flatrate || []).filter(
    provider => !provider.provider_name.includes('Standard with Ads')
  );

  return (
    <StyledOttLinkContainer className="ott-link-container">
      <h2>시청하기</h2>
      
      <div className="provider-grid">
        {streamingProviders.map((provider) => (
          <OttLink
            key={`stream-${provider.provider_id}`}
            providerName={provider.provider_name}
            logoPath={provider.logo_path}
            link={watchProviders.link}
            movieTitle={movieTitle}
          />
        ))}
      </div>
    </StyledOttLinkContainer>
  );
};

export default OttLinkContainer;
