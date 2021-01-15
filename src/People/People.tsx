import React, { useEffect, useState } from "react";
import axios from "axios";

import { createStyles, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

interface Result {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      display: "flex",
      width: "100%",
      margin: "30px auto",
      justifyContent: "center",
    },

    list: {
      width: "100%",
      maxWidth: "300px",
      backgroundColor: "#525252",
    },

    sort: {
      margin: "0 auto",
      width: "165px",
    },
  })
);

function People() {
  const [people, setPeople] = useState([] as any);
  const [heights, setHeights] = useState([] as any);

  useEffect(() => {
    axios.get("https://swapi.dev/api/people/").then((res) =>
      res.data.results.map((el: Result) => {
        setPeople((prevArray: []) => [...prevArray, el.name]);
        setHeights((prevArray: []) => [...prevArray, el.height]);
      })
    );
  }, []);

  const classes = useStyles();

  const handleSort = (sorting: string) => {
    const actorsAndHeights: { name: string; height: number }[] = [];

    people.forEach((x: any, i: number) => {
      actorsAndHeights.push({ name: x, height: heights[i] });
    });

    if (sorting === "ascending") {
      actorsAndHeights.sort(function (a, b) {
        return a.height - b.height;
      });
      let arr: string[] = [];
      actorsAndHeights.forEach((el: any) => {
        arr.push(el.height);
      });
      setHeights([...arr]);
    }

    if (sorting === "descending") {
      actorsAndHeights.sort(function (a, b) {
        return b.height - a.height;
      });
      let arr: string[] = [];
      actorsAndHeights.forEach((el: any) => {
        arr.push(el.height);
      });
      setHeights([...arr]);
    }
  };

  return (
    <section>
      <div className={classes.wrapper}>
        <div className={classes.list}>
          <List component="nav">
            <ListItem button>
              <ListItemText primary="ACTOR" />
            </ListItem>
            {people &&
              people.map((person: string, i: number) => (
                <ListItem button key={i}>
                  <ListItemText primary={person} />
                </ListItem>
              ))}
          </List>
        </div>
        <div className={classes.list}>
          <List component="nav">
            <ListItem button>
              <ListItemText primary="HEIGHT" />
            </ListItem>
            {heights &&
              heights.map((height: string, i: number) => (
                <ListItem button key={i}>
                  <ListItemText primary={height} />
                </ListItem>
              ))}
          </List>
        </div>
      </div>
      <div className={classes.sort}>
        <p>Sort actors by height</p>
        <button onClick={() => handleSort("ascending")}>Ascending</button>
        <button onClick={() => handleSort("descending")}>Descending</button>
      </div>
    </section>
  );
}

export default People;
