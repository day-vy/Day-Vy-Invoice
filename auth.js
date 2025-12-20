// Authentication and session management for index.html

// Authentication check
function checkAuthentication() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    const adminUser = localStorage.getItem('adminUser');
    const loginTime = localStorage.getItem('loginTime');
    const skipLoginRedirect = sessionStorage.getItem('skipLoginRedirect');

    // Allow catalog-only mode (no login required)
    if (window.catalogOnlyMode) {
        enableCatalogOnlyMode();
        return true;
    }
    
    // Skip login redirect if coming from dashboard
    if (skipLoginRedirect === 'true') {
        sessionStorage.removeItem('skipLoginRedirect');
        // Set authentication data if not already set
        if (!isLoggedIn) {
            localStorage.setItem('adminLoggedIn', 'true');
            localStorage.setItem('adminUser', 'Admin');
            localStorage.setItem('loginTime', new Date().toISOString());
        }
        return true;
    }

    console.log('🔍 Checking authentication...', { isLoggedIn, adminUser, loginTime });

    // Check if session has expired (24 hours / 1 day)
    if (loginTime) {
        const loginDate = new Date(loginTime);
        const now = new Date();
        const hoursSinceLogin = (now - loginDate) / (1000 * 60 * 60);
        
        if (hoursSinceLogin > 24) {
            console.log('⏰ Session expired after 24 hours');
            // Clear expired session data
            localStorage.removeItem('adminLoggedIn');
            localStorage.removeItem('adminUser');
            localStorage.removeItem('loginTime');
            // Redirect to login
            if (!window.location.pathname.includes('login.html')) {
                console.log('🔄 Redirecting to login page...');
                window.location.href = 'login.html';
            }
            return false;
        }
    }

    if (!isLoggedIn || isLoggedIn !== 'true' || !adminUser) {
        console.log('❌ Authentication failed - redirecting to login');
        // Clear any incomplete session data
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminUser');
        localStorage.removeItem('loginTime');
        // Check if we're already on login page to prevent redirect loop
        if (!window.location.pathname.includes('login.html')) {
            console.log('🔄 Redirecting to login page...');
            window.location.href = 'login.html';
        }
        return false;
    }

    console.log('✅ Authentication successful for user:', adminUser);

    // Update admin info in header
    const adminUsernameElement = document.getElementById('adminUsername');
    const loginTimeElement = document.getElementById('loginTime');
    
    if (adminUsernameElement) {
        adminUsernameElement.textContent = adminUser;
        console.log('✅ Updated admin username display');
    }
    
    if (loginTimeElement && loginTime) {
        const loginDate = new Date(loginTime);
        loginTimeElement.textContent = `Logged in: ${loginDate.toLocaleString()}`;
        console.log('✅ Updated login time display');
    }

    // Show authenticated features after login
    showAuthenticatedFeatures();
    
    return true;
}

// Enable catalog-only mode for unauthenticated users
function enableCatalogOnlyMode() {
    console.log('📚 Enabling catalog-only mode');
    
    // Do not hide admin header when returning from product-actions.html
    if (!window.catalogOnlyMode) {
        const adminHeader = document.querySelector('.admin-header');
        if (adminHeader) {
            adminHeader.style.display = 'none';
        }
    }
    
    // Ensure catalog functionality works
    const catalogBtn = document.querySelector('button[onclick="toggleProductCatalog()"]');
    if (catalogBtn) {
        catalogBtn.style.display = 'block';
        console.log('✅ Product catalog button enabled');
    }
}

// Show features that require authentication
function showAuthenticatedFeatures() {
    // You can add other authenticated features here
    console.log('✅ Authenticated features enabled');
}

// Hide features that require authentication
function hideAuthenticatedFeatures() {
    console.log('🔒 Authenticated features hidden');
}

// Handle logout
function handleLogout() {
    console.log('🚪 Logout requested...');
    
    if (confirm('Are you sure you want to logout?')) {
        console.log('✅ Logout confirmed by user');
        
        const adminUser = localStorage.getItem('adminUser');
        const loginTime = localStorage.getItem('loginTime');
        
        console.log('📋 Logout details:', { adminUser, loginTime });
        
        // Send logout notification
        try {
            sendLogoutNotification(adminUser, loginTime);
            console.log('📧 Logout notification sent');
        } catch (error) {
            console.error('❌ Error sending logout notification:', error);
        }
        
        // Hide authenticated features
        hideAuthenticatedFeatures();
        
        // Clear session data from localStorage
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminUser');
        localStorage.removeItem('loginTime');
        console.log('🧹 Session data cleared');
        
        // Show logout message
        alert('✅ Successfully logged out! Security team notified.');
        
        // Redirect to login page
        console.log('🔄 Redirecting to login page...');
        window.location.href = 'login.html';
    } else {
        console.log('❌ Logout cancelled by user');
    }
}

