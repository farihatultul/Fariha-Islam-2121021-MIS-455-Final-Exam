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
