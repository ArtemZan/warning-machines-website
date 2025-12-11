import { useEffect, useState } from 'react';
import { fetchContent } from '../lib/api';
import { fallbackContent } from '../data';
import type { SiteContent } from '../types';

type ContentState = {
  content: SiteContent;
  loading: boolean;
  error?: string;
};

export function useContent(): ContentState {
  const [state, setState] = useState<ContentState>({
    content: fallbackContent,
    loading: true,
  });

  useEffect(() => {
    let mounted = true;
    fetchContent()
      .then((content) => {
        if (mounted) {
          setState({ content, loading: false });
        }
      })
      .catch((err) => {
        if (mounted) {
          setState({
            content: fallbackContent,
            loading: false,
            error: err.message || 'Unable to load content',
          });
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return state;
}

