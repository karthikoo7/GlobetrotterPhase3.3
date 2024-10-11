//code snippet for map usage in the show page
//center defines the coordinates for the location in map

mapboxgl.accessToken = mapToken;

    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90(longitude and latitude)
        zoom: 9, // starting zoom
        style: 'mapbox://styles/mapbox/streets-v11'//style of map , {replace streets-v11 by dark-v11 to see other type of maps}check documentation
    });

    const marker = new mapboxgl.Marker({color: "red"}) //to create a new marker displayed on map location
    .setLngLat(listing.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({offset:25}).setHTML(
        `<h4>${listing.title}</h4><p>Exact location displayed after booking...</p>`)) // add popup
    .addTo(map);