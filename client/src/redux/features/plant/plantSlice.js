import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    status: null,
    plants: [],
    popularPlants: [],
    userPlants: [],
    loading: false,
    interval: null,
}

export const createPlant = createAsyncThunk(
    'plant/createPlant',
    async (params) => {
        try {
            const { data } = await axios.post('/plants', params)
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const getAllPlants = createAsyncThunk('plant/getAllPlants', async () => {
    try {
        const { data } = await axios.get('/plants')
        return data
    } catch (error) {
        console.log(error)
    }
})

export const searching = createAsyncThunk('plant/searching', async (searchQuery) => {
    try {
      const { data } = await axios.get(`/plants/search/${searchQuery}`);
      return data
    } catch (error) {
      alert(error)
    }
  }
)

export const removePlant = createAsyncThunk('plant/removePlant', async (id) => {
    try {
        const { data } = await axios.delete(`/plants/${id}`, id)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const updatePlant = createAsyncThunk(
    'plant/updatePlant',
    async (updatedPlant) => {
        try {
            const { data } = await axios.put(
                `/plants/${updatedPlant.id}`,
                updatedPlant,
            )
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const addPlantToUser = createAsyncThunk(
    'plant/addPlantToUser',
    async ({ userId, plantId }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/userplants/add', { userId, plantId });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deletePlantFromUser = createAsyncThunk(
    'plant/deletePlantFromUser',
    async ({ userId, plantId }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`/userplants/delete/${userId}/${plantId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getUserPlants = createAsyncThunk(
    'plant/getUserPlants',
    async ( userId ) => {
        try {
            const { data } = await axios.get('/userplants', { params: { userId } });
            return data;
        } catch (error) {
            console.log(error)
        }
    }
);

export const plantSlice = createSlice({
    name: 'plant',
    initialState,
    reducers: {
        setPlantInterval: (state, action) => {
            state.interval = action.payload;
          },
    },
    extraReducers: {

        [createPlant.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [createPlant.fulfilled]: (state, action) => {
            state.status = action.payload.message
            state.loading = false
            state.plants.push(action.payload)
        },
        [createPlant.rejected]: (state, action) => {
            state.status = action.payload.message
            state.loading = false
        },

        [getAllPlants.pending]: (state) => {
            state.loading = true
        },
        [getAllPlants.fulfilled]: (state, action) => {
            state.loading = false
            state.plants = action.payload.plants
            state.popularPlants = action.payload.popularPlants
        },
        [getAllPlants.rejected]: (state) => {
            state.loading = false
        },

        [searching.pending]: (state) => {
            state.loading = true
        },
        [searching.fulfilled]: (state, action) => {
            state.loading = false
            state.plants = action.payload.plants
        },
        [searching.rejected]: (state) => {
            state.loading = false
        },

        [removePlant.pending]: (state) => {
            state.status = null
            state.loading = true
        },
        [removePlant.fulfilled]: (state, action) => {
            state.status = action.payload.message
            state.loading = false
            state.plants = state.plants.filter(
                (plant) => plant._id !== action.payload._id
            )
        },
        [removePlant.rejected]: (state, action) => {
            state.status = action.payload.message
            state.loading = false
        },

        [updatePlant.pending]: (state) => {
            state.loading = true
        },
        [updatePlant.fulfilled]: (state, action) => {
            state.loading = false
            state.status = action.payload.message
            const index = state.plants.findIndex(
                (plant) => plant._id === action.payload._id,
            )
            state.plants[index] = action.payload
        },
        [updatePlant.rejected]: (state) => {
            state.loading = false
        },

        [addPlantToUser.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [addPlantToUser.fulfilled]: (state, action) => {
            state.loading = false
            state.status = action.payload.message
        },
        [addPlantToUser.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload.message
        },

        [deletePlantFromUser.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [deletePlantFromUser.fulfilled]: (state, action) => {
            state.loading = false
            state.status = action.payload.message
        },
        [deletePlantFromUser.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload.message
        },

        [getUserPlants.pending]: (state) => {
            state.loading = true
        },
        [getUserPlants.fulfilled]: (state, action) => {
            state.loading = false
            state.userPlants = action.payload.plants
        },
        [getUserPlants.rejected]: (state) => {
            state.loading = false
        },
    },
})

export const { setPlantInterval } = plantSlice.actions;
export default plantSlice.reducer
