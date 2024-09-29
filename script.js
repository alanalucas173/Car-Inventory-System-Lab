class Car {
    constructor(name, model, year, price) {
        this.name = name;
        this.model = model;
        this.year = year;
        this.price = price;
    }

    // calculate price after depreciation
    calculatePrice() {
        const currentYear = new Date().getFullYear();
        const age = currentYear - this.year;
        const depreciatedPrice = this.price - (age * 500);
        return depreciatedPrice > 0 ? depreciatedPrice : 0;
    }
}

// class to manage cars
class CarManager {
    constructor() {
        this.cars = []; //array
    }

    // Add a car to the inventory
    addCar(car) {
        this.cars.push(car);
        this.displayCars();
    }

    // Display the list of cars
    displayCars() {
        const carList = document.getElementById('carList');
        carList.innerHTML = ''; // Clear the list before adding

        this.cars.forEach(car => {
            const li = document.createElement('li');
            li.textContent = `${car.name} ${car.model} (${car.year}) - $${car.calculatePrice().toFixed(2)}`;
            carList.appendChild(li);
        });
    }

    // Calculate and display the total price after depreciation
    showTotalPrice() {
        let totalPrice = this.cars.reduce((total, car) => total + car.calculatePrice(), 0);
        document.getElementById('totalPrice').textContent = `Total Price: $${totalPrice.toFixed(2)}`;
    }
}

// Initialize CarManager
const carManager = new CarManager();

// Handle form submission to add a car
document.getElementById('carForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    const name = document.getElementById('name').value;
    const model = document.getElementById('model').value;
    const year = parseInt(document.getElementById('year').value);
    const price = parseFloat(document.getElementById('price').value);

    // Create a new car object
    const car = new Car(name, model, year, price);

    // Add the car to the inventory
    carManager.addCar(car);

    // Clear the form after submission
    document.getElementById('carForm').reset();
});

// Handle button click to calculate and show total price
document.getElementById('calculateTotal').addEventListener('click', function() {
    carManager.showTotalPrice();
});
