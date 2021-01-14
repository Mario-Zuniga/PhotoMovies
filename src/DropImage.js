import React from "react";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { DropzoneArea } from "material-ui-dropzone";
import Toolbar from "@material-ui/core/Toolbar";
import Switch from "@material-ui/core/Switch";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";

import { toggled, storeName } from "./redux/actions/index";
import { useSelector, useDispatch } from "react-redux";

import { useStyles } from "./styles/DropImageStyles";
import bgl from "./styles/background-light.svg";
import bgd from "./styles/background-dark.svg";

import { useHistory } from "react-router-dom";
import axios from "axios";

function DropImage() {
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();
  var toggledStore = useSelector((state) => state.theme);

  function getMovieInfo(files) {
    const imageFile = files[0];
    var bodyFormData = new FormData();
    bodyFormData.append("file", imageFile);

    async function getData() {
      await axios({
        method: "post",
        url: "https://whois.nomada.cloud/upload",
        data: bodyFormData,
        headers: { Nomada: "MzZlY2JkNDctYTBmOS00ZTk1LTk5MWItY2JiMWJlNWEwODEx" },
      })
        .then(function (response) {
          dispatch(storeName(response.data.actorName));
          history.push(`/results/${response.data.actorName}`);
        })
        .catch(function (response) {
          console.log(response);
        });
    }
    getData();
  }

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
      <Grid container spacing={7}>
        <Grid item lg={12}>
          <Container 
            className={classes.textArea} 
            style={{ color: toggledStore ? "white" : "black" }}
            maxWidth="lg"
          >
            <h1>Who's That Actor?</h1>
          </Container>
        </Grid>

        <Grid className={classes.drop} item lg={12}>
          <Container maxWidth="lg">
            <DropzoneArea
              acceptedFiles={['.png,.jpg,.JPG,.PNG']}
              dropzoneText={"Select or drop the picture to find out!"}
              onDrop={(files) => getMovieInfo(files)}
              showPreviews={false}
              showPreviewsInDropzone={false}
              filesLimit={1}
            />
          </Container>
        </Grid>

        <Grid item lg={12}>
          <Container 
            className={classes.textArea} 
            maxWidth="lg"
            style={{ color: toggledStore ? "white" : "black" }}
          >
            <h2>How does it work?</h2>
            <p>
              Real simple! You just drop an image file with the actor you can't
              remember the name and we'll do the rest!
            </p>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}

export default DropImage;
