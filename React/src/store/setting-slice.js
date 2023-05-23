import { createSlice } from "@mui/icons-material";

const settingSlice = createSlice({
    name: "setting",
    initialState: {
        settings: [
            
        ],
        upload: [],
    },
    reducers: {
        setSettings(state, action) {
            state.settings = action.payload;
        },
        setUpload(state, action) {
            state.upload = action.payload;
        },
    },
});

export default settingSlice.reducer;
 
export const settingActions = settingSlice.actions;