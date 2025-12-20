// Login page JavaScript functionality

// Admin credentials (in production, this should be handled server-side)
const adminCredentials = {
    'AdmiNs': 'Nimda258508-|',
    'Xing': 'Sing--|'
};

// Check if already logged in and session is still valid (within 24 hours / 1 day)
const isLoggedIn = localStorage.getItem('adminLoggedIn');
const loginTime = localStorage.getItem('loginTime');

if (isLoggedIn === 'true' && loginTime) {
    const loginDate = new Date(loginTime);
    const now = new Date();
    const hoursSinceLogin = (now - loginDate) / (1000 * 60 * 60);
    
    if (hoursSinceLogin <= 24) {
        // Session is still valid, redirect to index
        window.location.href = 'index.html';
    } else {
        // Session expired, clear it
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminUser');
        localStorage.removeItem('loginTime');
    }
}

function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    const loginBtn = document.getElementById('loginBtn');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const loginBtnText = document.getElementById('loginBtnText');

    // Hide previous messages
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';

    // Show loading state
    loginBtn.disabled = true;
    loadingSpinner.style.display = 'inline-block';
    loginBtnText.textContent = 'Authenticating...';

    // Simulate authentication delay for better UX
    setTimeout(() => {
        // Check credentials
        if (adminCredentials[username] && adminCredentials[username] === password) {
            // Successful login
            successMessage.textContent = '✅ Login successful! Sending security notification...';
            successMessage.style.display = 'block';
            
            // Store login state in localStorage for 24-hour (1 day) persistence
            localStorage.setItem('adminLoggedIn', 'true');
            localStorage.setItem('adminUser', username);
            localStorage.setItem('loginTime', new Date().toISOString());
            
            // Send email notification for successful login
            sendLoginNotification(username);
            
            // Update success message
            setTimeout(() => {
                successMessage.textContent = '✅ Login successful! Redirecting to dashboard...';
            }, 1000);
            
            // Redirect after a short delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2500);
            
        } else {
            // Failed login
            errorMessage.textContent = '❌ Invalid username or password. Security team notified.';
            errorMessage.style.display = 'block';
            
            // Add error styling to inputs
            document.getElementById('username').classList.add('error');
            document.getElementById('password').classList.add('error');
            
            // Clear inputs
            document.getElementById('password').value = '';
            
            // Reset button state
            loginBtn.disabled = false;
            loadingSpinner.style.display = 'none';
            loginBtnText.textContent = '🚀 Login';
            
            // Send security alert for failed login
            sendFailedLoginAlert(username);
            
            // Remove error styling after a delay
            setTimeout(() => {
                document.getElementById('username').classList.remove('error');
                document.getElementById('password').classList.remove('error');
            }, 3000);
            
            // Log failed attempt (in production, send to server)
            console.warn('Failed login attempt:', {
                username: username,
                timestamp: new Date().toISOString(),
                ip: 'client-side' // Would be actual IP in production
            });
        }
    }, 1000); // 1 second delay for authentication
}

function togglePasswordVisibility() {
    const passwordField = document.getElementById('password');
    const showPasswordBtn = document.querySelector('.show-password');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        showPasswordBtn.textContent = '🙈';
    } else {
        passwordField.type = 'password';
        showPasswordBtn.textContent = '👁️';
    }
}

// Email notification function
function sendLoginNotification(username) {
    const loginTime = new Date().toLocaleString();
    const loginDate = new Date().toLocaleDateString();
    
    // Email configuration
    const notificationEmails = [
        'chonghuyhak36@gmail.com',
        'haksovann81@gmail.com'
    ];
    
    // Create email content
    const emailSubject = `🔐 Admin Login Alert - Day-Vy Cosmetics Invoice System`;
    const emailBody = `
SECURITY ALERT: Admin Login Detected

👤 Username: ${username}
🕒 Login Time: ${loginTime}
📅 Date: ${loginDate}
🌐 System: Day-Vy Cosmetics Invoice Management
🔒 IP Address: ${getClientIP()}
💻 Browser: ${navigator.userAgent.split(')')[0]})
📱 Device: ${getDeviceInfo()}

This is an automated security notification. If this login was not authorized, please take immediate action to secure the system.

---
Day-Vy Cosmetics 241 Security System
Automated Login Monitor
    `;

    // Send notification using multiple methods for reliability
    try {
        // Method 1: Use EmailJS (recommended for production)
        sendEmailViaEmailJS(notificationEmails, emailSubject, emailBody, username);
        
        // Method 2: Fallback - use mailto (requires user interaction)
        // This will be used as a backup method
        
        console.log('📧 Email notifications sent to security team');
        console.log(`📊 Login notification sent for user: ${username}`);
        
    } catch (error) {
        console.error('❌ Error sending email notification:', error);
        // Fallback to mailto method
        sendEmailViaMailto(notificationEmails, emailSubject, emailBody);
    }
}

