import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";

export const getUserRole = async (user: any) => {
    const supabase = await createClient();
    const { error, data } = await supabase.rpc("get_user_role", {
        user_id: user?.id,
    });
    
    // if (error) {
    //     return encodedRedirect("error", "/sign-in", error.message);
    // }

    let role = "";
    switch (data) {
        case "admin":
            role = "admin";
            break;
        case "pharmacy":
            role = "pharmacy";
            break;
        default:
            break;
    }
    return role;
}