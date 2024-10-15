<script setup>
import { ref } from "vue";
import { useProfileStore } from "~~/stores/profileStore";
import { EyeSlashIcon } from "@heroicons/vue/24/outline";
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/vue/24/solid";
import { onMounted, watchEffect } from "vue";
import { useGeolocation, useMediaQuery } from "@vueuse/core";
import { Zoom } from "vue3-toastify";
import { useAuthStore } from "~/stores/authStore";
import { useCrud } from "~~/composables/base";
import { MarkerCluster } from "leaflet.markercluster";
import "leaflet-providers";

import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

const props = defineProps({
  oldValue: {
    type: Object,
    default: {
      name: "",
      latitude: 0,
      longitude: 0,
    },
  },
  height: {
    type: String,
    default: "400px",
  },

  width: {
    type: String,
    default: "500px",
  },
  multipleCoords: {
    type: Array,
    default: [],
  },
  onZoomEvent: {
    type: Boolean,
    default: false,
  },
  classes: {
    type: String,
    default: "w-full h-[60vh] z-0",
  },
  showMarker: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: "map-container",
  },
  enableSearch: {
    type: Boolean,
    default: false,
  },
  clickable: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["setLocation", "sendIdToModal"]);

// api

// store
const profileStore = useProfileStore();

// crud
const crud = useCrud();

const userMarker = ref({
  name: "",
  city: "",
  country: "",
  latitude: 0,
  longitude: 0,
});
const router = useRouter();

const errorMsg = ref(props.error);
const zoom = ref(13);

const nearbyMarkers = ref([]);

const markerCluster = ref();
const provider = ref();
const authStore = useAuthStore();

const { coords, error } = useGeolocation();

const mainCircle = ref();

let map = ref();
let userGeoMarker = ref();

let GeocoderControl = ref();

const isLargeScreen = useMediaQuery("(min-width: 1024px)");
const isMediumScreen = useMediaQuery("(min-width: 768px)");
const isSmallScreen = useMediaQuery("(max-width: 640px)");

const places = ref([]);

function initilization() {
  var container = L.DomUtil.get(props.id);
  if (container != null) {
    container._leaflet_id = null;
  }

  // map initialization
  map.value = L.map(props.id, {
    dragging: true, // Disable dragging
    tap: true,
    touchZoom: true,
  }).setView(
    [userMarker.value.latitude, userMarker.value.longitude],
    zoom.value
  );

  // adding tileLayer
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map.value);

  // provider.value = new L.TileLayer()

  console.log(L.TileLayer.provider);
  // add Stamen Watercolor to map.
  // L.TileLayer.Provider('Stadia.StamenWatercolor').addTo(map.value);

  // L.tileLayer
  //   .provider("Jawg.Streets", {
  //     variant: "default",
  //     accessToken:
  //       "7ygUaYGrWTTMs4dIwJwt2lvUVmfoMvflO4jsoGTLubwvOiFVrkSQjKUgiNvdUtxh",
  //   })
  //   .addTo(map.value);

  L.tileLayer(
    "https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=7ygUaYGrWTTMs4dIwJwt2lvUVmfoMvflO4jsoGTLubwvOiFVrkSQjKUgiNvdUtxh",
    {}
  ).addTo(map.value);

  if (props.onZoomEvent) {
    map.value.on("zoomend", function () {
      // Your code here
      var currentZoomLevel = map.value.getZoom();
      console.log("Zoom level:", currentZoomLevel);

      // Example: Perform actions based on zoom level
      // if (currentZoomLevel >= 15) {
      //     // Add a marker or other layer
      //     L.marker([51.5, -0.09]).addTo(map);
      // }
    });
  }

  // adding geocoder to map

  const { Geocoder } = leafletControlGeocoder;
  GeocoderControl.value = new Geocoder({
    defaultMarkGeocode: false,

    placeholder: "Search for a resturants",
    initial: false,
    collapsed: false,
  });

  let setGeocoder = Geocoder.nominatim();

  // GeocoderControl.value.on("startsuggest", function (e) {
  //   console.log(e, 'suggents')
  // })

  GeocoderControl.value.on("markgeocode", function (e) {
    zoom.value = 5;
    console.log(e.geocode);

    userMarker.value.name = e.geocode.properties.name;
    userMarker.value.road = e.geocode.properties.address.road;
    userMarker.value.city = e.geocode.properties.address.city;
    userMarker.value.country = e.geocode.properties.address.country;
    userMarker.value.latitude = e.geocode.center.lat;
    userMarker.value.longitude = e.geocode.center.lng;

    settingLocationOnSearch(userMarker.value);

    setTimeout(() => {
      zoom.value = 13;
      map.value.setView(
        [userMarker.value.latitude, userMarker.value.longitude],
        zoom.value
      );
    }, 1000);
  });
  if (props.enableSearch) {
    GeocoderControl.value.addTo(map.value);
  }

  // for more markers
  nearbyMarkers.value.forEach(({ latitude, longitude }) => {
    L.marker([latitude, longitude])
      .addTo(map.value)
      .bindPopup(
        `Saved Marker at (<strong>${latitude.toFixed(2)},${longitude.toFixed(
          2
        )}</strong>)`
      );
  });

  map.value.addEventListener("click", (e) => {
    const { lat: latitude, lng: longitude } = e.latlng;

    userMarker.value.latitude = latitude;
    userMarker.value.longitude = longitude;

    // finding place name with lat lng
    if (props.enableSearch) {
      setGeocoder.reverse(
        e.latlng,
        map.value.options.crs.scale(map.value.getZoom()),
        (results) => {
          userMarker.value.name = results[0].name;
        }
      );
    }
  });

  map.value.addEventListener("touchstart", (e) => {
    const { lat: latitude, lng: longitude } = e.latlng;

    userMarker.value.latitude = latitude;
    userMarker.value.longitude = longitude;

    // finding place name with lat lng
    if (props.enableSearch) {
      setGeocoder.reverse(
        e.latlng,
        map.value.options.crs.scale(map.value.getZoom()),
        (results) => {
          userMarker.value.name = results[0].name;
        }
      );
    }
  });

  map.value.addEventListener("touchmove", (e) => {
    const { lat: latitude, lng: longitude } = e.latlng;

    userMarker.value.latitude = latitude;
    userMarker.value.longitude = longitude;

    // finding place name with lat lng
    if (props.enableSearch) {
      setGeocoder.reverse(
        e.latlng,
        map.value.options.crs.scale(map.value.getZoom()),
        (results) => {
          userMarker.value.name = results[0].name;
        }
      );
    }
  });

  map.value.addEventListener("touchend", (e) => {
    const { lat: latitude, lng: longitude } = e.latlng;

    userMarker.value.latitude = latitude;
    userMarker.value.longitude = longitude;

    // finding place name with lat lng
    if (props.enableSearch) {
      setGeocoder.reverse(
        e.latlng,
        map.value.options.crs.scale(map.value.getZoom()),
        (results) => {
          userMarker.value.name = results[0].name;
        }
      );
    }
  });

  setAllMarkers();
}

