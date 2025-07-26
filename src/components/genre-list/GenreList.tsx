import { useEffect, useState } from "react";
import { Filter, Accordion } from "@components/index";
import { getMovieGenres } from "@src/api/tmdbApi";
import { StyledFilterList } from "./styles";
import { useFilterStore } from "@src/store/filterStore";

interface Genre {
  id: number;
  name: string;
}

const GenreList = () => {
  const [genres, setGenresData] = useState<Genre[]>([]); // Renamed to setGenresData to avoid conflict with store's setGenres
  const { selectedGenres, setGenres } = useFilterStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const fetchedGenres = await getMovieGenres();
        setGenresData(fetchedGenres);
      } catch (err) {
        console.error("Error fetching genres:", err);
        setError("장르를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreClick = (genreId: number) => {
    if (selectedGenres.includes(genreId)) {
      setGenres(selectedGenres.filter((id) => id !== genreId));
    } else {
      setGenres([...selectedGenres, genreId]);
    }
  };

  if (loading) return <p>장르 로딩 중...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <Accordion title="장르">
      <StyledFilterList>
        {genres.map((genre) => (
          <Filter
            key={genre.id}
            filterKey={genre.id.toString()}
            label={genre.name}
            imgOn="" // 장르에는 이미지가 없으므로 빈 문자열
            imgOff="" // 장르에는 이미지가 없으므로 빈 문자열
            active={selectedGenres.includes(genre.id)}
            handleChangeFilter={() => handleGenreClick(genre.id)}
          />
        ))}
      </StyledFilterList>
    </Accordion>
  );
};

export default GenreList;
