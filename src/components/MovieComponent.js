import React from "react";
import styled from "styled-components";


const MovieContainer = styled.div`
  display: flex;
  background-color: black;
  flex-direction: column;
  border-radius: 5px;
  padding: 10px;
  height:360px;
  width: 200px;
  box-shadow: 5px 5px 12px black;
  cursor: pointer;
  transition: all 0.3s ease-in-out; /* Smooth transition for hover effects */

  &:hover {
    transform: scale(1.05); /* Slightly increase the size */
    box-shadow: 2px 2px 30px 2px black; /* Darker shadow on hover */
    background-color: #1a1a1a; /* Slightly change the background color */
  }
`;



const CoverImage = styled.img`
  object-fit: cover;
  height: 362px;
`;

const MovieName = styled.span`
  font-size: 15px;
  font-weight: 600;
  color:white;
  margin: 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const MovieInfo = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
`;
const MovieComponent = (props) => {
  const { Title, Year, imdbID, Type, Poster } = props.movie;

  return (
    <MovieContainer
      onClick={() => {
        props.onMovieSelect(imdbID);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <CoverImage src={Poster} alt={Title} />
      <MovieName>{Title}</MovieName>

      <InfoColumn>
        <MovieInfo>Year : {Year}</MovieInfo>
        <MovieInfo>Type : {Type}</MovieInfo>
      </InfoColumn>
    </MovieContainer>
  );
};
export default MovieComponent;
