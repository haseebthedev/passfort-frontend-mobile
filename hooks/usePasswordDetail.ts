import { useState, useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import * as Clipboard from "expo-clipboard";
import { PasswordItemType } from '@/interfaces';
import { usePasswordStore } from '@/store';
import { showToast } from '@/utils';
import { Share } from 'react-native';
import { Screens } from '@/enums';

export const usePasswordDetail = () => {
  const { item } = useLocalSearchParams<{ item?: string }>();
  const { isLoading, deletePassword, getPasswordById } = usePasswordStore();
  const [passwordDetail, setPasswordDetail] = useState<PasswordItemType | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const passwordItem = typeof item === 'string' ? JSON.parse(item) : null;

  const refreshPasswordData = async () => {
    if (!passwordItem?.id) return;

    try {
      setIsRefreshing(true);
      const updatedData = await getPasswordById(passwordItem.id);
      if (updatedData) {
        setPasswordDetail(updatedData);
      }
    } catch (err) {
      showToast({
        type: 'error',
        text1: `Error refreshing password data: ${err}`,
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const getPasswordItemById = async () => {
    try {
      if (passwordItem?.id) {
        const res = await getPasswordById(passwordItem.id);
        setPasswordDetail(res);
      }
    } catch (err) {
      showToast({
        type: 'error',
        text1: `${err}`,
      });
    }
  };

  useEffect(() => {
    if (passwordItem?.id) {
      getPasswordItemById();
    }
  }, [passwordItem?.id]);

  const handleDeletePassword = async () => {
    try {
      if (passwordDetail) {
        await deletePassword(passwordDetail.id);
        router.back()
      }
    } catch (err) {
      showToast({
        type: 'error',
        text1: `Error deleting password: ${err}`,
      });
    }
  };

  const handleSharePassword = async () => {
    if (!passwordDetail) return;
   
    const shareContent = {
      title: "Password Details",
      message: `Platform: ${passwordDetail.platform || "N/A"}
${passwordDetail.siteAddress ? `Site: ${passwordDetail.siteAddress}` : ""}
${passwordDetail.username ? `Username: ${passwordDetail.username}` : ""}
Password: ${passwordDetail.passwordText || "N/A"}`,
    };
   
    try {
      await Share.share(shareContent);
    } catch (error) {
      showToast({
        type: "error",
        text1: `Error sharing password details: , ${error}`,
      });
    }
  };

  const handleEditPassword = async () => {
    router.push({
      pathname: Screens.CreatePassword,
      params: { passwordItem: JSON.stringify(passwordDetail) },
    });
  };

  const handleCopyToClipboard = () => {
    if (passwordDetail?.passwordText) {
      Clipboard.setStringAsync(passwordDetail.passwordText);
    }
  };

  return {
    passwordDetail,
    isLoading,
    isRefreshing,
    refreshPasswordData,
    handleDeletePassword,
    handleSharePassword,
    handleEditPassword,
    handleCopyToClipboard
  };
};