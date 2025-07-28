import { useEffect, useState } from "react";
import Filter from "../filter/Filter";
import { StyledFilterList } from "./styles";
import { useFilterStore } from "@src/store/filterStore";
import { getWatchProviders } from "@src/api/tmdbApi";

interface WatchProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

const POPULAR_KR_OTTS = [
  "Netflix",
  "Watcha",
  "Disney Plus",
  "wavve",
  "Coupang Play",
  "TVING",
  "Apple TV+",
];

const FilterList = () => {
  const { selectedOtts, setOtts } = useFilterStore();
  const [providers, setProviders] = useState<WatchProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const fetchedData = await getWatchProviders(); // This is already an array of providers
        if (fetchedData) {
          const filteredProviders = fetchedData.filter((provider: WatchProvider) =>
            POPULAR_KR_OTTS.includes(provider.provider_name)
          );
          setProviders(filteredProviders);
        } else {
          setProviders([]);
        }
      } catch (err) {
        console.error("Error fetching watch providers:", err);
        setError("OTT 제공사를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  const handleChangeFilter = (providerId: number) => {
    if (selectedOtts.includes(providerId)) {
      setOtts(selectedOtts.filter((id) => id !== providerId));
    } else {
      setOtts([...selectedOtts, providerId]);
    }
  };

  if (loading) return <p>OTT 제공사 로딩 중...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <StyledFilterList>
      {providers.map((provider) => (
        <Filter
          key={provider.provider_id}
          filterKey={provider.provider_id.toString()}
          label={provider.provider_name}
          imgOn={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
          imgOff={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
          active={selectedOtts.includes(provider.provider_id)}
          handleChangeFilter={() => handleChangeFilter(provider.provider_id)}
        />
      ))}
    </StyledFilterList>
  );
};

export default FilterList;

