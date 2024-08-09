import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { setStats } from "../reducers/statsReducer";

function Stats() {
  const user = useSelector((data) => data.user);
  const stats = useSelector((data) => data.stats);

  const dispatch = useDispatch();

  if (!user) {
    return <Navigate to="/"></Navigate>;
  }

  useEffect(() => {
    if (!stats) {
      console.log("fuck off");
      axios
        .get("/api/user/stats", { withCredentials: true })
        .then((res) => {
          console.log("son");
          dispatch(setStats(res.data.habbits));
        })
        .catch((err) => {
          dispatch(
            showToast({
              message: err.message,
              type: "error",
            })
          );
        });
    }
  }, []);

  let failed = 0;
  let failureDays = 0;
  let completed = 0;

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
      <div className="w-full md:w-3/4 xl:w-1/2 flex flex-col">
        
        {stats?(
            <>
            <div className="flex justify-between p-3 items-center">
          <h1 className="font-semibold text-2xl">Your Stats</h1>
          <button className="btn">
            <svg
              fill="#1F2937"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="24px"
              height="24px"
              viewBox="0 0 408.483 408.483"
              xml:space="preserve"
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

        <div className="stats flex shadow border-gray-400 border-2">
          <div className="stat flex-1 bg-green-200">
            <div className="stat-figure hidden sm:block">
              <svg
                fill="#22C55E"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="32px"
                height="32px"
                viewBox="0 0 47 47"
                xml:space="preserve"
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
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <title>error</title>
                <g
                  id="Page-1"
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
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

        <div className="stats flex shadow mt-4 border-gray-400 border-2">
          <div className="stat flex-1 bg-green-200">
            <div className="stat-figure hidden sm:block">
              <svg
                fill="#22C55E"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="32px"
                height="32px"
                viewBox="0 0 47 47"
                xml:space="preserve"
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
            <div className="stat-title font-semibold">Ratio</div>
            <div className="stat-value text-green-500">
              {(completed / failed).toFixed(2)}
            </div>
          </div>

          <div className="stat flex-1 bg-red-200">
            <div className="stat-figure hidden sm:block">
              <svg
                width="36px"
                height="36px"
                viewBox="0 0 512 512"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <title>error</title>
                <g
                  id="Page-1"
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
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
            <div className="stat-title font-semibold">Days to fail</div>
            <div className="stat-value text-red-500">
              {(failureDays / failed).toFixed(2)}
            </div>
          </div>
        </div>
        
            <h1 className="font-semibold text-2xl p-3 min-h-[72px] flex items-center">Your Journey</h1>


        <ul className="timeline timeline-vertical">
             {stats?.map((stat)=>
                 <li>
                    <hr/>
                 <div className={`m-2 timeline-${stat.status==='failed'?'start':'end'} timeline-box ${stat.status==='failed'?'bg-red-200':'bg-green-200'}`}>
                   <span className="font-semibold" >{stat.title}:</span> 
                   <br></br>
                   {stat.expire.split('T')[0]}
                 </div>
                 <hr />
               </li>)
            }

        </ul>
            </>
        ):<>
        </>}
        
      </div>
    </div>
  );
}

export default Stats;
