import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { shallowEqual } from "react-redux";
import { setCredentials } from "@/features/auth/authSlice";
import { useGetUserDetailsQuery } from "@/services/auth/authService"; // Import your API query hook

const useUserDetails = () => {
  const dispatch = useAppDispatch();

  const authState = useAppSelector((state: any) => state.auth, shallowEqual);
  const isLoggedIn = useAppSelector((state: any) => state.auth.isLoggedIn);

  const { data, error, refetch } = useGetUserDetailsQuery("userDetails", {
    refetchOnMountOrArgChange: true,
    skip: !authState.token,
  });

  useEffect(() => {
    if (authState.token && data) {
      dispatch(setCredentials(data));
    }
    if (error) {
      console.error("Error fetching user details: ", error);
    }
  }, [authState.token, data, dispatch, error]);

  return {
    data,
    error,
    isLoggedIn,
    refetch,
  };
};

export default useUserDetails;
