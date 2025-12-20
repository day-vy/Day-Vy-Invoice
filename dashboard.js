tailwind.config = {
    theme: {
        extend: {
            colors: {
                'primary-blue': '#1e40af', /* Darker blue for emphasis */
                'secondary-bg': '#f7f8fa',
            }
        }
    }
}

// Dashboard Script
// Use localStorage instead of Firebase for standalone dashboard
let updateInterval;

/**
 * Formats a number as currency (USD).
 * @param {number} value
 * @returns {string}
 */
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(value);
}

/**
 * Calculate dashboard metrics from localStorage invoices
 */
function calculateMetrics() {
    const invoices = JSON.parse(localStorage.getItem('savedInvoices') || '[]');
    
    // Get current month and year
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    // Filter invoices for current month
    const monthlyInvoices = invoices.filter(invoice => {
        const invoiceDate = new Date(invoice.date);
        return invoiceDate.getMonth() === currentMonth && 
               invoiceDate.getFullYear() === currentYear;
    });
    
    let totalRevenue = 0;
    let invoiceCount = monthlyInvoices.length;
    
    monthlyInvoices.forEach(invoice => {
        // Sum up the total from each invoice
        if (invoice.total && typeof invoice.total === 'number') {
            totalRevenue += invoice.total;
        }
    });
    
    const avgInvoice = invoiceCount > 0 ? totalRevenue / invoiceCount : 0;
    
    // Update UI
    document.getElementById('monthlyInvoiceCount').textContent = invoiceCount.toLocaleString();
    document.getElementById('monthlyRevenue').textContent = formatCurrency(totalRevenue);
    document.getElementById('avgInvoiceValue').textContent = formatCurrency(avgInvoice);
    document.getElementById('statusMessage').textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
}

/**
 * Initialize dashboard and set up auto-refresh
 */
function initDashboard() {
    calculateMetrics();
    
    // Update every 5 seconds to catch changes from the main app
    updateInterval = setInterval(calculateMetrics, 5000);
    
    // Listen for localStorage changes from other tabs/windows
    window.addEventListener('storage', function(e) {
        if (e.key === 'savedInvoices') {
            calculateMetrics();
        }
    });
}

/**
 * Initializes Firebase and handles user authentication.
 */
async function initFirebase() {
    // Use localStorage instead - no Firebase needed
    initDashboard();
}

/**
 * Sets up the real-time listener for the 'invoices' collection.
 */
function setupRealtimeListener() {
    // Not used - using localStorage instead
}

/**
 * Custom modal for displaying messages (replaces alert/confirm).
 */
window.showModal = function(title, message, color = 'primary-blue') {
    const modal = document.getElementById('statusModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const modalHeader = document.getElementById('modalHeader');
    const colors = {
        'green': 'bg-green-500',
        'red': 'bg-red-500',
        'orange': 'bg-yellow-500',
        'primary-blue': 'bg-primary-blue'
    };

    modalHeader.className = `p-3 rounded-t-xl text-white font-semibold ${colors[color] || 'bg-primary-blue'}`;
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.classList.remove('hidden');
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 3000);
}

window.onload = initFirebase;