// Create a custom component
const popupComponent = ref(L.DomUtil.create("div", "custom-component"));

// set multiple marker
const setAllMarkers = () => {
  markerCluster.value = new L.MarkerClusterGroup();

  props.multipleCoords.forEach((data) => {
    let iconObject = L.icon({
      iconUrl: "https://i.ibb.co/3pDYmLp/location-pin.png",

      iconSize: [40, 40],
      popupAnchor: [-3, -76],
      className: "rounded-full",
    });

    // L.circle([data.lat, data.lng], {
    //   color: "transparent",
    //   fillColor: "#f03",
    //   fillOpacity: 0.2,
    //   radius: 600,
    // }).addTo(map);

    // L.marker([data.lat, data.lng], { icon: iconObject })
    //   .bindPopup(`${data.name}`)
    //   .addTo(map);

    let singleMarker = L.marker([data.lat, data.lng], { icon: iconObject });

    // let singleMarker = L.marker([data.lat, data.lng]);

    // changed code for multple coords
    singleMarker.on("click", onClick);
    singleMarker.on("mouseover", showTooltip);
    singleMarker.on("mouseout", closeTooltip);

    singleMarker.bindPopup(popupComponent.value);

    // hover event of marker
    // open popup
    function showTooltip(e) {
      popupComponent.value.innerHTML = `
      <div class="relative">
        <div class="w-64 h-64  flex  justify-start  items-end gap-y-2 relative rounded-lg overflow-hidden" >

          <img src="${networkImage(
            data.allData.thumbnail ? data.allData.thumbnail : data.image
          )}" class="h-64 w-full  bg-no-repeat object-cover absolute top-0 right-0" />
          
          <span class="absolute z-10 top-0 right-0 w-full h-full bg-slate-800/50"></span>


          <div class="z-20 w-full h-full px-2 flex flex-col">
              <div class="flex flex-wrap">
                ${data.allData.category.map(
                  (dt) =>
                    '<p class="bg-white p-1 px-2 capitalize w-fit text-primary font-normal flex items-center gap-1 rounded-full border border-primary text-xs">' +
                    dt.title +
                    "</p>"
                )}
              </div>
            

            <div class="mt-auto">

              <div class="flex">
                ${data.allData.language.map(
                  (dt) =>
                    '<p class="bg-white p-1 px-2 capitalize w-fit text-primary font-normal flex items-center gap-1 rounded-full border border-primary text-xs">' +
                    dt.title +
                    "</p>"
                )}
              </div>
              <p class="text-sm font-semibold text-white capitalize h-1 ">
              ${data.allData.title}
              </p>  
              <div class="flex justify-between h-10">
                <p class="flex items-center gap-1 text-xs text-white">
                ${"Date: " + data.allData.event_date}
                </p>
                <p class="flex items-center gap-1 text-xs text-white">
                ${data.allData.city}
                </p>
              </div>
            </div>          
          </div>
        
          </div>
      </div>`;

      this.openPopup();
    }
    // close popup
    function closeTooltip(e) {
      this.closePopup();
    }

    // click event of marker
    function onClick(e) {
      console.log(
        isSmallScreen.value,
        isMediumScreen.value,
        isLargeScreen.value
      );
      if (isSmallScreen.value) {
        emits("sendIdToModal", data._id);
      } else {
        if (isMediumScreen.value && !isLargeScreen.value) {
          emits("sendIdToModal", data._id);
        } else {
          router.push("/events/" + data._id + "/details");
        }
      }
    }
    // changed code for multple coords

    markerCluster.value.addLayer(singleMarker);

    map.value.addLayer(markerCluster.value);
  });
};

