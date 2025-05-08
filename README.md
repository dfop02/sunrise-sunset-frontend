# Sunrise Sunset Frontend
Frontend for Sunrise Sunset, a Jumpseller code challenge, you can access Backend by [clicking here](https://github.com/dfop02/sunrise-sunset-backend).

## Dependences
- Node 23+
- [Sunrise Sunset Backend](https://github.com/dfop02/sunrise-sunset-backend).

## Getting Started

First, install the dependences
```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:4001](http://localhost:4001) with your browser to see the result.

## Learn More

Project is very simple, I'm using only native resources from React, expect by [recharts](https://github.com/recharts/recharts). There is only one page that contains all data for this challenge, a form to fill location, start date and end date.

All fields must be filled or will trigger "Missing params" error, other errors will be handle by the same way, showing in Red above the form.

Successful searches will show the Chart for all days searched and a table that contains relevant data from backend, including sunrise hour, sunset hour and golden hour.
