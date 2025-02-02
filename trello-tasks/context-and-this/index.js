const rangesOverlap = (range1, range2) => {
  const [start1, end1] = range1;
  const [start2, end2] = range2;

  return Math.max(new Date(start1), new Date(start2)) <= Math.min(new Date(end1), new Date(end2));
};

const isDateRangeValid = (start, end) => {
  const currentDate = new Date();
  const dateFrom = new Date(start);
  const dateTo = new Date(end);

  return dateFrom < currentDate || dateTo < currentDate;
};

class Room {
  constructor(roomNumber, bookRoom, getBookings) {
    this.number = roomNumber;
    this.bookRoom = this.bookRoom.bind(this, bookRoom);
    this.getBookings = this.getBookings.bind(this, getBookings);
  }

  bookRoom(_bookRoom, bookingDates) {
    return _bookRoom(this.number, bookingDates);
  }

  getBookings(_getBookings, dateRange) {
    return _getBookings({ roomNumber: this.number, dateRange });
  }
}

class Hotel {
  #rooms = new Set();
  #booked = new Map();

  constructor(name) {
    this.name = name;
    this.createRoom = this.createRoom.bind(this);
    this.bookRoom = this.bookRoom.bind(this);
    this.getBookings = this.getBookings.bind(this);
  }

  createRoom() {
    const roomNumber = this.#rooms.size + 1;
    this.#rooms.add(roomNumber);
  }

  getRoom(roomNumber) {
    if (!this.roomExist(roomNumber)) {
      return null;
    }

    return new Room(roomNumber, this.bookRoom, this.getBookings);
  }

  bookRoom(roomNumber, bookingDates) {
    const [dateFrom, dateTo] = bookingDates;

    if (!this.roomExist(roomNumber)) {
      return console.error(`Room ${roomNumber} not found`);
    }

    if (isDateRangeValid(dateFrom, dateTo)) {
      return console.error(`Date range invalid`);
    }

    const roomBooked = this.#booked.get(roomNumber);
    const listOfRoomBookings = (roomBooked && roomBooked.bookings) || [];

    const checkRangeOverlap = rangesOverlap.bind(null, bookingDates);

    const isBookingDatesNotFree = listOfRoomBookings.some((booking) => checkRangeOverlap(booking));

    if (isBookingDatesNotFree) {
      return console.error(`Booking not free`);
    }

    this.#booked.set(roomNumber, {
      roomNumber,
      bookings: listOfRoomBookings.concat([bookingDates]),
    });
  }

  getBookings(filters) {
    if (!filters) {
      return [...this.#booked.values()];
    }

    const { roomNumber = null, dateRange = [] } = filters;

    const data = roomNumber ? [this.#booked.get(roomNumber)] : [...this.#booked.values()];

    const hasDateRange = dateRange.length === 2;

    if (!hasDateRange) {
      return data;
    }

    const checkRangeOverlap = rangesOverlap.bind(null, dateRange);

    return data.reduce((data, { roomNumber, bookings }) => {
      const filteredBookings = bookings.filter((bookingDates) => checkRangeOverlap(bookingDates));

      if (filteredBookings.length) {
        data.push({ roomNumber, bookings: filteredBookings });
      }

      return data;
    }, []);
  }

  roomExist(roomNumber) {
    return this.#rooms.has(roomNumber);
  }
}

const showBookings = (data) => {
  if (!data || !data.length) {
    console.error(`No booking data found`);
    return;
  }

  data.forEach(({ roomNumber, bookings }) => {
    console.log('Room: ', roomNumber);

    const formattedData = bookings.map(([start, end]) => {
      return { start, end };
    });

    console.table(formattedData);
  });
};

const travidovichy = new Hotel('Travidovichy');

travidovichy.createRoom();
travidovichy.createRoom();
travidovichy.createRoom();
travidovichy.bookRoom(1, ['2025-04-16', '2025-04-23']);
travidovichy.bookRoom(2, ['2025-03-16', '2025-03-23']);

const room1 = travidovichy.getRoom(1);
room1.bookRoom(['2025-06-23', '2025-07-25']);

console.log('All Bookings:');
showBookings(travidovichy.getBookings());

console.log('Room 1 with date range:');
showBookings(
  travidovichy.getBookings({
    roomNumber: 1,
    datesRange: ['2025-04-18', '2025-04-23'],
  })
);

console.log('All Bookings of room 1:');
showBookings(room1.getBookings());
