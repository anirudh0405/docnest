document.addEventListener('DOMContentLoaded', () => {
    const appointmentForm = document.getElementById('appointmentForm');
    const doctorCategorySelect = document.getElementById('doctorCategory');
    const doctorSelect = document.getElementById('doctor');

    const doctorsByCategory = {
        general: [
            { name: 'Dr. Ashwin R Nayak', venue: 'General Hospital', location: 'General Hospital, City' },
            { name: 'Dr. Renuka', venue: 'City Clinic', location: 'City Clinic, Street' },
            { name: 'Dr. Simran S A', venue: 'Healthcare Center', location: 'Healthcare Center, Avenue' }
        ],
        dermatologist: [
            { name: 'Dr. Prem Kishore', venue: 'Dermatology Clinic', location: 'Dermatology Clinic, Road' },
            { name: 'Dr. Rajeshwari', venue: 'Skin Care Center', location: 'Skin Care Center, Lane' },
            { name: 'Dr. Rashmi', venue: 'Skin Wellness Clinic', location: 'Skin Wellness Clinic, Park' }
        ],
        dentist: [
            { name: 'Dr. MR Pujari', venue: 'Dental Care Clinic', location: 'Dental Care Clinic, Square' },
            { name: 'Dr. Shyam', venue: 'Smile Dental Clinic', location: 'Smile Dental Clinic, Plaza' },
            { name: 'Dr. Sudheer', venue: 'Dental Health Center', location: 'Dental Health Center, Boulevard' }
        ],
        cardiologist: [
            { name: 'Dr. KB Prasad', venue: 'Heart Clinic', location: 'Heart Clinic, Avenue' },
            { name: 'Dr. BC Srinivas', venue: 'Cardiac Center', location: 'Cardiac Center, Lane' },
            { name: 'Dr. Abijit', venue: 'Heart Care Hospital', location: 'Heart Care Hospital, Street' }
        ],
        neurologist: [
            { name: 'Dr. Ravishankar', venue: 'Neuro Clinic', location: 'Neuro Clinic, Square' },
            { name: 'Dr. Ganesh K', venue: 'Neuro Care Center', location: 'Neuro Care Center, Plaza' },
            { name: 'Dr. Lokesh', venue: 'Brain Health Clinic', location: 'Brain Health Clinic, Park' }
        ],
        orthopedic: [
            { name: 'Dr. Sunil V', venue: 'Orthopedic Clinic', location: 'Orthopedic Clinic, Boulevard' },
            { name: 'Dr. George Raj', venue: 'Bone Care Center', location: 'Bone Care Center, Avenue' },
            { name: 'Dr. VG Rajan', venue: 'Joint Health Clinic', location: 'Joint Health Clinic, Street' }
        ]
    };

    const populateDoctors = () => {
        const selectedCategory = doctorCategorySelect.value;
        const doctors = doctorsByCategory[selectedCategory] || [];

        doctorSelect.innerHTML = '<option value="">Select Doctor</option>';

        doctors.forEach((doctor) => {
            const option = document.createElement('option');
            option.textContent = `${doctor.name} - ${doctor.venue}`;
            option.value = JSON.stringify(doctor);
            doctorSelect.appendChild(option);
        });
    };

    appointmentForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const patientName = document.getElementById('patientName').value;
        const patientEmail = document.getElementById('patientEmail').value;
        const patientPhone = document.getElementById('patientPhone').value;
        const appointmentDate = document.getElementById('appointmentDate').value;
        const appointmentTime = document.getElementById('appointmentTime').value;
        const selectedDoctorString = doctorSelect.value;
        const selectedDoctor = JSON.parse(selectedDoctorString);

        const appointmentDetails = {
            'Patient Name': patientName,
            'Email': patientEmail,
            'Phone Number': patientPhone,
            'Appointment Date': appointmentDate,
            'Appointment Time': appointmentTime,
            'Selected Doctor': selectedDoctor.name,
            'Venue': selectedDoctor.venue
        };

        alert('Appointment booked successfully!');
        console.log('Appointment Details:', appointmentDetails);
        appointmentForm.reset();
        populateDoctors();

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.text('Appointment Details', 10, 10);
        doc.text(`Patient Name: ${patientName}`, 10, 20);
        doc.text(`Email: ${patientEmail}`, 10, 30);
        doc.text(`Phone Number: ${patientPhone}`, 10, 40);
        doc.text(`Appointment Date: ${appointmentDate}`, 10, 50);
        doc.text(`Appointment Time: ${appointmentTime}`, 10, 60);
        doc.text(`Selected Doctor: ${selectedDoctor.name}`, 10, 70);
        doc.text(`Venue: ${selectedDoctor.venue}`, 10, 80);

        
        const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedDoctor.location)}`;
        doc.textWithLink('View on Google Maps', 10, 90, { url: googleMapsLink });

        
        doc.text('Thank you', 10, 100);

        doc.save('appointment.pdf');
        appointmentForm.addEventListener('submit', async (event) => {
            event.preventDefault();
        
            const patientName = document.getElementById('patientName').value;
            const patientEmail = document.getElementById('patientEmail').value;
            const patientPhone = document.getElementById('patientPhone').value;
            const appointmentDate = document.getElementById('appointmentDate').value;
            const appointmentTime = document.getElementById('appointmentTime').value;
            const selectedDoctorString = doctorSelect.value;
            const selectedDoctor = JSON.parse(selectedDoctorString);
        
            const appointmentDetails = {
                patientName,
                patientEmail,
                patientPhone,
                appointmentDate,
                appointmentTime,
                selectedDoctor: selectedDoctor.name,
                venue: selectedDoctor.venue
            };
        
        
            const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
            appointments.push(appointmentDetails);
            localStorage.setItem('appointments', JSON.stringify(appointments));
        
            alert('Appointment booked successfully!');
            appointmentForm.reset();
            populateDoctors();
        });
        
    });

    doctorCategorySelect.addEventListener('change', populateDoctors);

    populateDoctors();
});
