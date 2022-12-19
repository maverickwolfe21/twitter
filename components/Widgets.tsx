import { SearchIcon } from "@heroicons/react/outline";
import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";

const Widgets = () => {
  return (
    <div className="mt-2 col-span-2 hidden lg:inline">
      <div className="flex items-center space-x-2 bg-lightgray p-3 rounded-full m-2">
        <SearchIcon className="h-5 w-5 text-darkgray " />
        <input
          type="text"
          placeholder="Search Twitter"
          className="flex-1 bg-lightgray outline-none"
        />
      </div>
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="elonmusk"
        options={{ height: 1000 }}
      />
    </div>
  );
};

export default Widgets;
