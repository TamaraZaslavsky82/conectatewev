import axios from 'axios';


export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_ID_CATEGORY = "GET_ID_CATEGORY";
export const POST_CATEGORY = "POST_CATEGORY";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const GET_CITIES = "GET_CITIES";
export const GET_ID_CITY = "GET_ID_CITY";
export const POST_CITY = "POST_CITY";
export const UPDATE_CITY = "UPDATE_CITY";
export const DELETE_CITY = "DELETE_CITY";
export const GET_EVENTS = "GET_EVENTS";
export const GET_ID_EVENT = "GET_ID_EVENT";
export const POST_EVENT = "POST_EVENT";
export const UPDATE_EVENT = "UPDATE_EVENT";
export const DELETE_EVENT = "DELETE_EVENT";
export const GET_IMAGE_BANNER = "GET_IMAGE_BANNER"
export const GET_ID_IMAGE_BANNER = "GET_ID_IMAGE_BANNER"
export const POST_IMAGE_BANNER = "POST_IMAGE_BANNER"
export const UPDATE_IMAGE_BANNER = "UPDATE_IMAGE_BANNER"
export const DELETE_IMAGE_BANNER = "DELETE_IMAGE_BANNER"
export const GET_MUNICIPALITIES = "GET_MUNICIPALITIES"
export const GET_ID_MUNICIPALITY = "GET_ID_MUNICIPALITY"
export const POST_MUNICIPALITY = "POST_MUNICIPALITY"
export const UPDATE_MUNICIPALITY = "UPDATE_MUNICIPALITY"
export const DELETE_MUNICIPALITY = "DELETE_MUNICIPALITY"
export const GET_OFFERS = "GET_OFFERS"
export const GET_ID_OFFER = "GET_ID_OFFER"
export const POST_OFFER = "POST_OFFER"
export const UPDATE_OFFER = "UPDATE_OFFER"
export const DELETE_OFFER = "DELETE_OFFER"
export const GET_PAUTA = "GET_PAUTA"
export const GET_ID_PAUTA = "GET_ID_PAUTA"
export const POST_PAUTA = "POST_PAUTA"
export const UPDATE_PAUTA = "UPDATE_PAUTA"
export const DELETE_PAUTA = "DELETE_PAUTA"
export const GET_PLACES = "GET_PLACES"
export const GET_ID_PLACE = "GET_ID_PLACE"
export const POST_PLACE = "POST_PLACE"
export const UPDATE_PLACE = "UPDATE_PLACE"
export const DELETE_PLACE = "DELETE_PLACE"
export const GET_PREMIUM_PLACE_IMG = "GET_PREMIUM_PLACE_IMG"
export const GET_ID_PREMIUM_PLACE_IMG = "GET_ID_PREMIUM_PLACE_IMG"
export const POST_PREMIUM_PLACE_IMG = "POST_PREMIUM_PLACE_IMG"
export const UPDATE_PREMIUM_PLACE = "UPDATE_PREMIUM_PLACE_IMG"
export const DELETE_PREMIUM_PLACE_IMG = "DELETE_PREMIUM_PLACE_IMG"
export const GET_PUNTOS_WIFI = "GET_PUNTOS_WIFI"
export const GET_ID_PUNTOS_WIFI = "GET_ID_PUNTOS_WIFI"
export const POST_PUNTOS_WIFI = "POST_PUNTOS_WIFI"
export const UPDATE_PUNTOS_WIFI = "UPDATE_PUNTOS_WIFI"
export const DELETE_PUNTOS_WIFI = "DELETE_PUNTOS_WIFI"
export const GET_SOCIAL_MEDIA = "GET_SOCIAL_MEDIA"
export const GET_ID_SOCIAL_MEDIA = "GET_ID_SOCIAL_MEDIA"
export const POST_SOCIAL_MEDIA = "POST_SOCIAL_MEDIA"
export const UPDATE_SOCIAL_MEDIA = "UPDATE_SOCIAL_MEDIA"
export const DELETE_SOCIAL_MEDIA = "DELETE_SOCIAL_MEDIA"
export const GET_PHARMACY_ON_DUTY = "GET_PHARMACY_ON_DUTY"
export const GET_ID_PHARMACY_ON_DUTY = "GET_ID_PHARMACY_ON_DUTY"
export const POST_PHARMACY_ON_DUTY = "POST_PHARMACY_ON_DUTY"
export const UPDATE_PHARMACY_ON_DUTY = "UPDATE_PHARMACY_ON_DUTY"
export const DELETE_PHARMACY_ON_DUTY = "DELETE_PHARMACY_ON_DUTY"
export const POST_MENSAJE = "POST_MENSAJE"
export const POST_USER_SUBSCRIPTION = "REGISTER_SUBSCRIPTION"

