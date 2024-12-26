//Formulario base  eventos 

export const eventFormData = {
  title: '',
  description_event: '',
  image_url: '',
  start_time: '',
  end_time: '',
  id_places: ''
}

export const citiesFormData = {
  city: '',
  latitude: '',
  longitude: ''
}

export const placesFormData = {
  title: '',
  description_place: '',
  image_url: '',
  id_category: '',
  owner_place: '',
  phone: '',
  status_type: '',
  latitude: '',
  longitude: '',
  tags: '',
  id_city: ''
}

export const offersFormData = {
  title: '',
  description_offer: '',
  image_url: '',
  start_time: '',
  end_time: '',
  id_places: ''
}

export const imageBannerFormData = {
  image_url : '',
  signature_author: '',
  id_city: ''
}



// subir imagenes a react y devolver url

export const uploadImageToCloudinary = async (file) => {
  console.log(file);
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", import.meta.env.VITE_API_UPLOAD_PRESET);

  const response = await fetch(import.meta.env.VITE_API_CLOUDINARY_URL, {
    method: "POST",
    body: data,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image to Cloudinary");
  }

  const result = await response.json();
  console.log(result);

  return result.secure_url;
};