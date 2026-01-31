import { test, expect } from "@playwright/test";
import { BookingEndPoints } from "../../../pages/Back/BookingEndPoints";


test('Ciclo de vida completo de una reserva', async ({ request }) => {
  const bookingEndPoints = new BookingEndPoints(request);

  let bookingId: number;
  let token: string;

  await test.step('Autenticarse', async () => {
    token = await bookingEndPoints.authenticate();
    expect(token).toBeTruthy();
  });

  await test.step('Crear una nueva reserva', async () => {
    const bookingCreated = await bookingEndPoints.createBooking();
    bookingId = bookingCreated.bookingid;
    expect(bookingId).toBeGreaterThan(0);
    console.log(`Reserva creada con ID: ${bookingId}`);
  });

  await test.step('Consultar la reserva creada', async () => {
    const booking = await bookingEndPoints.getBookingById(bookingId);
    expect(booking).toHaveProperty('firstname', 'Fabian');
    expect(booking).toHaveProperty('lastname', 'Restrepo');
    expect(booking).toHaveProperty('totalprice', 1100);
    expect(booking).toHaveProperty('depositpaid', true);
    expect(booking).toHaveProperty('bookingdates');
    expect(booking.bookingdates).toHaveProperty('checkin', '2026-02-02');
    expect(booking.bookingdates).toHaveProperty('checkout', '2026-04-02');
    expect(booking).toHaveProperty('additionalneeds', 'Breakfast');

    console.log(`Reserva consultada: ${JSON.stringify(booking)}`);
  });

  await test.step('Modificar la reserva y validar persistencia', async () => {
    const updatedBooking = await bookingEndPoints.updateBooking(bookingId, token);
    expect(updatedBooking.firstname).toBe('Camilo');
    expect(updatedBooking.lastname).toBe('Hares');
    expect(updatedBooking.totalprice).toBe(200);
    expect(updatedBooking.depositpaid).toBe(true);
    expect(updatedBooking.bookingdates.checkin).toBe('2025-01-01');
    expect(updatedBooking.bookingdates.checkout).toBe('2025-01-05');
    expect(updatedBooking.additionalneeds).toBe('Breakfast');
    console.log(`Reserva modificada: ${JSON.stringify(updatedBooking)}`);
  });

  await test.step('Consultar la reserva modificada', async () => {
    const booking = await bookingEndPoints.getBookingById(bookingId);
    expect(booking.firstname).toBe('Camilo');
    expect(booking.lastname).toBe('Hares');
    expect(booking.totalprice).toBe(200);
    expect(booking.depositpaid).toBe(true);
    expect(booking.bookingdates.checkin).toBe('2025-01-01');
    expect(booking.bookingdates.checkout).toBe('2025-01-05');
    expect(booking.additionalneeds).toBe('Breakfast');
    console.log(`Reserva consultada después de la modificación: ${JSON.stringify(booking)}`);
  });

  await test.step('Eliminar la reserva con token válido', async () => {
    await bookingEndPoints.deleteBooking(bookingId, token);
    console.log(`Reserva con ID ${bookingId} eliminada.`);
  });

  await test.step('Validar que la reserva fue eliminada', async () => {
    const response = await request.get(`/booking/${bookingId}`);
    expect(response.status()).toBe(404);
  });


});

test('Eliminar reserva con token inválido debe fallar', async ({ request }) => {
  const bookingEndPoints = new BookingEndPoints(request);
  let bookingId: number;

  await test.step('Crear una nueva reserva', async () => {
    const bookingCreated = await bookingEndPoints.createBooking();
    bookingId = bookingCreated.bookingid;
    expect(bookingId).toBeGreaterThan(0);
    console.log(`Reserva creada con ID: ${bookingId}`);
  });

  await test.step('Intentar eliminar la reserva con token inválido', async () => {
    await bookingEndPoints.deleteBookingWithInvalidToken(bookingId);
  });

  await test.step('Validar que la reserva aún existe', async () => {
    const response = await request.get(`/booking/${bookingId}`);
    expect(response.status()).toBe(200);
  });
});



  
