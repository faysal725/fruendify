
<script setup>
import { ref } from 'vue'
const zoom = ref(6)

var popup = L.popup();
let center = ref([47.21322, -1.559482])
function onMapClick(e) {
    console.log(popup._latlng)
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        
}
</script>

<template>
    <div style="height:100vh; width:100vw">
      <LMap
        ref="map"
        :zoom="zoom"
        :center="center"
        @click="onMapClick"
      >
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
          layer-type="base"
          name="OpenStreetMap"
        />
      </LMap>
    </div>
  </template>
  

  
  <style>
  body {
    margin: 0;
  }
  </style>
  