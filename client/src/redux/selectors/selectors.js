import { createSelector } from "reselect";

//Seleccion de todos los lugares

export const selectPlaces = (state) => state.places;
export const selectOffers = (state) => state.offers;
export const selectCities = (state) => state.cities;


//Orden de todos los lugares en orden alfabetico

export const selectSorterPlaces = createSelector([selectPlaces], (places) => places.sort((a, b) => a.title.localeCompare(b.title)))

export const selectSorterOffers = createSelector([selectOffers], (offers) => offers.sort((a, b) => a.title.localeCompare(b.title)))

export const selectSorterCities = createSelector([selectCities], (cities) => cities.sort((a, b) => a.city.localeCompare(b.city)));


