import React, { useState } from "react";
import { nicknamePatchApi } from "../../store/api";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/joy/Button";
import useStore from "../../store/store";
import Swal from "sweetalert2";
import { Input } from "@mui/joy";

interface NicknameUpdateProps {
  openNicknameUpdate: boolean;
  setOpenNicknameUpdate: (open: boolean) => void;
}

const NicknameUpdate = ({ openNicknameUpdate, setOpenNicknameUpdate }: NicknameUpdateProps) => {
  const { loadData } = useStore();
  const [nickname, setNickname] = useState("");

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 폼의 기본 제출 동작 방지
    await nicknamePatch();
  };

  const nicknamePatch = async () => {
    const token = localStorage.getItem("token");
    const validNicknamePattern = /^[A-Za-z0-9가-힣]+$/;

    if (token && nickname) {
      if (!validNicknamePattern.test(nickname)) {
        Swal.fire({
          title: "닉네임 변경 실패",
          text: "닉네임은 공백이나 특수문자를 포함할 수 없습니다.",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        });
        return; // Stop execution if the nickname is invalid
      }

      try {
        await nicknamePatchApi({ token, nickname });
        loadData();
        setOpenNicknameUpdate(false);
      } catch (error) {
        console.error("닉네임 변경 실패:", error);
        Swal.fire({
          title: "변경 실패",
          text: "중복닉네임입니다.",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        });
      }
    }
  };

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={openNicknameUpdate}
      onClose={() => setOpenNicknameUpdate(false)}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1 }}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 500,
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
        }}
      >
        <form style={{ display: "flex" }} onSubmit={handleFormSubmit}>
          <Input
            placeholder="닉네임 변경"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <Button type="submit">완료</Button>
        </form>
      </Sheet>
    </Modal>
  );
};

export default NicknameUpdate;
