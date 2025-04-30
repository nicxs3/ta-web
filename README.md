# UCSB TA Assignment System (ERSP Project)

A pipeline for optimizing Teaching Assistant (TA) assignments to courses at UCSB using Integer Linear Programming (ILP). This system aims to create optimal matches between TAs and courses based on preferences and requirements, essentially automating the allocation process.

The system consists of several key components:

- `ilp.py`: Core optimization logic using Gurobi
- `classes.py`: Class definitions for courses, TAs, and assignments
- `loading_data_ilp.py`: Data loading and preprocessing utilities
- `valid_matching.py`: Validation logic for TA assignments
