import { useState, useEffect, useRef, useCallback } from 'react';

export interface PageVisibilityState {
  isPageVisible: boolean;
  hasLeftPage: boolean;
  hasReturned: boolean;
}

const VISIBILITY_STORAGE_KEY = 'page_visibility_state';
const INSTALL_CLICKED_KEY = 'install_clicked';
const INSTALL_TIMESTAMP_KEY = 'install_timestamp';

// 时间窗口：点击安装按钮后30秒内返回认为是有效返回
const RETURN_TIME_WINDOW = 30000;

export const usePageVisibility = () => {
  const [state, setState] = useState<PageVisibilityState>({
    isPageVisible: true,
    hasLeftPage: false,
    hasReturned: false
  });

  const wasHiddenRef = useRef(false);
  const returnCheckRef = useRef<number | null>(null);

  // 从 localStorage 恢复状态，然后清除返回状态确保每次进来都是A面
  useEffect(() => {
    try {
      const saved = localStorage.getItem(VISIBILITY_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState(prev => ({
          ...prev,
          hasLeftPage: parsed.hasLeftPage || false,
          hasReturned: parsed.hasReturned || false
        }));
      }
    } catch (e) {
      // 静默处理错误
    }

    // 清除返回状态，确保每次进入页面都是A面
    const clearState = () => {
      setState({
        isPageVisible: true,
        hasLeftPage: false,
        hasReturned: false
      });
      localStorage.removeItem(VISIBILITY_STORAGE_KEY);
      localStorage.removeItem(INSTALL_CLICKED_KEY);
      localStorage.removeItem(INSTALL_TIMESTAMP_KEY);
      wasHiddenRef.current = false;
    };

    clearState();
  }, []);

  // 检查用户是否在时间窗口内返回
  const checkUserReturned = useCallback(() => {
    try {
      const installClicked = localStorage.getItem(INSTALL_CLICKED_KEY) === 'true';
      if (!installClicked) return false;

      const timestampStr = localStorage.getItem(INSTALL_TIMESTAMP_KEY);
      if (!timestampStr) return false;

      const timestamp = parseInt(timestampStr, 10);
      const now = Date.now();
      const timeDiff = now - timestamp;

      // 如果在时间窗口内，认为用户已返回
      if (timeDiff <= RETURN_TIME_WINDOW && timeDiff > 0) {
        return true;
      }
    } catch (e) {
      // 静默处理错误
    }
    return false;
  }, []);

  // 处理用户返回逻辑
  const handleUserReturn = useCallback(() => {
    if (checkUserReturned()) {
      setState(prev => {
        if (prev.hasReturned) return prev; // 避免重复设置
        return {
          ...prev,
          hasReturned: true,
          isPageVisible: true,
          hasLeftPage: true
        };
      });

      // 清除标记
      try {
        localStorage.removeItem(INSTALL_CLICKED_KEY);
        localStorage.removeItem(INSTALL_TIMESTAMP_KEY);
      } catch (e) {
        // 静默处理错误
      }

      // 停止定时检查
      if (returnCheckRef.current) {
        clearInterval(returnCheckRef.current);
        returnCheckRef.current = null;
      }
    }
  }, [checkUserReturned]);

  // 标记用户已点击安装按钮
  const markInstallClicked = useCallback(() => {
    try {
      localStorage.setItem(INSTALL_CLICKED_KEY, 'true');
      localStorage.setItem(INSTALL_TIMESTAMP_KEY, Date.now().toString());
    } catch (e) {
      // 静默处理错误
    }

    // 启动定时检查（兼容方案，特别是针对 FB in-app 浏览器）
    if (returnCheckRef.current) {
      clearInterval(returnCheckRef.current);
    }

    let checkCount = 0;
    const maxChecks = RETURN_TIME_WINDOW / 500; // 最多检查次数

    returnCheckRef.current = window.setInterval(() => {
      checkCount++;

      // 检查页面是否可见/获得焦点
      const isVisible = !document.hidden && document.visibilityState === 'visible';
      const hasFocus = document.hasFocus();

      if (isVisible || hasFocus) {
        // 页面重新获得焦点，检查是否在时间窗口内
        handleUserReturn();
      }

      // 超过最大检查次数或时间窗口，停止检查
      if (checkCount >= maxChecks) {
        if (returnCheckRef.current) {
          clearInterval(returnCheckRef.current);
          returnCheckRef.current = null;
        }
      }
    }, 500); // 每500ms检查一次
  }, [handleUserReturn]);

  // visibilitychange 事件处理
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // 页面变为可见时检查用户是否返回
        handleUserReturn();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleUserReturn]);

  // focus 事件处理（针对 FB in-app 浏览器）
  useEffect(() => {
    const handleFocus = () => {
      // 页面获得焦点时检查用户是否返回
      handleUserReturn();
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [handleUserReturn]);

  // pageshow 事件处理（针对 bfcache）
  useEffect(() => {
    const handlePageShow = () => {
      // 无论是从缓存恢复还是正常加载都检查
      handleUserReturn();
    };

    window.addEventListener('pageshow', handlePageShow);

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, [handleUserReturn]);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (returnCheckRef.current) {
        clearInterval(returnCheckRef.current);
        returnCheckRef.current = null;
      }
    };
  }, []);

  // 清除返回状态
  const clearReturnedState = useCallback(() => {
    const newState: PageVisibilityState = {
      hasReturned: false,
      hasLeftPage: false,
      isPageVisible: true
    };
    setState(newState);
    wasHiddenRef.current = false;

    try {
      localStorage.removeItem(INSTALL_CLICKED_KEY);
      localStorage.removeItem(INSTALL_TIMESTAMP_KEY);
    } catch (e) {
      // 静默处理错误
    }
  }, []);

  // 重置状态
  const resetState = useCallback(() => {
    const newState: PageVisibilityState = {
      isPageVisible: true,
      hasLeftPage: false,
      hasReturned: false
    };
    setState(newState);
    wasHiddenRef.current = false;

    try {
      localStorage.removeItem(INSTALL_CLICKED_KEY);
      localStorage.removeItem(INSTALL_TIMESTAMP_KEY);
    } catch (e) {
      // 静默处理错误
    }
  }, []);

  return {
    ...state,
    resetState,
    clearReturnedState,
    markInstallClicked
  };
};
