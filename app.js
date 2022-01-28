const express = require("express");
const app = express();
const cors = require("cors");

const api = require("./api");
const { google } = require("googleapis");
const { API_KEY } = require("./client_secret.json");
const PORT = process.env.PORT || 8080;
const youtube = google.youtube({
  version: "v3",
  auth: API_KEY,
});

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/api/subs", async (req, res) => {
  try {
    const max_results = 50; // 50 max
    var nextPageToken;
    var subscriptions = [];
    do {
      var response = await youtube.subscriptions.list({
        part: "snippet",
        mine: true,
        maxResults: max_results,
        order: "alphabetical",
        fields: "items.snippet.resourceId.channelId,nextPageToken",
        access_token: req.headers["authorization"],
        pageToken: nextPageToken,
      });
      var channelIds = response.data.items.map(
        (item) => item.snippet.resourceId.channelId
      );
      var response2 = await youtube.channels.list({
        part: "snippet,statistics",
        id: channelIds.toString(),
        fields: "items.snippet,items.statistics,items.id",
        maxResults: max_results,
      });
      // console.log(response2.data);
      response2.data.items.forEach((item) => {
        var sub = {};
        sub.id = item.id;
        sub.title = item.snippet.title;
        sub.description = item.snippet.description;
        sub.publishedAt = item.snippet.publishedAt;
        sub.country = item.snippet.country;
        sub.picture = item.snippet.thumbnails.default.url;
        sub.viewCount = item.statistics.viewCount;
        sub.subscriberCount = item.statistics.subscriberCount;
        sub.videoCount = item.statistics.videoCount;
        subscriptions.push(sub);
      });
      nextPageToken = response.data.nextPageToken;
    } while (nextPageToken);
    res.json(subscriptions);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

app.get("/search", async (req, res) => {
  const { q } = req.query;
  try {
    const response = await api.get(
      `/search?key=${API_KEY}&type=video&part=snippet&q=${q}`
    );
    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

app.get("/search2", async (req, res) => {
  const { q } = req.query;
  try {
    const response = await youtube.search.list({
      part: "snippet",
      q: q,
      type: "video",
    });
    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

app.get("/comments", async (req, res) => {
  const { q } = req.query;
  try {
    const response = await youtube.commentThreads.list({
      part: "snippet",
      videoId: q,
    });
    console.log(response.data);
    res.send(response.data);
    // const comments = response.data.items.map(
    //   (item) => item.snippet.topLevelComment.snippet.textOriginal
    // );
    // res.send(comments);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

app.get("/allComments", async (req, res) => {
  const { q } = req.query;
  try {
    var response = await youtube.commentThreads.list({
      part: "snippet",
      videoId: q,
    });
    var comments = [];
    while (response) {
      response.data.items.forEach((item) => {
        var comment = {};
        comment.totalReplies = item.snippet.totalReplyCount;
        comment.text = item.snippet.topLevelComment.snippet.textOriginal;
        comment.author = item.snippet.topLevelComment.snippet.authorDisplayName;
        comment.image =
          item.snippet.topLevelComment.snippet.authorProfileImageUrl;
        comment.likes = item.snippet.topLevelComment.snippet.likeCount;
        comment.published = item.snippet.topLevelComment.snippet.publishedAt;
        comments.push(comment);
      });
      var nextPageToken = response.data.nextPageToken;
      if (nextPageToken) {
        response = await youtube.commentThreads.list({
          part: "snippet",
          videoId: q,
          pageToken: nextPageToken,
        });
      } else break;
    }
    res.send(comments);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));
