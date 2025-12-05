let map;
let searchParams = {
  lat: 0,
  lng: 0,
  radius: 10,
  city: '',
};

window.initMaps = function () {
  
  const partnerLocatorBlock = document.querySelector('.er-locations');
  const partnersMap = document.querySelector('.er-locations__map');
  const partnerLocatorList = document.querySelector('.er-locations__list');
  const partnerLocatorToggleMap = document.querySelector(
    '#er-locations-toggle-map'
  );
  const partnerLocatorToggleList = document.querySelector(
    '#er-locations-toggle-list'
  );
  const partnerLocatorRadiusButtonsContainer = document.querySelector(
    '.er-locations__radius-buttons'
  )
  const partnerLocatorRadiusButtons = document.querySelectorAll(
    '.er-locations__radius-button'
  )
  const partnerLocatorInput = document.querySelector(
    '.er-locations__search-input'
  );
  const partnerLocatorGeolocate = document.querySelector(
    '.er-locations__geolocate'
  );
  const partnerLocatorResultCounter = document.querySelector(
    '.er-locations__results-count'
  );
  const partnerLocatorButton = document.querySelector('.er-locations__submit');
  
  if (partnersMap) {
    map = initMap(partnersMap);
  }

  if (partnerLocatorInput) {
    initPartnerLocator(partnerLocatorInput, map);

    if (partnerLocatorInput && partnerLocatorInput.value.trim() !== '') {
      const geocoder = new google.maps.Geocoder();
      document.body.classList.add('autocomplete-suppress');
      geocoder.geocode({ address: partnerLocatorInput.value }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();
          searchParams.lat = lat;
          searchParams.lng = lng;

          checkSubmitButtonEnable();
          if (map) map.setCenter({ lat, lng });
          partnerLocatorButton.click();
        }
      });
    }
  }

  if (partnerLocatorToggleMap) {
    partnerLocatorToggleMap.addEventListener('click', () => {
      partnerLocatorToggleMap.classList.add('active');
      partnerLocatorToggleList.classList.remove('active');
      partnerLocatorBlock.dataset.mode = 'map';
    });
  }

  if (partnerLocatorToggleList) {
    partnerLocatorToggleList.addEventListener('click', () => {
      partnerLocatorToggleList.classList.add('active');
      partnerLocatorToggleMap.classList.remove('active');      
      partnerLocatorBlock.dataset.mode = 'list';
    });
  }

  if (partnerLocatorRadiusButtons) {
    partnerLocatorRadiusButtons.forEach((button) => {
      button.addEventListener('click', () => {
        partnerLocatorRadiusButtons.forEach((btn) => { 
          btn.classList.remove('active');
        })
        button.classList.add('active');
        searchParams.radius = parseInt(button.dataset.radius);
        checkSubmitButtonEnable();
      });
    });
  }    

  const geolocateOptions = {
    maximumAge: 60000,
    timeout: 5000,
    enableHighAccuracy: true,
  };

  if (partnerLocatorGeolocate) {
    partnerLocatorGeolocate.addEventListener('click', () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (pos) {
            //You have your locaton here
            map.setCenter({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });

            searchParams.lat = pos.coords.latitude;
            searchParams.lng = pos.coords.longitude;

            checkSubmitButtonEnable();

            const geocoder = new google.maps.Geocoder();
            const latlng = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            };
            geocoder.geocode({ location: latlng }, (results, status) => {
              if (status === 'OK') {
                if (results[0]) {
                  partnerLocatorInput.value = results[0].formatted_address;
                } else {
                  console.log('No results found');
                }
              } else {
                console.log('Geocoder failed due to: ' + status);
              }
            });
          },
          function (error) {
            console.log('Geolocate error!', error.code, error.message);
          },
          geolocateOptions
        );
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    });
  }

  function checkSubmitButtonEnable() {
    if(searchParams.lat && searchParams.lng && searchParams.radius) {
      partnerLocatorButton.disabled = false;
    } else {
      partnerLocatorButton.disabled = true;
    }
  }

  function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }

  function initPartnerLocator(input, map) {
    if (input) {
      
      input.addEventListener('focus', () => {
        document.body.classList.remove('autocomplete-suppress');
      });

      const options = {
        componentRestrictions: { country: ['be', 'de'] },
        strictBounds: false,
      };
      
      const autocomplete = new google.maps.places.Autocomplete(input, options);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        searchParams.lat = lat;
        searchParams.lng = lng;

        const addressComponents = place.address_components;
        searchParams.city = addressComponents.find((component) => component.types[0] === 'locality').long_name;

        checkSubmitButtonEnable();
        
        map.setCenter({
          lat: lat,
          lng: lng,
        });

      });
    }

    if (partnerLocatorButton) {
      partnerLocatorButton.addEventListener('click', () => {
        google.maps.event.trigger(input, 'focus', {});

        partnerLocatorBlock.classList.remove('er-locations--init');
        partnerLocatorBlock.classList.add('er-locations--loading');

        partnerLocatorList.innerHTML = '';
        let listHtml = '';

        // Prepare data for POST
        const formData = new FormData();
        formData.append('action', 'search_locations');
        formData.append('nonce', locationSearchAjax.nonce); // nonce localized from PHP
        formData.append('lat', searchParams.lat);
        formData.append('lng', searchParams.lng);
        formData.append('radius', searchParams.radius);
        formData.append('city', searchParams.city);

        // Send AJAX request
        fetch(locationSearchAjax.ajax_url, {
          method: 'POST',
          body: formData,
          credentials: 'same-origin'
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // data.data is the array of locations
            if(data.data.length) {
              data.data.forEach((location) => {
                listHtml += `
                  <div class="er-locations__item"
                  data-title="${location.title}"
                  data-street="${location.street}"
                  data-street="${location.postcode}"
                  data-street="${location.city}"
                  data-lat="${location.lat}"
                  data-lng="${location.lng}"
                  data-phone="${location.phone}"
                  data-website="${location.website}"
                  data-email="${location.email}"
                  >
                    <div class="er-locations__item-icon"></div>
                    <div class="er-locations__item-content">
                      <h4 class="er-locations__item-title">${location.title}</h4>
                      <p class="er-locations__item-address">${location.street}<br>${location.postcode}<br>${location.city}</p>
                      <div class="er-locations__item-contact">` +
                        (location.phone ? `<a class="er-locations__item-phone" href="tel:${location.phone}">${location.phone}</a>` : '' ) +
                        (location.email ? `<a class="er-locations__item-email" href="mailto:${location.email}">${location.email}</a>` : '') +
                        (location.website ? `<a class="er-locations__item-website" href="${location.website}" target="_blank">${location.website}</a>` : '') +
                      `</div>
                    </div>
                  </div>
                `;
              });
              partnerLocatorList.innerHTML = listHtml; 
              setTimeout(() => {
                refreshMarkers(map);
                centerMap(map);
              }, 100);              
              //showPartnersWithinRadius(searchParams.lat, searchParams.lng, searchParams.radius);
              partnerLocatorBlock.classList.remove('er-locations--empty');
            } else {
              partnerLocatorBlock.classList.add('er-locations--empty');
              partnerLocatorList.innerHTML = listHtml;
            }

            partnerLocatorResultCounter.innerHTML = data.data.length;

            setTimeout(() => {
              partnerLocatorBlock.classList.remove('er-locations--loading');
            }, 2000);
            
            // Render your map markers here
          } else {
            alert('Location search error');
          }
        })
        .catch(error => {
          console.error('AJAX error:', error);
          alert('AJAX error');
        });

      });
    }
  }

  function initMap(el) {
    let locations = document.querySelectorAll('.er-locations__item');

    let mapArgs = {
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    let map = new google.maps.Map(el, mapArgs);

    map.markers = [];

    return map;
  }

  function refreshMarkers(map) {
    let locations = document.querySelectorAll('.er-locations__item');


    // remove all markers from map
    for (let i = 0; i < map.markers.length; i++) {
      map.markers[i].setMap(null);
    }
    map.markers = [];

    locations.forEach((location) => {
      initMarker(location, map);
    });
  }

  function initMarker(markerEl, map) {
    var lat = markerEl.getAttribute('data-lat');
    var lng = markerEl.getAttribute('data-lng');

    if (!lat || !lng) {
      return;
    }

    var bounds = {
      north: 53.55,   // Germany’s northernmost latitude
      south: 47.30,   // Belgium’s southernmost latitude
      east: 15.03,    // Germany’s easternmost longitude
      west: 2.53      // Belgium’s westernmost longitude
    };

    if (
      parseFloat(lat) < bounds.south ||
      parseFloat(lat) > bounds.north ||
      parseFloat(lng) < bounds.west ||
      parseFloat(lng) > bounds.east
    ) {
      return;
    }

    var latLng = {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    };

    const icon = {
      url: '/wp-content/themes/hello-theme-child/dist/icons/google_maps_pin.svg',
      scaledSize: new google.maps.Size(30, 30), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0), // anchor
    };

    // const iconActive = {
    //   url: '/wp-content/themes/enerix/icons/map-pin-active.png',
    //   scaledSize: new google.maps.Size(20, 20), // scaled size
    //   origin: new google.maps.Point(0, 0), // origin
    //   anchor: new google.maps.Point(0, 0), // anchor
    // };

    var marker = new google.maps.Marker({
      partnerId: markerEl.dataset.partnerId,
      position: latLng,
      map: map,
      content: markerEl.innerHTML,
      icon: icon,
    });

    if (markerEl.innerHTML) {
      var infowindow = new google.maps.InfoWindow({
        partnerId: markerEl.dataset.partnerId,
        content: markerEl.innerHTML,
      });

      marker.infowindow = infowindow;

      google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
        //marker.setIcon(iconActive);
      });

      google.maps.event.addListener(infowindow, 'closeclick', function () {
        //marker.setIcon(icon);
      });
    }

    map.markers.push(marker);
  }

  // function centerOnPartner(map, partnerId) {
  //     let iconCenterActive = {
  //         url: '/wp-content/themes/enerix/icons/map-pin-active.png',
  //         scaledSize: new google.maps.Size(20, 20), // scaled size
  //         origin: new google.maps.Point(0, 0), // origin
  //         anchor: new google.maps.Point(0, 0) // anchor
  //     };

  //     map.markers.forEach(function (marker) {
  //         if (marker.partnerId == partnerId) {
  //             marker.setIcon(iconCenterActive);
  //             map.setCenter(marker.position);
  //             map.setZoom(12);
  //             marker.infowindow.open(map, marker);
  //         }
  //     });
  // }

  function centerMap(map) {
    var bounds = new google.maps.LatLngBounds();
    map.markers.forEach(function (marker) {
      bounds.extend({
        lat: marker.position.lat(),
        lng: marker.position.lng(),
      });
    });

    if (map.markers.length == 1) {
      map.setZoom(15); // set a default zoom for single marker
      map.setCenter(bounds.getCenter());
    } else {
      map.fitBounds(bounds, 50); // add padding

      // Optional: limit max zoom after fitBounds
      google.maps.event.addListenerOnce(map, 'bounds_changed', function () {
        const MIN_ZOOM = 9;
        if (map.getZoom() < MIN_ZOOM) {
          map.setZoom(MIN_ZOOM);
        }
      });
    }
  }
};
