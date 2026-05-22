import { useMemo } from 'react';

export const useQueryParams = () => {
  return useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      m: params.get('m'),
      // 可以添加更多参数
      hasParamB: params.get('m') === 'b'
    };
  }, []);
};
