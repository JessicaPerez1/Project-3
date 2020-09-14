import React, { useRef, useState, useEffect } from "react";
import { usePostContext } from "../../utils/GlobalState";
import { LOADING, UPDATE_POSTS } from "../../utils/actions";
import API from "../../utils/API";
import { styled } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./style.css";

const MyCard = styled(Card)({
  width: "32%",
  marginTop: "15px",
  marginLeft: "5px",
  borderStyle: "2px solid black",
  float: "left",
  backgroundColor: "teal",
});

function HistoryList() {
  const [state, dispatch] = usePostContext();
  // //get all posts from a user /id
  // // loop through the items in post array and display

  const getPosts = () => {
    const user = JSON.parse(localStorage.getItem("data"));
    console.log(user);
    const userId = user[0].id;
    console.log(userId);
    dispatch({ type: LOADING });

    API.getPosts(userId)
      .then((results) => {
        dispatch({
          type: UPDATE_POSTS,
          posts: results.data,
          user: results.data.userId,
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {state.posts.map((post) => (
        <MyCard>
          <CardContent className="card">
            <Typography gutterBottom variant="h5" component="h2">
              DATE OF THE POST:
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {post.date}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              WORD POSTED:
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {post.post}
            </Typography>
          </CardContent>
        </MyCard>
      ))}
    </div>
  );
}

export default HistoryList;
