
const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY;

export async function fetchEvents(
  keyword = '',
  page = 0,
  category = ''
) {
  if (!API_KEY) {
    throw new Error(
      'Ticketmaster API key is missing. Check your .env file.'
    );
  }

  const params = new URLSearchParams({
    apikey: API_KEY,
    size: '12',
    page: String(page),
    sort: 'date,asc',
    startDateTime: new Date()
      .toISOString()
      .replace(/\.\d{3}Z$/, 'Z'),
  });

  if (keyword.trim()) {
    params.set('keyword', keyword.trim());
  }

  if (category) {
    params.set('classificationName', category);
  }

  const response = await fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?${params}`
  );

  if (!response.ok) {
    throw new Error(
      `Unable to fetch events. Status: ${response.status}`
    );
  }

  const data = await response.json();

  return {
    events: data._embedded?.events ?? [],
    totalPages: data.page?.totalPages ?? 0,
    totalElements: data.page?.totalElements ?? 0,
  };
}

export async function fetchEventById(id) {
  if (!API_KEY) {
    throw new Error(
      'Ticketmaster API key is missing. Check your .env file.'
    );
  }

  const params = new URLSearchParams({ apikey: API_KEY });

  const response = await fetch(
    `https://app.ticketmaster.com/discovery/v2/events/${encodeURIComponent(id)}.json?${params}`
  );

  if (!response.ok) {
    throw new Error(
      `Unable to fetch event details. Status: ${response.status}`
    );
  }

  return response.json();
}
