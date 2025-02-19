CREATE TABLE "Users" (
"id" SERIAL PRIMARY KEY,
"username" VARCHAR(255) NULL,
"password" VARCHAR(255) NOT NULL,
"role" VARCHAR(255) NOT NULL,
"email" VARCHAR(255) NOT NULL,
"createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
"updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- CREATE TABLE student_profiles (
--     id SERIAL PRIMARY KEY,
--     user_id INT REFERENCES users(id) ON DELETE CASCADE,
--     full_name VARCHAR(150) NOT NULL,
--     roll_number VARCHAR(50) UNIQUE NOT NULL,
--     faculty VARCHAR(100),
--     batch VARCHAR(50),
--     section VARCHAR(10),
--     semester VARCHAR(10),
--     guardian_name VARCHAR(150),
--     guardian_contact VARCHAR(15),
--     address VARCHAR(255),
--     emergency_contact VARCHAR(15),
--     created_at TIMESTAMP DEFAULT NOW()
-- );

-- CREATE TABLE teacher_profiles (
--     id SERIAL PRIMARY KEY,
--     user_id INT REFERENCES users(id) ON DELETE CASCADE,
--     full_name VARCHAR(150) NOT NULL,
--     employee_id VARCHAR(50) UNIQUE NOT NULL,
--     department VARCHAR(100),
--     designation VARCHAR(100),
--     qualification VARCHAR(100),
--     experience_years INT,
--     assigned_subjects VARCHAR(255),
--     address VARCHAR(255),
--     emergency_contact VARCHAR(15),
--     created_at TIMESTAMP DEFAULT NOW()
-- );


-- CREATE TABLE attendance (
--     id SERIAL PRIMARY KEY,
--     student_id INT REFERENCES student_profiles(id) ON DELETE CASCADE,
--     date DATE NOT NULL,
--     status VARCHAR(10) CHECK (status IN ('Present', 'Absent', 'Late')),
--     remarks VARCHAR(255),
--     created_at TIMESTAMP DEFAULT NOW()
-- );

-- CREATE TABLE routine (
--     id SERIAL PRIMARY KEY,
--     batch VARCHAR(50),
--     section VARCHAR(10),
--     subject VARCHAR(100),
--     teacher_id INT REFERENCES teacher_profiles(id) ON DELETE SET NULL,
--     day_of_week VARCHAR(10),
--     start_time TIME,
--     end_time TIME,
--     created_at TIMESTAMP DEFAULT NOW()
-- );

-- CREATE TABLE assignments (
--     id SERIAL PRIMARY KEY,
--     title VARCHAR(255),
--     description TEXT,
--     deadline DATE,
--     assigned_by INT REFERENCES teacher_profiles(id),
--     created_at TIMESTAMP DEFAULT NOW()
-- );

-- CREATE TABLE tasks (
--     id SERIAL PRIMARY KEY,
--     title VARCHAR(255) NOT NULL,
--     description TEXT,
--     assigned_by INT REFERENCES users(id) ON DELETE CASCADE,  -- User who created the task
--     assigned_to INT REFERENCES users(id) ON DELETE CASCADE, -- User who is responsible for the task
--     due_date DATE,
--     status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'In Progress', 'Completed', 'Cancelled')),
--     created_at TIMESTAMP DEFAULT NOW(),
--     updated_at TIMESTAMP DEFAULT NOW()
-- );


-- CREATE TABLE results (
--     id SERIAL PRIMARY KEY,
--     student_id INT REFERENCES student_profiles(id) ON DELETE CASCADE,
--     subject VARCHAR(100),
--     marks_obtained INT,
--     total_marks INT,
--     grade VARCHAR(10),
--     exam_date DATE,
--     created_at TIMESTAMP DEFAULT NOW()
-- );

-- CREATE TABLE notifications (
--     id SERIAL PRIMARY KEY,
--     user_id INT REFERENCES users(id) ON DELETE CASCADE,
--     message TEXT NOT NULL,
--     is_read BOOLEAN DEFAULT FALSE,
--     created_at TIMESTAMP DEFAULT NOW()
-- );

-- CREATE TABLE fees (
--     id SERIAL PRIMARY KEY,
--     student_id INT REFERENCES student_profiles(id) ON DELETE CASCADE,
--     amount DECIMAL(10, 2),
--     status VARCHAR(20) CHECK (status IN ('Paid', 'Pending', 'Overdue')),
--     due_date DATE,
--     payment_date DATE,
--     created_at TIMESTAMP DEFAULT NOW()
-- );
