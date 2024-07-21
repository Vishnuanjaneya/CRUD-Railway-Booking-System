document.addEventListener('DOMContentLoaded', () => {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const addBookingForm = document.getElementById('addBookingForm');
    const bookingsList = document.getElementById('bookings');
    let currentEditIndex = null;

    const renderBookings = () => {
        bookingsList.innerHTML = '';
        bookings.forEach((booking, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.innerHTML = `
                <span>${booking.name} - ${booking.train} - ${booking.date}</span>
                <div>
                    <button class="btn btn-success btn-sm mr-2" onclick="editBooking(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteBooking(${index})">Delete</button>
                </div>
            `;
            bookingsList.appendChild(listItem);
        });
    };

    window.editBooking = (index) => {
        const booking = bookings[index];
        document.getElementById('name').value = booking.name;
        document.getElementById('train').value = booking.train;
        document.getElementById('date').value = booking.date;
        currentEditIndex = index;
    };

    window.deleteBooking = (index) => {
        bookings.splice(index, 1);
        localStorage.setItem('bookings', JSON.stringify(bookings));
        renderBookings();
    };

    const addBooking = (booking) => {
        bookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(bookings));
        renderBookings();
    };

    const updateBooking = (index, updatedBooking) => {
        bookings[index] = updatedBooking;
        localStorage.setItem('bookings', JSON.stringify(bookings));
        renderBookings();
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const newBooking = {
            name: e.target.name.value,
            train: e.target.train.value,
            date: e.target.date.value
        };

        if (currentEditIndex !== null) {
            updateBooking(currentEditIndex, newBooking);
            currentEditIndex = null;
        } else {
            addBooking(newBooking);
        }

        e.target.reset();
    };

    addBookingForm.addEventListener('submit', handleFormSubmit);
    renderBookings();
});
