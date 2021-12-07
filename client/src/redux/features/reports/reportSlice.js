import { createAsyncThunk } from '@reduxjs/toolkit';

export const reportScrubs = createAsyncThunk(
    'h/staff',
    async ({ report_type, description, id_reported_by, id_history, quantity }, thunkAPI) => {
        try {
            const response = await fetch('http://localhost:9000/reports', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    report_type,
                    description,
                    id_reported_by,
                    id_history,
                    quantity
                }),
            });
            let data = await response.json();

            if (response.status === 200) {
                return { ...data };
            } else {
                return thunkAPI.rejectWithValue({ error: data });
            }
        } catch (e) {
            console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);
