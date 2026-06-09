/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RoomSuite {
  id: string;
  name: string;
  title: string;
  price: number;
  featuredImg: string;
  shortDesc: string;
  longDesc: string;
  amenities: string[];
  size: string;
  capacity: string;
  viewType: string;
}

export interface KashmiriAddon {
  id: string;
  name: string;
  price: number;
  icon: string;
  desc: string;
}

export interface MenuItem {
  name: string;
  type: 'appetizer' | 'signature' | 'beverage' | 'dessert';
  desc: string;
  localName: string;
  potency: string; // Saffron, Almonds, Cedar-smoked, etc.
}

export interface ItineraryVibe {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  days: {
    dayNum: number;
    title: string;
    activity: string;
    timing: string;
    location: string;
  }[];
}

export interface BookingState {
  checkIn: string;
  checkOut: string;
  guests: number;
  suiteId: string;
  selectedAddons: string[];
  guestName: string;
  guestEmail: string;
}

export interface ReservationConfirmation {
  reservationId: string;
  guestName: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  totalNights: number;
  baseAmount: number;
  addonsAmount: number;
  grandTotal: number;
  stampCode: string;
}
