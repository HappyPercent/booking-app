# Booking App

Appointment-booking frontend for independent service providers. A provider lists their services with price packs, defines working hours on a calendar, and shares a link. Clients pick a free slot and book it.

React 18 · TypeScript · MUI · FullCalendar · React Query · Zustand · Formik + Yup · i18next (English, Serbian)

## Features

- Provider workspace: services with price packs, desks (schedules) and a drag-to-draw weekly calendar
- Onboarding wizard that creates a first service and schedule, then gives a shareable booking link
- Public booking page: free slots are computed per service pack, and the provider can confirm or decline
- Auth, language detection and a typed API client

## Run locally

This repo is the frontend only. It needs the booking REST backend, which is not included.

```bash
npm install
cp .env.example .env   # set REACT_APP_API_URL to your backend
npm start
```

`npm run build` creates a production bundle.

## Structure

```
src/
  client/    typed HTTP client and API methods
  core/      components, React Query hooks, store, theme
  pages/     Login, Register, Workspace, Schedule
  i18n/      translations and language detector
```
