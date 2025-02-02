import { createClient } from '@supabase/supabase-js'



export const getPlacesByUser = async () => {
    const supabase = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_API_KEY
    );

    const { data, error } = await supabase.from("places").select(`id, place_id, name, created_at, formatted_address, lat, lng`)

    if (error) {
        console.error('error fetching places')
        throw error
    } else {
        console.log('data: ', data)
    }

    return data
}