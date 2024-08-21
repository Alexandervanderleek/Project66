import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { setStats } from "../reducers/statsReducer";
import { clearHabbits } from "../reducers/habbitsReducer";
import { clearStats } from "../reducers/statsReducer";
import { showToast } from "../reducers/toastReducer";
import { setLoading } from "../reducers/loaderReducer";

//Stats Component
function Stats() {

  const user = useSelector((state) => state.user);
  const stats = useSelector((state) => state.stats);
  const isLoading = useSelector((state) => state.loading.isLoading);
  const controller = new AbortController();

  const dispatch = useDispatch();

  if (!user) {
    return <Navigate to="/"></Navigate>;
  }

  useEffect(() => {
    const effectController = new AbortController();

    if (!stats) {
      dispatch(setLoading({ isLoading: true }));
      axios
        .get("/api/user/stats", {
          withCredentials: true,
          signal: effectController.signal,
        })
        .then((res) => {
          dispatch(setLoading({ isLoading: false }));
          dispatch(setStats(res.data.habbits));
        })
        .catch((err) => {
          dispatch(setLoading({ isLoading: false }));
          dispatch(
            showToast({
              message: err.message,
              type: "error",
            })
          );
        });
    }

    return () => effectController.abort();
  }, []);

  let failed = 0;
  let failureDays = 0;
  let completed = 0;

  const handleDeleteAll = () => {
    if (isLoading) controller.abort();

    dispatch(setLoading({ isLoading: true }));

    axios
      .delete(`/api/habbits`, { signal: controller.abort() })
      .then(() => {
        dispatch(setLoading({ isLoading: false }));
        dispatch(clearHabbits());
        dispatch(clearStats());
      })
      .catch((err) => {
        dispatch(setLoading({ isLoading: false }));
        dispatch(
          showToast({
            message: err.message,
            type: "error",
          })
        );
      });
  };

  stats?.forEach((stat) => {
    if (stat.status === "failed") {
      failed += 1;
      failureDays += stat.Days;
    } else {
      completed += 1;
    }
  });

  return (
    <div className="flex justify-center items-start min-h-0.5">
      {isLoading && (
        <div className="fixed h-full w-full bg-gray-800/70 z-10 text-center">
          <span className="loading text-gray-200 loading-spinner loading-lg mt-16"></span>
        </div>
      )}
      <dialog id={10} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirmation</h3>
          <p className="py-4 text-lg">
            Delete all your tracked habbits ?
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <div className="space-x-2 w-full">
                <button
                  className="btn btn-error"
                  onClick={() => {
                    handleDeleteAll();
                  }}
                >
                  {"Delete"}
                </button>
                <button className="btn">Close</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
      <div className="w-full md:w-3/4 xl:w-1/2 flex flex-col">
        
            <div className="flex justify-between p-3 items-center">
              <h1 className="font-bold text-2xl">Your Stats</h1>
              <button
                className="btn"
                onClick={() => document.getElementById(10).showModal()}
              >
                <svg
                  fill="#1F2937"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="24px"
                  height="24px"
                  viewBox="0 0 408.483 408.483"
                  xmlSpace="preserve"
                >
                  <g>
                    <g>
                      <path
                        d="M87.748,388.784c0.461,11.01,9.521,19.699,20.539,19.699h191.911c11.018,0,20.078-8.689,20.539-19.699l13.705-289.316
			H74.043L87.748,388.784z M247.655,171.329c0-4.61,3.738-8.349,8.35-8.349h13.355c4.609,0,8.35,3.738,8.35,8.349v165.293
			c0,4.611-3.738,8.349-8.35,8.349h-13.355c-4.61,0-8.35-3.736-8.35-8.349V171.329z M189.216,171.329
			c0-4.61,3.738-8.349,8.349-8.349h13.355c4.609,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.737,8.349-8.349,8.349h-13.355
			c-4.61,0-8.349-3.736-8.349-8.349V171.329L189.216,171.329z M130.775,171.329c0-4.61,3.738-8.349,8.349-8.349h13.356
			c4.61,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.738,8.349-8.349,8.349h-13.356c-4.61,0-8.349-3.736-8.349-8.349V171.329z"
                      />
                      <path
                        d="M343.567,21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305h-92.971c-2.377,0-4.304,1.928-4.304,4.305v16.737H64.916
			c-7.125,0-12.9,5.776-12.9,12.901V74.47h304.451V33.944C356.467,26.819,350.692,21.043,343.567,21.043z"
                      />
                    </g>
                  </g>
                </svg>
              </button>
            </div>

            <div className="bg-gray-200 p-4 rounded-lg">
              <div className="stats flex shadow border-gray-200 border-1">
                <div className="stat flex-1 bg-green-200">
                  <div className="stat-figure hidden sm:block">
                    <svg
                      fill="#22C55E"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="32px"
                      height="32px"
                      viewBox="0 0 47 47"
                      xmlSpace="preserve"
                    >
                      <g>
                        <g id="Layer_1_22_">
                          <g>
                            <path
                              d="M6.12,38.52V5.136h26.962v28.037l5.137-4.243V2.568C38.219,1.15,37.07,0,35.652,0h-32.1C2.134,0,0.985,1.15,0.985,2.568
				v38.519c0,1.418,1.149,2.568,2.567,2.568h22.408L22.33,38.52H6.12z"
                            />
                            <path
                              d="M45.613,27.609c-0.473-0.446-1.2-0.467-1.698-0.057l-11.778,9.734l-7.849-4.709c-0.521-0.312-1.188-0.219-1.603,0.229
				c-0.412,0.444-0.457,1.117-0.106,1.613l8.506,12.037c0.238,0.337,0.625,0.539,1.037,0.543c0.004,0,0.008,0,0.012,0
				c0.408,0,0.793-0.193,1.035-0.525l12.6-17.173C46.149,28.78,46.084,28.055,45.613,27.609z"
                            />
                            <path
                              d="M27.306,8.988H11.897c-1.418,0-2.567,1.15-2.567,2.568s1.149,2.568,2.567,2.568h15.408c1.418,0,2.566-1.15,2.566-2.568
				S28.724,8.988,27.306,8.988z"
                            />
                            <path
                              d="M27.306,16.691H11.897c-1.418,0-2.567,1.15-2.567,2.568s1.149,2.568,2.567,2.568h15.408c1.418,0,2.566-1.149,2.566-2.568
				C29.874,17.841,28.724,16.691,27.306,16.691z"
                            />
                            <path
                              d="M27.306,24.395H11.897c-1.418,0-2.567,1.15-2.567,2.568s1.149,2.568,2.567,2.568h15.408c1.418,0,2.566-1.15,2.566-2.568
				C29.874,25.545,28.724,24.395,27.306,24.395z"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="stat-title font-semibold">Completed</div>
                  <div className="stat-value text-green-500">{completed}</div>
                </div>

                <div className="stat bg-red-200 flex-1">
                  <div className="stat-figure hidden sm:block">
                    <svg
                      width="36px"
                      height="36px"
                      viewBox="0 0 512 512"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <title>error</title>
                      <g
                        id="Page-1"
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <g
                          id="add"
                          fill="#EF4444"
                          transform="translate(42.666667, 42.666667)"
                        >
                          <path
                            d="M213.333333,3.55271368e-14 C331.136,3.55271368e-14 426.666667,95.5306667 426.666667,213.333333 C426.666667,331.136 331.136,426.666667 213.333333,426.666667 C95.5306667,426.666667 3.55271368e-14,331.136 3.55271368e-14,213.333333 C3.55271368e-14,95.5306667 95.5306667,3.55271368e-14 213.333333,3.55271368e-14 Z M213.333333,42.6666667 C119.232,42.6666667 42.6666667,119.232 42.6666667,213.333333 C42.6666667,307.434667 119.232,384 213.333333,384 C307.434667,384 384,307.434667 384,213.333333 C384,119.232 307.434667,42.6666667 213.333333,42.6666667 Z M262.250667,134.250667 L292.416,164.416 L243.498667,213.333333 L292.416,262.250667 L262.250667,292.416 L213.333333,243.498667 L164.416,292.416 L134.250667,262.250667 L183.168,213.333333 L134.250667,164.416 L164.416,134.250667 L213.333333,183.168 L262.250667,134.250667 Z"
                            id="error"
                          ></path>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="stat-title font-semibold">Failed</div>
                  <div className="stat-value text-red-500">{failed}</div>
                </div>
              </div>

              <div className="stats flex shadow mt-4 border-gray-200 border-1">
                <div className="stat flex-1 bg-green-200">
                  <div className="stat-figure hidden sm:block">
                    <svg
                      height="36px"
                      width="36px"
                      version="1.1"
                      id="_x32_"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 512 512"
                      xmlSpace="preserve"
                    >
                      <g fill="#22C55E">
                        <path
                          className="st0"
                          d="M512,339.979h-0.447l-78.911-181.464c7.507,2.712,13.862,5.052,18.787,6.901l9.242-24.513
      c-26.263-9.878-90.312-32.634-160.397-53.254c0-10.817-4.432-20.665-11.522-27.755c-7.075-7.106-16.953-11.499-27.771-11.499
      c-10.817,0-20.718,4.394-27.786,11.499c-2.333,2.318-4.348,4.939-6.022,7.803C157.761,50.151,92.902,37.357,65.745,32.569
      l-4.552,25.794c5.749,1.015,13.317,2.416,22.332,4.159L0.454,253.545H0c0.06,0.197,0.129,0.394,0.189,0.591l-0.167,0.386
      l0.342,0.151c12.817,40.619,50.754,70.078,95.599,70.078c44.852,0,82.79-29.46,95.599-70.078l0.349-0.151l-0.167-0.386
      c0.061-0.197,0.129-0.394,0.19-0.591h-0.455L110.772,67.961c30.975,6.371,70.479,15.098,111.34,25.445
      c1.257,8.545,5.265,16.249,11.082,22.028c3.424,3.447,7.53,6.242,12.068,8.227v276.373c-17.734,0-31.543,0-31.543,0
      s-7.56,47.27-41.588,54.814v24.582h177.692v-24.582c-34.02-7.544-41.588-54.814-41.588-54.814s-13.809,0-31.543,0V123.661
      c4.53-1.985,8.628-4.78,12.06-8.227c0.963-0.97,1.909-1.984,2.772-3.06c41.732,12.264,81.547,25.369,112.325,35.997
      l-83.327,191.608h-0.454c0.06,0.204,0.128,0.394,0.197,0.591l-0.174,0.386l0.34,0.151c12.818,40.618,50.754,70.078,95.606,70.078
      c44.846,0,82.782-29.453,95.599-70.07l0.341-0.159l-0.167-0.386C511.871,340.373,511.947,340.183,512,339.979z M174.343,253.545
      H17.59L95.97,73.317L174.343,253.545z M275.783,102.481c-1.546,1.538-3.326,2.871-5.296,3.841
      c-2.825,1.492-6.045,2.311-9.507,2.311c-5.81,0-10.999-2.334-14.824-6.152c-1.068-1.106-2.046-2.28-2.879-3.59
      c-2.068-3.227-3.249-7.045-3.249-11.211c0-5.818,2.333-11.006,6.128-14.832c0.084-0.076,0.159-0.151,0.243-0.205
      c3.795-3.674,8.87-5.915,14.582-5.915c5.818,0,11.007,2.332,14.803,6.12c2.537,2.545,4.454,5.712,5.424,9.272
      c0.469,1.758,0.734,3.621,0.734,5.56C281.941,93.497,279.608,98.678,275.783,102.481z M337.657,339.979l78.38-180.23l78.373,180.23
      H337.657z"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="stat-title font-semibold">Ratio</div>
                  <div className="stat-value text-green-500">
                    {(!completed && !failed) || completed === 0 || failed === 0
                      ? "0"
                      : (completed / failed).toFixed(2)}
                  </div>
                </div>

                <div className="stat flex-1 bg-red-200">
                  <div className="stat-figure hidden sm:block">
                    <svg
                      width="36px"
                      height="36px"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="#EF4444">
                        <path
                          d="M5 5C5 4.44772 4.55228 4 4 4C3.44772 4 3 4.44772 3 5V6.99983C3 6.99994 3 7.00006 3 7.00017L3 19C3 19.5523 3.44772 20 4 20H20C20.5523 20 21 19.5523 21 19C21 18.4477 20.5523 18 20 18H5V9.41421L8.29289 12.7071C8.68342 13.0976 9.31658 13.0976 9.70711 12.7071L13 9.41421L17.5858 14H15C14.4477 14 14 14.4477 14 15C14 15.5523 14.4477 16 15 16H20C20.5523 16 21 15.5523 21 15V10C21 9.44772 20.5523 9 20 9C19.4477 9 19 9.44772 19 10V12.5858L13.7071 7.29289C13.3166 6.90237 12.6834 6.90237 12.2929 7.29289L9 10.5858L5 6.58579V5Z"
                          fill="#EF4444"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="stat-title font-semibold">Days to fail</div>
                  <div className="stat-value text-red-500">
                    {!failureDays || failed || failed === 0
                      ? "0"
                      : (failureDays / failed).toFixed(2)}{" "}
                  </div>
                </div>
              </div>

              <ul className="mt-4 timeline timeline-vertical bg-gray-200 rounded-lg">
                {stats?.map((stat, index) => (
                  <li key={stat.id}>
                    {index !== 0 && <hr className="bg-gray-400" />}
                    <div
                      className={`m-4 timeline-${
                        stat.status === "failed" ? "start" : "end"
                      } timeline-box ${
                        stat.status === "failed" ? "bg-red-200" : "bg-green-200"
                      }`}
                    >
                      <span className="font-semibold text-lg">
                        {stat.title}:
                      </span>
                      <br></br>
                      <div className="font-light text-gray-500">
                        {stat.expire.split("T")[0]}
                      </div>
                    </div>
                    <div className="timeline-middle">
                      {stat.status === "failed" ? (
                        <svg
                          width="24px"
                          height="24px"
                          viewBox="0 0 512 512"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <title>error</title>
                          <g
                            id="Page-1"
                            stroke="none"
                            strokeWidth="1"
                            fill="none"
                            fillRule="evenodd"
                          >
                            <g
                              id="add"
                              fill="#EF4444"
                              transform="translate(42.666667, 42.666667)"
                            >
                              <path
                                d="M213.333333,3.55271368e-14 C331.136,3.55271368e-14 426.666667,95.5306667 426.666667,213.333333 C426.666667,331.136 331.136,426.666667 213.333333,426.666667 C95.5306667,426.666667 3.55271368e-14,331.136 3.55271368e-14,213.333333 C3.55271368e-14,95.5306667 95.5306667,3.55271368e-14 213.333333,3.55271368e-14 Z M213.333333,42.6666667 C119.232,42.6666667 42.6666667,119.232 42.6666667,213.333333 C42.6666667,307.434667 119.232,384 213.333333,384 C307.434667,384 384,307.434667 384,213.333333 C384,119.232 307.434667,42.6666667 213.333333,42.6666667 Z M262.250667,134.250667 L292.416,164.416 L243.498667,213.333333 L292.416,262.250667 L262.250667,292.416 L213.333333,243.498667 L164.416,292.416 L134.250667,262.250667 L183.168,213.333333 L134.250667,164.416 L164.416,134.250667 L213.333333,183.168 L262.250667,134.250667 Z"
                                id="error"
                              ></path>
                            </g>
                          </g>
                        </svg>
                      ) : (
                        <svg
                          width="24px"
                          height="24px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                            stroke="#22C55E"
                            strokeWidth="2"
                          />
                          <path
                            d="M9 12L10.6828 13.6828V13.6828C10.858 13.858 11.142 13.858 11.3172 13.6828V13.6828L15 10"
                            stroke="#22C55E"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                    {index !== stats?.length - 1 && (
                      <hr className="bg-gray-400" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
      </div>
    </div>
  );
}

export default Stats;
