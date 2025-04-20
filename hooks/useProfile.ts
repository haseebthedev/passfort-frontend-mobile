import { useState, useEffect } from 'react';
import { PasswordGroup } from '@/interfaces';
import { useAuthStore, usePasswordStore } from '@/store';
import { showToast } from '@/utils';
import { profilePicture } from '@/assets';
import { Screens } from '@/enums';
import { router } from 'expo-router';

export const useProfile = () => {
  const { user } = useAuthStore();
  const { getGroupedPasswords, isLoading } = usePasswordStore();
  const [groupedPassword, setGroupedPassword] = useState<PasswordGroup[]>([]);

  const userInfo = {
    name: user?.name ?? "N/A",
    email: user?.email ?? "N/A",
    country: user?.country ?? "N/A",
  };

  const profileImage = user?.profilePicture
    ? { uri: user?.profilePicture }
    : profilePicture

      const handleEditProfile = () => router.push(Screens.EditProfile);
    

  const getAllGroupedPasswords = async () => {
    try {
      const response = await getGroupedPasswords();
      response.result && setGroupedPassword(response.result);
    } catch (error) {
      showToast({
        type: "error",
        text1: `Error: ${error}`,
      });
    }
  };

  useEffect(() => {
    getAllGroupedPasswords();
  }, []);

  return {
    userInfo,
    profileImage,
    groupedPassword,
    isLoading,
    handleEditProfile
  };
}; 