import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Paper,
  Grid,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import axios from 'axios';

// UCSB theme colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#003660', // UCSB Blue
    },
    secondary: {
      main: '#FFB81C', // UCSB Gold
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  const [professorName, setProfessorName] = useState('');
  const [courses, setCourses] = useState([{ name: '', sections: 1 }]);
  const [taPreferences, setTaPreferences] = useState([{ name: '', preferences: [] }]);
  const [result, setResult] = useState(null);

  const handleAddCourse = () => {
    setCourses([...courses, { name: '', sections: 1 }]);
  };

  const handleAddTA = () => {
    setTaPreferences([...taPreferences, { name: '', preferences: [] }]);
  };

  const handleCourseChange = (index, field, value) => {
    const newCourses = [...courses];
    newCourses[index][field] = value;
    setCourses(newCourses);
  };

  const handleTAPreferenceChange = (index, field, value) => {
    const newTAs = [...taPreferences];
    newTAs[index][field] = value;
    setTaPreferences(newTAs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/assign-ta`, {
        courses,
        taPreferences
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
      setResult({ success: false, error: error.message });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
            UCSB TA Assignment System
          </Typography>
          
          <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Professor Name"
                    value={professorName}
                    onChange={(e) => setProfessorName(e.target.value)}
                    required
                  />
                </Grid>

                {courses.map((course, index) => (
                  <Grid item xs={12} key={index}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <TextField
                        fullWidth
                        label={`Course ${index + 1} Name`}
                        value={course.name}
                        onChange={(e) => handleCourseChange(index, 'name', e.target.value)}
                        required
                      />
                      <TextField
                        type="number"
                        label="Sections"
                        value={course.sections}
                        onChange={(e) => handleCourseChange(index, 'sections', parseInt(e.target.value))}
                        required
                        sx={{ width: '150px' }}
                      />
                    </Box>
                  </Grid>
                ))}

                <Grid item xs={12}>
                  <Button variant="outlined" onClick={handleAddCourse}>
                    Add Course
                  </Button>
                </Grid>

                {taPreferences.map((ta, index) => (
                  <Grid item xs={12} key={index}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <TextField
                        fullWidth
                        label={`TA ${index + 1} Name`}
                        value={ta.name}
                        onChange={(e) => handleTAPreferenceChange(index, 'name', e.target.value)}
                        required
                      />
                      <TextField
                        fullWidth
                        label="Preferences (comma-separated)"
                        value={ta.preferences.join(',')}
                        onChange={(e) => handleTAPreferenceChange(index, 'preferences', e.target.value.split(','))}
                        required
                      />
                    </Box>
                  </Grid>
                ))}

                <Grid item xs={12}>
                  <Button variant="outlined" onClick={handleAddTA}>
                    Add TA
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                  >
                    Run Assignment
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>

          {result && (
            <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
              <Typography variant="h5" gutterBottom>
                Results
              </Typography>
              {result.success ? (
                <pre>{JSON.stringify(result.assignments, null, 2)}</pre>
              ) : (
                <Typography color="error">
                  Error: {result.error}
                </Typography>
              )}
            </Paper>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App; 