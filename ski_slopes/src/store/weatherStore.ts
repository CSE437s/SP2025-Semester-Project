import { create } from "zustand"

type WeatherStore = {
    weather: any | null;
    isLoading: boolean;

    fetchWeather: (city: string) => Promise<void>;
}

export const useWeatherStore = create<WeatherStore>((set) => ({
    weather: null,
    isLoading: false,
    
    fetchWeather: async (city: string) => {
        try {
            set({ isLoading: true, weather: null });
            const response = await fetch(`http://localhost:8000/weather?city=${city}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            set({ weather: data });
        } catch (error) {
            console.error("Error fetching weather:", error);
            set({ isLoading: false });
        } finally {
            set({ isLoading: false });
        }
    }
}))