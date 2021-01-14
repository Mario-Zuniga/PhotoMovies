import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    textAlign: "center",
    color: "black",
    backgroundColor: "#F2F2F2",
    margin: "1em",
    marginLeft: "3.5em",
  },
  button: {
    padding: theme.spacing(2),
    alignItems: "left",
    margin: "2em 4em",
  },
  poster: {
    width: "150px",
    height: "225px",
    borderRadius: "4px",
  },
  profilePicture: {
    borderRadius: "4px",
  },
  movieBody: {
    display: "flex",
    margin: "1em 1em",
    alignItems: "center",
    textAlign: "justify",
    "& p": {
      margin: "1em 1em",
    },
  },
  movieHeader: {
    margin: "0.2em 2em",
    display: "flex",
    alignItems: "center",
    alignContent: "space-between",
    flexDirection: "row",
  },
  movieTitle: {
    fontSize: "2em",
    letterSpacing: "10px",
  },
}));

export { useStyles };
