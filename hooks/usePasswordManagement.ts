import { useState, useEffect } from 'react';
import { ListPagination, PasswordGroup, PasswordItemType } from '@/interfaces';
import { usePasswordStore } from '@/store';
import { showToast } from '@/utils';

const LIMIT = 10;

export const usePasswordManagement = () => {
  const {
    getPasswords,
    getGroupedPasswords,
    searchPasswords,
    getRecentPasswords,
    isLoading,
    recentPasswords,
  } = usePasswordStore();

  const [groupedPassword, setGroupedPassword] = useState<PasswordGroup[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [state, setState] = useState<ListPagination<PasswordItemType>>({
    docs: [],
    page: 1,
    hasNextPage: false,
    listRefreshing: false,
  });

  const getAllPasswords = async (page = 1) => {
    setState((prev) => ({
      ...prev,
      listRefreshing: true,
    }));

    try {
      const response = searchText
        ? await searchPasswords({ page, limit: LIMIT, searchTerm: searchText })
        : await getPasswords({ page, limit: LIMIT });

      if (response?.docs) {
        setState((prev) => ({
          ...prev,
          docs: page === 1 ? response.docs : [...prev.docs, ...response.docs],
          page: response.hasNextPage ? page + 1 : prev.page,
          hasNextPage: response.hasNextPage,
          listRefreshing: false,
        }));
      }
    } catch (error) {
      console.error('Error fetching passwords:', error);
      setState((prev) => ({ ...prev, listRefreshing: false }));
    }
  };

  const getAllGroupedPasswords = async () => {
    try {
      const response = await getGroupedPasswords();
      if (response.result) {
        setGroupedPassword(response.result);
      }
    } catch (error) {
      showToast({
        type: 'error',
        text1: `Error: , ${error}`,
      });
    }
  };

  const handleRefresh = async () => {
    setState((prev) => ({ ...prev, listRefreshing: true }));
    await Promise.all([
      getAllGroupedPasswords(),
      getAllPasswords(1),
      getRecentPasswords(),
    ]);
    setState((prev) => ({ ...prev, listRefreshing: false }));
  };

  useEffect(() => {
    getAllGroupedPasswords();
    getRecentPasswords();
  }, []);

  useEffect(() => {
    getAllPasswords(1);
  }, [searchText]);

  useEffect(() => {
    getAllPasswords(1);

    return () => {
      setState({ ...state, docs: [], page: 1, hasNextPage: false });
    };
  }, []);

  return {
    groupedPassword,
    searchText,
    setSearchText,
    state,
    isLoading,
    recentPasswords,
    handleRefresh,
  };
}; 