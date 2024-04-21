import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  images: [],
};


export const uploadImagesDataAsync = createAsyncThunk(
  "images/uploadImagesDataAsync",

  async (imagesData) => {
    const formData = new FormData();
    imagesData.forEach((image) => {
      formData.append("files", image);
    });

    const response = await axios.post(
      "http://127.0.0.1:8000/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);

    // Получаем текущие данные из sessionStorage, если они есть
    const existingData = JSON.parse(sessionStorage.getItem("uploadedImages")) || [];

    if(existingData.length === 0){
      // Объединяем существующие данные с новыми данными
      const updatedData = [...existingData, ...response.data];
      // Сохраняем обновленные данные в sessionStorage
      sessionStorage.setItem("uploadedImages", JSON.stringify(updatedData));
    }


    for(let i=0; i< response.data.length; i++){
      console.log();
      if(existingData[i]?.fileName !== response.data[i]?.fileName){
        const existingData =
          JSON.parse(sessionStorage.getItem("uploadedImages")) || [];
        // Объединяем существующие данные с новыми данными
        const updatedData = [...existingData, ...response.data];
        // Сохраняем обновленные данные в sessionStorage
        sessionStorage.setItem("uploadedImages", JSON.stringify(updatedData));
      }
    }
    

    return response.data;
  }
);

export const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setImagesData: (state, action) => {
      state.images = [...state.images, ...action.payload];
      
    },
  },

  extraReducers(builder) {

    builder.addCase(uploadImagesDataAsync.fulfilled, (state, action) => {
      state.images = [...state.images, ...action.payload];
    })
      
  },


});




export const {setImagesData} = imagesSlice.actions

export default imagesSlice.reducer;