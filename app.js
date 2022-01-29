const express = require("express");
const app = express();
const cors = require("cors");

const api = require("./api");
const { google } = require("googleapis");
// const { API_KEY } = require("./client_secret.json");
const PORT = process.env.PORT || 8080;
const youtube = google.youtube({
  version: "v3",
  auth: process.env.API_KEY,
});

app.use(cors());
app.use(express.json());

app.get("/api/subs", async (req, res) => {
  try {
    const max_results = 50;
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

app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));
