import { debounce } from 'lodash';

export const FLICKR_API_DEBOUNCED_MS = 1000;

export const FLICKR_API_MAX_LIMIT = 100;

export const FLICKR_API_URL = "https://api.flickr.com/services/rest/";

// We use debounce to prevent people from accidentally spamming this.
// https://lodash.com/docs/4.17.15#debounce
export const search = debounce(async (apiKey, tags, limit, onResponse) => {
  // Prevent from requesting more than FLICKR_API_MAX_LIMIT
  limit = limit || 1;
  limit = Math.min(limit, FLICKR_API_MAX_LIMIT);

  // https://www.flickr.com/services/api/flickr.photos.search.html
  const url = new URL(FLICKR_API_URL);
  url.searchParams.append("method", "flickr.photos.search");
  url.searchParams.append("api_key", apiKey);
  url.searchParams.append("tags", tags);
  url.searchParams.append("per_page", limit);
  url.searchParams.append("format", "json");
  url.searchParams.append("nojsoncallback", 1);

  const res = await fetch(url);
  const data = await res.text();
  const json = JSON.parse(data);
  onResponse(json);
}, FLICKR_API_DEBOUNCED_MS, { leading: true, trailing: true });
