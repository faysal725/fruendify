<script setup>
import { ref } from "vue";
import { onMounted, watchEffect } from "vue";
import { useGeolocation } from "@vueuse/core";
import { Zoom } from "vue3-toastify";
import { useAuthStore } from "~/stores/authStore";

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
  classes: {
    type: String,
    default: "w-full h-[60vh] z-10",
  },
  showMarker: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: "map-container",
  },
});

const emits = defineEmits(["setLocation"]);

const userMarker = ref({
  name: "",
  latitude: 0,
  longitude: 0,
});
const zoom = ref(13);

const nearbyMarkers = ref([]);
const authStore = useAuthStore();

const { coords } = useGeolocation();
const mainCircle = ref();

let map;
let userGeoMarker = ref();

onMounted(() => {
  var container = L.DomUtil.get(props.id);
  console.log(container);
  if (container != null) {
    container._leaflet_id = null;
  }

  // map initialization
  map = L.map(props.id).setView(
    [userMarker.value.latitude, userMarker.value.longitude],
    zoom.value
  );
  // adding tileLayer
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  // adding geocoder to map
  const { Geocoder } = leafletControlGeocoder;
  let GeocoderControl = new Geocoder({
    defaultMarkGeocode: false,
  });

  const setGeocoder = Geocoder.nominatim();

  GeocoderControl.on("markgeocode", function (e) {
    zoom.value = 5;
    userMarker.value.name = e.geocode.name;
    userMarker.value.latitude = e.geocode.center.lat;
    userMarker.value.longitude = e.geocode.center.lng;

    setTimeout(() => {
      zoom.value = 13;
      map.setView(
        [userMarker.value.latitude, userMarker.value.longitude],
        zoom.value
      );
    }, 1000);
  });
  GeocoderControl.addTo(map);

  // for more markers
  nearbyMarkers.value.forEach(({ latitude, longitude }) => {
    L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup(
        `Saved Marker at (<strong>${latitude.toFixed(2)},${longitude.toFixed(
          2
        )}</strong>)`
      );
  });

  map.addEventListener("click", (e) => {
    const { lat: latitude, lng: longitude } = e.latlng;

    userMarker.value.latitude = latitude;
    userMarker.value.longitude = longitude;

    // finding place name with lat lng
    setGeocoder.reverse(
      e.latlng,
      map.options.crs.scale(map.getZoom()),
      (results) => {
        console.log(results[0].name);
        userMarker.value.name = results[0].name;
      }
    );
  });

  setAllMarkers();
});

onMounted(() => {
  setTimeout(() => {
    setGeolocation();
  }, 100);
});

onMounted(() => {
  if (props.oldValue.latitude > 0 && props.oldValue.longitude > 0) {
    setTimeout(() => {
      userMarker.value.latitude = props.oldValue.latitude;
      userMarker.value.longitude = props.oldValue.longitude;
    }, 100);
  }
});

// set multiple marker
const setAllMarkers = () => {
  props.multipleCoords.forEach((data) => {
    let iconObject = L.icon({
      iconUrl: data.image,

      iconSize: [40, 40],
      popupAnchor: [-3, -76],
      className: "rounded-full",
    });

    L.circle([data.lat, data.lng], {
      color: "transparent",
      fillColor: "#f03",
      fillOpacity: 0.2,
      radius: 600,
    }).addTo(map);

    L.marker([data.lat, data.lng], { icon: iconObject })
      .bindPopup(`${data.name}`)
      .addTo(map);
  });
};

// set initial Geolocation
const setGeolocation = () => {
  if (
    coords.value.latitude !== Number.POSITIVE_INFINITY &&
    coords.value.longitude !== Number.POSITIVE_INFINITY
  ) {
    userMarker.value.latitude = coords.value.latitude;
    userMarker.value.longitude = coords.value.longitude;

    if (userGeoMarker.value) {
      map.removeLayer(userGeoMarker.value);
    }

    if (!props.showMarker) {
      console.log(L.featureGroup(), "feature gorup");

      // adding circle to marker
      mainCircle.value = L.circle(
        [userMarker.value.latitude, userMarker.value.longitude],
        {
          color: "transparent",
          fillColor: "#f03",
          fillOpacity: 0.2,
          radius: 800,
        }
      );
      mainCircle.value.addTo(map);

      // adding image to marker
      let iconObject = L.icon({
        iconUrl: networkImage(authStore.userDataAfterLogin.profile_image),

        iconSize: [50, 50],
        popupAnchor: [-3, -76],
        className: "rounded-full",
      });

      userGeoMarker.value = L.marker(
        [userMarker.value.latitude, userMarker.value.longitude],
        {
          icon: iconObject,
        }
      )
        .addTo(map)
        .bindPopup("Me");
    } else {
      userGeoMarker.value = L.marker([
        userMarker.value.latitude,
        userMarker.value.longitude,
      ])
        .addTo(map)
        .bindPopup("Me");
    }

    map.setView(
      [userMarker.value.latitude, userMarker.value.longitude],
      zoom.value
    );

    const el = userGeoMarker.value.getElement();
    if (el) {
      el.style.filter = "hue-rotate(120deg)";
    }
  }
};

watch(
  () => userMarker.value.latitude,
  () => {
    // console.log(userMarker.value.latitude, userMarker.value.longitude);
    // console.log(mainCircle.value);
    if (!props.showMarker) {
      mainCircle.value.setLatLng([
        userMarker.value.latitude,
        userMarker.value.longitude,
      ]);
    }

    userGeoMarker.value.setLatLng([
      userMarker.value.latitude,
      userMarker.value.longitude,
    ]);
    map.setView(
      [userMarker.value.latitude, userMarker.value.longitude],
      zoom.value
    );
    emits("setLocation", userMarker.value);
  }
);

watch(
  () => props.multipleCoords,
  () => {
    setAllMarkers();
  }
);
</script>
<template>
  <div>
    <!-- <div id="map" :style="{ height: height, width: width }"></div> -->
    <div :id="id" :class="classes"></div>
  </div>
</template>

<style>
.leaflet-control-geocoder-form > input {
  height: 40px !important;
  width: 350px !important;
}
.leaflet-control-geocoder-form > input::placeholder {
  text-align: start;
}
</style>
