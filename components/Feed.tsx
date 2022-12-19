import React, { useState } from "react";
import { RefreshIcon } from "@heroicons/react/outline";

import Tweetbox from "./Tweetbox";
import { Tweet } from "../typings";

import TweetComponent from "../components/Tweet";
import { fetchTweets } from "../utils/fetchTweets";
import toast from "react-hot-toast";

interface Props {
  tweets: Tweet[];
}

const Feed = ({ tweets: tweetsProp }: Props) => {
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp);

  const handleRefresh = async () => {
    const refreshToast = toast.loading("Refreshing...");
    const tweets = await fetchTweets();
    setTweets(tweets);

    toast.success("Feed Updated", { id: refreshToast });
  };

  return (
    <div className="col-span-7 lg:col-span-5 border-x max-h-screen overflow-scroll scrollbar-hide border-lightgray">
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <RefreshIcon
          className="h-8 w-8 cursor-pointer text-twitter mr-5 mt-5 transition-all duration: 700 ease-out hover:rotate-180 active:scale-125"
          onClick={handleRefresh}
        />
      </div>
      <div>
        <Tweetbox setTweets={setTweets} />
      </div>
      {tweets.map((tweet) => (
        <TweetComponent key={tweet._id} tweet={tweet} />
      ))}
    </div>
  );
};

export default Feed;
