// Format price in USD currency 
// export const formatPrice = (price) => {
//     return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
//     // return new Intl.NumberFormat('bn-BD', { style: 'currency', currency: 'BDT' }).format(price)
//     // return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'BDT' }).format(price)
// }


export const formatPrice = (priceInBDT, exchangeRate) => {
    // Convert BDT to USD using the provided exchange rate
    const priceInUSD = priceInBDT / exchangeRate;
    
    // Format the converted price in USD
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(priceInUSD);
}

// Example usage:
// Let's assume the exchange rate is 110 BDT = 1 USD
// const exchangeRate = 110;
// console.log(formatPrice(1100, exchangeRate)); // Outputs: "$10.00"
