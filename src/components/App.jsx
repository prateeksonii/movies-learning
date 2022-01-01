import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import api from "../api";

const App = () => {
  const [movies, setMovies] = useState([]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/");
      setMovies(res.data);
    };

    fetchData();
  }, []);

  const onSubmit = async (values) => {
    const res = await api.post("/", {
      title: values.title,
      popularity: +values.popularity,
    });

    setMovies([...movies, res.data]);
    reset();
    console.log(res);
  };

  return (
    <div>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">
          Title
          <input
            id="title"
            placeholder="Enter a title"
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 4,
                message: "Title is too short",
              },
            })}
          />
        </label>
        <label htmlFor="popularity">
          Popularity
          <input
            id="title"
            placeholder="Enter it's popularity"
            type="number"
            {...register("popularity", {
              required: "Popularity is required",
              min: {
                value: 1,
                message: "Popularity cannot be less than 1",
              },
            })}
          />
        </label>
        <button>Create Movie</button>
      </StyledForm>
      <StyledHeading>Movies</StyledHeading>
      <StyledContainer>
        {movies.map((movie) => (
          <StyledCard key={movie.id}>
            <h4>{movie.title}</h4>
            <p>Popularity: {movie.popularity}</p>
          </StyledCard>
        ))}
      </StyledContainer>
    </div>
  );
};

export default App;

const StyledHeading = styled.h2`
  margin-bottom: 2rem;
`;

const StyledContainer = styled.div`
  display: flex;
`;

const StyledCard = styled.div`
  padding: 2rem;
  background-color: whitesmoke;
  margin: 1rem;
  border-radius: 10px;

  h4 {
    color: purple;
  }

  p {
    font-size: 1rem;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  padding: 2rem;

  label {
    margin-bottom: 1rem;
  }

  input {
    font-size: 1.2rem;
    display: block;
    width: 100%;
  }

  button {
    width: fit-content;
    padding: 0.5rem 2rem;
    font-size: 1.3rem;
    background: #4d014d;
    color: white;
    border: none;
    cursor: pointer;
  }
`;
