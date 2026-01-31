import { APIRequestContext, expect } from "@playwright/test";
import endpoints from "../../tests/recursos/constantes/endpoints.json";

export class BookingEndPoints {
  constructor(private readonly request: APIRequestContext) {}

  async getBookingIds() {
    const getEnpoint = endpoints.API_GET_BOOKING_IDS_JSON_ENDPOINT;
    const response = await this.request.get(getEnpoint);

    const bookings = await response.json();
    return bookings;
  }

  async authenticate(): Promise<string> {
    const response = await this.request.post('/auth', {
      data: {
        username: 'admin',
        password: 'password123'
      }
    });
  
    const body = await response.json();
    return body.token;
  }
  

  async createBooking() {
    const postEndpoint = endpoints.API_POST_CREATE_BOOKING_JSON_ENDPOINT;

    const body = {
      firstname: "Fabian",
      lastname: "Restrepo",
      totalprice: 1100,
      depositpaid: true,
      bookingdates: {
        checkin: "2026-02-02",
        checkout: "2026-04-02",
      },
      additionalneeds: "Breakfast",
    };

    const response = await this.request.post(postEndpoint, {
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(response.status()).toBe(200);
    const bookingCreated = await response.json();
    return bookingCreated;
  }

  async getBookingById(bookingId: number) {
    const endpoint = endpoints.API_GET_BOOKING_JSON_ENDPOINT + bookingId;
    const response = await this.request.get(endpoint);

    expect(response.status()).toBe(200);
    const bookingById = await response.json();
    return bookingById;
  }

  async updateBooking(bookingId: number, token: string) {
    const response = await this.request.put(`/booking/${bookingId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `token=${token}`
      },
      data: {
        firstname: 'Camilo',
        lastname: 'Hares',
        totalprice: 200,
        depositpaid: true,
        bookingdates: {
          checkin: '2025-01-01',
          checkout: '2025-01-05'
        },
        additionalneeds: 'Breakfast'
      }
    });
  
    return await response.json();
  }

  async deleteBooking(bookingId: number, token: string) {

    const response = await this.request.delete(`/booking/${bookingId}`, {
      headers: {
        'Cookie': `token=${token}`
      }
    });
    expect(response.status()).toBe(201);
  
    return response.status();
  }

  async deleteBookingWithInvalidToken(bookingId: number) {

    const response = await this.request.delete(`/booking/${bookingId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': 'token=token_invalido_123',
      },
    });

    expect(response.status()).toBe(403);
    return response.status();
  }
  


}
