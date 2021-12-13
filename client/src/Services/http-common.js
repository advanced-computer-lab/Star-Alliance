import { useContext } from "react";
import axios from "axios";
import Cookies from "js-cookies";

const axAuthServer = axios.create({
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

const axResource = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

/** TODO
axios
	before sending
		check atoken is timed out? automatically try to get a new one AuthServer
	after sending
		if 403 redirect to login
*/

function isTokenExpired(token) {
  const expiry = JSON.parse(atob(token.split(".")[1])).exp;
  return Math.floor(new Date().getTime() / 1000) >= expiry;
}
// axResource.interceptors.request.use(
//   async (config) => {
//     console.log("request interceptor");
//     console.log(config);
//     if (isTokenExpired(Cookies.getItem("accessToken"))) {
//       console.log("token expired trying to refresh");
//       await axAuthServer
//         .post("http://localhost:2000/getaToken/", {})
//         .then((res) => {
//           console.log(res);
//           console.log(res.data);
//           // console.log("config", config);
//           // Cookies.setItem("accessToken", res.data.token);
//         })
//         .catch((err) => {
//           window.location.href = "/login";
//         });
//     }
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );

// axResource.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   },
//   async function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     if (error.response.status === 403) {
//       console.log("error 403 Error");

//       if (isTokenExpired(Cookies.getItem("accessToken"))) {
//         console.log("token expired trying to refresh");
//         await axAuthServer
//           .post("http://localhost:2000/getaToken/", {})
//           .then((res) => {
//             console.log(res);
//             console.log(res.data);
//             // console.log("config", config);
//             // Cookies.setItem("accessToken", res.data.token);
//           })
//           .catch((err) => {
//             window.location.href = "/login";
//           });
//       }
//     }
//     return Promise.reject(error);
//   }
// );
const clearTheAuthCookie = () => {
  Cookies.removeItem("accessToken");
  Cookies.removeItem("refreshToken");
};
const cleatTheLocalStorage = () => {
  localStorage.removeItem("user");
};

const requestAgain = (originalRequest) => {
  return new Promise((resolve, reject) => resolve(axResource(originalRequest)));
};
// this
axResource.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;

    console.log("REQ interceptor on Error");

    if (status === 401) {
      // if (isTokenExpired(Cookies.getItem("accessToken"))) {
      console.log("token expired trying to refresh");
      return axAuthServer
        .post("http://localhost:2000/getaToken/", {})
        .then((res) => {
          console.log(res);
          console.log(res.data);
          console.log("got new access token, requesting again...");

          return requestAgain(originalRequest);
        })
        .catch((err) => {
          const scode = err.response.status;
          if (!(scode === 401 || scode === 403)) return Promise.reject(err);
          console.log("redirecting to login");
          clearTheAuthCookie();
          cleatTheLocalStorage();
          window.location.href = "/signin";
        });
      // } else {
      //   console.log("token not expired ");
      // }
      // console.log("Reject 1");
      // return Promise.reject(error);
    } else {
      console.log("Reject 2");
      return Promise.reject(error);
    }
  }
);
//
// axResource.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   },
//   function (error) {
//     // const [user, setUser] = useContext(UserContext);
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     if (error.response.status === 403) {
//       console.log("error 403");
//       // console.log("before", user);
//       // setUser({ authed: false });
//       // console.log("after", user);
//     }
//     return Promise.reject(error);
//   }
// );

export default axResource;
