import { useEffect } from "react";
import { useAuth } from "./use-auth.js";
import { useRouter } from "next/router";

export function useRequireAuth(redirectUrl = '/authentication/login'){
  const auth = useAuth();
  const router = useRouter();
  
  // If auth.user is false that means we're not
  // logged in and should redirect.
  useEffect(() => {
    if (auth.user === false){
      router.push(redirectUrl);
    }else if(auth.currentSeason === ''){
      auth.setSeasons();
    }
  }, [auth]);
  return auth;
}