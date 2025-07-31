import axios from "axios";
import { API_PATH } from "../../_path.service";

export const serviceRegister = async (params: any) => {
  const response = await axios.post(`${API_PATH().apps}/register`, params, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response.data; // return data, not full response
};

export const serviceLogin = async (params: any) => {
  const response = await axios.post(`${API_PATH().apps}/login`, params, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response.data; // return data, not full response
};

export const serviceDelete = async (id:any) => {
  const response = await axios.delete(`${API_PATH().apps}/todos/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data; // return data, not full response
}

export const serviceCreate = async (params: any) => {
  const response = await axios.post(`${API_PATH().apps}/todos`, params, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data; // return data, not full response
};

export const serviceGetAll = async (key:any) => {
  const response = await axios.get(`${API_PATH().apps}/${key}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data; // return data, not full response
};

