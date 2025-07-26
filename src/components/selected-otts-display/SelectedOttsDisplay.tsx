import React, { useEffect, useState } from "react";
import { useFilterStore } from "@src/store/filterStore";
import { getWatchProviders } from "@src/api/tmdbApi";
import { StyledSelectedOttsDisplay } from "./styles";

interface WatchProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

const SelectedOttsDisplay = () => {
  const { selectedOtts } = useFilterStore();
  const [allProviders, setAllProviders] = useState<WatchProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllProviders = async () => {
      try {
        const fetchedData = await getWatchProviders(); // This is already an array of providers
        if (fetchedData) {
          setAllProviders(fetchedData);
        } else {
          setAllProviders([]);
        }
      } catch (err) {
        console.error("Error fetching all watch providers:", err);
        setError("OTT 제공사 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllProviders();
  }, []);

  if (loading) return null; // 로딩 중에는 표시하지 않음
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const activeProviders = allProviders.filter((provider) =>
    selectedOtts.includes(provider.provider_id)
  );

  return (
    <StyledSelectedOttsDisplay>
      <div className="label">선택된 서비스 :</div>
      <div className="otts-list">
        {activeProviders.length === 0 ? (
          <span className="no-selection">선택된 서비스가 없습니다</span>
        ) : (
          activeProviders.map((provider) => (
            <img
              key={provider.provider_id}
              className="ott-item"
              src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
              alt={provider.provider_name}
              title={provider.provider_name}
            />
          ))
        )}
      </div>
    </StyledSelectedOttsDisplay>
  );
};

export default SelectedOttsDisplay;
