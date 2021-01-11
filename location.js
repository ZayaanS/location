const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      showPosition,
      // if user denies access to there location. It runs this function
      function (err) {
        console.log(`Error ${err.code}: ${err.message}`);
      },
      {
        enableHighAccuracy: true,
      }
    );
  } else {
    console.log("geolocation is not supported");
  }
};

const showPosition = (position) => {
  console.log(position.coords.latitude, position.coords.longitude);
  fetch(
    // enter your access_key in api url
    `http://api.positionstack.com/v1/reverse?access_key=59d1e31a2c86b24426f703dcaec2ab61&query=${position.coords.latitude},${position.coords.longitude}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let display_location = document.getElementById("location");
      let addresses = [];
      data.data.map((location) => {
        console.log(location.label);
        for (x = 310; x <= 370; x++) {
          if (
            // if the addresses that is given includes one of these addresses
            location.label.includes(
              `${x} Imam Haron Road, Cape Town, South Africa`
            ) == true
          ) {
            addresses.push(location.label);
          }
        }
      });
      // if the length of given address is equal to 6 or less
      if (addresses.length >= 6) {
        display_location.innerText = "LifeChoices Office";
      } else {
        display_location.innerText = "Not in LifeChoices Office";
      }
    });
};

getLocation();