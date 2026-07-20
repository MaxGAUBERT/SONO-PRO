import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://rwgnkapiexjfyosiqjnu.supabase.co';
const supabaseKey = 'sb_publishable_R_QJnc7QI6sY-5-sPkzXUA_fbkOy0qm';

export const supabase = createClient(supabaseUrl, supabaseKey);