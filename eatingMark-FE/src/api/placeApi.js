import axiosInstance from "./axiosInstance";

// 전체 맛집 불러오기
export const getAllPlaces = () => axiosInstance.get("/places");

// 찜한 맛집 목록 불러오기
export const getMyPlaces = () => axiosInstance.get("/users/places");

// 찜하기
export const likePlace = (place) =>
  axiosInstance.post("/users/places", { place });
