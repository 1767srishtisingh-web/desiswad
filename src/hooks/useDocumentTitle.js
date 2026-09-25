import { useEffect } from 'react';

/** Per-route <title> and meta description, so shared links read correctly. */
export function useDocumentTitle(title, description) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      const tag = document.querySelector('meta[name="description"]');
      if (tag) tag.setAttribute('content', description);
    }
  }, [title, description]);
}