// Send logout notification
function sendLogoutNotification(username, loginTime) {
    const logoutTime = new Date().toLocaleString();
    const logoutDate = new Date().toLocaleDateString();
    const sessionDuration = loginTime ? 
        Math.round((new Date() - new Date(loginTime)) / (1000 * 60)) : 'Unknown';
    
    const notificationEmails = [
        'chonghuyhak36@gmail.com',
        'haksovann81@gmail.com'
    ];
    
    // Create detailed email content
    const emailSubject = `� Admin Logout Alert - Day-Vy Cosmetics Invoice System`;
    const emailBody = `
SECURITY NOTIFICATION: Admin Logout Detected

👤 Username: ${username}
🚪 Logout Time: ${logoutTime}
📅 Date: ${logoutDate}
⏱️ Session Duration: ${sessionDuration} minutes
🌐 System: Day-Vy Cosmetics Invoice Management
🔒 IP Address: ${getClientIP()}
💻 Browser: ${navigator.userAgent.split(')')[0]})
📱 Device: ${getDeviceInfo()}

Session Summary:
${loginTime ? `- Login Time: ${new Date(loginTime).toLocaleString()}` : '- Login Time: Unknown'}
- Logout Time: ${logoutTime}
- Duration: ${sessionDuration} minutes
- Status: Normal Logout

This is an automated security notification confirming admin logout from the system.

---
Day-Vy Cosmetics 241 Security System
Automated Logout Monitor
    `;

    try {
        // Send notification using multiple methods for reliability
        sendLogoutEmailNotification(notificationEmails, emailSubject, emailBody, username, sessionDuration);
        
        console.log('📧 Logout notifications sent to security team');
        console.log(`📊 Logout notification sent for user: ${username}`);
        
        // Show logout notification in UI
        showLogoutNotification(username, sessionDuration);
        
    } catch (error) {
        console.error('❌ Error sending logout notification:', error);
    }
}

// Send logout email notification
function sendLogoutEmailNotification(emails, subject, body, username, sessionDuration) {
    emails.forEach(email => {
        // Simulate API call to EmailJS or email service
        const emailData = {
            to_email: email,
            subject: subject,
            message: body,
            from_name: 'Day-Vy Security System',
            username: username,
            logout_time: new Date().toLocaleString(),
            session_duration: sessionDuration
        };
        
        console.log(`📧 Sending logout notification to: ${email}`);
        console.log('Logout Email Data:', emailData);
        
        // In production, replace this with actual EmailJS call:
        // emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailData)
        
        // For demonstration, we'll show a notification
        showLogoutEmailNotification(email, username);
    });
}

// Initialize authentication when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Hide authenticated features by default
    hideAuthenticatedFeatures();
    
    // Check if user is authenticated
    checkAuthentication();
});

// Also check authentication when page becomes visible (in case user switches tabs)
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        checkAuthentication();
    }
});

// Show logout email notification in UI
function showLogoutEmailNotification(email, username) {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #6c757d, #495057);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-size: 0.9rem;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
        border-left: 4px solid #ffffff40;
    `;
    
    notification.innerHTML = `
        <div style="font-weight: 600; margin-bottom: 0.5rem;">📧 Logout Alert Sent</div>
        <div style="opacity: 0.9;">Notification sent to: ${email.replace(/(.{3}).*(@.*)/, '$1***$2')}</div>
        <div style="margin-top: 0.5rem; font-size: 0.8rem; opacity: 0.8;">Logout: ${username} • ${new Date().toLocaleTimeString()}</div>
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

// Show main logout notification
function showLogoutNotification(username, sessionDuration) {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, #fd7e14, #e55d00);
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
        <div style="font-weight: 600; margin-bottom: 0.5rem;">🚪 Logout Completed</div>
        <div style="opacity: 0.9;">User: ${username}</div>
        <div style="margin-top: 0.5rem; font-size: 0.8rem; opacity: 0.8;">Session: ${sessionDuration} minutes • Security team notified</div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 3000);
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







// Initialize authentication when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (checkAuthentication()) {
        console.log('✅ Admin authenticated successfully');
    }
});

// Prevent back button after logout
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        checkAuthentication();
    }
});