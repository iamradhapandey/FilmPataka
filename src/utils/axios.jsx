import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjdiYmRlZGJkZmRiNWMzMTRiN2VmNTgwNTU3OGFjYiIsIm5iZiI6MTc1MjMwNjQ0MC4zMTEsInN1YiI6IjY4NzIxMzA4OTk4YTc2NzdiMDZlOWVkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SOtWWzV0t5cGXTUu5LVp74BG07q3cN-AW7W2oWOT9zs'
      }
});


export default instance