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