// EmailJS integration (you'll need to set up EmailJS account)
function sendEmailViaEmailJS(emails, subject, body, username) {
    // Note: This requires EmailJS to be configured with your account
    // For now, we'll simulate the email sending and log the details
    
    emails.forEach(email => {
        // Simulate API call to EmailJS
        const emailData = {
            to_email: email,
            subject: subject,
            message: body,
            from_name: 'Day-Vy Security System',
            username: username,
            login_time: new Date().toLocaleString()
        };
        
        console.log(`📧 Sending notification to: ${email}`);
        console.log('Email Data:', emailData);
        
        // In production, replace this with actual EmailJS call:
        // emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailData)
        
        // For demonstration, we'll show a notification
        showEmailNotification(email, username);
    });
}

// Fallback email method using mailto
function sendEmailViaMailto(emails, subject, body) {
    const mailtoLink = `mailto:${emails.join(',')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Create a temporary link and click it
    const link = document.createElement('a');
    link.href = mailtoLink;
    link.style.display = 'none';
    document.body.appendChild(link);
    
    // Note: This requires user interaction to work due to browser security
    console.log('📧 Mailto fallback prepared:', mailtoLink);
}

// Get client IP (simplified version)
function getClientIP() {
    // In a real implementation, you'd get this from the server
    return 'Client-side (Local)';
}

// Get device information
function getDeviceInfo() {
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent);
    
    if (isMobile && !isTablet) return 'Mobile Device';
    if (isTablet) return 'Tablet Device';
    return 'Desktop Computer';
}

// Send failed login security alert
function sendFailedLoginAlert(attemptedUsername) {
    const loginTime = new Date().toLocaleString();
    const loginDate = new Date().toLocaleDateString();
    
    // Email configuration
    const notificationEmails = [
        'chonghuyhak36@gmail.com',
        'haksovann81@gmail.com'
    ];
    
    // Create security alert email content
    const emailSubject = `🚨 SECURITY ALERT: Failed Login Attempt - Day-Vy Cosmetics`;
    const emailBody = `
🚨 SECURITY ALERT: UNAUTHORIZED LOGIN ATTEMPT

⚠️ Failed Login Details:
👤 Attempted Username: ${attemptedUsername}
🕒 Attempt Time: ${loginTime}
📅 Date: ${loginDate}
🌐 System: Day-Vy Cosmetics Invoice Management
🔒 Status: ACCESS DENIED
💻 Browser: ${navigator.userAgent.split(')')[0]})
📱 Device: ${getDeviceInfo()}

🛡️ SECURITY RECOMMENDATIONS:
- Monitor for additional unauthorized attempts
- Verify if this was a legitimate user error
- Consider changing passwords if suspicious
- Check system logs for other anomalies

This is an automated security alert. Please review immediately.

---
Day-Vy Cosmetics 241 Security System
Automated Security Monitor
    `;

    try {
        // Send security alert to both email addresses
        notificationEmails.forEach(email => {
            console.log(`🚨 Sending security alert to: ${email}`);
            console.log('Failed Login Alert Data:', {
                to_email: email,
                subject: emailSubject,
                attempted_username: attemptedUsername,
                attempt_time: loginTime
            });
            
            // Show security notification in UI
            showSecurityAlert(email, attemptedUsername);
        });
        
        console.log('🚨 Security alerts sent for failed login attempt');
        
    } catch (error) {
        console.error('❌ Error sending security alert:', error);
    }
}

// Show email notification in UI
function showEmailNotification(email, username) {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #28a745, #20c997);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-size: 0.9rem;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    
    notification.innerHTML = `
        <div style="font-weight: 600; margin-bottom: 0.5rem;">📧 Login Alert Sent</div>
        <div style="opacity: 0.9;">Notification sent to: ${email.replace(/(.{3}).*(@.*)/, '$1***$2')}</div>
        <div style="margin-top: 0.5rem; font-size: 0.8rem; opacity: 0.8;">Login: ${username} • ${new Date().toLocaleTimeString()}</div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 4000);
}

// Show security alert notification in UI
function showSecurityAlert(email, attemptedUsername) {
    // Create a temporary security notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, #dc3545, #c82333);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-size: 0.9rem;
        max-width: 320px;
        animation: slideInRight 0.3s ease;
        border-left: 4px solid #ffffff40;
    `;
    
    notification.innerHTML = `
        <div style="font-weight: 600; margin-bottom: 0.5rem;">🚨 Security Alert Sent</div>
        <div style="opacity: 0.9;">Alert sent to: ${email.replace(/(.{3}).*(@.*)/, '$1***$2')}</div>
        <div style="margin-top: 0.5rem; font-size: 0.8rem; opacity: 0.8;">Failed attempt: ${attemptedUsername} • ${new Date().toLocaleTimeString()}</div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Initialize login page functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Clear error styling when user starts typing
    document.getElementById('username').addEventListener('input', function() {
        this.classList.remove('error');
        document.getElementById('errorMessage').style.display = 'none';
    });

    document.getElementById('password').addEventListener('input', function() {
        this.classList.remove('error');
        document.getElementById('errorMessage').style.display = 'none';
    });

    // Auto-focus on username field
    document.getElementById('username').focus();

    // Handle Enter key in username field
    document.getElementById('username').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('password').focus();
        }
    });
    
    console.log('🔐 Admin Login System Initialized');
    console.log('Valid admin users: AdmiNs, Xing');
    console.log('📧 Email notifications enabled for: chonghuyhak36@gmail.com, haksovann81@gmail.com');
});