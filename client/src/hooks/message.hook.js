import { useCallback } from "react";
import { toast } from "react-toastify";

export const useMessage = () => {
  return useCallback((text) => {
    if (window.M && text) {
      window.M.toast({ html: text });
    } else {
      console.log('WHY DON"T WORK?', window.M);
      toast.warning(text);
    }
  }, []);
};
