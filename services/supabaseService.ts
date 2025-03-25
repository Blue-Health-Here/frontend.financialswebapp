import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";

export const updatePassword = async (values: any) => {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: values.newPassword
    });

    if (error) {
      toast.error(error.message);
      throw new Error(error.message);
    }

    toast.success('Password updated successfully!');
  } catch (error: any) {
    toast.error('Failed to update password');
    throw new Error('Failed to update password');
  }
};

export const verifyOldPassword = async (password: string) => {
  const supabase = createClient();
  try {
    // Reauthenticate user with their old password
    const { data, error } = await supabase.auth.signInWithPassword({
      email: (await supabase.auth.getUser()).data.user?.email || '',
      password: password
    });

    if (error) {
      throw new Error('Incorrect password. Please try again.');
    }

    return true;
  } catch (error) {
    throw new Error('Verification failed. Please try again.');
  }
};