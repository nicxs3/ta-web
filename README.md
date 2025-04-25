# UCSB TA Assignment System

A web application for assigning TAs to courses at UCSB.

## Features

- UCSB-themed interface
- Input professor name and courses
- Add TA preferences
- Run the assignment algorithm
- View assignment results

## Setup

### Backend Setup

1. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the Flask backend:
```bash
cd backend
python app.py
```

### Frontend Setup

1. Install Node.js dependencies:
```bash
cd frontend
npm install
```

2. Start the React development server:
```bash
npm start
```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Enter the professor's name
3. Add courses with their names and number of sections
4. Add TAs with their names and preferences
5. Click "Run Assignment" to see the results

## Technologies Used

- Frontend: React, Material-UI
- Backend: Flask, Python
- Optimization: PuLP (Python Linear Programming) 