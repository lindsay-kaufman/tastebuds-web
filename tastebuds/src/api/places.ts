import { createClient } from '@supabase/supabase-js'



export const getPlacesByUser = async () => {
    const supabase = createClient(
        import.meta.env.SUPABASE_URL || "https://vjxjiroyhxuuqygtzjmt.supabase.co",
        import.meta.env.SUPABASE_API_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqeGppcm95aHh1dXF5Z3R6am10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwOTcxODcsImV4cCI6MjA1MzY3MzE4N30.oG8kkIuAvvGEjuZB3NfIpUgXMqvENF4OxAhEfjWEG0Q"
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