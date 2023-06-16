console.log("Hello World");

window.onload = function (event) {
  citizenApi.list();
};

let citizenApi = {
  list: citizenList,
  edit: bindCitizenWithCallback,
  view: bindCitizenWithCallback,
  delete: deleteCitizen,
};

function getBaseUrl() {
  let baseUrl = document.getElementById("baseUrl");
  return baseUrl.value;
}

function getHeaders() {
  return {
    Accept: "application/json",
  };
}

function citizenList() {
  if (document.title !== "Citizens") {
    return;
  }
  display("citizenView", "none");
  display("citizenDetails", "block");
  display("citizenEdit", "none");

  let baseUrl = document.getElementById("baseUrl");
  let url = getBaseUrl() + "/citizens";
  citizenListByUrl(url, _citizenDelete);
}

function citizenListByUrl(url, deleteAction) {
  var tableBody = document
    .getElementById("citizensTable")
    .querySelector("tbody");
  tableBody.innerHTML = "";

  // Fetch citizen data from API
  let baseUrl = document.getElementById("baseUrl");
  console.log(baseUrl.value);
  fetch(url, {
    method: "GET",
    headers: getHeaders(),
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error retrieving citizen data.");
      }
    })
    .then(function (citizens) {
      // Populate the table with citizen data
      var tableBody = document
        .getElementById("citizensTable")
        .querySelector("tbody");
      citizens.forEach(function (citizen) {
        var row = document.createElement("tr");
        row.innerHTML = `
                    <td>${citizen.id}</td>
                    <td>${citizen.name}</td>
                    <td>${citizen.city}</td>
                    <td>${citizen.doesCount}</td>
                    <td>${citizen.vaccinationStatus}</td>
                    <td>${citizen.center?.name}</td>
                    <td> 
                    <button id="${citizen.id}" onclick="_citizenView(event)">View</button>
                    <button id="${citizen.id}" onclick="_citizenEdit(event)">Edit</button>
                    <button id="${citizen.id}" onclick="${deleteAction.name}(event)">Delete</button>
                    </td>
                `;
        tableBody.appendChild(row);
      });
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}
function bindCitizenWithCallback(id, callback) {
  let baseUrl = document.getElementById("baseUrl");
  console.log(baseUrl.value);
  fetch(baseUrl.value + "/citizens/" + id, {
    method: "GET",
    headers: getHeaders(),
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error deleting citizen data.");
      }
    })
    .then(function (data) {
      console.log(data);
      callback(data);
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}

function deleteCitizen(id, callback) {
  let baseUrl = document.getElementById("baseUrl");
  console.log(baseUrl.value);
  fetch(baseUrl.value + "/citizens/" + id, {
    method: "DELETE",
    headers: getHeaders(),
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error deleting citizen data.");
      }
    })
    .then(function (data) {
      console.log(data);
      callback();
    })
    .catch(function (error) {
      console.error("Error:", error);
      citizenApi.list();
    });
}

function _layoutCitizenOnEdit(citizen) {
  let baseUrl = document.getElementById("baseUrl");
  console.log(baseUrl.value);
  fetch(baseUrl.value + "/vaccinationcenter", {
    method: "GET",
    headers: getHeaders(),
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error deleting citizen data.");
      }
    })
    .then(function (centers) {
      console.log(centers);
      console.log(citizen);
      console.log("design form");
      _layoutEditForm(citizen, centers);
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}

function _layoutEditForm(citizen, centers) {
  document.getElementById("citizenId").value = citizen.id;
  document.getElementById("citizenName").value = citizen.name;
  document.getElementById("citizenCity").value = citizen.city;
  document.getElementById("vaccinationCount").value = citizen.doesCount;
  document.getElementById("vaccinationStatus").innerHTML =
    citizen.vaccinationStatus;

  let center = document.getElementById("center");

  let centerOptions = centers;
  centerOptions.forEach(function (option) {
    var optionElement = document.createElement("option");
    optionElement.value = option.id;
    optionElement.text =
      option.id + " | " + option.name + " | " + option.address;
    center.appendChild(optionElement);
  });

  // Select a default option
  let defaultOption = citizen.center?.id; // Set the value of the default option here
  center.value = defaultOption;
}

function _layoutOneCitizenView(citizen) {
  let citizenElement = document.getElementById("oneCitizen");
  citizenElement.innerHTML = "";
  let listItems = `
    <ul id="oneCitizenView" class="list-group">
<li class="list-group-item">
    <label htmlFor="id">ID: </label>
    <span>${citizen.id}</span>
</li>
<li class="list-group-item">
    <label htmlFor="name">Name: </label>
    <span>${citizen.name}</span>
</li>
<li class="list-group-item">
    <label htmlFor="city">City: </label>
    <span>${citizen.city}</span>
</li>
<li class="list-group-item">
    <label htmlFor="count">Vaccination Count: </label>
    <span>${citizen.doesCount}</span>
</li>
<li class="list-group-item">
    <label htmlFor="status">Status: </label>
    <span>${citizen.vaccinationStatus}</span>
</li>
<li class="list-group-item">
    <label htmlFor="centerName">Vaccination Center: </label>
    <span>${citizen.center?.name}</span>
</li>
<li class="list-group-item">
    <label htmlFor="centerAddress">Vaccination Center Address: </label>
    <span>${citizen.center?.address}</span>
</li></ul>
`;
  citizenElement.innerHTML = listItems;
}

function _citizenEdit(event) {
  display("citizenView", "none");
  display("citizenDetails", "none");
  display("citizenEdit", "block");

  let id = event.target.id;
  citizenApi.edit(id, _layoutCitizenOnEdit);
}

function _citizenView(event) {
  console.log(event.target.id);

  let id = event.target.id;
  // citizenApi.view(id, _layoutOneCitizenView);
  let url = getBaseUrl() + "/citizens/" + id;
  window.location.href = url;
}

function _citizenDelete(event) {
  event.preventDefault();
  console.log(event.target.id);
  let id = event.target.id;
  citizenApi.delete(id, citizenApi.list);
}

function display(id, displayValue) {
  document.getElementById(id).style.display = displayValue;
}
/** vaccination center */

function centerFormAdd(event) {
  event.preventDefault(); // Prevent form submission

  let errorListElement = document.getElementById("errorList");
  errorListElement.innerHTML = "";
  errorListElement.className = "";
  // Get form data
  const centerName = document.getElementById("centerName").value;
  const centerCitySelect = document.getElementById("centerCity");
  const centerCity =
    centerCitySelect.options[centerCitySelect.selectedIndex].text;

  // Create payload object
  const payload = {
    name: centerName,
    city: centerCity,
    httpMethod: "POST",
  };

  let methodName = 'POST';
  let centerId = document.getElementById('centerId').value;
  if(centerId){
    methodName = 'PUT';
    payload.httpMethod = 'PUT'
    payload.id = centerId;
  }

  // Make a POST request to the vaccinationcenter endpoint
  fetch(getBaseUrl() + "/vaccinationcenter", {
    method: methodName,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (response.ok) {
        // Successful response, handle it accordingly
        return response.json();
      } else if (response.status === 400) {
        // Bad Request, handle errors
        return response.json().then((data) => {
          if (Array.isArray(data.errors)) {
            // Display error messages as warnings
            let errorLabels = "";
            data.errors.forEach((error) => {
              errorLabels += `<label>${error.message}</label><br/>`;
            });

            let errorListElement = document.getElementById("errorList");
            errorListElement.innerHTML = errorLabels;
            errorListElement.classList.add("alert", "alert-warning");

            document.getElementById("centerForm").appendChild(errorListElement);
          } else {
            console.warn("Warning: Bad Request");
          }
          throw new Error("Bad Request");
        });
      } else {
        // Handle other response status codes
        throw new Error(`Request failed with status ${response.status}`);
      }
    })
    .then((data) => {
      console.log("Response:", data);
      // Handle the response as needed
      vaccinationCenters();
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle errors
    });
}

function vaccinationCenters() {
  var tableBody = document.getElementById("centerTable").querySelector("tbody");
  tableBody.innerHTML = "";

  // Fetch citizen data from API
  let baseUrl = document.getElementById("baseUrl");
  console.log(baseUrl.value);
  fetch(getBaseUrl() + "/vaccinationcenter", {
    method: "GET",
    headers: getHeaders(),
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error retrieving citizen data.");
      }
    })
    .then(function (centers) {
      // Populate the table with citizen data
      var tableBody = document
        .getElementById("centerTable")
        .querySelector("tbody");
      centers.forEach(function (center) {
        var row = document.createElement("tr");
        row.innerHTML = `
                    <td>${center.id}</td>
                    <td>${center.name}</td>
                    <td>${center.address}</td>
                    <td> 
                    <button id="${center.id}" onclick="_centerView(event)">View</button>
                    <button id="${center.id}" onclick="_centerEdit(event)">Edit</button>
                    <button id="${center.id}" onclick="_centerDelete(event)">Delete</button>
                    </td>
                `;
        tableBody.appendChild(row);
      });
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}

function _centerView(event) {}

function _centerEdit(event) {
  let id = event.target.id;
  fetch(getBaseUrl() + "/vaccinationcenter/" + id, {
    headers: getHeaders(),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Error while getting center: " + id);
    })
    .then((data) => {
      bindDataWithEditForm(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function bindDataWithEditForm(center) {
  // Get the select element by its ID
  var select = document.getElementById("centerCity");
  let city = center.address;
  let selectedCityValue;
  // Loop through the options
  for (var i = 0; i < select.options.length; i++) {
    var option = select.options[i];

    // Access the value and text of each option
    var value = option.value;
    var text = option.text;

    if(city === text){
      selectedCityValue = value;
      break;
    }
    // Do something with the option
    console.log("Option value: " + value);
    console.log("Option text: " + text);
  }

  if(selectedCityValue){
    select.value = selectedCityValue;
  }
  document.getElementById('centerName').value = center.name;
  document.getElementById('centerId').value = center.id;
}
function _centerDelete(event) {
  let id = event.target.id;

  fetch(getBaseUrl() + "/vaccinationcenter/" + id, {
    method: "DELETE",
    headers: getHeaders(),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error while deleting vaccinationcenter: " + id);
      }
    })
    .then((data) => {
      vaccinationCenters();
    })
    .catch((error) => {
      console.log(error);
    });
}
