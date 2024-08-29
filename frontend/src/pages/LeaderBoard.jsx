import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../reducers/loaderReducer";
import { showToast } from "../reducers/toastReducer";
import { setLeaderboard } from "../reducers/leaderBoardReducer";
import { clsx } from "clsx";

function LeaderBoard() {
  const controller = new AbortController();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.isLoading);
  const leaderboard = useSelector((state)=>state.leaderboard);
  

  //console.log(user);

  const getLeaderboard = () => {

    if(isLoading) controller.abort();

    dispatch(setLoading({ isLoading: true }));

    axios
      .get("/api/user/leaderboard", {
        withCredentials: true,
        signal: controller.signal,
      })
      .then((res) => {
        //console.log(res.data)
        dispatch(setLeaderboard(res.data));
      })
      .catch((err) => {
        //console.log("error");
        if(err.response){
          dispatch(
            showToast({ message: err.response.data.error, type: "error" })
          );
        }else{
          dispatch(
            showToast({ message: "An error occured", type: "error" })
          );
        }
        //dispatch(setLoading({ isLoading: false }));
        
      })
      .finally(() => {
        dispatch(setLoading({ isLoading: false }));
      });
  };

  useEffect(() => {
    if(!leaderboard.leaderboard) getLeaderboard();

    return () => {
      controller.abort();
    };
  }, []);

  //console.log(leaderboard)

  // if (isLoading) {
  //   return (
  //     <div className="fixed h-full w-full bg-gray-800/70 z-10 text-center">
  //       <span className="loading text-gray-200 loading-spinner loading-lg mt-16"></span>
  //     </div>
  //   );
  // }

  return (
    <div className="flex justify-center items-center">
      {isLoading && (
        <div className="fixed h-full w-full bg-gray-800/70 z-10 text-center">
          <span className="loading text-gray-200 loading-spinner loading-lg mt-16"></span>
        </div>
      )}
      <div className="flex justify-center items-center w-full md:w-3/4 xl:w-1/2 flex-col">
        <div className="flex w-[75%] justify-between items-end font-bold my-4 text-sm sm:text-xl md:text-2xl ">
          <p className="font-bold">
            Top Habbit Hackers:
          </p>
          <div className="flex text-xs sm:text-lg font-semibold">
            Your Rank <span className="font-bold text-green-400 pl-1">{leaderboard?.position }</span>
          </div>
        </div>

        {leaderboard?.leaderboard?.length > 0 ? (
          <div className="flex justify-center items-center flex-col w-full">
            <div className="flex w-[75%] bg-gray-300 rounded-lg py-1 items-center">
              <div className="flex justify-center flex-[1] font-semibold text-xs sm:text-lg">
                Pos.
              </div>
              <div className="flex justify-center flex-[2] sm:flex-[3] font-semibold text-xs sm:text-lg">
                Name
              </div>
              <div className="flex items-center justify-center flex-[1] font-semibold text-xs sm:text-lg">
                Complete
              </div>
            </div>

            {leaderboard.leaderboard.map((item, index) => (
              <div
                key={index}
                className={"flex bg-gray-200 rounded-lg m-1"}
                style={{
                  width: "75%",
                  paddingTop: index < 3 ? 30 - index * 8 : 10,
                  paddingBottom: index < 3 ? 30 - index * 8 : 10,
                }}
              >
                {index < 3 ? (
                  <div className="flex flex-1 items-center justify-center">
                    {index === 0 && (
                      <svg
                        width="32px"
                        height="32px"
                        viewBox="0 0 36 36"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        aria-hidden="true"
                        role="img"
                        className="iconify iconify--twemoji"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <path
                          fill="#55ACEE"
                          d="M18 8l-7-8H0l14 17l11.521-4.75z"
                        ></path>
                        <path
                          fill="#3B88C3"
                          d="M25 0l-7 8l5.39 7.312l1.227-1.489L36 0z"
                        ></path>
                        <path
                          fill="#FFAC33"
                          d="M23.205 16.026c.08-.217.131-.448.131-.693a2 2 0 0 0-2-2h-6.667a2 2 0 0 0-2 2c0 .245.05.476.131.693c-3.258 1.826-5.464 5.307-5.464 9.307C7.335 31.224 12.111 36 18.002 36s10.667-4.776 10.667-10.667c0-4-2.206-7.481-5.464-9.307z"
                        ></path>
                        <path
                          fill="#9E5200"
                          d="M19.404 18.6h-1.721l-2.73 2.132a.528.528 0 0 0-.112.28v1.178c0 .186.15.354.337.354h1.795v8.414c0 .188.15.355.355.355h2.076c.186 0 .336-.168.336-.355V18.954c0-.186-.149-.354-.336-.354z"
                        ></path>
                      </svg>
                    )}
                    {index === 1 && (
                      <svg
                        width="32px"
                        height="32px"
                        viewBox="0 0 36 36"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        aria-hidden="true"
                        role="img"
                        className="iconify iconify--twemoji"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <path
                          fill="#55ACEE"
                          d="M18 8l-7-8H0l14 17l11.521-4.75z"
                        ></path>
                        <path
                          fill="#3B88C3"
                          d="M25 0l-7 8l5.39 7.312l1.227-1.489L36 0z"
                        ></path>
                        <path
                          fill="#CCD6DD"
                          d="M23.205 16.026c.08-.217.131-.448.131-.693a2 2 0 0 0-2-2h-6.667a2 2 0 0 0-2 2c0 .245.05.476.131.693c-3.258 1.826-5.464 5.307-5.464 9.307C7.335 31.224 12.111 36 18.002 36s10.667-4.776 10.667-10.667c0-4-2.206-7.481-5.464-9.307z"
                        ></path>
                        <path
                          fill="#627077"
                          d="M22.002 28.921h-3.543c.878-1.234 2.412-3.234 3.01-4.301c.449-.879.729-1.439.729-2.43c0-2.076-1.57-3.777-4.244-3.777c-2.225 0-3.74 1.832-3.74 1.832c-.131.15-.112.374.019.487l1.141 1.159a.36.36 0 0 0 .523 0c.355-.393 1.047-.935 1.813-.935c1.047 0 1.646.635 1.646 1.346c0 .523-.243 1.047-.486 1.421c-1.104 1.682-3.871 5.441-4.955 6.862v.374c0 .188.149.355.355.355h7.732a.368.368 0 0 0 .355-.355v-1.682a.367.367 0 0 0-.355-.356z"
                        ></path>
                      </svg>
                    )}
                    {index === 2 && (
                      <svg
                        width="32px"
                        height="32px"
                        viewBox="0 0 36 36"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        aria-hidden="true"
                        role="img"
                        className="iconify iconify--twemoji"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <path
                          fill="#55ACEE"
                          d="M18 8l-7-8H0l14 17l11.521-4.75z"
                        ></path>
                        <path
                          fill="#3B88C3"
                          d="M25 0l-7 8l5.39 7.312l1.227-1.489L36 0z"
                        ></path>
                        <path
                          fill="#FF8A3B"
                          d="M23.205 16.026c.08-.217.131-.448.131-.693a2 2 0 0 0-2-2h-6.667a2 2 0 0 0-2 2c0 .245.05.476.131.693c-3.258 1.826-5.464 5.307-5.464 9.307C7.335 31.224 12.111 36 18.002 36s10.667-4.776 10.667-10.667c0-4-2.206-7.481-5.464-9.307z"
                        ></path>
                        <path
                          fill="#7C4119"
                          d="M14.121 29.35l1.178-1.178a.345.345 0 0 1 .467-.038s1.159.861 2.056.861c.805 0 1.628-.673 1.628-1.496s-.842-1.514-2.225-1.514h-.639a.367.367 0 0 1-.354-.355v-1.552c0-.206.168-.355.354-.355h.639c1.309 0 2-.635 2-1.439c0-.805-.691-1.402-1.496-1.402c-.823 0-1.346.43-1.626.747c-.132.15-.355.15-.504.02l-1.141-1.122c-.151-.132-.132-.355 0-.486c0 0 1.533-1.646 3.57-1.646c2.169 0 4.039 1.328 4.039 3.422c0 1.439-1.085 2.505-1.926 2.897v.057c.879.374 2.262 1.533 2.262 3.141c0 2.038-1.776 3.572-4.357 3.572c-2.354 0-3.552-1.16-3.944-1.664c-.113-.134-.093-.34.019-.47z"
                        ></path>
                      </svg>
                    )}
                  </div>
                ) : (
                  <div className="font-bold flex-1 text-center">
                    {index + 1}
                  </div>
                )}

                <div
                  className={clsx(
                    "font-semibold flex flex-[3] items-center justify-center",
                    {
                      "text-lg sm:text-3xl": index === 0,
                      "text-sm sm:text-2xl": index === 1,
                      "text-xs sm:text-xl ": index === 2,
                      "text-xs sm:text-lg": index > 2,
                    }
                  )}
                >
                  <p className="line-clamp-1">{item.name}</p>
                </div>
                <div className="font-semibold flex flex-1 items-center justify-center">
                  {item.completed}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>no</div>
        )}
      </div>
    </div>
  );
}

export default LeaderBoard;
