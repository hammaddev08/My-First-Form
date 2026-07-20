const CarData = {
  name: "Toyota",
  model: "Camry",
  year: 2022,
  color: "White",
  price: 30000
}

console.log(CarData);

CarData.year = 2023;

console.log(CarData.year);

delete CarData.price;

console.log(CarData);