import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/authContext";

export const CreatePage = () => {
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState("");

  // const navigate = useNavigate();

  const inputHandler = (event) => {
    setLink(event.target.value);
  };

  const keyPressHandler = async (event) => {
    if (event.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          {
            from: link,
          },
          { Authorization: `Bearer ${auth.token}` }
        );
        // navigate(`/detail/${data.link._id}`);
        console.log("data nah", data);
        console.dir(data);
        console.log(data?.link);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      console.log("Какое-то дерьмо");
    }
  };

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <div className="input-field ">
          <input
            placeholder="Вставте ссылку"
            id="link"
            type="text"
            onChange={inputHandler}
            value={link}
            // onBeforeInput={keyPressHandler}
            // onKeyPress={keyPressHandler}
            onKeyDown={keyPressHandler}
            // onBeforeInputCapture={keyPressHandler}
          />

          <label htmlFor="Email"></label>
        </div>
      </div>
      <h2>CreatePage</h2>
    </div>
  );
};
