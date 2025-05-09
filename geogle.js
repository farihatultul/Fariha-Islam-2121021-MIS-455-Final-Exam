function fetchCountryData(countryName) {
    var url = `https://restcountries.com/v3.1/name/${countryName}`;
    
    fetch(url)
        .then(function(response) {
            if (!response.ok) {
                throw new Error("Country not found");
            }
            return response.json();
        })
        .then(function(data) {
            displayCountryData(data);
        })
        .catch(function(error) {
            showErrorMessage(error.message);
        });
}

function displayCountryData(countries) {
    var resultsContainer = document.getElementById("results-container");
    resultsContainer.innerHTML = ""; 
    
    for (var i = 0; i < countries.length; i++) {
        var country = countries[i];
        
        
        var card = document.createElement("div");
        card.className = "country-card";
        
      
        var flagImg = document.createElement("img");
        flagImg.className = "country-flag";
        flagImg.src = country.flags.png;
        flagImg.alt = country.name.common + " flag";
        card.appendChild(flagImg);
        
        
        var content = document.createElement("div");
        content.className = "country-content";
        
        
        var name = document.createElement("h2");
        name.className = "country-name";
        name.textContent = country.name.common;
        content.appendChild(name);
        
        
        var region = document.createElement("div");
        region.className = "country-region";
        region.innerHTML = `<i class="globeicon"></i> ${country.region}`;
        content.appendChild(region);
        
       
        var details = document.createElement("div");
        details.className = "country-details";
        
        
        var populationItem = createDetailItem("Population", country.population.toLocaleString());
        details.appendChild(populationItem);
        
        
        var capital = Array.isArray(country.capital) ? country.capital[0] : "N/A";
        var capitalItem = createDetailItem("Capital", capital);
        details.appendChild(capitalItem);
        
        
        var currencyItem = createDetailItem("Currency", getCurrency(country.currencies));
        details.appendChild(currencyItem);

               
                var independenceStatus = country.independent ? "Yes" : "No";
                var independenceItem = createDetailItem("Independent", independenceStatus);
                details.appendChild(independenceItem);
        
       
        var languageItem = createDetailItem("Language", getLanguages(country.languages));
        details.appendChild(languageItem);
        
        var timezoneItem = createDetailItem("Timezones", getTimezones(country.timezones));
        details.appendChild(timezoneItem);
        
        content.appendChild(details);
        card.appendChild(content);
        resultsContainer.appendChild(card);
    }
}


function getTimezones(timezones) {
    if (!timezones || timezones.length === 0) return "N/A";
    
    var displayedTimezones = timezones.slice(0, 3);
    var result = displayedTimezones.join(", ");

    if (timezones.length > 3) {
        result += `... (+${timezones.length - 3} more)`;
    }
    return result;
} 


function createDetailItem(label, value) {
    var item = document.createElement("div");
    item.className = "detail-item";
    
    var labelSpan = document.createElement("span");
    labelSpan.className = "detail-label";
    labelSpan.textContent = label;
    
    var valueSpan = document.createElement("span");
    valueSpan.className = "detail-value";
    valueSpan.textContent = value;
    
    item.appendChild(labelSpan);
    item.appendChild(valueSpan);
    
    return item;
}


function getCurrency(currencies) {
    if (!currencies) return "N/A";
    
    var currencyNames = [];
    for (var code in currencies) {
        if (currencies.hasOwnProperty(code)) {
            currencyNames.push(currencies[code].name);
        }
    }
    return currencyNames.join(", ");
    
}



function getLanguages(languages) {
    if (!languages) return "N/A";
    
    var languageNames = [];
    for (var code in languages) {
        if (languages.hasOwnProperty(code)) {
            languageNames.push(languages[code]);
        }
    }
    return languageNames.join(", ");
  
}


function showErrorMessage(message) {
    var resultsContainer = document.getElementById("results-container");
    resultsContainer.innerHTML = "";
    
    var errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    
    var heading = document.createElement("h3");
    heading.textContent = "Error";
    
    var errorText = document.createElement("p");
    errorText.textContent = message;
    
    var suggestion = document.createElement("p");
    suggestion.innerHTML = 'Try searching for a valid country name like "France" or "Japan"';
    
    errorDiv.appendChild(heading);
    errorDiv.appendChild(errorText);
    errorDiv.appendChild(suggestion);
    resultsContainer.appendChild(errorDiv);
}


document.getElementById("search-form").onsubmit = function(event) {
    event.preventDefault();
    var countryInput = document.getElementById("country-input");
    var countryName = countryInput.value.trim();
    
    if (countryName === "") {
        showErrorMessage("Please enter a country name");
    } else {
        fetchCountryData(countryName);
    }
};



var pills = document.getElementsByClassName("pill");
for (var i = 0; i < pills.length; i++) {
    pills[i].onclick = function() {
        
        for (var j = 0; j < pills.length; j++) {
            pills[j].classList.remove("active");
        }
        
        this.classList.add("active");
        
        var region = this.textContent;
        if (region !== "All") {
            showErrorMessage(`Filtering by ${region} would be implemented here`);
        }
    };
}