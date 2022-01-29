import React from "react";
import { UserCard } from "react-ui-cards";

export const Profile = ({ item }) => {
  return (
    <div>
      <div>
        <UserCard
          float
          href={`https://youtube.com/channel/${item.id}`}
          header="https://i.imgur.com/w5tX1Pn.jpg"
          avatar={item.picture}
          name={item.title}
          positionName={`Created: ${item.publishedAt.split("T")[0]}, ${
            item.country ? item.country : "IN"
          }`}
          //   positionName={item.description}
          stats={[
            {
              name: "Subscribers",
              value: item.subscriberCount,
            },
            {
              name: "Videos",
              value: item.videoCount,
            },
            {
              name: "Views",
              value: item.viewCount,
            },
          ]}
        />
      </div>
    </div>
  );
};
