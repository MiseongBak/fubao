import axios from "axios";

//const API_URL = "http://127.0.0.1:8000";
const API_URL = "https://i10c104.p.ssafy.io/api";
const API_URL_FLASK = "https://i10c104.p.ssafy.io/ai";

// GET 요청 API
export const currentUserApi = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/user/profile/`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "An error occurred during the API call:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch user profile");
  }
};

export const scheduleFetchApi = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/schedule/myschedule/`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "An error occurred during the API call:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch schedule");
  }
};

export const myFishApi = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/fish/myfish/`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "An error occurred during the API call:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch my fish");
  }
};

export const mapInfoApi = async () => {
  try {
    // axios.get 요청을 시도합니다.
    const response = await axios.get(`${API_URL}/location/map/`);
    return response.data;
  } catch (error) {
    // 에러 처리 로직
    console.error("An error occurred during the API call:", error);
    throw new Error("Failed to fetch map info");
  }
};

// 방생기준 GET
export const releaseFishApi = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/information/release/`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "An error occurred during the API call:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch fish release standard");
  }
};

// 금어기 GET
export const prohibitFishApi = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/information/prohibit/`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "An error occurred during the API call:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch fish prohibit standard");
  }
};

// Method GET
export const methodGetApi = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/information/method/`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "An error occurred during the API call:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch method");
  }
};

// Point GET
export const pointGetApi = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/information/area/`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "An error occurred during the API call:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch point");
  }
};

// recommendation GET
export const recommendationGetApi = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/information/recommendation/`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "An error occurred during the API call:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch method");
  }
};

