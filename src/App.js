import React, { useEffect } from "react";
import { useState } from "react";
import swal from "sweetalert";
import Loading from "./components/Loading";

import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";
import axios from "axios";

const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [showData, setShowData] = useState("name");
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({
    name: "",
    email: "",
    picture: "",
    dob: "",
    location: "",
    phone: "",
    gender: "",
    login: "",
    id: "",
  });

  const {
    name,
    email,
    dob: { age },
    location: { city },
    phone,
    picture,
    gender,
    login: { username },
    id: { value },
  } = data;

  const getUser = async () => {
    try {
      const response = await axios.get(url);
      if (response.data.results.length > 0) {
        setData(response.data.results[0]);
      } else {
        // Handle the case when there is no data
        setData(null);
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle the error, e.g., show an error message to the user
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getUser();
  }, []);

  const handleAdd = () => {
    if (users.some((user) => user.value === value)) {
      swal({
        text: "This user is already added!",
        icon: "warning",
        button: "OK!",
      });
    } else {
      setUsers([
        ...users,
        { name: name, email: email, phone: phone, age: age, value: value },
      ]);
    }
  };

  console.log(data);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  return (
    <main>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>
      <div className="block">
        <div className="container">
          <img src={picture.large} alt="random user" className="user-img" />

          {showData === "name" && (
            <>
              <p className="user-title">My name is </p>
              <p className="user-value">
                {" "}
                {name.first} {name.last}
              </p>
            </>
          )}

          {showData === "email" && (
            <>
              <p className="user-title">My email is </p>
              <p className="user-value"> {email}</p>
            </>
          )}
          {showData === "age" && (
            <>
              <p className="user-title">My age is </p>
              <p className="user-value"> {age}</p>
            </>
          )}
          {showData === "city" && (
            <>
              <p className="user-title">My city is </p>
              <p className="user-value"> {city}</p>
            </>
          )}
          {showData === "phone" && (
            <>
              <p className="user-title">My phone is </p>
              <p className="user-value"> {phone}</p>
            </>
          )}
          {showData === "username" && (
            <>
              <p className="user-title">My username is </p>
              <p className="user-value"> {username}</p>
            </>
          )}

          <div className="values-list">
            <button className="icon" data-label="name" on>
              <img
                src={womanSvg}
                alt="user"
                id="iconImg"
                onMouseEnter={() => setShowData("name")}
              />
            </button>

            <button className="icon" data-label="email">
              <img
                src={mailSvg}
                alt="mail"
                id="iconImg"
                onMouseEnter={() => setShowData("email")}
              />
            </button>
            <button className="icon" data-label="age">
              <img
                src={womanAgeSvg}
                alt="age"
                id="iconImg"
                onMouseEnter={() => setShowData("age")}
              />
            </button>
            <button className="icon" data-label="city">
              <img
                src={mapSvg}
                alt="map"
                id="iconImg"
                onMouseEnter={() => setShowData("city")}
              />
            </button>
            <button className="icon" data-label="phone">
              <img
                src={phoneSvg}
                alt="phone"
                id="iconImg"
                onMouseEnter={() => setShowData("phone")}
              />
            </button>
            <button className="icon" data-label="username">
              <img
                src={padlockSvg}
                alt="lock"
                id="iconImg"
                onMouseEnter={() => setShowData("username")}
              />
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button" onClick={getUser}>
              new user
            </button>
            <button className="btn" type="button" onClick={handleAdd}>
              add user
            </button>
          </div>

          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
              </tr>
            </thead>
            <tbody>
              {users.map(({ name, age, phone, email, value }) => (
                <tr key={value} className="body-tr">
                  <td className="th">
                    {name.first} {name.last}
                  </td>
                  <td className="th">{email}</td>
                  <td className="th">{phone}</td>
                  <td className="th">{age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div> */}
    </main>
  );
}

export default App;
