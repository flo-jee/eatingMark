// 공통 설정이 적용된 axios 인스턴스를 불러옴
import axiosInstance from "./axiosInstance";

// 전체 맛집 목록 불러오기
// 서버로부터 전체 맛집 데이터를 GET 요청으로 받아옴
export const getAllPlaces = () => axiosInstance.get("/places");

// 찜한 맛집 목록 불러오기
// 로그인한 사용자의 찜 목록을 가져오는 GET 요청
export const getMyPlaces = () => axiosInstance.get("/users/places");

// 맛집 찜하기
// place 객체를 POST 요청의 body에 담아 서버에 전송하여 찜 목록에 추가
export const likePlace = (place) =>
  axiosInstance.post("/users/places", { place });

// 찜한 맛집 삭제하기
// 찜 목록에서 특정 id의 맛집을 DELETE 요청으로 삭제
export const deletePlace = (id) => axiosInstance.delete(`/users/places/${id}`);
