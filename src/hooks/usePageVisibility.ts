import { useCallback, useEffect, useRef, useState } from 'react';

export interface PageVisibilityState {
  isPageVisible: boolean;
  hasLeftPage: boolean;
  hasReturned: boolean;
}

const VISIBILITY_STORAGE_KEY = 'page_visibility_state';
const INSTALL_CLICKED_KEY = 'install_clicked';
const INSTALL_TIMESTAMP_KEY = 'install_timestamp';
const RETURN_TIME_WINDOW = 30000;

const initialState: PageVisibilityState = {
  isPageVisible: true,
  hasLeftPage: false,
  hasReturned: false,
};

export const usePageVisibility = () => {
  const [state, setState] = useState<PageVisibilityState>(initialState);
  const wasHiddenRef = useRef(false);
  const returnCheckRef = useRef<number | null>(null);

  useEffect(() => {
    localStorage.removeItem(VISIBILITY_STORAGE_KEY);
    localStorage.removeItem(INSTALL_CLICKED_KEY);
    localStorage.removeItem(INSTALL_TIMESTAMP_KEY);
    wasHiddenRef.current = false;
  }, []);

  const stopReturnCheck = useCallback(() => {
    if (returnCheckRef.current) {
      window.clearInterval(returnCheckRef.current);
      returnCheckRef.current = null;
    }
  }, []);

  const checkUserReturned = useCallback(() => {
    try {
      const installClicked = localStorage.getItem(INSTALL_CLICKED_KEY) === 'true';
      const timestampStr = localStorage.getItem(INSTALL_TIMESTAMP_KEY);

      if (!installClicked || !timestampStr) {
        return false;
      }

      const timeDiff = Date.now() - Number.parseInt(timestampStr, 10);
      return timeDiff <= RETURN_TIME_WINDOW && timeDiff > 0;
    } catch {
      return false;
    }
  }, []);

  const handleUserReturn = useCallback(() => {
    if (!checkUserReturned()) {
      return;
    }

    setState((prev) => {
      if (prev.hasReturned) {
        return prev;
      }

      return {
        ...prev,
        hasReturned: true,
        isPageVisible: true,
        hasLeftPage: true,
      };
    });

    try {
      localStorage.removeItem(INSTALL_CLICKED_KEY);
      localStorage.removeItem(INSTALL_TIMESTAMP_KEY);
    } catch {
      // localStorage can be unavailable in restricted browser contexts.
    }

    stopReturnCheck();
  }, [checkUserReturned, stopReturnCheck]);

  const markInstallClicked = useCallback(() => {
    try {
      localStorage.setItem(INSTALL_CLICKED_KEY, 'true');
      localStorage.setItem(INSTALL_TIMESTAMP_KEY, Date.now().toString());
    } catch {
      // localStorage can be unavailable in restricted browser contexts.
    }

    stopReturnCheck();

    let checkCount = 0;
    const maxChecks = RETURN_TIME_WINDOW / 500;

    returnCheckRef.current = window.setInterval(() => {
      checkCount += 1;

      const isVisible = !document.hidden && document.visibilityState === 'visible';
      const hasFocus = document.hasFocus();

      if (isVisible || hasFocus) {
        handleUserReturn();
      }

      if (checkCount >= maxChecks) {
        stopReturnCheck();
      }
    }, 500);
  }, [handleUserReturn, stopReturnCheck]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        handleUserReturn();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleUserReturn]);

  useEffect(() => {
    window.addEventListener('focus', handleUserReturn);

    return () => {
      window.removeEventListener('focus', handleUserReturn);
    };
  }, [handleUserReturn]);

  useEffect(() => {
    window.addEventListener('pageshow', handleUserReturn);

    return () => {
      window.removeEventListener('pageshow', handleUserReturn);
    };
  }, [handleUserReturn]);

  useEffect(() => stopReturnCheck, [stopReturnCheck]);

  const clearReturnedState = useCallback(() => {
    setState(initialState);
    wasHiddenRef.current = false;

    try {
      localStorage.removeItem(INSTALL_CLICKED_KEY);
      localStorage.removeItem(INSTALL_TIMESTAMP_KEY);
    } catch {
      // localStorage can be unavailable in restricted browser contexts.
    }
  }, []);

  const resetState = useCallback(() => {
    setState(initialState);
    wasHiddenRef.current = false;

    try {
      localStorage.removeItem(INSTALL_CLICKED_KEY);
      localStorage.removeItem(INSTALL_TIMESTAMP_KEY);
    } catch {
      // localStorage can be unavailable in restricted browser contexts.
    }
  }, []);

  return {
    ...state,
    resetState,
    clearReturnedState,
    markInstallClicked,
  };
};
