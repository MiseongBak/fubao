import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../../store/api";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Fubao
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Login = () => {
  const defaultTheme = createTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");

  const [rememberMe, setRememberMe] = useState(false);

  // 컴포넌트 마운트 시 localStorage에서 이메일과 rememberMe 상태 로드
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedRememberMe = localStorage.getItem("rememberMe") === "true";
    if (storedEmail && storedRememberMe) {
      setEmail(storedEmail);
      setRememberMe(storedRememberMe);
    }
  }, []);

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      navigate("/");
    },
    onError: (error: AxiosError) => {
      Swal.fire({
        title: "로그인 에러",
        html: "로그인에 실패했습니다. <br> 이메일, 비밀번호를 확인해주세요.",
        icon: "error",
        confirmButtonColor: "#d42c348b",
        confirmButtonText: "확인",
      });
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 이메일 형식 확인
    if (!email.includes("@") || !email.includes(".")) {
      Swal.fire({
        title: "이메일 형식 오류",
        text: "형식이 이메일이 아닙니다.",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
      return;
    }

    // 비밀번호 글자수 확인
    if (password1.length < 8) {
      Swal.fire({
        title: "비밀번호 재입력",
        text: "비밀번호는 8글자 이상입니다.",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
      return;
    }

    // "로그인 정보 기억하기"가 선택된 경우, 이메일과 체크박스 상태를 localStorage에 저장
    if (rememberMe) {
      localStorage.setItem("email", email);
      localStorage.setItem("rememberMe", rememberMe.toString());
    } else {
      // 선택되지 않은 경우, localStorage에서 데이터 제거
      localStorage.removeItem("email");
      localStorage.removeItem("rememberMe");
    }

    loginMutation.mutate({ email, password1 });
  };

  // 체크박스 상태 변경 핸들러
  const handleRememberMeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRememberMe(event.target.checked);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <ChevronLeftIcon
          sx={{
            marginTop: 3,
            cursor: "pointer",
          }}
          onClick={handleBack}
        />

        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password1}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword1(e.target.value)
              }
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" checked={rememberMe} onChange={handleRememberMeChange} />}
              label="로그인 정보 기억하기"
            />

            {/* <Button
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3 }}
            >
              Google 로그인하기
            </Button> */}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              로그인
            </Button>

            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  비밀번호 찾기
                </Link> */}
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={handleSignup}>
                  {"아직 계정이 없으신가요?"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Login;
