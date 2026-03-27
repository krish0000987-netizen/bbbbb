-- SQL to create admin user 'ahskay'
-- Password: '000999' (Bcrypt hashed)

INSERT INTO users (id, username, password, role, is_active, created_at, updated_at)
VALUES (
    UUID(), 
    'ahskay', 
    '$2b$10$V/tx8.zTADOFMBrIPL32Qe4gsqbADw2.a7poEW.7p60.ogcUZqseG', 
    'admin', 
    1, 
    NOW(), 
    NOW()
)
ON DUPLICATE KEY UPDATE 
    role = 'admin',
    is_active = 1,
    updated_at = NOW();
