# clinician interface

This code is for the clinician interface and displaying the data visualization
of the patient. It is the interface used by clinicians to view all the patients who
have filled out the Electronic Survey of Wellbeing of Young Children (eSWYC).

The interface works in tandem with the patient interface. When the
patient interface creates a scored SWYC, it will deposit the information into a
specified folder on the server for the clinician interface to view. The clinician
interface will look at the deposited SWYC scores to display.

It is possible to redirect to the patient interface from Django.

The clinician interface contains:
  - a login page for specific user access
  - a registration page with user authentication
  - ability to view the data visualizations of scored eSWYCS

Works in progress:
You will notice a patient folder that contains template and urls and views information.
This is the start of moving the patient interface to it's own project application rather
than having it housed in the clinician interface.
