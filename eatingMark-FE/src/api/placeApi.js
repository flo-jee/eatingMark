import axiosInstance from "./axiosInstance";

export const getAllPlaces = () => axiosInstance.get("/places");
