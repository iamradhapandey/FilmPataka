import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTcxZmM1ZjE3ZTFlNWMxZTFlZDExMjFlNzliNTk1ZiIsIm5iZiI6MTczMDQ3MjA5OC44OTI5NCwic3ViIjoiNjcyNGUyMTRiMGMxZDk5YzMyNjUxNGQ5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.TZLmjZSmh_-neVf1kLOx4dQia0WPMrokmzeUC_NdiTE'
      }
});


export default instance