const categoriesURL = import.meta.env.VITE_API_CATEGORIES_URL;
const citiesURL = import.meta.env.VITE_API_CITIES_URL;
const eventsURL = import.meta.env.VITE_API_EVENTS_URL;
const imageBannerURL = import.meta.env.VITE_API_IMAGE_BANNER_URL;
const municipalitiesURL = import.meta.env.VITE_API_MUNICIPALITIES_URL;
const offersURL = import.meta.env.VITE_API_OFFERS_URL;
const pautaURL = import.meta.env.VITE_API_PAUTA_URL;
const placeURL = import.meta.env.VITE_API_PLACES_URL;
const premiumPlaceImgURL = import.meta.env.VITE_API_PREMIUM_PLACE_IMG_URL;
const puntosWifiURL = import.meta.env.VITE_API_PUNTOS_WIFI_URL;
const socialMediaURL = import.meta.env.VITE_API_SOCIAL_MEDIA_URL;
const pharmacyOnDutyURL = import.meta.env.VITE_API_PHARMACY_ON_DUTY
const messageURL = import.meta.env.VITE_API_MENSAJES
const subscriptionURL = import.meta.env.VITE_API_SUBSCRIPTION

//Actions de Categorias

export const GetCategories = () => {
    return async function (dispatch) {
        try {
            var response = await axios.get(categoriesURL);
            if (response.data !== null) {
                return dispatch({
                    type: GET_CATEGORIES,
                    payload: response.data,
                });
            } else {
                return dispatch({
                    type: GET_CATEGORIES,
                    payload: [],
                });
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const GetCategoryDetail = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${categoriesURL}?id=${id}`);
            if (response.data) {
                return dispatch({
                    type: GET_ID_CATEGORY,
                    payload: response.data,
                });
            } else {
                return dispatch({
                    type: GET_ID_CATEGORY,
                    payload: [],
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const PostCategory = (atributos) => {
    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "POST");
            f.append("category", atributos.category);
            f.append("description_category", atributos.description_category);
            var response = await axios.post(categoriesURL, f);
            console.log("Categoria creada: ", response.data);
            return dispatch({
                type: POST_CATEGORY,
                payload: response.data,
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const UpdateCategory = (id, atributos) => {
    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "PUT");
            f.append("category", atributos.category);
            f.append("description_category", atributos.description_category);
            var response = await axios.post(categoriesURL, f, { params: { id: id } });
            return dispatch({
                type: UPDATE_CATEGORY,
                payload: response.data,
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};



export const DeleteCategory = (id) => {
    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "DELETE");
            var response = await axios.post(categoriesURL, f, { params: { id: id } });
            return dispatch({
                type: DELETE_CATEGORY,
                payload: response.id,
            });
        } catch (err) {
            console.log(err);
        }
    };
};


//Actions de Cities

export const GetCities = () => {
    return async function (dispatch) {
        try {
            var response = await axios.get(citiesURL);
            if (response.data !== null) {
                return dispatch({
                    type: GET_CITIES,
                    payload: response.data,
                });
            } else {
                return dispatch({
                    type: GET_CITIES,
                    payload: [],
                });
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const GetCitiesDetail = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${citiesURL}?id=${id}`);
            if (response.data) {
                return dispatch({
                    type: GET_ID_CITY,
                    payload: response.data,
                });
            } else {
                return dispatch({
                    type: GET_ID_CITY,
                    payload: [],
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const PostCities = (atributos) => {
    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "POST");
            f.append("city", atributos.city);
            f.append("latitude", atributos.latitude);
            f.append("longitude", atributos.longitude);
            var response = await axios.post(citiesURL, f);
            console.log("Ciudad creada: ", response.data);
            return dispatch({
                type: POST_CITY,
                payload: response.data,
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const UpdateCities = (id, atributos) => {
    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "PUT");
            f.append("city", atributos.city);
            f.append("latitude", atributos.latitude);
            f.append("longitude", atributos.longitude);
            var response = await axios.post(citiesURL, f, { params: { id: id } });
            return dispatch({
                type: UPDATE_CITY,
                payload: response.data,
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};


export const DeleteCities = (id) => {
    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "DELETE");
            var response = await axios.post(citiesURL, f, { params: { id: id } });
            return dispatch({
                type: DELETE_CITY,
                payload: response.id,
            });
        } catch (err) {
            console.log(err);
        }
    };
};

//Actions de Events

export const GetEvents = () => {
    return async function (dispatch) {
        try {
            var response = await axios.get(eventsURL);
            if (response.data !== null) {
                return dispatch({
                    type: GET_EVENTS,
                    payload: response.data,
                });
            } else {
                return dispatch({
                    type: GET_EVENTS,
                    payload: [],
                });
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const GetEventsDetail = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${eventsURL}?id=${id}`);
            if (response.data) {
                return dispatch({
                    type: GET_ID_EVENT,
                    payload: response.data,
                });
            } else {
                return dispatch({
                    type: GET_ID_EVENT,
                    payload: [],
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const PostEvents = (atributos) => {
    console.log(atributos);

    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "POST");
            f.append("title", atributos.title);
            f.append("description_event", atributos.description_event);
            f.append("image_url", atributos.image_url);
            f.append("start_time", atributos.start_time);
            f.append("end_time", atributos.end_time);
            f.append("id_places", atributos.id_places);
            var response = await axios.post(eventsURL, f);
            console.log("Evento creada: ", response.data);
            return dispatch({
                type: POST_EVENT,
                payload: response.data,
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const UpdateEvents = (id, atributos) => {
    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "PUT");
            f.append("title", atributos.title);
            f.append("description_event", atributos.description_event);
            f.append("image_url", atributos.image_url);
            f.append("start_time", atributos.start_time);
            f.append("end_time", atributos.end_time);
            f.append("id_places", atributos.id_places);
            var response = await axios.post(eventsURL, f, { params: { id: id } });
            return dispatch({
                type: UPDATE_EVENT,
                payload: response.data,
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const DeleteEvents = (id) => {
    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "DELETE");
            var response = await axios.post(eventsURL, f, { params: { id: id } });
            return dispatch({
                type: DELETE_EVENT,
                payload: response.id,
            });
        } catch (err) {
            console.log(err);
        }
    };
};

//Actions de ImageBanner

export const GetImageBanner = () => {
    return async function (dispatch) {
        try {
            var response = await axios.get(imageBannerURL);
            if (response.data !== null) {
                return dispatch({
                    type: GET_IMAGE_BANNER,
                    payload: response.data,
                });
            } else {
                return dispatch({
                    type: GET_IMAGE_BANNER,
                    payload: [],
                });
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const GetImageBannerDetail = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${imageBannerURL}?id=${id}`);
            if (response.data) {
                return dispatch({
                    type: GET_ID_IMAGE_BANNER,
                    payload: response.data,
                });
            } else {
                return dispatch({
                    type: GET_ID_IMAGE_BANNER,
                    payload: [],
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const PostImageBanner = (atributos) => {
    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "POST");
            f.append("image_url", atributos.image_url);
            f.append("signature_author", atributos.signature_author);
            f.append("id_city", atributos.id_city);
            var response = await axios.post(imageBannerURL, f);
            console.log("Imagen Banner creada: ", response.data);
            return dispatch({
                type: POST_IMAGE_BANNER,
                payload: response.data,
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const UpdateImageBanner = (id, atributos) => {
    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "PUT");
            f.append("image_url", atributos.image_url);
            f.append("signature_author", atributos.signature_author);
            f.append("id_city", atributos.id_city);
            var response = await axios.post(imageBannerURL, f, { params: { id: id } });
            return dispatch({
                type: UPDATE_IMAGE_BANNER,
                payload: response.data,
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const DeleteImageBanner = (id) => {
    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "DELETE");
            var response = await axios.post(imageBannerURL, f, { params: { id: id } });
            return dispatch({
                type: DELETE_IMAGE_BANNER,
                payload: response.id,
            });
        } catch (err) {
            console.log(err);
        }
    };
};

//Action de Municipalities

export const GetMunicipalities = () => {
    return async function (dispatch) {
        try {
            var response = await axios.get(municipalitiesURL);
            if (response.data !== null) {
                return dispatch({
                    type: GET_MUNICIPALITIES,
                    payload: response.data,
                });
            } else {
                return dispatch({
                    type: GET_MUNICIPALITIES,
                    payload: [],
                });
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};


export const GetMunicipalitiesDetail = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${municipalitiesURL}?id=${id}`);
            if (response.data) {
                return dispatch({
                    type: GET_ID_MUNICIPALITY,
                    payload: response.data,
                });
            } else {
                return dispatch({
                    type: GET_ID_MUNICIPALITY,
                    payload: [],
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const PostMunicipalities = (atributos) => {
    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "POST");
            f.append("title", atributos.title);
            f.append("description_municipalities", atributos.municipalities);
            f.append("id_city", atributos.id_city);
            f.append("image_url", atributos.image_url);
            var response = await axios.post(municipalitiesURL, f);
            console.log("Municipalidad creada: ", response.data);
            return dispatch({
                type: POST_MUNICIPALITY,
                payload: response.data,
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const UpdateMunicipalities = (id, atributos) => {
    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "PUT");
            f.append("title", atributos.title);
            f.append("description_municipalities", atributos.description_municipalities);
            f.append("id_city", atributos.id_city);
            f.append("image_url", atributos.image_url);
            var response = await axios.post(municipalitiesURL, f, { params: { id: id } });
            return dispatch({
                type: UPDATE_MUNICIPALITY,
                payload: response.data,
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const DeleteMunicipalities = (id) => {
    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "DELETE");
            var response = await axios.post(municipalitiesURL, f, { params: { id: id } });
            return dispatch({
                type: DELETE_MUNICIPALITY,
                payload: response.id,
            });
        } catch (err) {
            console.log(err);
        }
    };
};

//Actions de Offers

export const GetOffers = () => {
    return async function (dispatch) {
        try {
            var response = await axios.get(offersURL);
            if (response.data !== null) {
                return dispatch({
                    type: GET_OFFERS,
                    payload: response.data,
                });
            } else {
                return dispatch({
                    type: GET_OFFERS,
                    payload: [],
                });
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};


export const GetOffersDetail = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${offersURL}?id=${id}`);
            if (response.data) {
                return dispatch({
                    type: GET_ID_OFFER,
                    payload: response.data,
                });
            } else {
                return dispatch({
                    type: GET_ID_OFFER,
                    payload: [],
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const PostOffers = (atributos) => {
    console.log(atributos);

    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "POST");
            f.append("title", atributos.title);
            f.append("description_offer", atributos.description_offer);
            f.append("image_url", atributos.image_url);
            f.append("start_time", atributos.start_time);
            f.append("end_time", atributos.end_time);
            f.append("id_places", atributos.id_places);

            var response = await axios.post(offersURL, f, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("Evento creada: ", response.data);
            return dispatch({
                type: POST_OFFER,
                payload: response.data,
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};


export const UpdateOffers = (id, atributos) => {
    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "PUT");
            f.append("title", atributos.title);
            f.append("description_offer", atributos.offer);
            f.append("start_time", atributos.start_time);
            f.append("end_time", atributos.end_time);
            f.append("id_places", atributos.id_places);
            f.append("image_url", atributos.image_url);
            var response = await axios.post(offersURL, f, { params: { id: id } });
            return dispatch({
                type: UPDATE_OFFER,
                payload: response.data,
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const DeleteOffers = (id) => {
    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "DELETE");
            var response = await axios.post(offersURLL, f, { params: { id: id } });
            return dispatch({
                type: DELETE_OFFER,
                payload: response.id,
            });
        } catch (err) {
            console.log(err);
        }
    };
};

//Actions de Pauta

export const GetPauta = () => {
    return async function (dispatch) {
        try {
            var response = await axios.get(pautaURL);
            if (response.data !== null) {
                return dispatch({
                    type: GET_PAUTA,
                    payload: response.data,
                });
            } else {
                return dispatch({
                    type: GET_PAUTA,
                    payload: [],
                });
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const GetPautaDetail = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${pautaURL}?id=${id}`);
            if (response.data) {
                return dispatch({
                    type: GET_ID_PAUTA,
                    payload: response.data,
                });
            } else {
                return dispatch({
                    type: GET_ID_PAUTA,
                    payload: [],
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const PostPauta = (atributos) => {
    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "POST");
            f.append("src_url", atributos.src_url);
            f.append("image_url", atributos.image_url);
            var response = await axios.post(pautaURL, f);
            console.log("Pauta creada: ", response.data);
            return dispatch({
                type: POST_PAUTA,
                payload: response.data,
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const UpdatePauta = (id, atributos) => {
    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "PUT");
            f.append("src_url", atributos.src_url);
            f.append("image_url", atributos.image_url);
            var response = await axios.post(pautaURL, f, { params: { id: id } });
            return dispatch({
                type: UPDATE_PAUTA,
                payload: response.data,
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const DeletePauta = (id) => {
    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "DELETE");
            var response = await axios.post(pautaURL, f, { params: { id: id } });
            return dispatch({
                type: DELETE_PAUTA,
                payload: response.id,
            });
        } catch (err) {
            console.log(err);
        }
    };
};

//Actions de Places

export const GetPlaces = () => {
    return async function (dispatch) {

        try {
            var response = await axios.get(placeURL);
            if (response.data !== null) {
                return dispatch({
                    type: GET_PLACES,
                    payload: response.data,
                });
            } else {
                return dispatch({
                    type: GET_PLACES,
                    payload: [],
                });
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

};



export const GetPlaceDetail = (id) => {
    return async function (dispatch) {
      console.log("ID recibido en GetPlaceDetail:", id); // Depuración
      try {
        const response = await axios.get(`${placeURL}?id=${id}`);
        console.log("Respuesta de la API en GetPlaceDetail:", response.data); // Depuración
        return dispatch({
          type: GET_ID_PLACE,
          payload: response.data,
        });
      } catch (err) {
        console.log("Error en GetPlaceDetail:", err);
      }
    };
  };
  

export const PostPlace = (atributos) => {
    console.log(atributos);

    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "POST");
            f.append("title", atributos.title);
            f.append("description_place", atributos.description_place);
            f.append("image_url", atributos.image_url);
            f.append("id_category", atributos.id_category);
            f.append("owner_place", atributos.owner_place);
            f.append("phone", atributos.phone);
            f.append("status_type", atributos.status_type);
            f.append("latitude", atributos.latitude);
            f.append("longitude", atributos.longitude);
            f.append("tags", atributos.tags);
            f.append("id_city", atributos.id_city);
            var response = await axios.post(placeURL, f);
            console.log("Lugar creado: ", response.data);
            return dispatch({
                type: POST_PLACE,
                payload: response.data,
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};
  

export const UpdatePlace = (id, atributos) => {
    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "PUT");
            f.append("title", atributos.title);
            f.append("description_place", atributos.description_place);
            f.append("image_url", atributos.image_url);
            f.append("id_category", atributos.id_category);
            f.append("owner_place", atributos.owner_place);
            f.append("phone", atributos.phone);
            f.append("status_type", atributos.status_type);
            f.append("latitude", atributos.latitude);
            f.append("longitude", atributos.longitude);
            f.append("tags", atributos.tags);
            f.append("id_city", atributos.id_city);
            var response = await axios.post(placeURL, f, { params: { id: id } });
            return dispatch({
                type: UPDATE_PLACE,
                payload: response.data,
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const DeletePlace = (id) => {
    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "DELETE");
            var response = await axios.post(placesURL, f, { params: { id: id } });
            return dispatch({
                type: DELETE_PLACE,
                payload: response.id,
            });
        } catch (err) {
            console.log(err);
        }
    };
};

//Actions de Premiun_place_img

export const GetPremiumPlaceImg = () => {
    return async function (dispatch) {
      try {
        const response = await axios.get(premiumPlaceImgURL);
        console.log("Respuesta de la API en GetPremiumPlaceImg:", response.data);
        if (response.data !== null) {
          return dispatch({
            type: GET_PREMIUM_PLACE_IMG,
            payload: response.data.map((img) => ({
              url_img: img.url_img,
              id_place: img.id_place, // Asegúrate de incluir id_place
            })),
          });
        } else {
          return dispatch({
            type: GET_PREMIUM_PLACE_IMG,
            payload: [],
          });
        }
      } catch (err) {
        console.error("Error en GetPremiumPlaceImg:", err);
        throw err;
      }
    };
  };
  
  
export const GetPremiumPlaceImgDetail = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${premiumPlaceImgURL}?id=${id}`);
            if (response.data) {
                return dispatch({
                    type: GET_ID_PREMIUM_PLACE_IMG,
                    payload: response.data,
                });
            } else {
                return dispatch({
                    type: GET_ID_PREMIUM_PLACE_IMG,
                    payload: [],
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const PostPremiumPlaceImg = (atributos) => {
    return async function (dispatch) {
      try {
        const f = new FormData();
        f.append("METHOD", "POST");
        f.append("url_img", atributos.url_img); // El archivo o URL de la imagen
        f.append("id_place", atributos.id_place);  // El ID del lugar
  
        const response = await axios.post(premiumPlaceImgURL, f, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        console.log("Imagen premium creada: ", response.data);
        return dispatch({
          type: POST_PREMIUM_PLACE_IMG,
          payload: response.data,
        });
      } catch (err) {
        console.error(err);
        throw err;
      }
    };
  };
  

export const UpdatePremiumPlaceImg = (id, atributos) => {
    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "PUT");
            f.append("url_img", atributos.url_img);
            f.append("id_places", atributos.id_places);
            var response = await axios.post(premiumPlaceImgURL, f, { params: { id: id } });
            return dispatch({
                type: UPDATE_PREMIUM_PLACE,
                payload: response.data,
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const DeletePremiumPlaceImg = (id) => {
    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "DELETE");
            var response = await axios.post(premiumPlaceImgURL, f, { params: { id: id } });
            return dispatch({
                type: DELETE_PREMIUM_PLACE_IMG,
                payload: response.id,
            });
        } catch (err) {
            console.log(err);
        }
    };
};

//Actiosn de Puntos Wifi

export const GetPuntosWifi = () => {
    return async function (dispatch) {
        try {
            var response = await axios.get(puntosWifiURL);
            if (response.data !== null) {
                return dispatch({
                    type: GET_PUNTOS_WIFI,
                    payload: response.data,
                });
            } else {
                return dispatch({
                    type: GET_PUNTOS_WIFI,
                    payload: [],
                });
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const GetPuntosWifiImgDetail = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${puntosWifiURL}?id=${id}`);
            if (response.data) {
                return dispatch({
                    type: GET_ID_PUNTOS_WIFI,
                    payload: response.data,
                });
            } else {
                return dispatch({
                    type: GET_ID_PUNTOS_WIFI,
                    payload: [],
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const PostPuntosWifi = (atributos) => {
    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "POST");
            f.append("latitude", atributos.latitude);
            f.append("longitude", atributos.longitude);
            f.append("id_city", atributos.id_city);
            var response = await axios.post(puntosWifiURL, f);
            console.log("Puntos Wifi creados: ", response.data);
            return dispatch({
                type: POST_PUNTOS_WIFI,
                payload: response.data,
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const UpdatePuntosWifi = (id, atributos) => {
    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "PUT");
            f.append("latitude", atributos.latitude);
            f.append("longitude", atributos.longitude);
            f.append("id_city", atributos.id_city);
            var response = await axios.post(puntosWifiURL, f, { params: { id: id } });
            return dispatch({
                type: UPDATE_PUNTOS_WIFI,
                payload: response.data,
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const DeletePuntosWifi = (id) => {
    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "DELETE");
            var response = await axios.post(puntosWifiURLL, f, { params: { id: id } });
            return dispatch({
                type: DELETE_PUNTOS_WIFI,
                payload: response.id,
            });
        } catch (err) {
            console.log(err);
        }
    };
};

//Actions de social_media

export const GetSocialMedia = () => {
    return async function (dispatch) {
        try {
            var response = await axios.get(socialMediaURL);
            if (response.data !== null) {
                return dispatch({
                    type: GET_SOCIAL_MEDIA,
                    payload: response.data,
                });
            } else {
                return dispatch({
                    type: GET_SOCIAL_MEDIA,
                    payload: [],
                });
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const GetSocialMediaDetail = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${socialMediaURL}?id=${id}`);
            if (response.data) {
                return dispatch({
                    type: GET_ID_SOCIAL_MEDIA,
                    payload: response.data,
                });
            } else {
                return dispatch({
                    type: GET_SOCIAL_MEDIA,
                    payload: [],
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const PostSocialMedia = (atributos) => {
    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "POST");
            f.append("social_media_type", atributos.social_media_type);
            f.append("id_place", atributos.id_place);
            f.append("link", atributos.link);
            var response = await axios.post(socialMediaURL, f);
            console.log("Social Media creado: ", response.data);
            return dispatch({
                type: POST_SOCIAL_MEDIA,
                payload: response.data,
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const UpdateSocialMedia = (id, atributos) => {
    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "PUT");
            f.append("social_media_type", atributos.social_media_type);
            f.append("id_places", atributos.id_places);
            f.append("link", atributos.link);
            var response = await axios.post(socialMediaURL, f, { params: { id: id } });
            return dispatch({
                type: UPDATE_SOCIAL_MEDIA,
                payload: response.data,
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const DeleteSocialMedia = (id) => {
    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "DELETE");
            var response = await axios.post(socialMediaURL, f, { params: { id: id } });
            return dispatch({
                type: DELETE_SOCIAL_MEDIA,
                payload: response.id,
            });
        } catch (err) {
            console.log(err);
        }
    };
};

//Action Pharmacy_on_duty


export const GetPharmacyOnDuty = () => {
    return async function (dispatch) {
        try {
            var response = await axios.get(pharmacyOnDutyURL);
            if (response.data !== null) {
                return dispatch({
                    type: GET_PHARMACY_ON_DUTY,
                    payload: response.data,
                });
            } else {
                return dispatch({
                    type: GET_PHARMACY_ON_DUTY,
                    payload: [],
                });
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const GetPharmacyOnDutyDetail = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${pharmacyOnDutyURL}?id=${id}`);
            if (response.data) {
                return dispatch({
                    type: GET_ID_PHARMACY_ON_DUTY,
                    payload: response.data,
                });
            } else {
                return dispatch({
                    type: GET_PHARMACY_ON_DUTY,
                    payload: [],
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const PostPharmacyOnDuty = (atributos) => {
    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "POST");
            f.append("start_time", atributos.start_time);
            f.append("id_places", atributos.id_places);
            f.append("end_time", atributos.end_time);
            f.append("id_city", atributos.id_city);
            f.append("id_category", atributos.id_category);
            f.append("title", atributos.title);
            var response = await axios.post(pharmacyOnDutyURL, f);
            console.log("Social Media creado: ", response.data);
            return dispatch({
                type: POST_PHARMACY_ON_DUTY,
                payload: response.data,
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const UpdatePharmacyOnDuty = (id, atributos) => {
    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "POST");
            f.append("start_time", atributos.start_time);
            f.append("id_places", atributos.id_places);
            f.append("end_time", atributos.end_time);
            f.append("id_city", atributos.id_city);
            f.append("id_category", atributos.id_category);
            f.append("title", atributos.title);
            var response = await axios.post(pharmacyOnDutyURL, f, { params: { id: id } });
            return dispatch({
                type: UPDATE_PHARMACY_ON_DUTY,
                payload: response.data,
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const DeletePharmacyOnDuty = (id) => {
    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "DELETE");
            var response = await axios.post(pharmacyOnDutyURL, f, { params: { id: id } });
            return dispatch({
                type: DELETE_PHARMACY_ON_DUTY,
                payload: response.id,
            });
        } catch (err) {
            console.log(err);
        }
    };
};

//mensaje

export const PostMensaje = (atributos) => {
    return async function (dispatch) {
        try {
            var f = new FormData();
            f.append("METHOD", "POST");
            f.append("nombre", atributos.nombre);
            f.append("apellido", atributos.apellido);
            f.append("telefono", atributos.telefono);
            f.append("mensaje", atributos.mensaje);
            var response = await axios.post(messageURL, f);
            console.log("Social Media creado: ", response.data);
            return dispatch({
                type: POST_MENSAJE,
                payload: response.data,
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};


//push notification
export const RegisterSubscription = (subscription) => {
    return async function (dispatch) {
        try {
            // Crear un FormData para enviar los datos de la suscripción
            var f = new FormData();
            f.append("METHOD", "POST");
            f.append("endpoint", subscription.endpoint);
            f.append("p256dh", subscription.keys.p256dh);
            f.append("auth", subscription.keys.auth);

            // Enviar la suscripción al backend
            var response = await axios.post(subscriptionURL, f);
            console.log("Suscripción registrada: ", response.data);

            // Despachar la acción con la constante POST_USER_SUBSCRIPTION
            return dispatch({
                type: POST_USER_SUBSCRIPTION,
                payload: response.data,
            });
        } catch (err) {
            console.log("Error al registrar la suscripción:", err);
            throw err;
        }
    };
};