// set initial Geolocation
const setGeolocation = () => {
  userMarker.value.latitude = props.oldValue.latitude;
  userMarker.value.longitude = props.oldValue.longitude;

  if (userGeoMarker.value) {
    map.value.removeLayer(userGeoMarker.value);
  }

  // old code
  // userGeoMarker.value = L.marker([
  //   userMarker.value.latitude,
  //   userMarker.value.longitude,
  // ])
  //   .addTo(map.value)
  //   .bindPopup("Me");

  // new code
  let userIconObject = L.icon({
    iconUrl: "https://i.ibb.co/LCXmZyR/location2.png",

    iconSize: [30, 45],
    popupAnchor: [-3, -76],
    className: "rounded-full text-red-500",
  });

  let marker = L.marker(
    [userMarker.value.latitude, userMarker.value.longitude],
    {
      icon: userIconObject,
    }
  )
    .addTo(map.value)
    .bindPopup("Me");

  userGeoMarker.value = marker;
  // new code

  map.value.setView(
    [userMarker.value.latitude, userMarker.value.longitude],
    zoom.value
  );

  const el = userGeoMarker.value.getElement();
  if (el) {
    el.style.filter = "hue-rotate(120deg)";
  }
};



const settingLocationOnSearch = (addressData) => {
  // Get the parent div element by its class
  const geocoderForm = document.querySelector(".leaflet-control-geocoder-form");

  // Get the input element within the parent div
  const inputElement = geocoderForm.querySelector("input");

  // Now you can use the input element as needed
  console.log(inputElement.value, "asdfsdf", addressData); // Access the input value
  inputElement.value = addressData.name + ", " + addressData.city; // Set a new value
};

const addingEventListenerOnSearch = () => {
  // Get the parent div element by its class
  const geocoderForm = document.querySelector(".leaflet-control-geocoder-form");

  // Get the input element within the parent div
  const inputElement = geocoderForm.querySelector("input");

  // console.log(inputElement);

  // Add event listener
  inputElement.addEventListener("input", async function (event) {
    // Check for the desired key (e.g., Enter)
    places.value = [];
    const { Geocoder } = leafletControlGeocoder;

    let geocoderControl = new Geocoder();
    // geocoderControl.geocode()
    console.log(geocoderControl);
    geocoderControl.options.geocoder.geocode(
      inputElement.value,
      function (result) {
        places.value = [...result];
        // if (places.value > 0) {
        console.log(places.value.length);
        addingListChields(places.value);
        // }
      }
    );
  });
};

function addingListChields(data) {
  const element = document.querySelector(
    ".leaflet-control-geocoder-alternatives"
  );

  element.classList.add(
    "max-h-36",
    "overflow-y-scroll",
    "scrollbar-style",
    "relative",
    "md:h-full",
    "md:max-h-full"
  );

  if (element.firstChild && data.length == 0) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
  if (data.length == 0) {
    console.log(data.length, "inside");
    element.classList.add("leaflet-control-geocoder-alternatives-minimized");
    // element.removeChild(element.firstChild);
    return;
  }

  element.classList.remove("leaflet-control-geocoder-alternatives-minimized");
  data.map((placeData) => {
    // console.log(placeData);
    const listItem = document.createElement("li");
    listItem.classList.add("address-item");
    listItem.innerHTML = placeData.html;

    element.appendChild(listItem);
    listItem.onclick = function () {
      zoom.value = 5;

      userMarker.value.name = placeData.properties.name;
      userMarker.value.road = placeData.properties.address.road;
      userMarker.value.city = placeData.properties.address.city;
      userMarker.value.country = placeData.properties.address.country;
      userMarker.value.latitude = placeData.center.lat;
      userMarker.value.longitude = placeData.center.lng;

      settingLocationOnSearch(userMarker.value);

      setTimeout(() => {
        zoom.value = 13;
        map.value.setView(
          [userMarker.value.latitude, userMarker.value.longitude],
          zoom.value
        );
      }, 1000);

      element.classList.add("leaflet-control-geocoder-alternatives-minimized");
    };
  });
}

