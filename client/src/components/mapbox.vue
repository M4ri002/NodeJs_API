<script setup>
import { ref, onMounted } from 'vue';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const map = ref(null);
const spinEnabled = ref(true);
const userInteracting = ref(false);

mapboxgl.accessToken = 'pk.eyJ1IjoibWFyaW8wMiIsImEiOiJjbHNxMXR6OWUweDZoMmlvOWVtZjJtMDAwIn0.q5mRNtCKJpmnMPRuhrG_XA';

const cameraOptions = {
    pitch: 90,
    zoom: 3,
    center: [100, 70],
    bearing: 0,
};

onMounted(() => {
    if (window.innerWidth <= 450) {
        cameraOptions.zoom = 2;
    }
    map.value = new mapboxgl.Map({
        container: 'map-cont',
        style: 'mapbox://styles/mapbox/satellite-v9',
        projection: 'globe',
        ...cameraOptions,
    });
    
    map.value.on('style.load', () => {
        map.value.setFog({
            color: 'rgb(26, 31, 76)', // Lower atmosphere
            'high-color': 'rgb(0, 104, 149)', // Upper atmosphere
            'horizon-blend': 0.02, // Atmosphere thickness (default 0.2 at low zooms)
            'space-color': 'rgb(11, 11, 25)', // Background color
            'star-intensity': 1 // Background star brightness (default 0.35 at low zoooms )
        });
    });

    map.value.scrollZoom.disable();

    map.value.on('mousedown', () => {
        userInteracting.value = true;
    });

    map.value.on('mouseup', () => {
        userInteracting.value = false;
        spinGlobe();
    });

    map.value.on('dragend', () => {
        userInteracting.value = false;
        spinGlobe();
    });

    map.value.on('pitchend', () => {
        userInteracting.value = false;
        spinGlobe();
    });

    map.value.on('rotateend', () => {
        userInteracting.value = false;
        spinGlobe();
    });

    map.value.on('moveend', () => {
        spinGlobe();
    });
    
    spinGlobe();
});

const spinGlobe = () => {
    if (!map.value || userInteracting.value) return;

    const zoom = map.value.getZoom();
    const secondsPerRevolution = 120;
    const maxSpinZoom = 5;
    const slowSpinZoom = 3;

    if (spinEnabled.value && zoom < maxSpinZoom) {
        let distancePerSecond = 360 / secondsPerRevolution;
        if (zoom > slowSpinZoom) {
            const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
            distancePerSecond *= zoomDif;
        }
        const center = map.value.getCenter();
        center.lng -= distancePerSecond;
        map.value.easeTo({ center, duration: 2000, easing: (n) => n });
    }
};
</script>
<template>
    <section>
        <div id="map-cont"></div>
    </section>
</template>

<style scoped lang="scss">
* {
    margin: 0;
    padding: 0;
}

section {
    #map-cont {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        z-index: 0;
    }
}
</style>