// information GET
export const informationGetApi = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/information/`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "An error occurred during the API call:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch method");
  }
};

// myfish GET
export const myfishGetApi = async ({ token, fishid }) => {
  try {
    const response = await axios.get(`${API_URL}/fish/myfish/${fishid}/`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "An error occurred during the API call:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch method");
  }
};

// POST 요청 API
export const signupApi = async ({ email, password1, password2, nickname }) => {
  try {
    const response = await axios.post(`${API_URL}/user/register/`, {
      email,
      password1,
      password2,
      nickname,
    });
    return response.data; // 회원가입 성공 시 응답 데이터 반환
  } catch (error) {
    console.log(error.response.data.email);
    console.log(error.response.data.nickname);
    throw error; // 오류 발생 시 예외 처리
  }
};

export const loginApi = async ({ email, password1 }) => {
  try {
    const response = await axios.post(`${API_URL}/user/login/`, {
      email: email,
      password: password1,
    });

    // 로그인에 성공하면 로컬 스토리지에 토큰 저장
    localStorage.setItem("token", response.data.key);

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const logoutApi = async (token) => {
  try {
    const response = await axios.post(`${API_URL}/user/logout/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const planRegisterApi = async ({
  date,
  location,
  area,
  method,
  token,
}) => {
  try {
    const response = await axios
      .post(
        `${API_URL}/schedule/`,
        {
          date,
          location,
          area,
          method,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then(console.log(date, location, area, method));
    return response.data;
  } catch (error) {
    console.log(date, location, area, method);
    throw error;
  }
};

export const classifyApiCreditCard = async ({ file, uid }) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("uid", uid);
  formData.append("object", "credit_card");
  try {
    const response = await axios.post(`${API_URL_FLASK}/predict`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // length 값을 정수로 변환하여 저장
    const lengthInt = Math.floor(response.data.length / 10);
    const { species } = response.data;

    // 로컬 스토리지에 저장
    localStorage.setItem("length", lengthInt.toString());
    localStorage.setItem("species", species);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const classifyApiCigarette = async ({ file, uid }) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("uid", uid);
  formData.append("object", "cigarette");

  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  try {
    const response = await axios.post(`${API_URL_FLASK}/predict`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const lengthInt = Math.floor(response.data.length / 10);
    const { species } = response.data;

    localStorage.setItem("length", lengthInt.toString());
    localStorage.setItem("species", species);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const classifyApiNone = async ({ file, uid }) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("uid", uid);
  formData.append("object", "none");
  try {
    const response = await axios.post(`${API_URL_FLASK}/predict`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const { species } = response.data;

    localStorage.setItem("species", species);

    return response.data;
  } catch (error) {
    throw error;
  }
};

// 사전 설문 방법
export const surveyMethodApi = async ({ token, weight, method }) => {
  try {
    const response = await axios.post(
      `${API_URL}/review/method/`,
      { weight, method },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const surveyFishApi = async ({ token, fishId, preference }) => {
  try {
    const response = await axios.post(
      `${API_URL}/fish/myfish/${fishId}/`,
      { preference },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fish GET
export const fishGetApi = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/fish/`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "An error occurred during the API call:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch fish list");
  }
};

// PUT 요청 API

// PATCH 요청 API
export const profileImgPatchApi = async ({ token, profile_img }) => {
  try {
    const formData = new FormData();
    formData.append("profile_img", profile_img);

    const response = await axios.patch(`${API_URL}/user/profile/`, formData, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("성공");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const nicknamePatchApi = async ({ token, nickname }) => {
  try {
    const response = await axios.patch(
      `${API_URL}/user/profile/`,
      { nickname },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    console.log("성공");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const surveyPatchApi = async ({ token }) => {
  try {
    const response = await axios.patch(
      `${API_URL}/user/profile/`,
      { presurvey: true },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    console.log("성공");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const scheduleDoneApi = async ({ token, pk }) => {
  try {
    const response = await axios.patch(
      `${API_URL}/schedule/done/${pk}/`,
      { done: true },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    console.log("성공");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = `${d.getMonth() + 1}`.padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고, 두 자리수로 맞춥니다.
  const day = `${d.getDate()}`.padStart(2, '0'); // 일자도 두 자리수로 맞춥니다.
  return `${year}-${month}-${day}`;
};

export const schedulePatchApi = async ({
  token,
  id,
  date,
  location,
  point,
  method,
}) => {
  // 함수 본문 내에서 date를 변환합니다.
  const formattedDate = formatDate(date);
  
  try {
    const response = await axios.patch(
      `${API_URL}/schedule/myschedule/${id}/`,
      { date: formattedDate, location, point, method }, // 변환된 date를 사용합니다.
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    console.log("성공");
    // 로그에는 변환된 날짜를 출력합니다.
    console.log(formattedDate, location, point, method);
    return response.data;
  } catch (error) {
    console.log(formattedDate, location, point, method);
    console.log(error);
    throw error;
  }
};


//DELETE 요청 API

//어항 물고기 호출(10종)
export const FishApi1 = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/fish/myfish/1/`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "An error occurred during the API call:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch fish1");
  }
};

export const FishApi2 = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/fish/myfish/2/`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "An error occurred during the API call:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch fish2");
  }
};

export const FishApi3 = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/fish/myfish/3/`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "An error occurred during the API call:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch fish3");
  }
};

export const FishApi4 = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/fish/myfish/4/`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "An error occurred during the API call:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch fish4");
  }
};

export const FishApi5 = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/fish/myfish/5/`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "An error occurred during the API call:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch fish5");
  }
};

export const FishApi6 = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/fish/myfish/6/`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "An error occurred during the API call:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch fish6");
  }
};

export const FishApi7 = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/fish/myfish/7/`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "An error occurred during the API call:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch fish7");
  }
};

export const FishApi8 = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/fish/myfish/8/`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "An error occurred during the API call:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch fish8");
  }
};

export const FishApi9 = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/fish/myfish/9/`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "An error occurred during the API call:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch fish9");
  }
};

export const FishApi10 = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/fish/myfish/10/`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "An error occurred during the API call:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch fish10");
  }
};

// DELETE API
export const removeProfileApi = async (token) => {
  try {
    const response = await axios.delete(`${API_URL}/user/profile/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// 날씨 GET API
export const weatherGetApi = async ({ lat, lng }) => {
  try {
    // console.log(lat,lng);
    const response = await axios.get(`${API_URL}/information/weatherSunset/`, {
      params: {
        lat: lat,
        lon: lng,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "An error occurred during the API call:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch weather at");
  }
};
