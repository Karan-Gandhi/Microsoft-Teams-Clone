import React, { useCallback, useEffect, useRef, useState } from "react";
import DefaultLoader from "../components/DefaultLoader";
import JoinMessageComponent from "../components/JoinMessageComponent";
import LeaveMessageComponent from "../components/LeaveMessageComponent";
import MessageComponent from "../components/MessageComponent";
import SearchListItem from "../components/SearchListItem";
import TeamHeadder from "../components/TeamHeader";
import TeamWelcomeMessage from "../components/TeamWelcomeMessage";
import Textfield from "../components/Textfield";
import useDebounce from "../hooks/useDebounce";
import { useSnackbar } from "../Snackbar";
import { FeedType } from "../types/FeedItem";
import JoinMessage from "../types/JoinMessage";
import LeaveMessage from "../types/LeaveMessage";
import Message from "../types/Message";
import { TeamID } from "../types/Team";
import User, { UserID } from "../types/User";
import { getTeamFeed, sendMessageOnTeam } from "../utils/TeamUtils";
import { getUserById, getUserID } from "../utils/UserUtils";

const FEED_REFRESH_TIME = 1e3 * 10;

interface IndividualTeamRouteProps {
  id: TeamID;
  name: string;
  members: UserID[];
  admin: UserID;
}

const IndividualTeamRoute: React.FC<IndividualTeamRouteProps> = ({ id, name, members, admin }) => {
  const feedRef = useRef<HTMLDivElement>(null);

  const [tabIndex, setTabIndex] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [messageToSend, setMessageToSend] = useState<string>("");
  const [feed, setFeed] = useState<React.ReactNode>();
  const [showMentionSuggesions, setShowMentionSuggesions] = useState<boolean>(false);
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [mentionSuggesions, setMentionSuggesions] = useState<User[]>([]);
  const [mentionText, setMenitonText] = useState<string[]>([]);
  const textfieldRef = useRef<HTMLInputElement>(null);

  const { enqueueSnackbar } = useSnackbar();

  const updateFeed = useCallback(async () => {
    return getTeamFeed(id).then(async (data) => {
      setFeed(
        await Promise.all(
          data.data.messages.map(async (feedItem, idx) => {
            if (feedItem.type === FeedType.Message) {
              const currentMessage = feedItem.content as Message;

              return (
                <MessageComponent
                  key={idx.toString()}
                  content={currentMessage.content}
                  sender={currentMessage.name}
                  dateCreated={feedItem.dateCreated}
                  members={teamMembers.map((user) => "@" + user.name)}
                />
              );
            } else if (feedItem.type === FeedType.UserJoin) {
              const currentMessage = feedItem.content as JoinMessage;
              return <JoinMessageComponent key={idx.toString()} {...currentMessage} dateCreated={feedItem.dateCreated} />;
            } else if (feedItem.type === FeedType.UserLeave) {
              const currentMessage = feedItem.content as LeaveMessage;
              return <LeaveMessageComponent key={idx.toString()} {...currentMessage} dateCreated={feedItem.dateCreated} />;
            } else return <div key={idx.toString()}>Meeting</div>;
          })
        )
      );
    });
  }, [id, teamMembers]);

  useDebounce(
    () => {
      const indexOfMentionStart = messageToSend.lastIndexOf("@");
      if (indexOfMentionStart === -1) return setShowMentionSuggesions(false);
      let isUserTypingPersonName = messageToSend.indexOf(" ", indexOfMentionStart) === -1;
      if (isUserTypingPersonName) {
        setShowMentionSuggesions(true);
        const name = messageToSend.substring(indexOfMentionStart + 1);
        const foundMembers = teamMembers.filter((user) => user.name.toUpperCase().indexOf(name.toUpperCase()) !== -1);
        setMentionSuggesions(foundMembers);
      } else {
        setShowMentionSuggesions(false);
      }
    },
    100,
    [messageToSend]
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (messageToSend.length === 0) return enqueueSnackbar("Please enter a message");
    await sendMessageOnTeam(id, messageToSend);
    await updateFeed();
    setMessageToSend("");
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    Promise.all(members.filter((memberID) => memberID !== getUserID()).map(async (memberID) => await getUserById(memberID))).then(
      (users) => {
        setTeamMembers(users);
        setMenitonText(users.map((user) => "@" + user.name));
      }
    );

    updateFeed()
      .then(() => {
        setLoading(false);

        feedRef.current?.addEventListener("DOMNodeInserted", (event) => {
          const { currentTarget: target } = event;
          (target as HTMLDivElement).scroll({
            top: (target as HTMLDivElement).scrollHeight,
            behavior: "smooth",
          });
        });

        feedRef.current?.scroll({
          top: feedRef.current.scrollHeight,
          behavior: "auto",
        });

        interval = setInterval(async () => {
          await updateFeed();
        }, FEED_REFRESH_TIME);
      })
      .catch((error) => {});

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [id, members, updateFeed]);

  useEffect(() => {
    feedRef.current?.scroll({
      top: feedRef.current.scrollHeight,
      behavior: "auto",
    });
  }, [tabIndex]);

  if (isLoading) {
    return (
      <div className="w-full h-screen">
        <DefaultLoader />
      </div>
    );
  }

  return (
    <div className="w-full h-screen pl-8 flex flex-col">
      <TeamHeadder adminID={admin} setTabIndex={setTabIndex} teamName={name} teamID={id} totalMembers={members.length} />
      <div className="flex-grow flex flex-col">
        {tabIndex === 0 && (
          <div className="flex flex-col h-full">
            <div className="flex-grow h-1 overflow-auto pr-8" ref={feedRef}>
              <TeamWelcomeMessage teamName={name} />
              {feed}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="pt-8 pr-8 relative">
                <div className="relative mb-2">
                  {showMentionSuggesions &&
                    mentionSuggesions
                      .filter((_, idx) => idx <= 4)
                      .map((user) => (
                        <SearchListItem
                          key={user.id}
                          name={user.name}
                          email={user.email}
                          onClick={() => {
                            const mentionStart = messageToSend.lastIndexOf("@");
                            const textBeforeMention = messageToSend.substring(0, mentionStart + 1);
                            setMessageToSend(textBeforeMention + user.name + " ");
                            textfieldRef.current?.focus();
                          }}
                        />
                      ))}
                </div>
                <Textfield
                  highlightText={mentionText}
                  onChange={setMessageToSend}
                  backgroundColor="#292929"
                  placeholder="Start a new Conversation"
                  className="py-4 px-4"
                  value={messageToSend}
                  textfieldRef={textfieldRef}
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndividualTeamRoute;
