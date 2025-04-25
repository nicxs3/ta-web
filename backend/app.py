from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os

# Add the parent directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from classes import Course, Applicant, Edge
from ilp import build_model
import numpy as np

app = Flask(__name__)
CORS(app)

@app.route('/api/assign-ta', methods=['POST'])
def assign_ta():
    try:
        data = request.json
        courses_data = data.get('courses', [])
        ta_preferences = data.get('taPreferences', [])

        # Create course objects
        course_objects = []
        for course in courses_data:
            course_obj = Course(
                id=course['name'],
                attributes=[],  # You might want to add attributes based on your needs
                ta_req_nbr=course['sections'],
                pref_tas=[]  # You might want to add preferred TAs based on your needs
            )
            course_objects.append(course_obj)
        
        # Create TA objects
        ta_objects = []
        for ta in ta_preferences:
            ta_obj = Applicant(
                id=ta['name'],
                gpa=0,  # Default values, you might want to collect these
                class_level="",  # Default values
                courses_taken=[],  # Default values
                skills=[],  # Default values
                prev_exp=[],  # Default values
                pref_courses=ta['preferences']  # Use the preferences from the input
            )
            ta_objects.append(ta_obj)

        # Create edges and rankings
        edges = []
        rankings = {}
        
        for course in course_objects:
            course_rankings = []
            for ta in ta_objects:
                # Create edge
                edge = Edge(ta, course)
                edges.append(edge)
                
                # Create ranking (simple ranking based on preferences)
                ranking = 0
                if course.id in ta.pref_courses:
                    ranking = 1
                course_rankings.append((ta, ranking))
            
            rankings[course] = course_rankings

        # Build and solve the model
        model, edge_vars = build_model(course_objects, rankings, edges)
        model.optimize()

        # Format the solution
        solution = {}
        for edge in edges:
            if edge_vars[edge].X > 0.5:  # If the edge is selected
                if edge.course.id not in solution:
                    solution[edge.course.id] = []
                solution[edge.course.id].append(edge.ta.id)
        
        return jsonify({
            'success': True,
            'assignments': solution
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True) 