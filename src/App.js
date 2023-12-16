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
    name: { first, last },
    email,
    dob: { age },
    location: { city },
    phone,
    picture,
    gender,
    login: { username },
    id: { value },
  } = data;
  const [info, setInfo] = useState();

  const getUser = async () => {
    try {
      const response = await axios.get(url);
      if (response.data.results.length > 0) {
        setData(response.data.results[0]);
        
        
      } else {
        setData(null);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getUser();
    handleMouseEnter(data.name, "name")
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
        { name: first+ " " + last, email: email, phone: phone, age: age, value: value },
      ]);
    }
  };

  const handleMouseEnter = (info, category) => {
    setInfo(info);
    setShowData(category);
  };


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

          <p className="user-title">My {showData} is</p>
          <p className="user-value">{info}</p>
          <div className="values-list">
            <button className="icon" data-label="name" on>
              <img
                src={womanSvg}
                alt="user"
                id="iconImg"
                onMouseEnter={() =>
                  handleMouseEnter(`${first} ${last}`, "name")
                }
              />
            </button>

            <button className="icon" data-label="email">
              <img
                src={mailSvg}
                alt="mail"
                id="iconImg"
                onMouseEnter={() => handleMouseEnter(email, "email")}
              />
            </button>
            <button className="icon" data-label="age">
              <img
                src={womanAgeSvg}
                alt="age"
                id="iconImg"
                onMouseEnter={() => handleMouseEnter(age, "age")}
              />
            </button>
            <button className="icon" data-label="city">
              <img
                src={mapSvg}
                alt="map"
                id="iconImg"
                onMouseEnter={() => handleMouseEnter(city, "street")}
              />
            </button>
            <button className="icon" data-label="phone">
              <img
                src={phoneSvg}
                alt="phone"
                id="iconImg"
                onMouseEnter={() => handleMouseEnter(phone, "phone")}
              />
            </button>
            <button className="icon" data-label="username">
              <img
                src={padlockSvg}
                alt="lock"
                id="iconImg"
                onMouseEnter={() => handleMouseEnter(username, "username")}
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
              {users.map(({name, age, phone, email, value }) => (
                <tr key={value} className="body-tr">
                  <td className="th">
                    {name}
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
