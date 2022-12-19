import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from "@heroicons/react/outline";

import { useSession } from "next-auth/react";
import { Tweet, TweetBody } from "../typings";
import { fetchTweets } from "../utils/fetchTweets";
import toast from "react-hot-toast";

interface Props {
  setTweets: Dispatch<SetStateAction<Tweet[]>>;
}

const Tweetbox = ({ setTweets }: Props) => {
  const [text, setText] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [imageBox, setImageBox] = useState<boolean>(false);

  const { data: session } = useSession();

  const imageInputRef = useRef<HTMLInputElement>(null);

  const addImageToTweet = (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();

    if (!imageInputRef.current?.value) return;

    setImage(imageInputRef.current.value);
    imageInputRef.current.value = "";
    setImageBox(false);
  };

  const postTweet = async () => {
    const tweetInfo: TweetBody = {
      text,
      username: session?.user?.name || "Unknown User",
      profileImg: session?.user?.image || "https://links.papareact.com/gll",
      image,
    };

    const result = await fetch(`/api/addTweet`, {
      body: JSON.stringify(tweetInfo),
      method: "POST",
    });

    const json = await result.json();

    const tweets = await fetchTweets();
    setTweets(tweets);

    toast("Tweet Posted", {
      icon: "🚀",
    });
    return json;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    postTweet();
    setText("");
    setImage("");
  };

  return (
    <div className="flex space-x-2 p-5">
      <img
        src={session?.user?.image || "https://links.papareact.com/gll"}
        className="h-14 w-14 rounded-full object-cover mt-4"
        alt="guy"
      />
      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col">
          <input
            value={text}
            type="text"
            placeholder="What's happening?"
            className="h-24 w-full text-xl placeholder:text-xl outline-none"
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex items-center">
            <div className="flex flex-1 space-x-2 text-twitter">
              <PhotographIcon
                onClick={() => setImageBox(!imageBox)}
                className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-125"
              />
              <SearchCircleIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-125" />
              <EmojiHappyIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-125" />
              <CalendarIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-125" />
              <LocationMarkerIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-125" />
            </div>
            <button
              disabled={!text}
              className="font-bold bg-twitter px-5 py-2 text-white rounded-full disabled:opacity-40"
              onClick={handleSubmit}
            >
              Tweet
            </button>
          </div>
          {imageBox && (
            <form className="mt-5 flex rounded-lg bg-twitter/80 py-2 px-4 text-white">
              <input
                ref={imageInputRef}
                className="flex-1 p-2 outline-none placeholder:text-white bg-transparent"
                type="text"
                placeholder="Enter Image Url.."
              />
              <button type="submit" onClick={addImageToTweet} className="font-bold text-white">
                Add Image
              </button>
            </form>
          )}
          {image && (
            <img
              className="m-10 h-40 w-full rounded-xl object-contain shadow-lg"
              src={image}
              alt=""
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default Tweetbox;
