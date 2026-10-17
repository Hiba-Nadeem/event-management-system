
import { useCallback, useEffect, useState } from 'react';
import {
  Link,
  Routes,
  Route,
  Navigate,
  useParams,
  useNavigate,
} from 'react-router-dom';
import LoginPageComponent from './pages/LoginPage';
import { fetchEvents, fetchEventById } from './services/ticketmaster';
import './App.css';

import RegisterPage from './pages/RegisterPage';


import { useDispatch, useSelector } from 'react-redux';
import { logout } from './features/auth/authSlice';

const categories = [
  { label: 'All Events', value: '' },
  { label: 'Music', value: 'Music' },
  { label: 'Sports', value: 'Sports' },
  { label: 'Arts & Theatre', value: 'Arts & Theatre' },
  { label: 'Film', value: 'Film' },
  { label: 'Miscellaneous', value: 'Miscellaneous' },
];


function Navbar() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    navigate('/');
  }

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        EventHub
      </Link>

      <div className="nav-links">
        <Link to="/">Explore Events</Link>

        {isAuthenticated ? (
          <>
            <Link to="/my-events">My Events</Link>

            <span className="nav-user">
              Hi, {user?.name?.split(' ')[0] || 'there'}!
            </span>

            <button
              type="button"
              className="register-link"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="register-link">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}


function formatDate(dateString) {
  if (!dateString) return 'Date to be announced';

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return 'Date to be announced';

  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function EventCard({ event }) {
  const image =
    event.images?.find((item) => item.ratio === '16_9' && item.width >= 500)
      ?.url || event.images?.[0]?.url;

  const venue = event._embedded?.venues?.[0];
  const location = [venue?.city?.name, venue?.country?.name]
    .filter(Boolean)
    .join(', ');

  return (
    <article className="event-card">
      <Link
        to={`/events/${event.id}`}
        className="event-image-link"
        aria-label={`View details for ${event.name}`}
      >
        {image ? (
          <img
            src={image}
            alt={event.name}
            className="event-image"
            loading="lazy"
          />
        ) : (
          <div className="image-placeholder">EventHub</div>
        )}
      </Link>

      <div className="event-content">
        <p className="event-date">
          {formatDate(event.dates?.start?.localDate)}
        </p>

        <h3>
          <Link to={`/events/${event.id}`}>{event.name}</Link>
        </h3>

        <p className="event-venue">
          {venue?.name || 'Venue to be announced'}
        </p>

        {location && <p className="event-location">{location}</p>}

        <Link to={`/events/${event.id}`} className="details-link">
          View details <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [submittedKeyword, setSubmittedKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const loadEvents = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const result = await fetchEvents(
        submittedKeyword,
        page,
        category
      );

      setEvents(result.events);
      setTotalPages(result.totalPages);
      setTotalElements(result.totalElements);
    } catch (err) {
      setError(err.message || 'Something went wrong while loading events.');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [submittedKeyword, page, category]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  function handleSearch(event) {
    event.preventDefault();
    setPage(0);
    setSubmittedKeyword(keyword.trim());
  }

  function handleCategoryChange(value) {
    setCategory(value);
    setPage(0);
  }

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">DISCOVER YOUR NEXT EXPERIENCE</p>
          <h1>Find events worth going to.</h1>
          <p className="hero-description">
            From live music to unforgettable games, find your next
            favourite experience.
          </p>

          <form className="search-form" onSubmit={handleSearch}>
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input
              type="search"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Search concerts, artists, sports..."
              aria-label="Search events"
            />
            <button type="submit">Search events</button>
          </form>
        </div>
      </section>

      <section className="events-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">WHAT'S HAPPENING</p>
            <h2>Explore events</h2>
          </div>

          {!loading && !error && (
            <p className="results-count">
              {totalElements.toLocaleString()} events found
            </p>
          )}
        </div>

        <div className="category-list" aria-label="Filter by category">
          {categories.map((item) => (
            <button
              key={item.value || 'all'}
              type="button"
              className={`category-button ${
                category === item.value ? 'active' : ''
              }`}
              onClick={() => handleCategoryChange(item.value)}
              aria-pressed={category === item.value}
            >
              {item.label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="status-message" role="status">
            <div className="spinner" />
            <p>Finding events for you...</p>
          </div>
        )}

        {!loading && error && (
          <div className="status-message error-message" role="alert">
            <h3>We couldn't load the events.</h3>
            <p>{error}</p>
            <button type="button" onClick={loadEvents}>
              Try again
            </button>
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="status-message">
            <h3>No events found</h3>
            <p>Try another search term or choose a different category.</p>
          </div>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="event-grid">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {!loading && !error && totalPages > 1 && (
          <div className="pagination">
            <button
              type="button"
              disabled={page === 0}
              onClick={() => {
                setPage((current) => Math.max(0, current - 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Previous
            </button>

            <span>
              Page {page + 1} of {totalPages}
            </span>

            <button
              type="button"
              disabled={page + 1 >= totalPages}
              onClick={() => {
                setPage((current) => current + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Next
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

function EventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadDetails() {
      setLoading(true);
      setError('');

      try {
        const result = await fetchEventById(id);
        if (!cancelled) setEvent(result);
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Unable to load event details.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadDetails();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return <div className="status-message">Loading event details...</div>;
  }

  if (error || !event) {
    return (
      <main className="page">
        <h1>Unable to load event</h1>
        <p>{error || 'This event could not be found.'}</p>
        <button className="primary-button" onClick={() => navigate('/')}>
          Back to events
        </button>
      </main>
    );
  }

  const image = event.images?.[0]?.url;
  const venue = event._embedded?.venues?.[0];
  const location = [
    venue?.city?.name,
    venue?.state?.name,
    venue?.country?.name,
  ].filter(Boolean).join(', ');

  return (
    <main className="details-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {image && (
        <img className="details-image" src={image} alt={event.name} />
      )}

      <div className="details-content">
        <p className="eyebrow">
          {event.classifications?.[0]?.segment?.name || 'LIVE EVENT'}
        </p>
        <h1>{event.name}</h1>
        <p className="details-date">
          {formatDate(event.dates?.start?.localDate)}
          {event.dates?.start?.localTime &&
            ` · ${event.dates.start.localTime}`}
        </p>

        <h2>Event information</h2>
        <p><strong>Venue:</strong> {venue?.name || 'To be announced'}</p>
        <p><strong>Location:</strong> {location || 'To be announced'}</p>
        <p>
          <strong>Category:</strong>{' '}
          {event.classifications?.[0]?.genre?.name || 'Not specified'}
        </p>

        {event.url && (
          <a
            className="primary-button"
            href={event.url}
            target="_blank"
            rel="noreferrer"
          >
            View on Ticketmaster ↗
          </a>
        )}
      </div>
    </main>
  );
}


function MyEventsPage() {
  return (
    <SimplePage
      title="My Events"
      description="Your registered events will appear here."
    />
  );
}


function SimplePage({ title, description }) {
  return (
    <main className="page">
      <h1>{title}</h1>
      <p>{description}</p>
      <Link to="/" className="details-link">Explore events →</Link>
    </main>
  );
}

function NotFoundPage() {
  return (
    <main className="page">
      <h1>Page not found</h1>
      <Link to="/">Back to events</Link>
    </main>
  );
}

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );

  return isAuthenticated
    ? children
    : <Navigate to="/login" replace />;
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<EventsPage />} />
        <Route path="/login" element={<LoginPageComponent />} />
        <Route
          path="/register" element={<RegisterPage />} 
        />
        <Route
          path="/my-events"
          element={
            <ProtectedRoute>
              <MyEventsPage />
            </ProtectedRoute>
          }
        />
        <Route path="/events/:id" element={<EventDetailsPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
}

export default App;
