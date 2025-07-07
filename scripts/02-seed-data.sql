-- Insert sample admin user
INSERT INTO users (email, password_hash, role) VALUES 
('admin@mentorship.com', '$2b$10$rQZ9QmjlhQZ9QmjlhQZ9QuKJ8Z9QmjlhQZ9QmjlhQZ9QmjlhQZ9Qu', 'ADMIN');

-- Insert sample mentors
INSERT INTO users (email, password_hash, role) VALUES 
('mentor1@example.com', '$2b$10$rQZ9QmjlhQZ9QmjlhQZ9QuKJ8Z9QmjlhQZ9QmjlhQZ9QmjlhQZ9Qu', 'MENTOR'),
('mentor2@example.com', '$2b$10$rQZ9QmjlhQZ9QmjlhQZ9QuKJ8Z9QmjlhQZ9QmjlhQZ9QmjlhQZ9Qu', 'MENTOR');

-- Insert sample mentees
INSERT INTO users (email, password_hash, role) VALUES 
('mentee1@example.com', '$2b$10$rQZ9QmjlhQZ9QmjlhQZ9QuKJ8Z9QmjlhQZ9QmjlhQZ9QmjlhQZ9Qu', 'MENTEE'),
('mentee2@example.com', '$2b$10$rQZ9QmjlhQZ9QmjlhQZ9QuKJ8Z9QmjlhQZ9QmjlhQZ9QmjlhQZ9Qu', 'MENTEE');

-- Insert sample profiles
INSERT INTO user_profiles (user_id, name, bio, skills, goals, industry) 
SELECT 
  u.id,
  CASE 
    WHEN u.email = 'admin@mentorship.com' THEN 'Admin User'
    WHEN u.email = 'mentor1@example.com' THEN 'Sarah Johnson'
    WHEN u.email = 'mentor2@example.com' THEN 'Mike Chen'
    WHEN u.email = 'mentee1@example.com' THEN 'Alex Smith'
    WHEN u.email = 'mentee2@example.com' THEN 'Emma Davis'
  END,
  CASE 
    WHEN u.email = 'admin@mentorship.com' THEN 'Platform administrator'
    WHEN u.email = 'mentor1@example.com' THEN 'Senior Product Manager with 8+ years of experience in tech startups'
    WHEN u.email = 'mentor2@example.com' THEN 'Full-stack developer and tech lead with expertise in React and Node.js'
    WHEN u.email = 'mentee1@example.com' THEN 'Junior developer looking to grow in product management'
    WHEN u.email = 'mentee2@example.com' THEN 'Recent graduate interested in UI/UX design'
  END,
  CASE 
    WHEN u.email = 'admin@mentorship.com' THEN ARRAY['Management']
    WHEN u.email = 'mentor1@example.com' THEN ARRAY['Product Management', 'Strategy', 'Leadership']
    WHEN u.email = 'mentor2@example.com' THEN ARRAY['React', 'Node.js', 'JavaScript', 'System Design']
    WHEN u.email = 'mentee1@example.com' THEN ARRAY['JavaScript', 'Python']
    WHEN u.email = 'mentee2@example.com' THEN ARRAY['Design', 'Figma']
  END,
  CASE 
    WHEN u.email = 'admin@mentorship.com' THEN 'Manage the platform effectively'
    WHEN u.email = 'mentor1@example.com' THEN 'Help others transition into product management roles'
    WHEN u.email = 'mentor2@example.com' THEN 'Share technical knowledge and best practices'
    WHEN u.email = 'mentee1@example.com' THEN 'Transition from development to product management'
    WHEN u.email = 'mentee2@example.com' THEN 'Learn UI/UX design principles and tools'
  END,
  CASE 
    WHEN u.email IN ('mentor1@example.com', 'mentee1@example.com') THEN 'Technology'
    WHEN u.email IN ('mentor2@example.com', 'mentee2@example.com') THEN 'Design'
    ELSE 'General'
  END
FROM users u;

-- Insert sample mentor availability
INSERT INTO mentor_availability (mentor_id, day_of_week, start_time, end_time)
SELECT 
  u.id,
  generate_series(1, 5) as day_of_week, -- Monday to Friday
  '09:00'::time,
  '17:00'::time
FROM users u 
WHERE u.role = 'MENTOR';
