import axiosInstance from "./axiosInstance";

// 전체 맛집 불러오기
export const getAllPlaces = () => axiosInstance.get("/places");

// 찜하기 기능
export const likePlace = (place) =>
  axiosInstance.post("/users/places", { place });
