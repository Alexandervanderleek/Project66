import React, { useRef, useState } from "react";
import * as Yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import EmojiPicker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../reducers/toastReducer";

const validationSchema = Yup.object().shape({
  habbitName: Yup.string()
    .max(50, "Cant exceed 50 charachters")
    .required("Need a habbit name"),
  habbitDescription: Yup.string()
    .max(200, "Cant exceed 200 charachters")
    .required("Need a habbit description"),
  emoji: Yup.string().required("Need a icon"),
});

function NewHabbitModal({ createNewHabbit }) {
  const initialValues = {
    habbitName: "",
    habbitDescription: "",
    emoji: "😄",
  };

  const modalRef = useRef(null);

  const dispath = useDispatch();
  const habbits = useSelector((state)=>state.habbits)

  const [showEmojis, setShowEmojis] = useState(false);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      createNewHabbit(values);
      modalRef.current.close();
      setSubmitting(false);
      resetForm();
    }, 500);
  };

  const newHabbitOpen = () => {
    //() => 
    
    if(habbits?.filter((habbit)=>habbit.status==='active').length >=8){  
      dispath(showToast({
        message: 'Too many active habbits',
        type: 'error'
      }))
    }else{
      console.log("else")
      document.getElementById("my_modal_5").showModal()
    }
  }

  return (
    <>
      <button
        className="btn"
        onClick={newHabbitOpen}
      >
        New
      </button>
      <dialog
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
        ref={modalRef}
      >
        <div className="modal-box">
          <h3 className="font-semibold text-2xl text-center">
            Create a new Habbit
          </h3>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, handleSubmit, setFieldValue }) => (
              <form
                autoComplete="off"
                onSubmit={handleSubmit}
                className="space-y-2"
              >
                <div>
                  <h3 className="text-lg font-semibold mb-2">Habit Name:</h3>
                  <label className="block" htmlFor="habbitName">
                    <Field
                      name="habbitName"
                      placeholder="E.g Workout"
                      type="text"
                      className={`input input-bordered text-base w-full ${
                        errors.habbitName ? "input-error" : "border-gray-300"
                      }`}
                    />
                  </label>
                  <ErrorMessage
                    name="habbitName"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Habit Description:
                  </h3>
                  <label htmlFor="habbitDescription" className="block">
                    <Field
                      name="habbitDescription"
                      as="textarea"
                      placeholder="e.g I will workout everyday for 30min"
                      className={`textarea w-full text-base ${
                        errors.habbitDescription
                          ? "textarea-error"
                          : "border-gray-300"
                      }`}
                      rows="1"
                    />
                    <ErrorMessage
                      name="habbitDescription"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </label>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Select Icon:</h3>
                  <label className="block" htmlFor="emoji">
                    <div className="flex space-x-2">
                      <Field
                        readOnly={true}
                        name="emoji"
                        placeholder=""
                        type="text"
                        className={`input input-bordered text-base flex-1 ${
                          errors.emoji ? "input-error" : "border-gray-300"
                        }`}
                      />
                      <button
                        onClick={() => {
                          setShowEmojis(!showEmojis);
                        }}
                        className="btn btn-neutral flex-0"
                        type="button"
                      >
                        Choose{" "}
                      </button>
                    </div>

                    <EmojiPicker
                      emojiStyle="native"
                      open={showEmojis}
                      onEmojiClick={(emojiObject) => {
                        setFieldValue("emoji", emojiObject.emoji);
                        setShowEmojis(false);
                      }}
                    ></EmojiPicker>
                  </label>
                  <ErrorMessage
                    name="emoji"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-active btn-neutral"
                >
                  Create Habbit
                </button>
              </form>
            )}
          </Formik>
        </div>
      </dialog>
    </>
  );
}

export default NewHabbitModal;