onMounted(() => {
  if (L.marker) {
    initilization();
  }
});

onMounted(() => {
  if (props.oldValue.latitude !== 0 && props.oldValue.longitude !== 0) {
    setTimeout(() => {
      userMarker.value.latitude = props.oldValue.latitude;
      userMarker.value.longitude = props.oldValue.longitude;
      userMarker.value.city = props.oldValue.city;
      userMarker.value.country = props.oldValue.country;
      userMarker.value.name = props.oldValue.name;
      emits("setLocation", props.oldValue);
    }, 100);
  }
});

onMounted(() => {
  setTimeout(() => {
    setGeolocation();
  }, 100);

  // setGeolocation();
  // if (
  //   coords.value.latitude !== Number.POSITIVE_INFINITY &&
  //   coords.value.longitude !== Number.POSITIVE_INFINITY
  // ) {
  //   console.log(coords.value.latitude, coords.value.longitude, 'asdfsdf');
  // }
});

onMounted(() => {
  if (props.enableSearch) {
    addingEventListenerOnSearch();
  }
});

watch(
  () => userMarker.value.latitude,
  () => {
    // console.log(userMarker.value.latitude, userMarker.value.longitude);
    // console.log(mainCircle.value);
    // if (!props.showMarker) {
    //   mainCircle.value.setLatLng([
    //     userMarker.value.latitude,
    //     userMarker.value.longitude,
    //   ]);
    // }

    // problematic code (usermarker.value) becomes undefined

    userGeoMarker.value.setLatLng([
      userMarker.value.latitude,
      userMarker.value.longitude,
    ]);
    map.value.setView(
      [userMarker.value.latitude, userMarker.value.longitude],
      zoom.value
    );
    emits("setLocation", userMarker.value);
  }
);

watch(
  () => props.oldValue.latitude,
  () => {
    setTimeout(() => {
      userMarker.value.latitude = props.oldValue.latitude;
      userMarker.value.longitude = props.oldValue.longitude;
      userMarker.value.city = props.oldValue.city;
      userMarker.value.country = props.oldValue.country;
      userMarker.value.name = props.oldValue.name;
    }, 100);
  }
);

watch(
  () => props.multipleCoords,
  () => {
    setAllMarkers();
  }
);

watch(
  () => props.error,
  () => {
    errorMsg.value = props.error;
  }
);

watch(
  () => coords.value.latitude,
  () => {
    if (
      coords.value.latitude !== Number.POSITIVE_INFINITY &&
      coords.value.longitude !== Number.POSITIVE_INFINITY
    ) {
      setGeolocation();
    }
  }
);
</script>
<template>
  <div class="">
    <div>
      <p class="text-sm text-red-600">{{ errorMsg }}</p>
    </div>

    <!-- {{ coords.latitude }}

    {{ coords.longitude }} -->
    <!-- <button class="bg-red-500" @click="resetMap()">Reset</button> -->
    <div :id="id" :class="classes"></div>
  </div>
</template>

<style>
.leaflet-top {
  width: 100%;
}
.leaflet-control-geocoder {
  width: 100%;
  margin: 0px !important;
  padding-bottom: 20px;
  border: none !important;
}
.leaflet-control-geocoder-icon {
  display: none !important;
}
.leaflet-control-geocoder-form {
  width: 100%;
  border: 1px solid rgb(197, 193, 193);
  padding-top: 12px !important;
  padding-bottom: 12px !important;
  padding-left: 12px;
  border-radius: 3px;
}
.leaflet-control-geocoder-alternatives {
  width: 100%;
  border: 1px solid darkgray;
  font-style: italic;
  background: #fff3e8;
  font-size: 12px;
  border-radius: 0px 0px 5px 5px;
}
.leaflet-control-geocoder-alternatives > li {
  transition-property: all;
  transition-duration: 0.2s;
}
.leaflet-control-geocoder-alternatives > li:hover {
  background: #ff774d;
}

.leaflet-control-geocoder-alternatives > li:hover > a {
  color: white !important;
}

.leaflet-control-geocoder-form > input {
  height: 20px !important;
  width: 100% !important;
  font-size: 14px;
}
.leaflet-control-geocoder-form > input::placeholder {
  text-align: start;
}

#event-create-map {
  z-index: 0;
}
</style>
