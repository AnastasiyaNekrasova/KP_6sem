import axios from "./axios";


  export const addPhotoToUser =
    async (userId, image) => {
        try {
            const { data } = await axios.post(`/userinfo/${userId}/photo`, {
                image: image,
              });
            return data
        } catch (error) {
            console.log(error)
        }
    }
