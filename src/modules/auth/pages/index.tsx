import React from "react";
import logo from "../../../assets/svg/logo.svg";
import { api } from "../../../lib/api";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [userName, setuserName] = React.useState("Entrepot_dropoff@tms.ma");
  const [password, setpassword] = React.useState("Xdock@1234");
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("userData", { username: userName, password: password });
    const res = await api({
      url: "/authenticate",
      method: "post",
      body: {
        username: userName,
        password: password,
      },
    });
    if (res.data.success) {
      localStorage.setItem("userData", JSON.stringify(res.data.data));

      navigate("/");
    }
    console.log(res.data.data);
  };
  return (
    <section className="bg-gray-50  ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className=" w-full bg-white rounded-2xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 border-gray-100">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex justify-center  items-center mb-6 text-2xl font-semibold text-gray-900 ">
              <img className=" w-auto    h-14 mr-2" src={logo} alt="logo" />
            </div>
            <form
              className="space-y-1 md:space-y-6"
              action="#"
              onSubmit={handleLogin}
            >
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-black "
                >
                  Identifiant
                </label>
                <input
                  value={userName}
                  onChange={(e) => {
                    setuserName(e.target.value);
                  }}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-black "
                >
                  Mot de passe
                </label>
                <input
                  value={password}
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required=""
                />
              </div>

              <button
                type="submit"
                className="w-full text-white  bg-emerald-400  hover:bg-primary-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
