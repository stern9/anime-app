import { useState, useEffect } from "react";
import naruto from "animexyz";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

function App() {
  const [animeList, setAnimeList] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [search, setSearch] = useState("");

  const GetTopAnime = async () => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=5`
    ).then((res) => res.json());

    setTopAnime(temp.data ?? []);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    fetchAnime(search);
  };

  const fetchAnime = async (query) => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(
        query
      )}&order_by=title&sort=asc&limit=12`
    ).then((res) => res.json());

    setAnimeList(temp.data ?? []);
  };

  useEffect(() => {
    GetTopAnime();
  }, []);

  naruto({ size: 100, duration: 900 });

  return (
    <div className="App">
      <Header />
      <div className="content-wrap">
        <Sidebar topAnime={topAnime} />
        <MainContent
          handleSearch={handleSearch}
          search={search}
          setSearch={setSearch}
          animeList={animeList}
        />
      </div>
    </div>
  );
}

export default App;
