import React, { useRef, useEffect, useState } from "react";
import "./styles.css";
import WasTyping from "./wasTyping";
import InfiniteScroll from "react-infinite-scroll-component";
import { chatApi } from "./../../../axiosApi/api/chatApi";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { userApi } from "./../../../axiosApi/api/userApi";

import {
  Avatar,
  ConversationHeader,
  EllipsisButton,
  VideoCallButton,
  VoiceCallButton,
  Message,
} from "@chatscope/chat-ui-kit-react";

const ChatElement = (props) => {
  const { data, userInfo, socket, recallMess } = props;
  const [cookies, ,] = useCookies("auth");
  const [fake, setFake] = useState(data || {});
  let { userId } = useParams();
  useEffect(() => {
    // Example: Prop
    // conversationId: "61ae2e9a1324ef0024b24bd8"
    // createdAt: 1638954837662
    // id: "61b054aed96f410024571aaa"
    // sender: "61ab14460011d000240f9a46"
    // typeMessage: "RECALL"

    setFake(data);
  }, [data]);

  // useEffect(() => {
  //   console.log("recall", recallMess);
  //   console.log("FakeId", fake.id);
  //   if (recallMess === fake.id)
  //     setFake({
  //       id: recallMess,
  //       createdAt: Date.now(),
  //       sender: userInfo?.id,
  //       typeMessage: "RECALL",
  //     });
  // }, [recallMess]);

  const handleRecall = async () => {
    chatApi
      .recallMess(
        cookies.auth.tokens.access.token,
        fake.conversationId,
        fake.id
      )
      .then((rs) => {
        setFake({
          // ...data,
          id: rs.data.id,
          createdAt: Date.now(),
          sender: cookies.auth.user.id,
          typeMessage: "RECALL",
        });
        socket.current.emit("sendRecall", {
          senderId: cookies.auth.user.id,
          receiverId: userInfo?.id,
          messageId: rs.data.id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const showRecall = () => {
    if (
      fake?.sender === cookies.auth.user.id &&
      fake?.typeMessage !== "RECALL"
    ) {
      return (
        <div
          className=" text-sm"
          onClick={() => {
            handleRecall();
          }}
        >
          <i className="fas fa-2x fa-backspace cursor-pointer group-hover:block hidden" />
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <Message
        model={{
          message: "",
          sentTime: "",
          sender: "",
          direction: `${
            fake?.sender !== cookies.auth.user.id ? "incoming" : "outgoing"
          }`,
          position: "last",
        }}
        // avatarSpacer={true}
      >
        {fake?.sender !== cookies.auth.user.id && (
          <Avatar
            src={`https://mxhld.herokuapp.com/v1/image/${userInfo?.avatar}`}
            name="Joe"
          />
        )}

        <Message.CustomContent
          style={{
            background: "none!important",
          }}
        >
          {/* Neu la from thi la justify-end */}
          <div className="flex items-center gap-2 group">
            <div className="">
              <div
                className={`${
                  fake?.sender !== cookies.auth.user.id
                    ? "justify-start"
                    : "justify-end"
                } flex  `}
              >
                {fake?.typeMessage === "LIKE" && (
                  <div className="flex items-center w-10 h-10 bg-none">
                    <svg
                      aria-labelledby="js_1l"
                      viewBox="0 0 16 16"
                      height="80%"
                      width="80%"
                    >
                      <title id="js_1l">Ký hiệu giơ ngón tay cái</title>
                      <path
                        fill="#0084ff"
                        d="M16,9.1c0-0.8-0.3-1.1-0.6-1.3c0.2-0.3,0.3-0.7,0.3-1.2c0-1-0.8-1.7-2.1-1.7h-3.1c0.1-0.5,0.2-1.3,0.2-1.8 c0-1.1-0.3-2.4-1.2-3C9.3,0.1,9,0,8.7,0C8.1,0,7.7,0.2,7.6,0.4C7.5,0.5,7.5,0.6,7.5,0.7L7.6,3c0,0.2,0,0.4-0.1,0.5L5.7,6.6 c0,0-0.1,0.1-0.1,0.1l0,0l0,0L5.3,6.8C5.1,7,5,7.2,5,7.4v6.1c0,0.2,0.1,0.4,0.2,0.5c0.1,0.1,1,1,2,1h5.2c0.9,0,1.4-0.3,1.8-0.9 c0.3-0.5,0.2-1,0.1-1.4c0.5-0.2,0.9-0.5,1.1-1.2c0.1-0.4,0-0.8-0.2-1C15.6,10.3,16,9.9,16,9.1z"
                      ></path>
                      <path
                        fill="#0084ff"
                        d="M3.3,6H0.7C0.3,6,0,6.3,0,6.7v8.5C0,15.7,0.3,16,0.7,16h2.5C3.7,16,4,15.7,4,15.3V6.7C4,6.3,3.7,6,3.3,6z"
                      ></path>
                    </svg>
                  </div>
                )}
                {fake?.typeMessage === "LOVE" && (
                  <>
                    <img
                      alt="❤️"
                      className="_5zft img"
                      draggable="false"
                      height="28"
                      src="https://static.xx.fbcdn.net/images/emoji.php/v9/tf2/1.5/28/2764.png"
                      width="28"
                    />
                  </>
                )}
                {fake?.typeMessage === "IMAGE" && (
                  <>
                    <img
                      src={`https://mxhld.herokuapp.com/v1/file/${fake?.content.file}`}
                      alt="Akane avatar"
                      width={200}
                    />
                    {fake?.content.text === "TEXT" && (
                      <div className=" max-w-xs">{fake?.content.text}</div>
                    )}
                  </>
                )}
                {fake?.typeMessage === "VIDEO" && (
                  <>
                    <video
                      style={{
                        width: "400px",
                        height: "400px",
                      }}
                      // className="z-30"
                      controls
                    >
                      <source
                        src={`https://mxhld.herokuapp.com/v1/file/${fake?.content.file}`}
                      />
                    </video>
                    {fake?.content.text === "TEXT" && (
                      <div className=" max-w-xs">{fake?.content.text}</div>
                    )}
                  </>
                )}
                {fake?.typeMessage === "AUDIO" && (
                  <>
                    <audio controls>
                      <source
                        src={`https://mxhld.herokuapp.com/v1/file/${fake?.content.file}`}
                      />
                    </audio>
                    {fake?.content.text === "TEXT" && (
                      <div className=" max-w-xs">{fake?.content.text}</div>
                    )}
                  </>
                )}
              </div>

              {fake?.typeMessage === "RECALL" && (
                <>
                  {fake?.sender !== cookies.auth.user.id ? (
                    <div className=" max-w-xs text-white font-normal italic">
                      {userInfo?.fullname} was recall
                    </div>
                  ) : (
                    <div className=" max-w-xs">
                      <p className=" text-white font-normal italic">
                        You was recall message
                      </p>
                    </div>
                  )}
                </>
              )}
              {fake?.typeMessage === "TEXT" && (
                <div className=" max-w-xs">{fake?.content.text}</div>
              )}
            </div>
            {showRecall()}
          </div>
        </Message.CustomContent>
      </Message>
    </>
  );
};

const ListMessage = (props) => {
  const {
    messages,
    messData,
    setOpenSr,
    openSr,
    typing,
    socket,
    setMessData,
    recallMess,
    currentMessage,
  } = props;
  const messagesEndRef = useRef(null);
  const [cookies, ,] = useCookies(["auth"]);
  const [page, setPage] = useState(2);
  const [noMore, setnoMore] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [listMess, setListMess] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState("");

  let { userId } = useParams();
  const scrollToBottom = () => {
    if (messagesEndRef?.current) {
      messagesEndRef?.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  // useEffect(() => {
  //   console.log("currentMessage con", currentMessage);
  // }, [currentMessage]);

  // console.log("from long", messages);
  // console.log("list", listMess.length);

  useEffect(() => {
    setListMess([messages, ...listMess]);
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    getUserInfo();
  }, [userId]);

  useEffect(() => {
    // if (messData) {
    getFirstPageMess();
    // }
    // return () => {
    //   setLoading(true);
    //   setListMess([]);
    // };
  }, [messData]);

  const getUserInfo = () => {
    userApi
      .getUserById(userId)
      .then((rs) => {
        setUserInfo(rs.data);
        // console.log("header", rs.data);
      })
      .catch((err) => {
        console.log("header", err);
      });
  };

  const getFirstPageMess = async () => {
    chatApi
      .getMessByIdConver(cookies.auth.tokens.access.token, messData, 1, 20)
      .then((rs) => {
        setLoading(false);
        setListMess(rs.data.results);
        if (!rs.data.totalResults) setNotFound(true);
        setnoMore(true);
        setPage(2);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleFetchMess = () => {
    return new Promise((resolve, reject) => {
      chatApi
        .getMessByIdConver(cookies.auth.tokens.access.token, messData, page, 20)
        .then((rs) => {
          resolve(rs.data.results);
        })
        .catch((err) => {
          console.log("err", err);
        });
    });
  };

  const fetchData = async () => {
    console.log("Next");
    const messFromServer = await handleFetchMess();
    setListMess([...listMess, ...messFromServer]);
    if (messFromServer.length === 0 || messFromServer.length < 20) {
      setnoMore(false);
    }
    setPage(page + 1);
  };

  return (
    <>
      {/* {loading ? (
          <>
      <div
        className="flex absolute  h-full items-center justify-center  bg-green-400 transform translate-x-64 translate-y-10  "
        style={{ width: "500px", height: "500px" }}
      >
        <div className="lds-ring flex items-center justify-center">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      </>
        ) : null} */}
      <ConversationHeader>
        <ConversationHeader.Back />
        <Avatar
          src={`https://mxhld.herokuapp.com/v1/image/${userInfo?.avatar}`}
          status="available"
        />
        <ConversationHeader.Content
          userName={`${userInfo?.fullname}`}
          // info="Active 10 mins ago"
        />
        <ConversationHeader.Actions>
          <VoiceCallButton />
          <VideoCallButton />
          <EllipsisButton
            orientation="vertical"
            onClick={() => setOpenSr(!openSr)}
          />
        </ConversationHeader.Actions>
      </ConversationHeader>

      <div
        className="post-show px-5 pb-2"
        id="scrollableDivChat"
        style={{
          overflow: "auto",
          display: "flex",
          flexDirection: "column-reverse",
          height: 520,
        }}
      >
        <div ref={messagesEndRef} />
        {(listMess || []).length > 0 && (
          <InfiniteScroll
            dataLength={listMess?.length}
            next={fetchData}
            style={{
              display: "flex",
              flexDirection: "column-reverse",
            }}
            inverse={true}
            scrollThreshold={0.2}
            hasMore={noMore}
            loader={
              <div className=" flex justify-center">
                <div className="lds-ring flex items-center justify-center">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            }
            scrollableTarget="scrollableDivChat"
          >
            {listMess.map((data, index) => {
              return (
                <div key={index}>
                  <ChatElement
                    key={index}
                    userInfo={userInfo}
                    data={data}
                    socket={socket}
                    index={index}
                    setMessData={setMessData}
                    messData={messData}
                    recallMess={recallMess}
                  />
                </div>
              );
            })}
          </InfiniteScroll>
        )}

        {notFound && (
          <div className="fixed  z-50 transform -translate-x-1/2 mr-5 -translate-y-1/2 left-1/2 top-1/2 mt-5 ">
            <p className=""></p>
          </div>
        )}

        {/* <MessageSeparator content="Saturday, 30 November 2019" /> */}
        {typing && <WasTyping userInfo={userInfo} />}
      </div>
    </>
  );
};

export default ListMessage;