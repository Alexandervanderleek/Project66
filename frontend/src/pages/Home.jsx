import React, { useEffect, useState } from "react";
import axios from "axios";
import NewHabbitModal from "../components/NewHabbitModal";
import { useDispatch, useSelector } from "react-redux";
import Habbit from "../components/Habbit";
import { addHabbit, setHabbits } from "../reducers/habbitsReducer";
import { showToast } from "../reducers/toastReducer";
import { setLoading } from "../reducers/loaderReducer";
import Footer from "../components/Footer";

const Home = () => {
  
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const habbits = useSelector((state) => state.habbits);
  const isLoading = useSelector((state) => state.loading.isLoading);
  const controller = new AbortController();

  //function creating a new habbit
  const createNewHabbit = (values) => {
    //abort previous
    if (isLoading) controller.abort();

    //start (when created) and end of current day
    const start = new Date();
    const end = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate(),
      23,
      59,
      59,
      999
    );

    const newHabbit = {
      title: values.habbitName,
      description: values.habbitDescription,
      icon: values.emoji,
      Days: 0,
      start: start,
      expire: end,
      today: true,
      status: "active",
    };

    dispatch(setLoading({ isLoading: true }));

    axios
      .post("/api/habbits/new", newHabbit, {signal: controller.signal})
      .then((res) => {
        //dispatch(setLoading({ isLoading: false }));
        dispatch(addHabbit(res.data.createdHabbit));
      })
      .catch((err) => {
        //dispatch(setLoading({ isLoading: false }));
        dispatch(
          showToast({ message: err.response?.data ? err.response.data.error:"An Error Occured", type: "error" })
        ); 
      }).then(()=>{
        dispatch(setLoading({ isLoading: false }));
      })
  };

  useEffect(() => {
    const effectController = new AbortController();

    if (user && !habbits) {
      dispatch(setLoading({ isLoading: true }));

      axios
        .get("/api/user/habbits", {
          withCredentials: true,
          signal: effectController.signal,
        })
        .then((res) => {
          dispatch(setLoading({ isLoading: false }));
          dispatch(setHabbits(res.data.habbits));
        })
        .catch((err) => {
          dispatch(setLoading({ isLoading: false }));
          dispatch(
            showToast({ message: err.response?.data ? err.response.data.error:"An Error Occured", type: "error" })
          ); 
        });
    }

    return () => effectController.abort();
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen">
    {isLoading && (
        <div className="fixed h-full w-full bg-gray-800/70 z-10 text-center">
          <span className="loading text-gray-200 loading-spinner loading-lg mt-16"></span>
        </div>
      )}
    <div className="flex-grow flex flex-col items-center">
      <div className="w-full md:w-3/4 xl:w-1/2 flex flex-col flex-grow">
        <div className="flex justify-between p-3 items-center">
          <h1 className="font-bold text-2xl">Your habbits</h1>
          <NewHabbitModal createNewHabbit={createNewHabbit} />
        </div>

        <div role="tablist" className="tabs tabs-lifted tabs-lg mb-2">
          <input
            type="radio"
            defaultChecked
            name="my_tabs_2"
            role="tab"
            className="text-xs sm:text-lg font-semibold tab [--tab-bg:#e5e7eb]"
            aria-label="Todo"
          />
          <div role="tabpanel" className="tab-content bg-gray-200 rounded-md">
            <div className="flex justify-center flex-grow items-center min-h-[200px]">
              {habbits &&
              habbits.filter(
                (habbit) => habbit.status === "active" && habbit.today === true
              ).length > 0 ? (
                <div className="flex flex-col my-4 w-full md:w-3/4 mx-2">
                  {habbits
                    .filter(
                      (habbit) =>
                        habbit.status === "active" && habbit.today === true
                    )
                    .map((habbit, index) => (
                      <Habbit key={habbit.id} habbit={habbit} index={index} />
                    ))}
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-500 text-lg">Add a new habit</p>
                </div>
              )}
            </div>
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="text-xs sm:text-lg font-semibold tab [--tab-bg:#e5e7eb]"
            aria-label="Done"
          />
          <div role="tabpanel" className="tab-content bg-gray-200 rounded-md">
            <div className="flex justify-center flex-grow items-center min-h-[200px]">
              {habbits &&
              habbits.filter(
                (habbit) => habbit.status === "active" && habbit.today === false
              ).length > 0 ? (
                <div className="flex flex-col my-4 w-full md:w-3/4 mx-2">
                  {habbits
                    .filter(
                      (habbit) =>
                        habbit.status === "active" && habbit.today === false
                    )
                    .map((habbit, index) => (
                      <Habbit key={habbit.id} habbit={habbit} index={index} />
                    ))}
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-500 text-lg">
                    No completed habits for today
                  </p>
                </div>
              )}
            </div>
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="text-xs sm:text-lg font-semibold tab [--tab-bg:#e5e7eb]"
            aria-label="Recent"
          />
          <div role="tabpanel" className="tab-content bg-gray-200 rounded-md">
            <div className="flex justify-center flex-grow items-center min-h-[200px]">
              {habbits &&
              habbits.filter((habbit) => habbit.status !== "active").length >
                0 ? (
                <div className="flex flex-col my-4 w-full md:w-3/4 mx-2">
                  {habbits
                    .filter((habbit) => habbit.status !== "active")
                    .map((habbit, index) => (
                      <Habbit key={habbit.id} habbit={habbit} index={index} />
                    ))}
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-500 text-lg">
                    No recently failed or completed habits
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
