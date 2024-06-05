import React, { useState } from "react";
import { profileImgPatchApi } from "../../store/api";
import Modal from "@mui/joy/Modal";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/joy/Button";
import SvgIcon from "@mui/joy/SvgIcon";
import { styled } from "@mui/joy";
import useStore from "../../store/store";

interface ProfileUpdateProps {
  openProfileUpdate: boolean;
  setOpenProfileUpdate: (open: boolean) => void;
}

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const ProfileUpdate = ({ openProfileUpdate, setOpenProfileUpdate }: ProfileUpdateProps) => {
  const { loadData } = useStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
  };

  const profileImgPatch = async () => {
    const token = localStorage.getItem("token");
    if (token && selectedFile) {
      try {
        const profile_img = selectedFile;
        await profileImgPatchApi({ token, profile_img });
        loadData();
        setOpenProfileUpdate(false);
      } catch (error) {
        console.error("프로필 이미지 변경 실패:", error);
      }
    }
  };

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={openProfileUpdate}
      onClose={() => setOpenProfileUpdate(false)}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
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
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          fontWeight="lg"
          mb={1}
        >
        {selectedFile ? "프로필을 변경하시겠습니까?" : "이미지를 선택해주세요."}
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "0.5rem 0rem",
          }}
        >
          {!selectedFile && (
            <Button
              component="label"
              role={undefined}
              tabIndex={-1}
              variant="outlined"
              color="neutral"
              startDecorator={
                <SvgIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                  </svg>
                </SvgIcon>
              }
            >
              이미지 업로드
              <VisuallyHiddenInput
                type="file"
                onChange={handleFileChange}
                accept="image/*"
              />
            </Button>
          )}
          {selectedFile && (
            <Button onClick={profileImgPatch}>확인</Button>
          )}
        </div>
      </Sheet>
    </Modal>
  );
};

export default ProfileUpdate;
