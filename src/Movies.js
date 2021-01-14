import React, { useState, useEffect } from "react";

import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import StarIcon from "@material-ui/icons/Star";
import Switch from "@material-ui/core/Switch";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { useSelector, useDispatch } from "react-redux";
import { toggled } from "./redux/actions/index";

import { NavLink } from "react-router-dom";
import axios from "axios";

import { useStyles } from "./styles/MoviesStyles";
import bgd from "./styles/background-dark.svg";
import bgl from "./styles/background-light.svg";

function Movies() {
  const classes = useStyles();
  const toggledStore = useSelector((state) => state.theme);
  const nameStore = useSelector((state) => state.storeName);
  const dispatch = useDispatch();

  const [info, setInfo] = useState([]);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    async function getMovieData() {
      await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/search/person?query=${nameStore}&api_key=30db1237b9167f8afaf9e065b90d16b8&language=en-US&page=1`,
      })
        .then((response) => {
          setInfo(response.data.results[0]);
          console.log(response.data.results[0]);
          setMovieList(response.data.results[0].known_for);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getMovieData();
  }, []);

  return (
    <div
      className={classes.root}
      style={{
        backgroundColor: toggledStore ? "#011212" : "#0FB5B8",
        backgroundImage: toggledStore ? `url(${bgd})` : `url(${bgl})`,
      }}
    >
      <AppBar
        position="static"
        style={{ backgroundColor: toggledStore ? "white" : "black" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            style={{ color: toggledStore ? "black" : "white" }}
          >
            Who's That Actor?
          </Typography>
          <Switch 
            checked={toggledStore} 
            color="primary" 
            onClick={() => dispatch(toggled())} 
          />
          <Typography
            variant="h9"
            style={{ color: toggledStore ? "black" : "white" }}
          >
            {toggledStore ? "Dark Mode" : "Light Mode"}
          </Typography>
        </Toolbar>
      </AppBar>

      <Grid container spacing={3} style={{ marginLeft: "1em" }}>
        <Grid item lg={12}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
          >
            <NavLink activeStyle={{ color: 'white' }} to="/">Go Back</NavLink>
          </Button>
        </Grid>

        <Grid item lg={3}>
          <Paper className={classes.paper}>
            <img
              className={classes.profilePicture}
              src={`https://image.tmdb.org/t/p/w200/${info.profile_path}`}
              alt={info.name}
            />
            <h2>{info.name}</h2>
            <h4>Popularity: {info.popularity}</h4>
            <h4>{info.gender === 2 ? "Male" : "Female"}</h4>
          </Paper>
        </Grid>

        <Grid item lg={8}>
          <Paper className={classes.paper}>
            <h1 className={classes.movieTitle}>Movies</h1>
          </Paper>
          {movieList.map((movie) => (
            <Paper className={classes.paper}>
              <Grid className={classes.movieHeader}>
                <Grid item lg={2}>
                  <h4>{movie.original_title}</h4>
                </Grid>
                <Grid item lg={5}>
                  <p>Release Date: {movie.release_date}</p>
                </Grid>
                <Grid
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "2em",
                  }}
                  item
                  xs={2}
                >
                  <p className="text-right">{movie.vote_average} / 10</p>
                  <StarIcon style={{ fill: "yellow" }} />
                </Grid>
              </Grid>
              <div className={classes.movieBody}>
                <div>
                  <img
                    className={classes.poster}
                    src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                    alt={movie.original_title}
                  />
                </div>
                <p>{movie.overview}</p>
              </div>
            </Paper>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default Movies;
