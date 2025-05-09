import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "./authStore";

type FavoriteStore = {
    favorites: string[];  // Array of resort names
    isLoading: boolean;
    error: string | null;
    fetchFavorites: () => Promise<void>;
    toggleFavorite: (resortName: string) => Promise<void>;
    isFavorite: (resortName: string) => boolean;
};

export const useFavoriteStore = create<FavoriteStore>()((set, get) => ({
    favorites: [],
    isLoading: false,
    error: null,

    fetchFavorites: async () => {
        const user = useAuthStore.getState().user;
        if (!user) {
            console.log('No user found, cannot fetch favorites');
            return;
        }

        try {
            console.log('Fetching favorites for user:', user.id);
            set({ isLoading: true, error: null });

            // Log request details
            console.log('Fetching favorites from database');
            console.log('User ID:', user.id);

            const { data, error } = await supabase
                .from('favorites')
                .select('resort_name')
                .eq('user_id', user.id);

            if (error) {
                console.error('Supabase error fetching favorites:', error);
                throw error;
            }

            if (!data) {
                console.log('No favorites found');
                set({ favorites: [], isLoading: false });
                return;
            }

            console.log('Successfully fetched favorites:', data);
            set({ 
                favorites: data.map(fav => fav.resort_name),
                isLoading: false 
            });
        } catch (error) {
            console.error('Error fetching favorites:', error);
            set({ 
                error: 'Failed to fetch favorites',
                isLoading: false,
                favorites: []
            });
        }
    },

    toggleFavorite: async (resortName: string) => {
        const user = useAuthStore.getState().user;
        if (!user) {
            console.log('No user found, cannot toggle favorite');
            return;
        }

        try {
            console.log('Starting toggle favorite for resort:', resortName);
            set({ isLoading: true, error: null });
            const favorites = get().favorites;
            const isFavorited = favorites.includes(resortName);

            // Log request details
            console.log('Operation:', isFavorited ? 'DELETE' : 'INSERT');
            console.log('User ID:', user.id);
            console.log('Resort Name:', resortName);

            if (isFavorited) {
                // Remove favorite
                console.log('Removing favorite:', resortName);
                const { error } = await supabase
                    .from('favorites')
                    .delete()
                    .eq('user_id', user.id)
                    .eq('resort_name', resortName);

                if (error) {
                    console.error('Supabase error removing favorite:', error);
                    throw error;
                }

                console.log('Successfully removed favorite');
                set({ 
                    favorites: favorites.filter(name => name !== resortName),
                    isLoading: false 
                });
            } else {
                // Add favorite
                console.log('Adding favorite:', resortName);
                const { error } = await supabase
                    .from('favorites')
                    .insert([
                        { user_id: user.id, resort_name: resortName }
                    ]);

                if (error) {
                    console.error('Supabase error adding favorite:', error);
                    throw error;
                }

                console.log('Successfully added favorite');
                set({ 
                    favorites: [...favorites, resortName],
                    isLoading: false 
                });
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
            set({ 
                error: 'Failed to update favorite',
                isLoading: false 
            });
            throw error; // Re-throw the error so the UI can handle it
        }
    },

    isFavorite: (resortName: string) => {
        const favorites = get().favorites;
        return favorites.includes(resortName);
    }
})); 