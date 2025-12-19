# Email Security Notifications Setup Guide

## 📧 Email Alert System for Day-Vy Cosmetics Invoice System

### **Configured Email Recipients:**
- **chonghuyhak36@gmail.com**
- **haksovann81@gmail.com**

### **Email Notifications Triggered For:**

#### 1. **✅ Successful Login**
- **When**: Admin successfully logs into the system
- **Content**: Username, login time, device info, browser details
- **Purpose**: Monitor authorized access

#### 2. **🚨 Failed Login Attempts**
- **When**: Someone enters wrong credentials
- **Content**: Attempted username, timestamp, device info
- **Purpose**: Security breach detection

#### 3. **🚪 User Logout**
- **When**: Admin manually logs out
- **Content**: Username, logout time, session duration
- **Purpose**: Session tracking

#### 4. **⏰ Session Timeout**
- **When**: System automatically logs out user after 30 minutes
- **Content**: Username, timeout reason, session duration
- **Purpose**: Automatic security compliance

---

## 🔧 **Current Implementation Status**

### **Active Features:**
- ✅ Login success notifications
- ✅ Failed login attempt alerts
- ✅ Logout notifications  
- ✅ Session timeout alerts
- ✅ Real-time UI notifications
- ✅ Console logging for all events

### **Email Delivery Methods:**

#### **Method 1: Console Logging (Current)**
All email notifications are currently logged to the browser console with complete email content and recipient details. This allows you to see exactly what would be sent.

#### **Method 2: EmailJS Integration (Recommended for Production)**
To enable actual email sending, you need to:
1. Create account at [EmailJS.com](https://www.emailjs.com/)
2. Configure email service (Gmail, Outlook, etc.)
3. Update the EmailJS configuration in the code
4. Replace console.log with actual emailjs.send() calls

#### **Method 3: Server-Side Integration**
For enterprise deployment:
1. Set up SMTP server or email service
2. Create backend API endpoint for sending emails
3. Replace client-side logging with API calls

---

## 📋 **Email Content Examples**

### **Successful Login Email:**
```
Subject: 🔐 Admin Login Alert - Day-Vy Cosmetics Invoice System

SECURITY ALERT: Admin Login Detected

👤 Username: AdmiNs
🕒 Login Time: 10/21/2025, 2:30:15 PM
📅 Date: 10/21/2025
🌐 System: Day-Vy Cosmetics Invoice Management
🔒 IP Address: Client-side (Local)
💻 Browser: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
📱 Device: Desktop Computer

This is an automated security notification.
```

### **Failed Login Alert Email:**
```
Subject: 🚨 SECURITY ALERT: Failed Login Attempt - Day-Vy Cosmetics

🚨 SECURITY ALERT: UNAUTHORIZED LOGIN ATTEMPT

⚠️ Failed Login Details:
👤 Attempted Username: WrongUser
🕒 Attempt Time: 10/21/2025, 2:25:10 PM
📅 Date: 10/21/2025
🌐 System: Day-Vy Cosmetics Invoice Management
🔒 Status: ACCESS DENIED

🛡️ SECURITY RECOMMENDATIONS:
- Monitor for additional unauthorized attempts
- Verify if this was a legitimate user error
- Consider changing passwords if suspicious
```

---

## 🚀 **How to Test Email Notifications**

### **1. Test Successful Login:**
1. Go to `login.html`
2. Use credentials: `AdmiNs` / `Nimda258508-|` or `Xing` / `Sing--|`
3. Check browser console for email notification logs
4. Look for green notification popup in top-right

### **2. Test Failed Login:**
1. Go to `login.html` 
2. Enter wrong username/password
3. Check console for security alert logs
4. Look for red notification popup

### **3. Test Logout Notification:**
1. Login successfully
2. Click logout button in admin header
3. Check console for logout notification logs

### **4. Test Session Timeout:**
1. Login successfully
2. Wait 30 minutes (or modify timer for testing)
3. Check console for timeout notification logs

---

## 🔒 **Security Features**

- **Real-time Monitoring**: All login activities tracked
- **Multiple Recipients**: Notifications sent to both email addresses
- **Detailed Logging**: Comprehensive security information included
- **Device Tracking**: Browser and device information captured
- **Session Management**: Login/logout times and durations recorded
- **Automatic Alerts**: No manual intervention required

---

## 📱 **Visual Notifications**

In addition to email alerts, users see:
- **Green popup**: Successful login email sent
- **Red popup**: Security alert for failed login sent
- **Success messages**: Login/logout confirmations
- **Error messages**: Invalid credential warnings

---

## 🛠️ **For Production Deployment**

To enable actual email sending:

1. **Sign up for EmailJS**
2. **Configure your email service**
3. **Update the code with your EmailJS credentials**
4. **Test email delivery**
5. **Monitor email logs**

The system is designed to be easily upgraded from console logging to actual email delivery without changing the notification logic.

---

**📧 Notification Recipients:**
- chonghuyhak36@gmail.com  
- haksovann81@gmail.com

**🔐 System:** Day-Vy Cosmetics 241 Invoice Management