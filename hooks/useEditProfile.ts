import { useState, useEffect } from 'react';
import { ImageSourcePropType } from 'react-native';
import { TranslationLanguageCodeMap } from 'react-native-country-picker-modal';
import { useAuthStore } from '@/store';
import { EditProfileI } from '@/interfaces';
import { editProfileValidationSchema, uploadImageToBackend, showToast } from '@/utils';
import { router } from 'expo-router';
import { useFormikHook } from './useFormik';
import { profilePicture } from '@/assets';

export const useEditProfile = () => {
  const { user, editProfile, isLoading } = useAuthStore();

  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [profileImage, setProfileImage] = useState<ImageSourcePropType>();
  const [selectedImage, setSelectedImage] = useState<ImageSourcePropType>();
  const [disableSaveButton, setDisableSaveButton] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<TranslationLanguageCodeMap | string>('');
  const [dateModalVisible, setDateModalVisible] = useState<boolean>(false);
  const [imagePickerVisible, setImagePickerVisible] = useState<boolean>(false);
  const [countryModalVisible, setCountryModalVisible] = useState<boolean>(false);

  const validationSchema = editProfileValidationSchema;
  const initialValues: EditProfileI = {
    name: user?.name ?? '',
    dateOfBirth: user?.dateOfBirth ?? '',
  };

  useEffect(() => {
    if (user?.dateOfBirth) {
      handleDateChange(new Date(user.dateOfBirth));
    }
  }, []);

  useEffect(() => {
    if (user?.country) {
      setSelectedCountry(user?.country);
    }
  }, [user]);

  useEffect(() => {
    if (user?.profilePicture) {
      setProfileImage({ uri: user.profilePicture });
    } else {
      setProfileImage(profilePicture);
    }
  }, [user]);

  const handleProfileUpdate = async (values: EditProfileI) => {
    setDisableSaveButton(true);

    try {
      let updatedPicture: string | null = null;
      if (selectedImage) {
        updatedPicture = await uploadImageToBackend(selectedImage);
      }

      const dataToBeUpdate: EditProfileI = {
        name: values.name,
        country: selectedCountry,
      };

      if (dateOfBirth !== null) {
        dataToBeUpdate.dateOfBirth = dateOfBirth;
      }

      if (updatedPicture) {
        dataToBeUpdate.profilePicture = updatedPicture;
      }

     await editProfile(dataToBeUpdate);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      showToast({
        type: 'error',
        text1: `Error while updating user data: ${errorMessage}`,
      });
    } finally {
      setDisableSaveButton(false);
    }
  };

  const {
    handleChange,
    handleSubmit,
    setFieldTouched,
    errors,
    touched,
    values,
  } = useFormikHook(handleProfileUpdate, validationSchema, initialValues);

  const handleDateChange = (selectedDate?: Date) => {
    setDateModalVisible(false);
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  const handleCancel = () => router.back();

  return {
    // State
    dateOfBirth,
    profileImage,
    selectedImage,
    disableSaveButton,
    selectedCountry,
    dateModalVisible,
    imagePickerVisible,
    countryModalVisible,
    isLoading,
    errors,
    touched,
    values,

    // Setters
    setDateOfBirth,
    setProfileImage,
    setSelectedImage,
    setDateModalVisible,
    setImagePickerVisible,
    setCountryModalVisible,
    setSelectedCountry,

    // Handlers
    handleCancel,
    handleChange,
    handleSubmit,
    setFieldTouched,
    handleDateChange,
  };
}; 