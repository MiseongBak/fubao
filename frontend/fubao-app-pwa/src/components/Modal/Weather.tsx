import React from "react";
import styled from "styled-components";
import Modal from "@mui/joy/Modal";
import ModalDialog, { ModalDialogProps } from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";

interface weatherInfo {
  //온도
  TMP: [
    {
      fcstTime: string;
      fsctValue: String;
    },
  ];
  // 풍향
  VEC: [
    {
      fcstTime: string;
      fsctValue: String;
    },
  ];
  // 풍속
  WSD: [
    {
      fcstTime: string;
      fsctValue: String;
    },
  ];
  // 하늘상태
  SKY: [
    {
      fcstTime: string;
      fsctValue: String;
    },
  ];
  // 강수확률
  POP: [
    {
      fcstTime: string;
      fsctValue: String;
    },
  ];
  // 파고
  WAV: [
    {
      fcstTime: string;
      fsctValue: String;
    },
  ];
  // 1시간 강수량
  PCP: [
    {
      fcstTime: string;
      fsctValue: String;
    },
  ];
}

const Title = styled.p`
  margin: 0.5rem 0.5rem;
  font-size: 2rem;
  font-weight: 600;
  color: #000000;
`;

function sortSKY(num: String) {
  if (num === "1") {
    return "맑음";
  } else if (num === "3") {
    return "구름많음";
  } else {
    return "흐림";
  }
}

interface WeatherProps {
  id: number;
  weatherInfo: weatherInfo;
  sunset: string;
  sunrise: string;
  open: boolean;
  onClose: () => void;
}

const Weather: React.FC<WeatherProps> = ({
  id,
  weatherInfo,
  sunrise,
  sunset,
  open,
  onClose,
}) => {
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <ModalDialog>
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
            textAlign={"center"}
          >
            🌈현재 날씨
          </Typography>
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
            textAlign={"center"}
          >
            {weatherInfo && (
              <div>
                {sunrise && (
                  <div>
                    <div>🌞 일출시간 : {sunrise}</div>
                  </div>
                )}
                {sunset && <div> 🌝 일몰시간 : {sunset}</div>}
                <div className="table-container">
                <table aria-label="basic table">
                  <tbody>
                    <tr key="시간">
                      <td>시간</td>
                      {weatherInfo.PCP.map((row, index) => (
                        <td key={`시간-${index}`}>
                          {row.fcstTime.substr(0, 2)}시
                        </td>
                      ))}
                    </tr>
                    <tr key="날씨">
                      <td>날씨</td>
                      {weatherInfo.SKY.map((row, index) => (
                        <td key={`날씨-${index}`}>{sortSKY(row.fsctValue)}</td>
                      ))}
                    </tr>
                    <tr key="기온">
                      <td>기온</td>
                      {weatherInfo.TMP.map((row, index) => (
                        <td key={`기온-${index}`}>{row.fsctValue}℃</td>
                      ))}
                    </tr>
                    <tr key="강수량">
                      <td>강수량</td>
                      {weatherInfo.PCP.map((row, index) => (
                        <td key={`강수량-${index}`}>{row.fsctValue}</td>
                      ))}
                    </tr>
                    <tr key="강수확률">
                      <td>강수확률</td>
                      {weatherInfo.POP.map((row, index) => (
                        <td key={`강수확률-${index}`}>{row.fsctValue}%</td>
                      ))}
                    </tr>
                    <tr key="풍속">
                      <td>풍속</td>
                      {weatherInfo.WSD.map((row, index) => (
                        <td key={`풍속-${index}`}>{row.fsctValue}m/s</td>
                      ))}
                    </tr>
                    <tr key="파고">
                      <td>파고</td>
                      {weatherInfo.WAV.map((row, index) => (
                        <td key={`파고-${index}`}>{row.fsctValue}M</td>
                      ))}
                    </tr>
                    <tr key="풍향">
                      <td>풍향</td>
                      {weatherInfo.VEC.map((row, index) => (
                        <td key={`풍향-${index}`}>{row.fsctValue}deg</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
                </div>
              </div>
            )}
          </Typography>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default Weather;
