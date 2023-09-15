import React, { createContext, useContext, useState, useEffect } from 'react';
import eventData from './components/event_data.json';
import moment from 'moment';

const EventContext = createContext();

export const useEventContext = () => {
    return useContext(EventContext);
};

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState(eventData);
    const [showPastEvents, setShowPastEvents] = useState(false);
    const [selectedCities, setSelectedCities] = useState([]);
    const [selectedPlaces, setSelectedPlaces] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const addEvent = (event) => {
        setEvents([...events, event]);
    };

    const removeEvent = (eventId) => {
        setEvents(events.filter((event) => event.Id !== eventId));
    };

    const toggleShowPastEvents = () => {
        setShowPastEvents(!showPastEvents);
    };

    const handleCityToggle = (city) => {
        setSelectedCities((prevCities) => {
            if (prevCities.includes(city)) {
                return prevCities.filter((item) => item !== city);
            } else {
                return [...prevCities, city];
            }
        });
    };

    const handlePlaceToggle = (place) => {
        setSelectedPlaces((prevPlaces) => {
            if (prevPlaces.includes(place)) {
                return prevPlaces.filter((item) => item !== place);
            } else {
                return [...prevPlaces, place];
            }
        });
    };

    const handleGenreToggle = (genre) => {
        setSelectedGenres((prevGenres) => {
            if (prevGenres.includes(genre)) {
                return prevGenres.filter((item) => item !== genre);
            } else {
                return [...prevGenres, genre];
            }
        });
    };

    useEffect(() => {
        const currentDate = moment();
        const filtered = showPastEvents
            ? events.filter((event) => moment(event.EtkinlikBitisTarihi).isSameOrBefore(currentDate))
            : events.filter((event) => moment(event.EtkinlikBitisTarihi).isSameOrAfter(currentDate));

        const cityFilteredEvents = selectedCities.length === 0
            ? filtered
            : filtered.filter((event) => selectedCities.includes(event.Lokasyon));

        const placeFilteredEvents = selectedPlaces.length === 0
            ? cityFilteredEvents
            : cityFilteredEvents.filter((event) => selectedPlaces.includes(event.Mekan));

        const genreFilteredEvents = selectedGenres.length === 0
            ? placeFilteredEvents
            : placeFilteredEvents.filter((event) => selectedGenres.includes(event.Tur));

        // Arama sorgusuna göre etkinlikleri filtrele
        const searchFiltered = genreFilteredEvents.filter((event) =>
            event.Adi.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setFilteredEvents(searchFiltered);
    }, [events, showPastEvents, selectedCities, selectedPlaces, selectedGenres, searchQuery]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const filterForPlaces = (places) => {
        if (places === "") {
            const currentDate = moment();
            const filt = events.filter((event) => moment(event.EtkinlikBitisTarihi).isSameOrAfter(currentDate));
            setFilteredEvents(filt);
            return;
        }
        const placeFilteredEvents = places.length === 0
            ? filteredEvents
            : filteredEvents.filter((event) => places.includes(event.Mekan));

        setFilteredEvents(placeFilteredEvents);
    };

    const removeFilter = () => {
        const currentDate = moment();

        const filtered = showPastEvents
            ? events.filter((event) => moment(event.EtkinlikBitisTarihi).isSameOrBefore(currentDate))
            : events.filter((event) => moment(event.EtkinlikBitisTarihi).isSameOrAfter(currentDate));
        setFilteredEvents(filtered);
        setShowPastEvents(false);
        setSelectedCities([]);
        setSelectedPlaces([]);
        setSelectedGenres([]);
        setSearchQuery('');
    }


    return (
        <EventContext.Provider
            value={{
                events,
                filteredEvents,
                showPastEvents,
                addEvent,
                removeEvent,
                toggleShowPastEvents,
                handleCityToggle,
                handlePlaceToggle,
                handleGenreToggle,
                selectedCities,
                selectedPlaces,
                selectedGenres,
                handleSearch,
                filterForPlaces,
                removeFilter
            }}
        >
            {children}
        </EventContext.Provider>
    );
};
