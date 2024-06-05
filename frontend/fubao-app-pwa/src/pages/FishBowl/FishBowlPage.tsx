import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
  FishApi1,
  FishApi2,
  FishApi3,
  FishApi4,
  FishApi5,
  FishApi6,
  FishApi7,
  FishApi8,
  FishApi9,
  FishApi10,
} from "../../store/api";
import { useQueries } from "@tanstack/react-query";

//x: -0.55~0.55, y: -1.15~1.15

// 물고기정보
// 1:참돔
// 2:농어
// 3:전갱이
// 4:숭어
// 5:고등어
// 6:광어
// 7:우럭
// 8:감성돔
// 9:돌돔
// 10:쥐노래미

const FishBowlBox = styled.div`
  background-color: black;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
`;
let animationId: number | null = null;
let xspeed: number = 0.0025;
let yspeed: number = 0.0005;
let rotationvalue: number = 0.25;
let anispeed: number = 0.02;
const avg: number = 0.9;
let cnt = 0;
let length: number;

let check: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let visited: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let csw: number = 1;

//xrand = (((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
//yrand = (((Math.random() * (0.5 + 0.5)) - 0.5) * 1e2) / 1e2;


let xpos1: number = Math.round(((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let ypos1: number = 1.5;
let beforexpos1: number = xpos1;
let beforeypos1: number = ypos1;
let sw1: number = 3;
let ysw1: number = 2;
let xrand1: number = (((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let yrand1: number = (((Math.random() * (0.55 + 0.55)) - 0.55) * 1e2) / 1e2;
// let yrand1: number = (((Math.random() * (0.55 + 0.55)) - 0.55) * 1e2) / 1e2;

let xpos2: number = Math.round(((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let ypos2: number = 1.5;
let beforexpos2: number = xpos2;
let beforeypos2: number = ypos2;
let sw2: number = 3;
let ysw2: number = 2;
let xrand2: number = (((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let yrand2: number = (((Math.random() * (0.55 + 0.55)) - 0.55) * 1e2) / 1e2;

let xpos3: number = Math.round(((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let ypos3: number = 1.5;
let beforexpos3: number = xpos3;
let beforeypos3: number = ypos3;
let sw3: number = 3;
let ysw3: number = 2;
let xrand3: number = (((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let yrand3: number = (((Math.random() * (0.55 + 0.55)) - 0.55) * 1e2) / 1e2;

let xpos4: number = Math.round(((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let ypos4: number = 1.5;
let beforexpos4: number = xpos4;
let beforeypos4: number = ypos4;
let sw4: number = 3;
let ysw4: number = 2;
let xrand4: number = (((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let yrand4: number = (((Math.random() * (0.55 + 0.55)) - 0.55) * 1e2) / 1e2;

let xpos5: number = Math.round(((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let ypos5: number = 1.5;
let beforexpos5: number = xpos5;
let beforeypos5: number = ypos5;
let sw5: number = 3;
let ysw5: number = 2;
let xrand5: number = (((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let yrand5: number = (((Math.random() * (0.5 + 0.5)) - 0.5) * 1e2) / 1e2;

let xpos6: number = Math.round(((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let ypos6: number = 1.5;
let beforexpos6: number = xpos6;
let beforeypos6: number = ypos6;
let sw6: number = 3;
let ysw6: number = 2;
let xrand6: number = (((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let yrand6: number = -0.8;

let xpos7: number = Math.round(((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let ypos7: number = 1.5;
let beforexpos7: number = xpos7;
let beforeypos7: number = ypos7;
let sw7: number = 3;
let ysw7: number = 2;
let xrand7: number = (((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let yrand7: number = (((Math.random() * (0.55 + 0.55)) - 0.55) * 1e2) / 1e2;

let xpos8: number = Math.round(((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let ypos8: number = 1.5;
let beforexpos8: number = xpos8;
let beforeypos8: number = ypos8;
let sw8: number = 3;
let ysw8: number = 2;
let xrand8: number = (((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let yrand8: number = (((Math.random() * (0.55 + 0.55)) - 0.55) * 1e2) / 1e2;

let xpos9: number = Math.round(((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let ypos9: number = 1.5;
let beforexpos9: number = xpos9;
let beforeypos9: number = ypos9;
let sw9: number = 3;
let ysw9: number = 2;
let xrand9: number = (((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let yrand9: number = (((Math.random() * (0.55 + 0.55)) - 0.55) * 1e2) / 1e2;

let xpos10: number = Math.round(((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let ypos10: number = 1.5;
let beforexpos10: number = xpos10;
let beforeypos10: number = ypos10;
let sw10: number = 3;
let ysw10: number = 2;
let xrand10: number = (((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let yrand10: number = (((Math.random() * (0.55 + 0.55)) - 0.55) * 1e2) / 1e2;

let xpos11: number = Math.round(((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let ypos11: number = 1.5;
let beforexpos11: number = xpos11;
let beforeypos11: number = ypos11;
let sw11: number = 3;
let ysw11: number = 2;
let xrand11: number = (((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let yrand11: number = (((Math.random() * (0.55 + 0.55)) - 0.55) * 1e2) / 1e2;

let xpos12: number = Math.round(((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let ypos12: number = 1.5;
let beforexpos12: number = xpos12;
let beforeypos12: number = ypos12;
let sw12: number = 3;
let ysw12: number = 2;
let xrand12: number = (((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let yrand12: number = (((Math.random() * (0.55 + 0.55)) - 0.55) * 1e2) / 1e2;

let xpos13: number = Math.round(((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let ypos13: number = 1.5;
let beforexpos13: number = xpos13;
let beforeypos13: number = ypos13;
let sw13: number = 3;
let ysw13: number = 2;
let xrand13: number = (((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let yrand13: number = (((Math.random() * (0.55 + 0.55)) - 0.55) * 1e2) / 1e2;

let xpos14: number = Math.round(((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let ypos14: number = 1.5;
let beforexpos14: number = xpos14;
let beforeypos14: number = ypos14;
let sw14: number = 3;
let ysw14: number = 2;
let xrand14: number = (((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let yrand14: number = (((Math.random() * (0.55 + 0.55)) - 0.55) * 1e2) / 1e2;

let xpos15: number = Math.round(((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let ypos15: number = 1.5;
let beforexpos15: number = xpos15;
let beforeypos15: number = ypos15;
let sw15: number = 3;
let ysw15: number = 2;
let xrand15: number = (((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let yrand15: number = (((Math.random() * (0.5 + 0.5)) - 0.5) * 1e2) / 1e2;

let xpos16: number = Math.round(((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let ypos16: number = 1.5;
let beforexpos16: number = xpos16;
let beforeypos16: number = ypos16;
let sw16: number = 3;
let ysw16: number = 2;
let xrand16: number = (((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let yrand16: number = -0.8;

let xpos17: number = Math.round(((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let ypos17: number = 1.5;
let beforexpos17: number = xpos17;
let beforeypos17: number = ypos17;
let sw17: number = 3;
let ysw17: number = 2;
let xrand17: number = (((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let yrand17: number = (((Math.random() * (0.55 + 0.55)) - 0.55) * 1e2) / 1e2;

let xpos18: number = Math.round(((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let ypos18: number = 1.5;
let beforexpos18: number = xpos18;
let beforeypos18: number = ypos18;
let sw18: number = 3;
let ysw18: number = 2;
let xrand18: number = (((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let yrand18: number = (((Math.random() * (0.55 + 0.55)) - 0.55) * 1e2) / 1e2;

let xpos19: number = Math.round(((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let ypos19: number = 1.5;
let beforexpos19: number = xpos19;
let beforeypos19: number = ypos19;
let sw19: number = 3;
let ysw19: number = 2;
let xrand19: number = (((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let yrand19: number = (((Math.random() * (0.55 + 0.55)) - 0.55) * 1e2) / 1e2;

let xpos20: number = Math.round(((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let ypos20: number = 1.5;
let beforexpos20: number = xpos20;
let beforeypos20: number = ypos20;
let sw20: number = 3;
let ysw20: number = 2;
let xrand20: number = (((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let yrand20: number = (((Math.random() * (0.55 + 0.55)) - 0.55) * 1e2) / 1e2;

let xpos21: number = Math.round(((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let ypos21: number = 1.5;
let beforexpos21: number = xpos20;
let beforeypos21: number = ypos20;
let sw21: number = 3;
let ysw21: number = 2;
let xrand21: number = (((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let yrand21: number = (((Math.random() * (0.55 + 0.55)) - 0.55) * 1e2) / 1e2;

let xpos22: number = Math.round(((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let ypos22: number = 1.5;
let beforexpos22: number = xpos20;
let beforeypos22: number = ypos20;
let sw22: number = 3;
let ysw22: number = 2;
let xrand22: number = (((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let yrand22: number = (((Math.random() * (0.55 + 0.55)) - 0.55) * 1e2) / 1e2;

let xpos23: number = Math.round(((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let ypos23: number = 1.5;
let beforexpos23: number = xpos20;
let beforeypos23: number = ypos20;
let sw23: number = 3;
let ysw23: number = 2;
let xrand23: number = (((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
let yrand23: number = (((Math.random() * (0.55 + 0.55)) - 0.55) * 1e2) / 1e2;


const FishBowlPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mixer1 = useRef<THREE.AnimationMixer | null>(null);
  const mixer2 = useRef<THREE.AnimationMixer | null>(null);
  const mixer3 = useRef<THREE.AnimationMixer | null>(null);
  const mixer4 = useRef<THREE.AnimationMixer | null>(null);
  const mixer5 = useRef<THREE.AnimationMixer | null>(null);
  const mixer6 = useRef<THREE.AnimationMixer | null>(null);
  const mixer7 = useRef<THREE.AnimationMixer | null>(null);
  const mixer8 = useRef<THREE.AnimationMixer | null>(null);
  const mixer9 = useRef<THREE.AnimationMixer | null>(null);
  const mixer10 = useRef<THREE.AnimationMixer | null>(null);
  const mixer11 = useRef<THREE.AnimationMixer | null>(null);
  const mixer12 = useRef<THREE.AnimationMixer | null>(null);
  const mixer13 = useRef<THREE.AnimationMixer | null>(null);
  const mixer14 = useRef<THREE.AnimationMixer | null>(null);
  const mixer15 = useRef<THREE.AnimationMixer | null>(null);
  const mixer16 = useRef<THREE.AnimationMixer | null>(null);
  const mixer17 = useRef<THREE.AnimationMixer | null>(null);
  const mixer18 = useRef<THREE.AnimationMixer | null>(null);
  const mixer19 = useRef<THREE.AnimationMixer | null>(null);
  const mixer20 = useRef<THREE.AnimationMixer | null>(null);
  const mixer21 = useRef<THREE.AnimationMixer | null>(null);
  const mixer22 = useRef<THREE.AnimationMixer | null>(null);
  const mixer23 = useRef<THREE.AnimationMixer | null>(null);
  const model1 = useRef<THREE.Object3D | null>(null);
  const model2 = useRef<THREE.Object3D | null>(null);
  const model3 = useRef<THREE.Object3D | null>(null);
  const model4 = useRef<THREE.Object3D | null>(null);
  const model5 = useRef<THREE.Object3D | null>(null);
  const model6 = useRef<THREE.Object3D | null>(null);
  const model7 = useRef<THREE.Object3D | null>(null);
  const model8 = useRef<THREE.Object3D | null>(null);
  const model9 = useRef<THREE.Object3D | null>(null);
  const model10 = useRef<THREE.Object3D | null>(null);
  const model11 = useRef<THREE.Object3D | null>(null);
  const model12 = useRef<THREE.Object3D | null>(null);
  const model13 = useRef<THREE.Object3D | null>(null);
  const model14 = useRef<THREE.Object3D | null>(null);
  const model15 = useRef<THREE.Object3D | null>(null);
  const model16 = useRef<THREE.Object3D | null>(null);
  const model17 = useRef<THREE.Object3D | null>(null);
  const model18 = useRef<THREE.Object3D | null>(null);
  const model19 = useRef<THREE.Object3D | null>(null);
  const model20 = useRef<THREE.Object3D | null>(null);
  const model21 = useRef<THREE.Object3D | null>(null);
  const model22 = useRef<THREE.Object3D | null>(null);
  const model23 = useRef<THREE.Object3D | null>(null);

  const fishInfoArray: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const beforeFishInfoArray: number[] = [];
  const fishLengthArray: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,];
  const interArray: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const token = localStorage.getItem("token");
  const results = useQueries({
    queries: [
      { queryKey: ['getFish1'], queryFn: () => FishApi1(token), refetchInterval: 1000 },
      { queryKey: ['getFish2'], queryFn: () => FishApi2(token), refetchInterval: 1000 },
      { queryKey: ['getFish3'], queryFn: () => FishApi3(token), refetchInterval: 1000 },
      { queryKey: ['getFish4'], queryFn: () => FishApi4(token), refetchInterval: 1000 },
      { queryKey: ['getFish5'], queryFn: () => FishApi5(token), refetchInterval: 1000 },
      { queryKey: ['getFish6'], queryFn: () => FishApi6(token), refetchInterval: 1000 },
      { queryKey: ['getFish7'], queryFn: () => FishApi7(token), refetchInterval: 1000 },
      { queryKey: ['getFish8'], queryFn: () => FishApi8(token), refetchInterval: 1000 },
      { queryKey: ['getFish9'], queryFn: () => FishApi9(token), refetchInterval: 1000 },
      { queryKey: ['getFish10'], queryFn: () => FishApi10(token), refetchInterval: 1000 },
    ],
  });


  const linearInterpolation = (lengthNum: number) => {
    // 보간할 값의 범위 설정
    var rangeStart = 0;
    var rangeEnd = 50;

    // 보간 결과의 범위 설정
    var resultStart = 0;
    var resultEnd = 2;

    // 주어진 범위 내의 값으로 변환
    var lengthResult = resultStart + (resultEnd - resultStart) * ((lengthNum - rangeStart) / (rangeEnd - rangeStart));
    return lengthResult;
  }

  const loadFishModel = (
    loader: any,
    fishInfoArray: number,
    model: { current: THREE.Object3D | null },
    mixer: { current: THREE.AnimationMixer | null },
    modelPath: string,
    position: THREE.Vector3,
    rotation: THREE.Euler,
    scale: THREE.Vector3,
    scene: THREE.Scene,
    fishLenth: number,
    fishnum: number
  ): void => {
    loader.load(modelPath, (gltf: GLTF) => {
      //if (!model.current) return;
      model.current = gltf.scene;

      // 위치 설정
      model.current.position.copy(position);

      // 회전 설정
      model.current.rotation.copy(rotation);

      // 크기 설정
      //scale[0]=1;
      model.current.scale.copy(scale);

      // 씬에 모델 추가
      scene.add(model.current);
      model.current.visible = true;

      const animations = gltf.animations || [];
      if (mixer.current) {
        mixer.current.stopAllAction();
      }
      mixer.current = new THREE.AnimationMixer(model.current);
      console.log("num: ", fishnum);

      animations.forEach((animation: THREE.AnimationClip) => {
        const action = mixer.current!.clipAction(animation);
        action.play();
      });
    });
  }


  useEffect(() => {

    if (!results) return;

    const loader1 = new GLTFLoader();
    const loader2 = new GLTFLoader();
    const loader3 = new GLTFLoader();
    const loader4 = new GLTFLoader();
    const loader5 = new GLTFLoader();
    const loader6 = new GLTFLoader();
    const loader7 = new GLTFLoader();
    const loader8 = new GLTFLoader();
    const loader9 = new GLTFLoader();
    const loader10 = new GLTFLoader();
    const loader11 = new GLTFLoader();
    const loader12 = new GLTFLoader();
    const loader13 = new GLTFLoader();
    const loader14 = new GLTFLoader();
    const loader15 = new GLTFLoader();
    const loader16 = new GLTFLoader();
    const loader17 = new GLTFLoader();
    const loader18 = new GLTFLoader();
    const loader19 = new GLTFLoader();
    const loader20 = new GLTFLoader();
    const loader21 = new GLTFLoader();
    const loader22 = new GLTFLoader();
    const loader23 = new GLTFLoader();


    {
      results && results.forEach((result) => {
        if (result.isPending) {
          // 로딩 상태 처리
          console.log('Loading...');
        } else if (result.error) {
          // 에러 상태 처리
          console.error('Error fetching data:', result.error);
        } else if (result.data) {
          // 데이터가 존재하는 경우, 안전하게 접근
          console.log('FishId:', result.data.fish.id);
          console.log('FishCNT:', result.data.count);
          length = result.data.max_length;
          length = length / 10;
          length = Math.floor(length);
          console.log('FishMaxLength:', length);

          fishInfoArray[result.data.fish.id - 1] = result.data.count;
          fishLengthArray[result.data.fish.id - 1] = length;
          interArray[result.data.fish.id - 1] = linearInterpolation(length);
        }
      });

      console.log('fishInfoArray:', fishInfoArray);
      console.log('fishLengthArray:', fishLengthArray);
      console.log('interArray:', interArray);

      let scene = new THREE.Scene();
      let renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current!,
        antialias: true,
      });
      renderer.outputEncoding = THREE.sRGBEncoding;

      let camera = new THREE.PerspectiveCamera(20, 1);
      camera.position.set(0, 0, 5);
      //camera.lookAt(scene.position);
      camera.rotateZ(Math.PI * 3 / 2); // 카메라 회전

      scene.background = new THREE.Color("black");

      const ambientLight = new THREE.AmbientLight(0xffffff, 3);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(1, 1, 1).normalize();

      scene.add(ambientLight);
      scene.add(directionalLight);

      console.log("start");

      // fishInfoArray[0] = 1;
      // fishInfoArray[1] = 1;
      // fishInfoArray[2] = 1;
      // fishInfoArray[3] = 1;
      // fishInfoArray[4] = 1;
      // fishInfoArray[5] = 1;
      // fishInfoArray[6] = 1;
      // fishInfoArray[7] = 1;
      // fishInfoArray[8] = 1;
      // fishInfoArray[9] = 1;

      // 1번 숭어
      if (fishInfoArray[3] >= 1) {
        loadFishModel(loader1, fishInfoArray[3], model1, mixer1, 'low_poly_mugil/scene.gltf', new THREE.Vector3(0, 0, 0), new THREE.Euler(-1.5, 0, -1.5), new THREE.Vector3(1 * interArray[3], 1 * interArray[3], 1 * interArray[3]), scene, fishLengthArray[0], 3);
      }

      // 2번 쥐노래미
      if (fishInfoArray[9] >= 1) {
        loadFishModel(loader2, fishInfoArray[9], model2, mixer2, 'low_poly_salmon/scene.gltf', new THREE.Vector3(-0.55, -1.15, -0.5), new THREE.Euler(-1.5, 0, -1.5), new THREE.Vector3(0.15 * interArray[9], 0.15 * interArray[9], 0.15 * interArray[9]), scene, fishLengthArray[1], 9);
      }

      // 3번 광어
      if (fishInfoArray[5] >= 1) {
        loadFishModel(loader3, fishInfoArray[5], model3, mixer3, 'low_poly_flatfish/scene.gltf', new THREE.Vector3(-0.6, -1.2, 0), new THREE.Euler(0, 2.6, 1.5), new THREE.Vector3(0.7 * interArray[5], 0.7 * interArray[5], 0.7 * interArray[5]), scene, fishLengthArray[2], 5);
      }

      // 4번 전갱이
      if (fishInfoArray[2] >= 1) {
        loadFishModel(loader4, fishInfoArray[2], model4, mixer4, 'low_poly_barracuda/scene.gltf', new THREE.Vector3(0, 0, 1), new THREE.Euler(1.5, 0, -1.5), new THREE.Vector3(0.15 * interArray[2], 0.15 * interArray[2], 0.15 * interArray[2]), scene, fishLengthArray[3], 2);
      }

      // 5번 참돔
      if (fishInfoArray[0] >= 1) {
        loadFishModel(loader5, fishInfoArray[0], model5, mixer5, 'low_poly_redseabream/scene.gltf', new THREE.Vector3(0, 0, 2), new THREE.Euler(1.5, 0, -1.5), new THREE.Vector3(0.45 * 0.6, 0.45 * 0.6, 0.45 * 0.6), scene, fishLengthArray[4], 0);
      }

      // 6번 돌돔
      if (fishInfoArray[8] >= 1) {
        loadFishModel(loader6, fishInfoArray[8], model6, mixer6, 'low_poly_stoneseabream/scene.gltf', new THREE.Vector3(0, 0, 0), new THREE.Euler(-1.5, 3, 1.5), new THREE.Vector3(1 * interArray[8], 1 * interArray[8], 1 * interArray[8]), scene, fishLengthArray[5], 8);
      }

      // 7번 농어
      if (fishInfoArray[1] >= 1) {
        loadFishModel(loader7, fishInfoArray[1], model7, mixer7, 'low_poly_seabass/scene.gltf', new THREE.Vector3(0, 0, 0), new THREE.Euler(-1.5, 3, 1.5), new THREE.Vector3(0.6 * interArray[1], 0.6 * interArray[1], 0.6 * interArray[1]), scene, fishLengthArray[6], 1);
      }

      // 8번 우럭
      if (fishInfoArray[6] >= 1) {
        loadFishModel(loader8, fishInfoArray[6], model8, mixer8, 'low_poly_sebastes/scene.gltf', new THREE.Vector3(0, 0, 0), new THREE.Euler(-1.5, 0, -1.5), new THREE.Vector3(0.5 * interArray[6], 0.5 * interArray[6], 0.5 * interArray[6]), scene, fishLengthArray[7], 6);
      }

      // 9번 고등어
      if (fishInfoArray[4] >= 1) {
        loadFishModel(loader9, fishInfoArray[4], model9, mixer9, 'low_poly_mackerel/scene.gltf', new THREE.Vector3(0, 0, 0), new THREE.Euler(-1.5, 0, -1.5), new THREE.Vector3(1 * interArray[4], 1 * interArray[4], 1 * interArray[4]), scene, fishLengthArray[8], 4);
      }

      // 10번 감성돔
      if (fishInfoArray[7] >= 1) {
        loadFishModel(loader10, fishInfoArray[7], model10, mixer10, 'low_poly_blackseabream/scene.gltf', new THREE.Vector3(0, 0, 2), new THREE.Euler(1.5, 0, -1.5), new THREE.Vector3(0.45 * interArray[7], 0.45 * interArray[7], 0.45 * interArray[7]), scene, fishLengthArray[9], 7);
      }

      // 11번 숭어
      if (fishInfoArray[3] >= 2) {
        loadFishModel(loader11, fishInfoArray[3], model11, mixer11, 'low_poly_mugil/scene.gltf', new THREE.Vector3(0, 0, 0), new THREE.Euler(-1.5, 0, -1.5), new THREE.Vector3(1 * interArray[3], 1 * interArray[3], 1 * interArray[3]), scene, fishLengthArray[0], 3);
      }

      // 12번 쥐노래미
      if (fishInfoArray[9] >= 2) {
        loadFishModel(loader12, fishInfoArray[9], model12, mixer12, 'low_poly_salmon/scene.gltf', new THREE.Vector3(-0.55, -1.15, -0.5), new THREE.Euler(-1.5, 0, -1.5), new THREE.Vector3(0.15 * interArray[9], 0.15 * interArray[9], 0.15 * interArray[9]), scene, fishLengthArray[1], 9);
      }

      // 13번 광어
      if (fishInfoArray[5] >= 2) {
        loadFishModel(loader13, fishInfoArray[5], model13, mixer13, 'low_poly_flatfish/scene.gltf', new THREE.Vector3(-0.6, -1.2, 0), new THREE.Euler(0, 2.6, 1.5), new THREE.Vector3(0.7 * interArray[5], 0.7 * interArray[5], 0.7 * interArray[5]), scene, fishLengthArray[2], 5);
      }

      // 14번 전갱이
      if (fishInfoArray[2] >= 2) {
        loadFishModel(loader14, fishInfoArray[2], model14, mixer14, 'low_poly_barracuda/scene.gltf', new THREE.Vector3(0, 0, 1), new THREE.Euler(1.5, 0, -1.5), new THREE.Vector3(0.15 * interArray[2], 0.15 * interArray[2], 0.15 * interArray[2]), scene, fishLengthArray[3], 2);
      }

      // 15번 참돔
      if (fishInfoArray[0] >= 2) {
        loadFishModel(loader15, fishInfoArray[0], model15, mixer15, 'low_poly_redseabream/scene.gltf', new THREE.Vector3(0, 0, 2), new THREE.Euler(1.5, 0, -1.5), new THREE.Vector3(0.45 * 1, 0.45 * 1, 0.45 * 1), scene, fishLengthArray[4], 0);
      }

      // 16번 돌돔
      if (fishInfoArray[8] >= 2) {
        loadFishModel(loader16, fishInfoArray[8], model16, mixer16, 'low_poly_stoneseabream/scene.gltf', new THREE.Vector3(0, 0, 0), new THREE.Euler(-1.5, 3, 1.5), new THREE.Vector3(1 * interArray[8], 1 * interArray[8], 1 * interArray[8]), scene, fishLengthArray[5], 8);
      }

      // 17번 농어
      if (fishInfoArray[1] >= 2) {
        loadFishModel(loader17, fishInfoArray[1], model17, mixer17, 'low_poly_seabass/scene.gltf', new THREE.Vector3(0, 0, 0), new THREE.Euler(-1.5, 3, 1.5), new THREE.Vector3(0.6 * interArray[1], 0.6 * interArray[1], 0.6 * interArray[1]), scene, fishLengthArray[6], 1);
      }

      // 18번 우럭
      if (fishInfoArray[6] >= 2) {
        loadFishModel(loader18, fishInfoArray[6], model18, mixer18, 'low_poly_sebastes/scene.gltf', new THREE.Vector3(0, 0, 0), new THREE.Euler(-1.5, 0, -1.5), new THREE.Vector3(0.5 * interArray[6], 0.5 * interArray[6], 0.5 * interArray[6]), scene, fishLengthArray[7], 6);
      }

      // 19번 고등어
      if (fishInfoArray[4] >= 2) {
        loadFishModel(loader19, fishInfoArray[4], model19, mixer19, 'low_poly_mackerel/scene.gltf', new THREE.Vector3(0, 0, 0), new THREE.Euler(-1.5, 0, -1.5), new THREE.Vector3(1 * 0.6, 1 * 0.6, 1 * 0.6), scene, fishLengthArray[8], 4);
      }

      // 20번 감성돔
      if (fishInfoArray[7] >= 2) {
        loadFishModel(loader20, fishInfoArray[7], model20, mixer20, 'low_poly_blackseabream/scene.gltf', new THREE.Vector3(0, 0, 2), new THREE.Euler(1.5, 0, -1.5), new THREE.Vector3(0.45 * interArray[7], 0.45 * interArray[7], 0.45 * interArray[7]), scene, fishLengthArray[9], 7);
      }

      // 21번 참돔
      if (fishInfoArray[0] >= 3) {
        loadFishModel(loader21, fishInfoArray[0], model21, mixer21, 'low_poly_redseabream/scene.gltf', new THREE.Vector3(0, 0, 2), new THREE.Euler(1.5, 0, -1.5), new THREE.Vector3(0.45 * 0.8, 0.45 * 0.8, 0.45 * 0.8), scene, fishLengthArray[4], 0);
      }

      // 22번 고등어
      if (fishInfoArray[4] >= 3) {
        loadFishModel(loader22, fishInfoArray[4], model22, mixer22, 'low_poly_mackerel/scene.gltf', new THREE.Vector3(0, 0, 0), new THREE.Euler(-1.5, 0, -1.5), new THREE.Vector3(1 * 0.5, 1 * 0.5, 1 * 0.5), scene, fishLengthArray[8], 4);
      }

      // 23번 고등어
      if (fishInfoArray[4] >= 4) {
        loadFishModel(loader23, fishInfoArray[4], model23, mixer23, 'low_poly_mackerel/scene.gltf', new THREE.Vector3(0, 0, 0), new THREE.Euler(-1.5, 0, -1.5), new THREE.Vector3(1 * 0.45, 1 * 0.45, 1 * 0.45), scene, fishLengthArray[8], 4);
      }


      animate(scene, renderer, camera);

      const onWindowResize = () => {
        const width = window.innerWidth || 0;
        const height = window.innerHeight || 0;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };

      window.addEventListener('resize', onWindowResize, false);
      onWindowResize();

      return () => {
        // window.removeEventListener('resize', onWindowResize); //비율 맞추는거
        // cleanup logic if needed
      }
    };
  }, [results]);

  const animate = (scene: THREE.Scene, renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera): void => {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null; // animationId를 초기화합니다.
    }

    animationId = requestAnimationFrame(() => animate(scene, renderer, camera));

    const updateFishModelFront = (
      mixer: { current: any },
      model: { current: any },
      fishIndex: number,
      xpos: number,
      ypos: number,
      beforexpos: number,
      beforeypos: number,
      xrand: number,
      yrand: number,
      sw: number,
      ysw: number,
      xspeed: number,
      yspeed: number,
      rotationvalue: number,
      checknum: number,
      zpos: number
    ): void => {
      if (mixer.current) {
        mixer.current.update(anispeed);
        if (model.current) {
          if (fishInfoArray[fishIndex] === 0) {
            model.current.visible = false;
          } else {
            model.current.visible = true;
          }
          if (beforexpos < xrand) {
            if (xpos >= xrand) {
              beforexpos = xpos;
              xpos -= xspeed;
              sw = 5;
            } else {
              if (model.current.rotation.x > -1.5) {
                sw = 1;
              } else {
                sw = 4;
              }
            }
          } else if (beforexpos > xrand) {
            if (xpos <= xrand) {
              beforexpos = xpos;
              xpos += xspeed;
              sw = 5;
            } else {
              if (model.current.rotation.x < 1.5) {
                sw = 2;
              } else {
                sw = 3;
              }
            }
          } else if (model.current.rotation.x > 1.5) {
            sw = 4;
            model.current.rotation.x += rotationvalue + (Math.round(((Math.random() * (0.1 + 0.1)) - 0.1) * 1e2) / 1e2);
          } else if (model.current.rotation.x < -1.5) {
            sw = 3;
            model.current.rotation.x -= rotationvalue + (Math.round(((Math.random() * (0.1 + 0.1)) - 0.1) * 1e2) / 1e2);
          }

          if (beforeypos > yrand) {
            if (ypos <= yrand) {
              beforeypos = ypos;
              sw = 6;
            } else {
              ysw = 2;
            }
          } else if (beforeypos < yrand) {
            if (ypos >= yrand) {
              beforeypos = ypos;
              sw = 6;
            } else {
              ysw = 1;
            }
          }

          if (sw === 1) {
            model.current.rotation.x -= rotationvalue + (Math.round(((Math.random() * (0.1 + 0.1)) - 0.1) * 1e2) / 1e2);
          } else if (sw === 2) {
            model.current.rotation.x += rotationvalue + (Math.round(((Math.random() * (0.1 + 0.1)) - 0.1) * 1e2) / 1e2);
          } else if (sw === 3) {
            xpos -= xspeed + (((Math.random() * (0.0005 + 0.0005)) - 0.0005) * 1e2) / 1e2;
          } else if (sw === 4) {
            xpos += xspeed + (((Math.random() * (0.0005 + 0.0005)) - 0.0005) * 1e2) / 1e2;
          } else if (sw === 5) {
            xrand = (((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
          } else if (sw === 6) {
            yrand = (((Math.random() * (0.5 + 0.5)) - 0.5) * 1e2) / 1e2;
          }

          if (ysw === 1) {
            ypos += yspeed;
          } else if (ysw === 2) {
            ypos -= yspeed;
          }

          model.current.position.set(ypos, xpos, zpos);

          if (checknum === 1) {
            xpos1 = xpos;
            ypos1 = ypos;
            beforexpos1 = beforexpos;
            beforeypos1 = beforeypos;
            xrand1 = xrand;
            yrand1 = yrand;
            sw1 = sw;
            ysw1 = ysw;
          }
          if (checknum === 2) {
            xpos2 = xpos;
            ypos2 = ypos;
            beforexpos2 = beforexpos;
            beforeypos2 = beforeypos;
            xrand2 = xrand;
            yrand2 = yrand;
            sw2 = sw;
            ysw2 = ysw;
          }
          if (checknum === 4) {
            xpos4 = xpos;
            ypos4 = ypos;
            beforexpos4 = beforexpos;
            beforeypos4 = beforeypos;
            xrand4 = xrand;
            yrand4 = yrand;
            sw4 = sw;
            ysw4 = ysw;
          }
          if (checknum === 6) {
            xpos6 = xpos;
            ypos6 = ypos;
            beforexpos6 = beforexpos;
            beforeypos6 = beforeypos;
            xrand6 = xrand;
            yrand6 = yrand;
            sw6 = sw;
            ysw6 = ysw;
          }
          if (checknum === 7) {
            xpos7 = xpos;
            ypos7 = ypos;
            beforexpos7 = beforexpos;
            beforeypos7 = beforeypos;
            xrand7 = xrand;
            yrand7 = yrand;
            sw7 = sw;
            ysw7 = ysw;
          }
          if (checknum === 9) {
            xpos9 = xpos;
            ypos9 = ypos;
            beforexpos9 = beforexpos;
            beforeypos9 = beforeypos;
            xrand9 = xrand;
            yrand9 = yrand;
            sw9 = sw;
            ysw9 = ysw;
          }
          if (checknum === 11) {
            xpos11 = xpos;
            ypos11 = ypos;
            beforexpos11 = beforexpos;
            beforeypos11 = beforeypos;
            xrand11 = xrand;
            yrand11 = yrand;
            sw11 = sw;
            ysw11 = ysw;
          }
          if (checknum === 12) {
            xpos12 = xpos;
            ypos12 = ypos;
            beforexpos12 = beforexpos;
            beforeypos12 = beforeypos;
            xrand12 = xrand;
            yrand12 = yrand;
            sw12 = sw;
            ysw12 = ysw;
          }
          if (checknum === 14) {
            xpos14 = xpos;
            ypos14 = ypos;
            beforexpos14 = beforexpos;
            beforeypos14 = beforeypos;
            xrand14 = xrand;
            yrand14 = yrand;
            sw14 = sw;
            ysw14 = ysw;
          }
          if (checknum === 16) {
            xpos16 = xpos;
            ypos16 = ypos;
            beforexpos16 = beforexpos;
            beforeypos16 = beforeypos;
            xrand16 = xrand;
            yrand16 = yrand;
            sw16 = sw;
            ysw16 = ysw;
          }
          if (checknum === 17) {
            xpos17 = xpos;
            ypos17 = ypos;
            beforexpos17 = beforexpos;
            beforeypos17 = beforeypos;
            xrand17 = xrand;
            yrand17 = yrand;
            sw17 = sw;
            ysw17 = ysw;
          }
          if (checknum === 19) {
            xpos19 = xpos;
            ypos19 = ypos;
            beforexpos19 = beforexpos;
            beforeypos19 = beforeypos;
            xrand19 = xrand;
            yrand19 = yrand;
            sw19 = sw;
            ysw19 = ysw;
          }
          if (checknum === 22) {
            xpos22 = xpos;
            ypos22 = ypos;
            beforexpos22 = beforexpos;
            beforeypos22 = beforeypos;
            xrand22 = xrand;
            yrand22 = yrand;
            sw22 = sw;
            ysw22 = ysw;
          }
          if (checknum === 23) {
            xpos23 = xpos;
            ypos23 = ypos;
            beforexpos23 = beforexpos;
            beforeypos23 = beforeypos;
            xrand23 = xrand;
            yrand23 = yrand;
            sw23 = sw;
            ysw23 = ysw;
          }
        }
      }
    }

    const updateFishModelBack = (
      mixer: { current: any }, // mixer는 current 속성을 가진 객체
      model: { current: any }, // model은 current 속성을 가진 객체
      fishIndex: number,
      xpos: number,
      ypos: number,
      beforexpos: number,
      beforeypos: number,
      xrand: number,
      yrand: number,
      sw: number,
      ysw: number,
      xspeed: number,
      yspeed: number,
      rotationvalue: number,
      checknum: number,
      zpos: number
    ): void => {
      if (mixer.current) {
        // if (checknum === 5) {
        //   console.log("참돔");
        // }
        // else {
        //   console.log("감성돔");
        // }
        mixer.current.update(anispeed);
        if (model.current) {
          if (fishInfoArray[fishIndex] === 0) {
            model.current.visible = false;
          } else {
            model.current.visible = true;
          }
          if (beforexpos < xrand) {
            if (xpos >= xrand) {
              beforexpos = xpos;
              xpos -= xspeed;
              sw = 5;
            } else {
              if (model.current.rotation.x < 1.5) {
                sw = 1;
              } else {
                sw = 4;
              }
            }
          } else if (beforexpos > xrand) {
            if (xpos <= xrand) {
              beforexpos = xpos;
              xpos += xspeed;
              sw = 5;
            } else {
              if (model.current.rotation.x > -1.5) {
                sw = 2;
              } else {
                sw = 3;
              }
            }
          } else if (model.current.rotation.x < -1.5) {
            sw = 4;
            model.current.rotation.x += rotationvalue + (Math.round(((Math.random() * (0.1 + 0.1)) - 0.1) * 1e2) / 1e2);
          } else if (model.current.rotation.x > 1.5) {
            sw = 3;
            model.current.rotation.x -= rotationvalue + (Math.round(((Math.random() * (0.1 + 0.1)) - 0.1) * 1e2) / 1e2);
          }

          if (beforeypos > yrand) {
            if (ypos <= yrand) {
              beforeypos = ypos;
              sw = 6;
            } else {
              ysw = 2;
            }
          } else if (beforeypos < yrand) {
            if (ypos >= yrand) {
              beforeypos = ypos;
              sw = 6;
            } else {
              ysw = 1;
            }
          }

          if (sw === 1) {
            model.current.rotation.x += rotationvalue + (Math.round(((Math.random() * (0.1 + 0.1)) - 0.1) * 1e2) / 1e2);
          } else if (sw === 2) {
            model.current.rotation.x -= rotationvalue + (Math.round(((Math.random() * (0.1 + 0.1)) - 0.1) * 1e2) / 1e2);
          } else if (sw === 3) {
            xpos -= xspeed + (((Math.random() * (0.0005 + 0.0005)) - 0.0005) * 1e2) / 1e2;
          } else if (sw === 4) {
            xpos += xspeed + (((Math.random() * (0.0005 + 0.0005)) - 0.0005) * 1e2) / 1e2;
          } else if (sw === 5) {
            xrand = (((Math.random() * (0.9 + 0.35)) - 0.35) * 1e2) / 1e2;
          } else if (sw === 6) {
            yrand = (((Math.random() * (0.5 + 0.5)) - 0.5) * 1e2) / 1e2;
          }

          if (ysw === 1) {
            ypos += yspeed;
          } else if (ysw === 2) {
            ypos -= yspeed;
          }

          model.current.position.set(ypos, xpos, zpos);

          if (checknum === 5) {
            xpos5 = xpos;
            ypos5 = ypos;
            beforexpos5 = beforexpos;
            beforeypos5 = beforeypos;
            xrand5 = xrand;
            yrand5 = yrand;
            sw5 = sw;
            ysw5 = ysw;
          }
          else if (checknum === 8) {
            xpos8 = xpos;
            ypos8 = ypos;
            beforexpos8 = beforexpos;
            beforeypos8 = beforeypos;
            xrand8 = xrand;
            yrand8 = yrand;
            sw8 = sw;
            ysw8 = ysw;
          }
          else if (checknum === 10) {
            xpos10 = xpos;
            ypos10 = ypos;
            beforexpos10 = beforexpos;
            beforeypos10 = beforeypos;
            xrand10 = xrand;
            yrand10 = yrand;
            sw10 = sw;
            ysw10 = ysw;
          }
          else if (checknum === 15) {
            xpos15 = xpos;
            ypos15 = ypos;
            beforexpos15 = beforexpos;
            beforeypos15 = beforeypos;
            xrand15 = xrand;
            yrand15 = yrand;
            sw15 = sw;
            ysw15 = ysw;
          }
          else if (checknum === 18) {
            xpos18 = xpos;
            ypos18 = ypos;
            beforexpos18 = beforexpos;
            beforeypos18 = beforeypos;
            xrand18 = xrand;
            yrand18 = yrand;
            sw18 = sw;
            ysw18 = ysw;
          }
          else if (checknum === 20) {
            xpos20 = xpos;
            ypos20 = ypos;
            beforexpos20 = beforexpos;
            beforeypos20 = beforeypos;
            xrand20 = xrand;
            yrand20 = yrand;
            sw20 = sw;
            ysw20 = ysw;
          }
          else if (checknum === 21) {
            xpos21 = xpos;
            ypos21 = ypos;
            beforexpos21 = beforexpos;
            beforeypos21 = beforeypos;
            xrand21 = xrand;
            yrand21 = yrand;
            sw21 = sw;
            ysw21 = ysw;
          }
        }
      }
    }

    const updateFishModelFlat = (
      mixer: { current: any }, // mixer는 current 속성을 가진 객체
      model: { current: any }, // model은 current 속성을 가진 객체
      fishIndex: number,
      xpos: number,
      ypos: number,
      beforexpos: number,
      beforeypos: number,
      xrand: number,
      yrand: number,
      sw: number,
      ysw: number,
      xspeed: number,
      yspeed: number,
      rotationvalue: number,
      checknum: number,
      zpos: number
    ): void => {
      if (mixer.current) {
        mixer.current.update(anispeed);
        if (model.current) {
          if (fishInfoArray[fishIndex] === 0) {
            model.current.visible = false;
          } else {
            model.current.visible = true;
          }
          if (beforexpos < xrand) {
            if (xpos >= xrand) {
              beforexpos = xpos;
              xpos -= xspeed;
              sw = 5;
            } else {
              if (model.current.rotation.x > 0) {
                sw = 1;
              } else {
                sw = 3;
              }
            }
          } else if (beforexpos > xrand) {
            if (xpos <= xrand) {
              beforexpos = xpos;
              xpos += xspeed;
              sw = 5;
            } else {
              if (model.current.rotation.x < 3) {
                sw = 2;
              } else {
                sw = 4;
              }
            }
          } else if (model.current.rotation.x < 0) {
            sw = 4;
            model.current.rotation.x += rotationvalue;
          } else if (model.current.rotation.x > 3) {
            sw = 3;
            model.current.rotation.x -= rotationvalue;
          }

          //up
          if (sw === 1) {
            if (model.current.rotation.y < 2.6) {
              model.current.rotation.x -= rotationvalue;
              model.current.rotation.y += 0.6;
            } else {
              model.current.rotation.x -= rotationvalue;
            }
          }
          //down
          else if (sw === 2) {
            if (model.current.rotation.y > -2.6) {
              model.current.rotation.x += rotationvalue;
              model.current.rotation.y -= 0.6;
            } else {
              model.current.rotation.x += rotationvalue;
            }
          } else if (sw === 3) {
            xpos += xspeed + (((Math.random() * (0.0005 + 0.0005)) - 0.0005) * 1e2) / 1e2;
          } else if (sw === 4) {
            xpos -= xspeed + (((Math.random() * (0.0005 + 0.0005)) - 0.0005) * 1e2) / 1e2;
          } else if (sw === 5) {
            xrand = (((Math.random() * (1.4 + 0.5)) - 0.5) * 1e2) / 1e2;
          }

          model.current.position.set(-0.8, xpos, zpos);

          if (checknum === 3) {
            xpos3 = xpos;
            ypos3 = ypos;
            beforexpos3 = beforexpos;
            beforeypos3 = beforeypos;
            xrand3 = xrand;
            yrand3 = yrand;
            sw3 = sw;
            ysw3 = ysw;
          }
          if (checknum === 13) {
            xpos13 = xpos;
            ypos13 = ypos;
            beforexpos13 = beforexpos;
            beforeypos13 = beforeypos;
            xrand13 = xrand;
            yrand13 = yrand;
            sw13 = sw;
            ysw13 = ysw;
          }
        }
      }
    }

    const firstFront = (
      mixer: { current: any }, // mixer는 current 속성을 가진 객체
      model: { current: any }, // model은 current 속성을 가진 객체
      fishIndex: number,
      xpos: number,
      ypos: number,
      beforexpos: number,
      beforeypos: number,
      xrand: number,
      yrand: number,
      sw: number,
      ysw: number,
      xspeed: number,
      yspeed: number,
      rotationvalue: number,
      checknum: number,
      zpos: number
    ): void => {
      if (mixer.current) {
        mixer.current.update(anispeed);
        if (model.current) {
          if (fishInfoArray[fishIndex] === 0) {
            model.current.visible = false;
          } else {
            model.current.visible = true;
          }

          if (beforeypos > yrand) {
            if (ypos <= yrand) {
              visited[fishIndex] = 1;
              sw = 6;
            } else {
              ysw = 2;
            }
          }



          if (sw === 3) {
            //model.current.rotation.y = -1.5;
          }
          if (sw === 2) {
            model.current.rotation.y += rotationvalue;
          }
          else if (sw === 3) {
            xpos -= xspeed + (((Math.random() * (0.0005 + 0.0005)) - 0.0005) * 1e2) / 1e2;
          } else if (sw === 4) {
            xpos += xspeed + (((Math.random() * (0.0005 + 0.0005)) - 0.0005) * 1e2) / 1e2;
          }
        } else if (sw === 6) {
          yrand = (((Math.random() * (1.1 + 1.1)) - 1.1) * 1e2) / 1e2;
        }

        if (ysw === 2) {
          ypos -= 0.02;
        }

        model.current.position.set(ypos, xpos, zpos);

        if (checknum === 1) {
          xpos1 = xpos;
          ypos1 = ypos;
          beforexpos1 = beforexpos;
          beforeypos1 = beforeypos;
          xrand1 = xrand;
          yrand1 = yrand;
          sw1 = sw;
          ysw1 = ysw;
        }
        if (checknum === 2) {
          xpos2 = xpos;
          ypos2 = ypos;
          beforexpos2 = beforexpos;
          beforeypos2 = beforeypos;
          xrand2 = xrand;
          yrand2 = yrand;
          sw2 = sw;
          ysw2 = ysw;
        }
        if (checknum === 4) {
          xpos4 = xpos;
          ypos4 = ypos;
          beforexpos4 = beforexpos;
          beforeypos4 = beforeypos;
          xrand4 = xrand;
          yrand4 = yrand;
          sw4 = sw;
          ysw4 = ysw;
        }
        if (checknum === 9) {
          xpos9 = xpos;
          ypos9 = ypos;
          beforexpos9 = beforexpos;
          beforeypos9 = beforeypos;
          xrand9 = xrand;
          yrand9 = yrand;
          sw9 = sw;
          ysw9 = ysw;
        }
        if (checknum === 11) {
          xpos11 = xpos;
          ypos11 = ypos;
          beforexpos11 = beforexpos;
          beforeypos11 = beforeypos;
          xrand11 = xrand;
          yrand11 = yrand;
          sw11 = sw;
          ysw11 = ysw;
        }
        if (checknum === 12) {
          xpos12 = xpos;
          ypos12 = ypos;
          beforexpos12 = beforexpos;
          beforeypos12 = beforeypos;
          xrand12 = xrand;
          yrand12 = yrand;
          sw12 = sw;
          ysw12 = ysw;
        }
        if (checknum === 14) {
          xpos14 = xpos;
          ypos14 = ypos;
          beforexpos14 = beforexpos;
          beforeypos14 = beforeypos;
          xrand14 = xrand;
          yrand14 = yrand;
          sw14 = sw;
          ysw14 = ysw;
        }
        if (checknum === 19) {
          xpos19 = xpos;
          ypos19 = ypos;
          beforexpos19 = beforexpos;
          beforeypos19 = beforeypos;
          xrand19 = xrand;
          yrand19 = yrand;
          sw19 = sw;
          ysw19 = ysw;
        }
        if (checknum === 22) {
          xpos22 = xpos;
          ypos22 = ypos;
          beforexpos22 = beforexpos;
          beforeypos22 = beforeypos;
          xrand22 = xrand;
          yrand22 = yrand;
          sw22 = sw;
          ysw22 = ysw;
        }
        if (checknum === 23) {
          xpos23 = xpos;
          ypos23 = ypos;
          beforexpos23 = beforexpos;
          beforeypos23 = beforeypos;
          xrand23 = xrand;
          yrand23 = yrand;
          sw23 = sw;
          ysw23 = ysw;
        }
      }
    }

    const firstFrontRe = (
      mixer: { current: any }, // mixer는 current 속성을 가진 객체
      model: { current: any }, // model은 current 속성을 가진 객체
      fishIndex: number,
      xpos: number,
      ypos: number,
      beforexpos: number,
      beforeypos: number,
      xrand: number,
      yrand: number,
      sw: number,
      ysw: number,
      xspeed: number,
      yspeed: number,
      rotationvalue: number,
      checknum: number,
      zpos: number
    ): void => {
      if (mixer.current) {
        mixer.current.update(anispeed);
        if (model.current) {
          if (fishInfoArray[fishIndex] === 0) {
            model.current.visible = false;
          } else {
            model.current.visible = true;
          }

          if (beforeypos > yrand) {
            if (ypos <= yrand) {
              visited[fishIndex] = 1;
              sw = 6;
            } else {
              ysw = 2;
            }
          }



          if (sw === 3) {
            //model.current.rotation.y = 1.5;
          }
          if (sw === 2) {
            model.current.rotation.y += rotationvalue;
          }
          else if (sw === 3) {
            xpos -= xspeed + (((Math.random() * (0.0005 + 0.0005)) - 0.0005) * 1e2) / 1e2;
          } else if (sw === 4) {
            xpos += xspeed + (((Math.random() * (0.0005 + 0.0005)) - 0.0005) * 1e2) / 1e2;
          }
          else if (sw === 6) {
            yrand = (((Math.random() * (1.1 + 1.1)) - 1.1) * 1e2) / 1e2;
          }

          if (ysw === 2) {
            ypos -= 0.02;
          }

          model.current.position.set(ypos, xpos, zpos);

          if (checknum === 6) {
            xpos6 = xpos;
            ypos6 = ypos;
            beforexpos6 = beforexpos;
            beforeypos6 = beforeypos;
            xrand6 = xrand;
            yrand6 = yrand;
            sw6 = sw;
            ysw6 = ysw;
          }
          if (checknum === 7) {
            xpos7 = xpos;
            ypos7 = ypos;
            beforexpos7 = beforexpos;
            beforeypos7 = beforeypos;
            xrand7 = xrand;
            yrand7 = yrand;
            sw7 = sw;
            ysw7 = ysw;
          }
          if (checknum === 16) {
            xpos16 = xpos;
            ypos16 = ypos;
            beforexpos16 = beforexpos;
            beforeypos16 = beforeypos;
            xrand16 = xrand;
            yrand16 = yrand;
            sw16 = sw;
            ysw16 = ysw;
          }
          if (checknum === 17) {
            xpos17 = xpos;
            ypos17 = ypos;
            beforexpos17 = beforexpos;
            beforeypos17 = beforeypos;
            xrand17 = xrand;
            yrand17 = yrand;
            sw17 = sw;
            ysw17 = ysw;
          }
        }
      }
    }

    const firstBack = (
      mixer: { current: any }, // mixer는 current 속성을 가진 객체
      model: { current: any }, // model은 current 속성을 가진 객체
      fishIndex: number,
      xpos: number,
      ypos: number,
      beforexpos: number,
      beforeypos: number,
      xrand: number,
      yrand: number,
      sw: number,
      ysw: number,
      xspeed: number,
      yspeed: number,
      rotationvalue: number,
      checknum: number,
      zpos: number
    ): void => {
      if (mixer.current) {
        mixer.current.update(anispeed);
        if (model.current) {
          if (fishInfoArray[fishIndex] === 0) {
            model.current.visible = false;
          } else {
            model.current.visible = true;
          }

          if (beforeypos > yrand) {
            if (ypos <= yrand) {
              visited[fishIndex] = 1;
              sw = 6;
            } else {
              ysw = 2;
            }
          }



          if (sw === 3) {
            //model.current.rotation.y = 1.5;
          }
          if (sw === 2) {
            model.current.rotation.y -= rotationvalue;
          }
          else if (sw === 3) {
            xpos -= xspeed + (((Math.random() * (0.0005 + 0.0005)) - 0.0005) * 1e2) / 1e2;
          } else if (sw === 4) {
            xpos += xspeed + (((Math.random() * (0.0005 + 0.0005)) - 0.0005) * 1e2) / 1e2;
          }
          else if (sw === 6) {
            yrand = (((Math.random() * (1.1 + 1.1)) - 1.1) * 1e2) / 1e2;
          }

          if (ysw === 2) {
            ypos -= 0.02;
          }

          model.current.position.set(ypos, xpos, zpos);

          if (checknum === 5) {
            xpos5 = xpos;
            ypos5 = ypos;
            beforexpos5 = beforexpos;
            beforeypos5 = beforeypos;
            xrand5 = xrand;
            yrand5 = yrand;
            sw5 = sw;
            ysw5 = ysw;
          }
          if (checknum === 8) {
            xpos8 = xpos;
            ypos8 = ypos;
            beforexpos8 = beforexpos;
            beforeypos8 = beforeypos;
            xrand8 = xrand;
            yrand8 = yrand;
            sw8 = sw;
            ysw8 = ysw;
          }
          if (checknum === 10) {
            xpos10 = xpos;
            ypos10 = ypos;
            beforexpos10 = beforexpos;
            beforeypos10 = beforeypos;
            xrand10 = xrand;
            yrand10 = yrand;
            sw10 = sw;
            ysw10 = ysw;
          }
          else if (checknum === 15) {
            xpos15 = xpos;
            ypos15 = ypos;
            beforexpos15 = beforexpos;
            beforeypos15 = beforeypos;
            xrand15 = xrand;
            yrand15 = yrand;
            sw15 = sw;
            ysw15 = ysw;
          }
          else if (checknum === 18) {
            xpos18 = xpos;
            ypos18 = ypos;
            beforexpos18 = beforexpos;
            beforeypos18 = beforeypos;
            xrand18 = xrand;
            yrand18 = yrand;
            sw18 = sw;
            ysw18 = ysw;
          }
          else if (checknum === 20) {
            xpos20 = xpos;
            ypos20 = ypos;
            beforexpos20 = beforexpos;
            beforeypos20 = beforeypos;
            xrand20 = xrand;
            yrand20 = yrand;
            sw20 = sw;
            ysw20 = ysw;
          }
          else if (checknum === 21) {
            xpos21 = xpos;
            ypos21 = ypos;
            beforexpos21 = beforexpos;
            beforeypos21 = beforeypos;
            xrand21 = xrand;
            yrand21 = yrand;
            sw21 = sw;
            ysw21 = ysw;
          }
        }
      }
    }

    const firstFlat = (
      mixer: { current: any }, // mixer는 current 속성을 가진 객체
      model: { current: any }, // model은 current 속성을 가진 객체
      fishIndex: number,
      xpos: number,
      ypos: number,
      beforexpos: number,
      beforeypos: number,
      xrand: number,
      yrand: number,
      sw: number,
      ysw: number,
      xspeed: number,
      yspeed: number,
      rotationvalue: number,
      checknum: number,
      zpos: number
    ): void => {
      if (mixer.current) {
        mixer.current.update(anispeed);
        if (model.current) {
          if (fishInfoArray[fishIndex] === 0) {
            model.current.visible = false;
          } else {
            model.current.visible = true;
          }

          if (beforeypos > yrand) {
            if (ypos <= -0.8) {
              visited[fishIndex] = 1;
            }
            else {
              ysw = 2;
            }
          }




          if (sw === 3) {
            //model.current.rotation.z = 0;
          }
          if (sw === 2) {
            model.current.rotation.z += rotationvalue;
          }

          if (ysw === 2) {
            ypos -= 0.02;
          }

          model.current.position.set(ypos, xpos, zpos);

          if (checknum === 3) {
            xpos3 = xpos;
            ypos3 = ypos;
            beforexpos3 = beforexpos;
            beforeypos3 = beforeypos;
            xrand3 = xrand;
            yrand3 = yrand;
            sw3 = sw;
            ysw3 = ysw;
          }
          if (checknum === 13) {
            xpos13 = xpos;
            ypos13 = ypos;
            beforexpos13 = beforexpos;
            beforeypos13 = beforeypos;
            xrand13 = xrand;
            yrand13 = yrand;
            sw13 = sw;
            ysw13 = ysw;
          }
        }
      }
    }

    // cnt++;
    // console.log(cnt)

    // 1번 숭어
    if (mixer1.current) {
      if (visited[3] === 0) {
        firstFront(mixer1, model1, 3, xpos1, ypos1, beforexpos1, beforeypos1, xrand1, yrand1, sw1, ysw1, xspeed, yspeed, rotationvalue, 1, 0);
      }
      else {
        updateFishModelFront(mixer1, model1, 3, xpos1, ypos1, beforexpos1, beforeypos1, xrand1, yrand1, sw1, ysw1, xspeed, yspeed, rotationvalue, 1, 0);
      }
    }

    // 11번 숭어
    if (mixer11.current) {
      if (visited[13] === 0) {
        firstFront(mixer11, model11, 13, xpos11, ypos11, beforexpos11, beforeypos11, xrand11, yrand11, sw11, ysw11, xspeed, yspeed, rotationvalue, 11, 0);
      }
      else {
        updateFishModelFront(mixer11, model11, 13, xpos11, ypos11, beforexpos11, beforeypos11, xrand11, yrand11, sw11, ysw11, xspeed, yspeed, rotationvalue, 11, 0);
      }
    }

    //2번 쥐노래미
    if (mixer2.current) {
      if (visited[9] === 0) {
        firstFront(mixer2, model2, 9, xpos2, ypos2, beforexpos2, beforeypos2, xrand2, yrand2, sw2, ysw2, xspeed, yspeed, rotationvalue, 2, -0.5);
      }
      else {
        updateFishModelFront(mixer2, model2, 9, xpos2, ypos2, beforexpos2, beforeypos2, xrand2, yrand2, sw2, ysw2, xspeed, yspeed, rotationvalue, 2, -0.5);
      }
    }

    //3번 광어
    if (mixer3.current) {
      if (visited[5] === 0) {
        firstFlat(mixer3, model3, 5, xpos3, ypos3, beforexpos3, beforeypos3, xrand3, yrand3, sw3, ysw3, xspeed, yspeed, rotationvalue, 3, 0);
      }
      else {
        updateFishModelFlat(mixer3, model3, 5, xpos3, ypos3, beforexpos3, beforeypos3, xrand3, yrand3, sw3, ysw3, xspeed, yspeed, rotationvalue, 3, 0);
      }
    }

    //4번 전갱이
    if (mixer4.current) {
      if (visited[2] === 0) {
        firstFront(mixer4, model4, 2, xpos4, ypos4, beforexpos4, beforeypos4, xrand4, yrand4, sw4, ysw4, xspeed, yspeed, rotationvalue, 4, 1);
      }
      else {
        updateFishModelFront(mixer4, model4, 2, xpos4, ypos4, beforexpos4, beforeypos4, xrand4, yrand4, sw4, ysw4, xspeed, yspeed, rotationvalue, 4, 1);
      }
    }

    //5번 참돔
    if (mixer5.current) {
      if (visited[0] === 0) {
        firstBack(mixer5, model5, 0, xpos5, ypos5, beforexpos5, beforeypos5, xrand5, yrand5, sw5, ysw5, xspeed, yspeed, rotationvalue, 5, 2);
      }
      else {
        updateFishModelBack(mixer5, model5, 0, xpos5, ypos5, beforexpos5, beforeypos5, xrand5, yrand5, sw5, ysw5, xspeed, yspeed, rotationvalue, 5, 2);
      }
    }

    //6번 돌돔
    if (mixer6.current) {
      if (visited[8] === 0) {
        firstFrontRe(mixer6, model6, 8, xpos6, ypos6, beforexpos6, beforeypos6, xrand6, yrand6, sw6, ysw6, xspeed, yspeed, rotationvalue, 6, -1);
      }
      else {
        updateFishModelFront(mixer6, model6, 8, xpos6, ypos6, beforexpos6, beforeypos6, xrand6, yrand6, sw6, ysw6, xspeed, yspeed, rotationvalue, 6, -1);
      }
    }

    //7번 농어
    if (mixer7.current) {
      if (visited[1] === 0) {
        firstFrontRe(mixer7, model7, 1, xpos7, ypos7, beforexpos7, beforeypos7, xrand7, yrand7, sw7, ysw7, xspeed, yspeed, rotationvalue, 7, 0);
      }
      else {
        updateFishModelFront(mixer7, model7, 1, xpos7, ypos7, beforexpos7, beforeypos7, xrand7, yrand7, sw7, ysw7, xspeed, yspeed, rotationvalue, 7, 0);
      }
    }

    //8번 우럭
    if (mixer8.current) {
      if (visited[6] === 0) {
        firstBack(mixer8, model8, 6, xpos8, ypos8, beforexpos8, beforeypos8, xrand8, yrand8, sw8, ysw8, xspeed, yspeed, rotationvalue, 8, 1);
      }
      else {
        updateFishModelBack(mixer8, model8, 6, xpos8, ypos8, beforexpos8, beforeypos8, xrand8, yrand8, sw8, ysw8, xspeed, yspeed, rotationvalue, 8, 1);
      }
    }

    //9번 고등어
    if (mixer9.current) {
      if (visited[4] === 0) {
        firstFront(mixer9, model9, 4, xpos9, ypos9, beforexpos9, beforeypos9, xrand9, yrand9, sw9, ysw9, xspeed, yspeed, rotationvalue, 9, 0);
      }
      else {
        updateFishModelFront(mixer9, model9, 4, xpos9, ypos9, beforexpos9, beforeypos9, xrand9, yrand9, sw9, ysw9, xspeed, yspeed, rotationvalue, 9, 0);
      }
    }

    //10번 감성돔
    if (mixer10.current) {
      if (visited[7] === 0) {
        firstBack(mixer10, model10, 7, xpos10, ypos10, beforexpos10, beforeypos10, xrand10, yrand10, sw10, ysw10, xspeed, yspeed, rotationvalue, 10, 2);
      }
      else {
        updateFishModelBack(mixer10, model10, 7, xpos10, ypos10, beforexpos10, beforeypos10, xrand10, yrand10, sw10, ysw10, xspeed, yspeed, rotationvalue, 10, 2);
      }
    }



    // 12번 쥐노래미
    if (mixer12.current) {
      if (visited[19] === 0) {
        firstFront(mixer12, model12, 19, xpos12, ypos12, beforexpos12, beforeypos12, xrand12, yrand12, sw12, ysw12, xspeed, yspeed, rotationvalue, 12, -0.5);
      }
      else {
        updateFishModelFront(mixer12, model12, 19, xpos12, ypos12, beforexpos12, beforeypos12, xrand12, yrand12, sw12, ysw12, xspeed, yspeed, rotationvalue, 12, -0.5);
      }
    }

    // 13번 광어
    if (mixer13.current) {
      if (visited[15] === 0) {
        //console.log(ypos13);
        firstFlat(mixer13, model13, 15, xpos13, ypos13, beforexpos13, beforeypos13, xrand13, yrand13, sw13, ysw13, xspeed, yspeed, rotationvalue, 13, 0);
      }
      else {
        updateFishModelFlat(mixer13, model13, 15, xpos13, ypos13, beforexpos13, beforeypos13, xrand13, yrand13, sw13, ysw13, xspeed, yspeed, rotationvalue, 13, 0);
      }
    }

    // 14번 전갱이
    if (mixer14.current) {
      if (visited[12] === 0) {
        firstFront(mixer14, model14, 12, xpos14, ypos14, beforexpos14, beforeypos14, xrand14, yrand14, sw14, ysw14, xspeed, yspeed, rotationvalue, 14, 1);
      }
      else {
        updateFishModelFront(mixer14, model14, 12, xpos14, ypos14, beforexpos14, beforeypos14, xrand14, yrand14, sw14, ysw14, xspeed, yspeed, rotationvalue, 14, 1);
      }
    }

    // 15번 참돔
    if (mixer15.current) {
      if (visited[10] === 0) {
        firstBack(mixer15, model15, 10, xpos15, ypos15, beforexpos15, beforeypos15, xrand15, yrand15, sw15, ysw15, xspeed, yspeed, rotationvalue, 15, 2);
      }
      else {
        updateFishModelBack(mixer15, model15, 10, xpos15, ypos15, beforexpos15, beforeypos15, xrand15, yrand15, sw15, ysw15, xspeed, yspeed, rotationvalue, 15, 2);
      }
    }

    // 16번 돌돔
    if (mixer16.current) {
      if (visited[18] === 0) {
        firstFrontRe(mixer16, model16, 18, xpos16, ypos16, beforexpos16, beforeypos16, xrand16, yrand16, sw16, ysw16, xspeed, yspeed, rotationvalue, 16, -1);
      }
      else {
        updateFishModelFront(mixer16, model16, 18, xpos16, ypos16, beforexpos16, beforeypos16, xrand16, yrand16, sw16, ysw16, xspeed, yspeed, rotationvalue, 16, -1);
      }
    }

    // 17번 농어
    if (mixer17.current) {
      if (visited[11] === 0) {
        firstFrontRe(mixer17, model17, 11, xpos17, ypos17, beforexpos17, beforeypos17, xrand17, yrand17, sw17, ysw17, xspeed, yspeed, rotationvalue, 17, 0);
      }
      else {
        updateFishModelFront(mixer17, model17, 11, xpos17, ypos17, beforexpos17, beforeypos17, xrand17, yrand17, sw17, ysw17, xspeed, yspeed, rotationvalue, 17, 0);
      }
    }

    // 18번 우럭
    if (mixer18.current) {
      if (visited[16] === 0) {
        firstBack(mixer18, model18, 16, xpos18, ypos18, beforexpos18, beforeypos18, xrand18, yrand18, sw18, ysw18, xspeed, yspeed, rotationvalue, 18, 1);
      }
      else {
        updateFishModelBack(mixer18, model18, 16, xpos18, ypos18, beforexpos18, beforeypos18, xrand18, yrand18, sw18, ysw18, xspeed, yspeed, rotationvalue, 18, 1);
      }
    }

    // 19번 고등어
    if (mixer19.current) {
      if (visited[14] === 0) {
        firstFront(mixer19, model19, 14, xpos19, ypos19, beforexpos19, beforeypos19, xrand19, yrand19, sw19, ysw19, xspeed, yspeed, rotationvalue, 19, 0);
      }
      else {
        updateFishModelFront(mixer19, model19, 14, xpos19, ypos19, beforexpos19, beforeypos19, xrand19, yrand19, sw19, ysw19, xspeed, yspeed, rotationvalue, 19, 0);
      }
    }

    // 20번 감성돔
    if (mixer20.current) {
      if (visited[17] === 0) {
        firstBack(mixer20, model20, 17, xpos20, ypos20, beforexpos20, beforeypos20, xrand20, yrand20, sw20, ysw20, xspeed, yspeed, rotationvalue, 20, 2);
      }
      else {
        updateFishModelBack(mixer20, model20, 17, xpos20, ypos20, beforexpos20, beforeypos20, xrand20, yrand20, sw20, ysw20, xspeed, yspeed, rotationvalue, 20, 2);
      }
    }

    //21번 참돔
    if (mixer21.current) {
      if (visited[20] === 0) {
        firstBack(mixer21, model21, 20, xpos21, ypos21, beforexpos21, beforeypos21, xrand21, yrand21, sw21, ysw21, xspeed, yspeed, rotationvalue, 21, 2);
      }
      else {
        updateFishModelBack(mixer21, model21, 20, xpos21, ypos21, beforexpos21, beforeypos21, xrand21, yrand21, sw21, ysw21, xspeed, yspeed, rotationvalue, 21, 2);
      }
    }

    // 22번 고등어
    if (mixer22.current) {
      if (visited[24] === 0) {
        firstFront(mixer22, model22, 24, xpos22, ypos22, beforexpos22, beforeypos22, xrand22, yrand22, sw22, ysw22, xspeed, yspeed, rotationvalue, 22, 0);
      }
      else {
        updateFishModelFront(mixer22, model22, 24, xpos22, ypos22, beforexpos22, beforeypos22, xrand22, yrand22, sw22, ysw22, xspeed, yspeed, rotationvalue, 22, 0);
      }
    }

    // 23번 고등어
    if (mixer23.current) {
      if (visited[34] === 0) {
        firstFront(mixer23, model23, 34, xpos23, ypos23, beforexpos23, beforeypos23, xrand23, yrand23, sw23, ysw23, xspeed, yspeed, rotationvalue, 23, 0);
      }
      else {
        updateFishModelFront(mixer23, model23, 34, xpos23, ypos23, beforexpos23, beforeypos23, xrand23, yrand23, sw23, ysw23, xspeed, yspeed, rotationvalue, 23, 0);
      }
    }

    renderer.render(scene, camera);
  }

  return (
    <FishBowlBox>
      <canvas ref={canvasRef}></canvas>
    </FishBowlBox>
  );
};

export default FishBowlPage;
