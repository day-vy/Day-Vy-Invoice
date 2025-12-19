"# Invoice Management System

A comprehensive web-based invoice management system for Day-Vy Cosmetics 241, featuring secure admin authentication, customer management, real-time dashboard, and professional invoice generation.

## 📋 Table of Contents

- [Features](#-features)
- [Security Features](#-security-features)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Admin Credentials](#-admin-credentials)
- [Usage Guide](#-usage-guide)
- [Email Notifications](#-email-notifications)
- [Technical Details](#-technical-details)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Features

### Core Functionality
- **🔒 Secure Admin Authentication** - Multi-user admin system with session management
- **📦 Product Catalog** - Extensive searchable product database
- **👥 Customer Management** - Save and manage customer information
- **💰 Real-time Invoice Calculations** - Automatic totals, taxes, and delivery fees
- **🖨️ Professional Invoice Printing** - Print-ready invoice formatting
- **📊 Real-time Dashboard** - Live metrics and analytics
- **🌍 Multi-language Support** - English and Khmer language options
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile

### Advanced Features
- **📈 Invoice History** - Track and retrieve past invoices
- **🔍 Advanced Search** - Search products and customers efficiently
- **💾 Local Storage** - Data persistence without external databases
- **📧 Email Notifications** - Automated security and activity alerts
- **⏰ Auto-logout** - Security timeout after 30 minutes of inactivity
- **🎨 Modern UI** - Clean, professional interface with Tailwind CSS

## 🔐 Security Features

- **Admin-only Access** - Login required for all system access
- **Session Management** - Automatic logout after 30 minutes inactivity
- **Activity Logging** - All admin actions tracked and logged
- **Secure Authentication** - Protected username/password system
- **Email Alerts** - Instant notifications for security events
- **Session Tracking** - Real-time monitoring of user sessions

## 📁 Project Structure

```
Invoice Management System/
├── README.md                    # Project documentation
├── EMAIL_NOTIFICATIONS.md       # Email setup guide
├── html/                        # HTML pages
│   ├── index.html              # Main invoice application
│   ├── login.html              # Admin login page
│   ├── welcome.html            # Landing page
│   ├── customer.html           # Customer management
│   ├── dashboard.html          # Real-time analytics
│   ├── all_invoice.html        # Invoice history viewer
│   └── *.html                  # Test and utility pages
├── css/                        # Stylesheets
│   ├── styles.css              # Main application styles
│   ├── login.css               # Login page styles
│   ├── welcome.css             # Welcome page styles
│   └── customer.css            # Customer page styles
├── script/                     # JavaScript files
│   ├── script.js               # Core application logic
│   ├── login.js                # Authentication logic
│   ├── auth.js                 # Authentication utilities
│   ├── welcome.js              # Welcome page logic
│   ├── customer.js             # Customer management logic
│   └── dashboard.js            # Dashboard analytics logic
├── customer_database/          # Customer data storage
├── saved_invoices/             # Invoice storage directory
└── test_*.html                 # Testing utilities
```

## 🏁 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for advanced features)

### Installation

1. **Clone or Download** the project files to your local machine
2. **Navigate** to the project directory
3. **Open** `welcome.html` in your web browser to start

### First Time Setup

1. **Access System**: Open `html/welcome.html` in your browser
2. **Auto-redirect**: The system will automatically redirect to login
3. **Admin Login**: Enter your admin credentials
4. **Start Using**: Access the full invoice management system

## 👤 Admin Credentials

The system supports multiple admin accounts:

| Username | Password | Access Level |
|----------|----------|--------------|
| **AdmiNs** | `Nimda258508-|` | Full Admin |
| **Xing** | `Sing--|` | Full Admin |

> **⚠️ Security Note**: Never share these credentials. All login attempts are logged and monitored.

## 📖 Usage Guide

### Basic Workflow

1. **Login** → Enter admin credentials
2. **Dashboard** → View real-time metrics and analytics
3. **Create Invoice** → Select products and customer information
4. **Save/Print** → Generate professional invoices
5. **Manage Customers** → Add and update customer database
6. **View History** → Access past invoices and reports

### Key Pages

- **`welcome.html`** - Landing page with auto-redirect to login
- **`login.html`** - Secure admin authentication
- **`index.html`** - Main invoice creation interface
- **`customer.html`** - Customer database management
- **`dashboard.html`** - Real-time analytics and metrics
- **`all_invoice.html`** - Invoice history and retrieval

### Tips for Use

- **Stay Active**: Move mouse or interact to prevent auto-logout (30min timeout)
- **Save Regularly**: Use "Save Current Invoice" to prevent data loss
- **Print Preview**: Always preview before printing invoices
- **Customer Data**: Keep customer information up-to-date
- **Security**: Always logout when finished using the system

## 📧 Email Notifications

The system automatically sends security alerts to designated administrators:

### Recipients
- chonghuyhak36@gmail.com
- haksovann81@gmail.com

### Alert Types
- ✅ **Successful Logins** - Admin access notifications
- 🚨 **Failed Login Attempts** - Security breach alerts
- 🚪 **User Logouts** - Session termination tracking
- ⏰ **Session Timeouts** - Automatic logout notifications

### Email Content
- Username and timestamp
- Device/browser information
- IP address and location (if available)
- Session duration details
- Security recommendations

> **Setup Guide**: See `EMAIL_NOTIFICATIONS.md` for complete configuration instructions.

## 🛠️ Technical Details

### Technologies Used
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS (CDN), Custom CSS
- **Storage**: Browser LocalStorage (no external databases)
- **Fonts**: Google Fonts (Inter)
- **Icons**: Lucide Icons (SVG)

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Performance Features
- **Lazy Loading** - Components load as needed
- **Local Caching** - Data stored in browser storage
- **Real-time Updates** - Dashboard updates every 5 seconds
- **Responsive Images** - Optimized for all screen sizes

### Security Implementation
- **Client-side Authentication** - Session-based access control
- **Activity Monitoring** - All user actions logged
- **Auto-logout** - Security timeout after inactivity
- **Input Validation** - Form data sanitization
- **XSS Protection** - Safe HTML rendering

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Standards
- Use modern JavaScript (ES6+)
- Follow consistent naming conventions
- Add comments for complex logic
- Test all new features
- Maintain responsive design

### Testing
- Test on multiple browsers
- Verify mobile responsiveness
- Check all form validations
- Test print functionality
- Validate email notifications

## 📄 License

This project is proprietary software for Day-Vy Cosmetics 241. All rights reserved.

---

**🔐 Secure • 📊 Analytics • 💰 Professional**  
*Day-Vy Cosmetics 241 - Invoice Management System* 