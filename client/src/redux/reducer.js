const initialState = {
    categories: [],
    categoriesDetail: [],
    cities: [],
    citiesDetail: [],
    events: [],
    eventsDetail: [],
    imageBanner: [],
    imageBannerDetail: [],
    municipalities: [],
    municipalitiesDetail: [],
    offers: [],
    offersDetail: [],
    pauta: [],
    pautaDetail: [],
    places: [],
    placeDetail: [],
    premiumPlaceImg: [],
    premiumPlaceImgDetail: [],
    puntosWifi: [],
    puntosWifiDetail: [],
    socialMedia: [],
    socialMediaDetail: [],
    pharmacyOnDuty:[],
    pharmacyOnDutyDetail:[],
    mensaje:[],
    subscriptions: []

}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_CATEGORIES":
            return {
                ...state,
                categories: action.payload,
            };

        case "GET_ID_CATEGORY":
            return {
                ...state,
                categoriesDetail: action.payload,
            };

        case "POST_CATEGORY":
            return {
                ...state,
            };

        case "UPDATE_CATEGORY":
            return {
                ...state,
                categories: state.categories.map((item) => {
                    return item.id === action.payload.id ? action.payload : item;
                }),
            };

        case "DELETE_CATEGORY":
            return {
                ...state,
                categories: state.categories.filter((item) => item.id !== action.payload),
            };
        case "GET_CITIES":
            return {
                ...state,
                cities: action.payload,
            };

        case "GET_ID_CITY":
            return {
                ...state,
                citiesDetail: action.payload,
            };

        case "POST_CITY":
            return {
                ...state,
            };

        case "UPDATE_CITY":
            return {
                ...state,
                cities: state.cities.map((item) => {
                    return item.id === action.payload.id ? action.payload : item;
                }),
            };

        case "DELETE_CITY":
            return {
                ...state,
                cities: state.cities.filter((item) => item.id !== action.payload),
            };
        case "GET_EVENTS":
            return {
                ...state,
                events: action.payload,
            };

        case "GET_ID_EVENT":
            return {
                ...state,
                eventsDetail: action.payload,
            };

        case "POST_EVENT":
            return {
                ...state,
            };

        case "UPDATE_EVENT":
            return {
                ...state,
                events: state.events.map((item) => {
                    return item.id === action.payload.id ? action.payload : item;
                }),
            };

        case "DELETE_EVENT":
            return {
                ...state,
                events: state.events.filter((item) => item.id !== action.payload),
            };
        case "GET_IMAGE_BANNER":
            return {
                ...state,
                imageBanner: action.payload,
            };

        case "GET_ID_IMAGE_BANNER":
            return {
                ...state,
                imageBannerDetail: action.payload,
            };

        case "POST_IMAGE_BANNER":
            return {
                ...state,
            };

        case "UPDATE_IMAGE_BANNER":
            return {
                ...state,
                imageBanner: state.imageBanner.map((item) => {
                    return item.id === action.payload.id ? action.payload : item;
                }),
            };

        case "DELETE_IMAGE_BANNER":
            return {
                ...state,
                imageBanner: state.imageBanner.filter((item) => item.id !== action.payload),
            };
        case "GET_MUNICIPALITIES":
            return {
                ...state,
                municipalities: action.payload,
            };

        case "GET_ID_MUNICIPALITY":
            return {
                ...state,
                municipalitiesDetail: action.payload,
            };

        case "POST_MUNICIPALITY":
            return {
                ...state,
            };

        case "UPDATE_MUNICIPALITY":
            return {
                ...state,
                municipalities: state.municipalities.map((item) => {
                    return item.id === action.payload.id ? action.payload : item;
                }),
            };

        case "DELETE_MUNICIPALITY":
            return {
                ...state,
                municipalities: state.municipalities.filter((item) => item.id !== action.payload),
            };
        case "GET_OFFERS":
            return {
                ...state,
                offers: action.payload,
            };

        case "GET_ID_OFFER":
            return {
                ...state,
                offersDetail: action.payload,
            };

        case "POST_OFFER":
            return {
                ...state,
            };

        case "UPDATE_OFFER":
            return {
                ...state,
                offers: state.offers.map((item) => {
                    return item.id === action.payload.id ? action.payload : item;
                }),
            };

        case "DELETE_OFFER":
            return {
                ...state,
                offers: state.offers.filter((item) => item.id !== action.payload),
            };
        case "GET_PAUTA":
            return {
                ...state,
                pauta: action.payload,
            };

        case "GET_ID_PAUTA":
            return {
                ...state,
                pautaDetail: action.payload,
            };

        case "POST_PAUTA":
            return {
                ...state,
            };

        case "UPDATE_PAUTA":
            return {
                ...state,
                pauta: state.pauta.map((item) => {
                    return item.id === action.payload.id ? action.payload : item;
                }),
            };

        case "DELETE_PAUTA":
            return {
                ...state,
                pauta: state.pauta.filter((item) => item.id !== action.payload),
            };
        case "GET_PLACES":
            return {
                ...state,
                places: action.payload,
            };

        case "GET_ID_PLACE":
            return {
                ...state,
                placeDetail: action.payload,
            };

        case "POST_PLACE":
            return {
                ...state,
            };

        case "UPDATE_PLACE":
            return {
                ...state,
                places: state.places.map((item) => {
                    return item.id === action.payload.id ? action.payload : item;
                }),
            };

        case "DELETE_PLACE":
            return {
                ...state,
                places: state.places.filter((item) => item.id !== action.payload),
            };
        case "GET_PREMIUM_PLACE_IMG":
            return {
                ...state,
                premiumPlaceImg: action.payload,
            };

        case "GET_ID_PREMIUM_PLACE_IMG":
            return {
                ...state,
                premiumPlaceImgDetail: action.payload,
            };

        case "POST_PREMIUM_PLACE_IMG":
            return {
                ...state,
            };

        case "UPDATE_PREMIUM_PLACE_IMG":
            return {
                ...state,
                premiumPlaceImg: state.premiumPlaceImg.map((item) => {
                    return item.id === action.payload.id ? action.payload : item;
                }),
            };

        case "DELETE_PREMIUM_PLACE_IMG":
            return {
                ...state,
                premiumPlaceImg: state.premiumPlaceImg.filter((item) => item.id !== action.payload),
            };
            case "GET_PUNTOS_WIFI":
            return {
                ...state,
                puntosWifi: action.payload,
            };

        case "GET_ID_PUNTOS_WIFI":
            return {
                ...state,
                puntosWifiDetail: action.payload,
            };

        case "POST_PUNTOS_WIFI":
            return {
                ...state,
            };

        case "UPDATE_PUNTOS_WIFI":
            return {
                ...state,
                puntosWifi: state.puntosWifi.map((item) => {
                    return item.id === action.payload.id ? action.payload : item;
                }),
            };

        case "DELETE_PUNTOS_WIFI":
            return {
                ...state,
                puntosWifi: state.puntosWifi.filter((item) => item.id !== action.payload),
            };
            case "GET_SOCIAL_MEDIA":
            return {
                ...state,
                socialMedia: action.payload,
            };

        case "GET_ID_SOCIAL_MEDIA":
            return {
                ...state,
                socialMediaDetail: action.payload,
            };

        case "POST_SOCIAL_MEDIA":
            return {
                ...state,
            };

        case "UPDATE_SOCIAL_MEDIA":
            return {
                ...state,
                socialMedia: state.socialMedia.map((item) => {
                    return item.id === action.payload.id ? action.payload : item;
                }),
            };

        case "DELETE_SOCIAL_MEDIA":
            return {
                ...state,
                socialMedia: state.socialMedia.filter((item) => item.id !== action.payload),
            };
            case "GET_PHARMACY_ON_DUTY":
                return {
                    ...state,
                    pharmacyOnDuty: action.payload,
                };
    
            case "GET_ID_PHARMACY_ON_DUTY":
                return {
                    ...state,
                    pharmacyOnDutyDetail: action.payload,
                };
    
            case "POST_PHARMACY_ON_DUTY":
                return {
                    ...state,
                };
    
            case "UPDATE_PHARMACY_ON_DUTY":
                return {
                    ...state,
                    pharmacyOnDuty: state.pharmacyOnDuty.map((item) => {
                        return item.id === action.payload.id ? action.payload : item;
                    }),
                };
    
            case "DELETE_PHARMACY_ON_DUTY":
                return {
                    ...state,
                    pharmacyOnDuty: state.pharmacyOnDuty.filter((item) => item.id !== action.payload),
                };
                case "POST_MENSAJE":
                    return {
                        ...state,
                    };

                    case POST_USER_SUBSCRIPTION:
                        return {
                            ...state,
                            subscriptions: [...state.subscriptions, action.payload],
                        };














        default:
            return { ...state };
    }
};

export default rootReducer;