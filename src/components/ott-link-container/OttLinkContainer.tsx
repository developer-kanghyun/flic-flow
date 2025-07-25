import React, { useEffect, useState } from "react";
import { StyledOttLinkContainer } from "./styles";
import { OttLink } from "@components/index";
import { getMovieWatchProviders } from "@src/api/tmdbApi";

interface OttLinkContainerProps {
  movieId: number;
  movieTitle: string;
  children?: React.ReactNode;
}

interface ProviderDetail {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

interface WatchProviderData {
  link: string;
  buy?: ProviderDetail[];
  flatrate?: ProviderDetail[];
  rent?: ProviderDetail[];
}

const OttLinkContainer = ({ movieId, movieTitle }: OttLinkContainerProps) => {
  const [watchProviders, setWatchProviders] = useState<WatchProviderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWatchProviders = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMovieWatchProviders(movieId);
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
  }, [movieId]);

  if (loading) return <p>시청 가능한 OTT 정보 로딩 중...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!watchProviders || !watchProviders.link || (!watchProviders.flatrate && !watchProviders.buy && !watchProviders.rent)) {
    return <p>시청 가능한 OTT 정보가 없습니다.</p>;
  }

  const allProviders = [
    ...(watchProviders.flatrate || []),
    ...(watchProviders.buy || []),
    ...(watchProviders.rent || []),
  ];

  // 중복 제거 (provider_id 기준)
  const uniqueProviders = Array.from(new Map(allProviders.map(item => [item.provider_id, item])).values());

  return (
    <StyledOttLinkContainer>
      <h2>시청하기</h2>
      <div>
        {uniqueProviders.map((provider) => (
          <OttLink
            key={provider.provider_id}
            providerName={provider.provider_name}
            logoPath={provider.logo_path}
            link={watchProviders.link} // 전체 영화 링크를 전달
            movieTitle={movieTitle} // movieTitle 전달
          />
        ))}
      </div>
    </StyledOttLinkContainer>
  );
};

export default OttLinkContainer;
