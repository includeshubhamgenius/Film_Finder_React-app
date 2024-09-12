import React, { useState, useEffect } from "react";
import Axios from "axios";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


export const API_KEY = "4a883551";

const Container = styled.div`
  display: flex;
  flex-direction: column;

`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;

const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  color: #5f6368;
  height:20px;
  
  padding-right: 5px;
`;

const Placeholder = styled.img`
  height: 150px;
  position:relative;
  top:100px;
  display: block;
  margin: 0 auto; /* Centers the image horizontally */
`;

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: center;
  align-items: center;
`;


function App() {
  const [searchQuery, updateSearchQuery] = useState("");
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();
  const [timeoutId, updateTimeoutId] = useState(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await Axios.get(
          `https://www.omdbapi.com/?s=popular&apikey=${API_KEY}`
        );
        updateMovieList(response.data.Search);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    fetchPopularMovies();
  }, []); // Empty dependency array ensures this runs only once

  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
    );
    updateMovieList(response.data.Search);
  };

  const onTextChange = (e) => {
    onMovieSelect("");
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="/clapperboard.png" alt="Clapperboard Icon" />
          Film Finder
        </AppName>
        <SearchBox>
          <SearchIcon icon={faMagnifyingGlass} />
          <SearchInput
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect} />}
      <MovieListContainer>
  {movieList?.length ? (
    movieList.slice(0, 15).map((movie, index) => (
      <MovieComponent
        key={index}
        movie={movie}
        onMovieSelect={onMovieSelect}
      />
    ))
  ) : (
    <Placeholder src="/movieloading.gif" alt="Loading" />
  )}
</MovieListContainer>
    </Container>
  );
}

export default App;
