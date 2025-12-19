// Initialize invoice data
let invoiceData = {
    items: [],
    deliveryFee: 2.00 // $2 delivery fee
};

// Add product to invoice
function addProduct() {
    const productName = document.getElementById('productName').value.trim();
    const quantity = parseFloat(document.getElementById('productQuantity').value) || 0;
    const price = parseFloat(document.getElementById('productPrice').value) || 0;
    
    if (!productName) {
        alert('Please enter a product description');
        return;
    }
    
    if (quantity <= 0) {
        alert('Please enter a valid quantity');
        return;
    }
    
    if (price < 0) {
        alert('Please enter a valid price');
        return;
    }
    
    const product = {
        id: Date.now(), // Simple ID generation
        name: productName,
        quantity: quantity,
        price: price,
        total: quantity * price
    };
    
    invoiceData.items.push(product);
    
    // Clear form
    document.getElementById('productName').value = '';
    document.getElementById('productQuantity').value = '1';
    document.getElementById('productPrice').value = '';
    
    renderInvoiceItems();
    updateSummary();
}

// Remove product from invoice
function removeProduct(id) {
    invoiceData.items = invoiceData.items.filter(item => item.id !== id);
    renderInvoiceItems();
    updateSummary();
}

// Edit product quantity inline
function editQuantity(id, newQuantity) {
    const item = invoiceData.items.find(item => item.id === id);
    if (item) {
        item.quantity = parseFloat(newQuantity) || 0;
        item.total = item.quantity * item.price;
        updateSummary();
    }
}

// Edit product price inline
function editPrice(id, newPrice) {
    const item = invoiceData.items.find(item => item.id === id);
    if (item) {
        item.price = parseFloat(newPrice) || 0;
        item.total = item.quantity * item.price;
        updateSummary();
    }
}

// Edit product name inline
function editName(id, newName) {
    const item = invoiceData.items.find(item => item.id === id);
    if (item) {
        item.name = newName.trim();
    }
}

// Render invoice items in the table
function renderInvoiceItems() {
    const tbody = document.getElementById('invoiceItems');
    tbody.innerHTML = '';
    
    // Update product counter
    const productCountElement = document.getElementById('productCount');
    if (productCountElement) {
        productCountElement.textContent = invoiceData.items.length;
    }
    
    if (invoiceData.items.length === 0) {
        // Show empty state message
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
            <td colspan="6" style="text-align: center; color: #666; font-style: italic; padding: 2rem;">
                No products added yet. Click "Add Product" to get started.
            </td>
        `;
        tbody.appendChild(emptyRow);
        return;
    }
    
    invoiceData.items.forEach((item, index) => {
        const row = document.createElement('tr');
        
        // Add alternating row colors for better visibility
        if (index % 2 === 0) {
            row.style.backgroundColor = '#f8f9fa';
        }
        
        row.innerHTML = `
            <td style="text-align: center; font-weight: bold; color: #666; width: 50px;">
                ${index + 1}
            </td>
            <td>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <input type="text" value="${item.name}" 
                           onchange="editName(${item.id}, this.value)"
                           style="flex: 1; border: none; background: transparent; font-family: inherit; font-weight: 500;">
                </div>
            </td>
            <td>
                <input type="number" value="${item.quantity}" min="0" step="0.01"
                       onchange="editQuantity(${item.id}, this.value)"
                       style="width: 100%; border: none; background: transparent; text-align: center; font-weight: 500;">
            </td>
            <td>
                <input type="number" value="${item.price.toFixed(2)}" min="0" step="0.01"
                       onchange="editPrice(${item.id}, this.value)"
                       style="width: 100%; border: none; background: transparent; text-align: right; font-weight: 500;">
            </td>
            <td style="text-align: right; font-weight: bold; color: #007bff;">$${item.total.toFixed(2)}</td>
            <td style="text-align: center;">
                <button onclick="removeProduct(${item.id})" 
                        style="background: #dc3545; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 0.9rem;"
                        onmouseover="this.style.backgroundColor='#c82333'"
                        onmouseout="this.style.backgroundColor='#dc3545'">
                    Remove
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Add a subtle highlight effect to the newly added item
    if (invoiceData.items.length > 0) {
        const lastRow = tbody.lastElementChild;
        lastRow.style.transition = 'all 0.3s ease';
        lastRow.style.boxShadow = '0 0 10px rgba(0, 123, 255, 0.3)';
        setTimeout(() => {
            lastRow.style.boxShadow = 'none';
        }, 2000);
    }
    
    // Update sidebar info
    updateSidebarInfo();
}

// Update sidebar information
function updateSidebarInfo() {
    const products = Array.from(document.querySelectorAll('#invoiceTable tbody tr')).filter(row => {
        const cells = row.querySelectorAll('td');
        return cells[1] && cells[1].textContent.trim() !== '';
    });
    
    const total = parseFloat(document.getElementById('totalAmount').textContent.replace('$', '')) || 0;
    const deliveryFee = parseFloat(document.getElementById('deliveryFeeInput').value) || 0;
    const grandTotal = total + deliveryFee;
    
    // Update basic stats
    document.getElementById('productCount').textContent = products.length;
    document.getElementById('grandTotalSidebar').textContent = grandTotal.toFixed(2);
    
    // Update products list
    const productsContainer = document.querySelector('.products-summary');
    
    if (products.length === 0) {
        productsContainer.innerHTML = '<p style="color: #888; font-style: italic; text-align: center;">No products added yet</p>';
    } else {
        let productsHTML = '';
        products.forEach((row, index) => {
            const cells = row.querySelectorAll('td');
            const productName = cells[1].textContent.trim();
            const quantity = parseInt(cells[2].textContent) || 0;
            const unitPrice = parseFloat(cells[3].textContent.replace('$', '')) || 0;
            const total = quantity * unitPrice;
            
            productsHTML += `
                <div class="product-item">
                    <span class="product-name">${productName}</span>
                    <span class="product-qty">×${quantity}</span>
                    <span class="product-total">$${total.toFixed(2)}</span>
                </div>
            `;
        });
        productsContainer.innerHTML = productsHTML;
    }
    
    // Update monthly stats
    updateMonthlyStats();
}

function updateMonthlyStats() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    // Get all saved invoices from localStorage
    let monthlyInvoices = [];
    let monthlyRevenue = 0;
    
    try {
        const savedInvoices = JSON.parse(localStorage.getItem('savedInvoices') || '[]');
        
        savedInvoices.forEach(invoice => {
            const invoiceDate = new Date(invoice.date || invoice.createdAt);
            
            if (invoiceDate.getMonth() === currentMonth && invoiceDate.getFullYear() === currentYear) {
                monthlyInvoices.push(invoice);
                monthlyRevenue += invoice.total || 0;
            }
        });
    } catch (error) {
        console.log('Error reading monthly stats:', error);
    }
    
    const averageInvoice = monthlyInvoices.length > 0 ? (monthlyRevenue / monthlyInvoices.length) : 0;
    
    // Update monthly stats display
    document.getElementById('monthlyInvoices').textContent = monthlyInvoices.length;
    document.getElementById('monthlyRevenue').textContent = monthlyRevenue.toFixed(2);
    document.getElementById('averageInvoice').textContent = averageInvoice.toFixed(2);
}

// Update invoice summary
function updateSummary() {
    const subtotal = invoiceData.items.reduce((sum, item) => sum + item.total, 0);
    const total = subtotal + invoiceData.deliveryFee;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    
    // Update delivery fee input to match current value
    const deliveryInput = document.getElementById('deliveryFeeInput');
    if (deliveryInput) {
        deliveryInput.value = invoiceData.deliveryFee.toFixed(2);
    }
    
    // Update print version of delivery fee
    const deliveryPrint = document.getElementById('deliveryFeePrint');
    if (deliveryPrint) {
        deliveryPrint.textContent = `$${invoiceData.deliveryFee.toFixed(2)}`;
    }
    
    // Update sidebar info
    updateSidebarInfo();
}

// Update delivery fee when input changes
function updateDeliveryFee(newFee) {
    const fee = parseFloat(newFee) || 0;
    const deliveryInput = document.getElementById('deliveryFeeInput');
    
    // Update the delivery fee in the data
    invoiceData.deliveryFee = fee;
    
    // Update print version immediately
    const deliveryPrint = document.getElementById('deliveryFeePrint');
    if (deliveryPrint) {
        deliveryPrint.textContent = `$${fee.toFixed(2)}`;
    }
    
    // Add visual feedback
    if (deliveryInput) {
        deliveryInput.classList.add('changed');
        setTimeout(() => {
            deliveryInput.classList.remove('changed');
        }, 1500);
    }
    
    // Update the summary
    updateSummary();
    
    // Update sidebar info
    updateSidebarInfo();
    
    // Show brief confirmation for significant changes
    if (fee !== 2.00) { // 2.00 is the default
        console.log(`Delivery fee updated to $${fee.toFixed(2)}`);
    }
}

// Set today's date
function setTodayDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('invoiceDate').value = today;
}

// Generate invoice number
function generateInvoiceNumber() {
    const date = new Date();
    const timestamp = date.getTime().toString().slice(-6);
    const invoiceNumber = `INV-${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}-${timestamp}`;
    document.getElementById('invoiceNumber').value = invoiceNumber;
}

// Print invoice
function printInvoice() {
    // Add a small delay to ensure print styles are applied
    setTimeout(() => {
        window.print();
    }, 100);
}

// Clear all items
function clearInvoice() {
    if (confirm('Are you sure you want to clear all items?')) {
        invoiceData.items = [];
        renderInvoiceItems();
        updateSummary();
    }
}

// Save invoice to localStorage
function saveInvoice() {
    const invoiceNumber = document.getElementById('invoiceNumber').value;
    if (!invoiceNumber) {
        alert('Please enter an invoice number');
        return;
    }
    
    const invoiceToSave = {
        number: invoiceNumber,
        date: document.getElementById('invoiceDate').value,
        items: invoiceData.items,
        deliveryFee: invoiceData.deliveryFee
    };
    
    localStorage.setItem(`invoice_${invoiceNumber}`, JSON.stringify(invoiceToSave));
    alert('Invoice saved successfully!');
}

// Load invoice from localStorage
function loadInvoice() {
    const invoiceNumber = prompt('Enter invoice number to load:');
    if (!invoiceNumber) return;
    
    const saved = localStorage.getItem(`invoice_${invoiceNumber}`);
    if (saved) {
        try {
            const invoice = JSON.parse(saved);
            document.getElementById('invoiceNumber').value = invoice.number;
            document.getElementById('invoiceDate').value = invoice.date;
            invoiceData.items = invoice.items || [];
            invoiceData.deliveryFee = invoice.deliveryFee || 2.00;
            renderInvoiceItems();
            updateSummary();
            alert('Invoice loaded successfully!');
        } catch (e) {
            alert('Error loading invoice');
        }
    } else {
        alert('Invoice not found');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setTodayDate();
    generateInvoiceNumber();
    updateSummary();
    updateSidebarInfo();
    
    // Check if a product was added from the product page
    checkForNewProduct();
    // Load any saved invoice data
    loadSavedInvoiceData();
});

// Load saved invoice data from localStorage
function loadSavedInvoiceData() {
    const savedInvoiceData = JSON.parse(localStorage.getItem('invoiceData')) || { items: [], deliveryFee: 2.00 };
    
    console.log('Loading saved invoice data:', savedInvoiceData); // Debug log
    
    if (savedInvoiceData.items.length > 0) {
        console.log(`Found ${savedInvoiceData.items.length} items to load`); // Debug log
        
        // Add all saved items to the current invoice
        savedInvoiceData.items.forEach((item, index) => {
            // Add the product to the invoice data
            const newItem = {
                id: item.id || (Date.now() + index), // Ensure unique IDs
                name: item.name,
                description: item.description,
                quantity: item.quantity,
                price: item.price,
                total: item.quantity * item.price,
                category: item.category,
                isCustom: item.isCustom || false
            };
            
            console.log('Adding item to invoice:', newItem); // Debug log
            invoiceData.items.push(newItem);
        });
        
        // Clear the saved data after loading
        localStorage.removeItem('invoiceData');
        
        // Update the display
        renderInvoiceItems();
        updateSummary();
        
        console.log('Finished updating display with new items'); // Debug log
        
        // Add a slight delay to ensure rendering is complete
        setTimeout(() => {
            // Show success message for added products
            const productCount = savedInvoiceData.items.length;
            const productNames = savedInvoiceData.items.map(item => item.name).join(', ');
            
            console.log(`Showing success for ${productCount} products: ${productNames}`); // Debug log
            
            if (productCount === 1) {
                showSuccessMessage(savedInvoiceData.items[0].name, savedInvoiceData.items[0].quantity, savedInvoiceData.items[0].price);
            } else {
                alert(`✅ ${productCount} custom products have been added to your invoice: ${productNames}`);
            }
            
            // Highlight the newly added items
            highlightNewItems(productCount);
        }, 100);
    }
}

// Highlight newly added items in the invoice table
function highlightNewItems(count) {
    const tbody = document.getElementById('invoiceItems');
    if (!tbody) return;
    
    const rows = tbody.getElementsByTagName('tr');
    const startIndex = Math.max(0, rows.length - count);
    
    // Add highlight effect to the last 'count' rows
    for (let i = startIndex; i < rows.length; i++) {
        const row = rows[i];
        if (row) {
            row.style.transition = 'all 0.5s ease';
            row.style.backgroundColor = '#e8f5e8';
            row.style.boxShadow = '0 0 15px rgba(40, 167, 69, 0.4)';
            
            // Remove highlight after 3 seconds
            setTimeout(() => {
                row.style.backgroundColor = i % 2 === 0 ? '#f8f9fa' : 'white';
                row.style.boxShadow = 'none';
            }, 3000);
        }
    }
}

// Check for newly added product from product page
function checkForNewProduct() {
    const newProduct = sessionStorage.getItem('newProduct');
    if (newProduct) {
        try {
            const product = JSON.parse(newProduct);
            
            // Add the product to the invoice
            invoiceData.items.push(product);
            
            // Clear the session storage
            sessionStorage.removeItem('newProduct');
            
            // Update the display
            renderInvoiceItems();
            updateSummary();
            
            // Show enhanced success message with product details
            const successMessage = `✅ Product Added Successfully!

Product: ${product.name}
Quantity: ${product.quantity}
Price: $${product.price.toFixed(2)}
Total: $${product.total.toFixed(2)}

The product has been added to your invoice and is now visible in the table above.`;
            
            alert(successMessage);
            
            // Scroll to the invoice table to show the new product
            const invoiceTable = document.getElementById('invoiceTable');
            if (invoiceTable) {
                invoiceTable.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
        } catch (e) {
            console.error('Error loading new product:', e);
            alert('There was an error adding the product to your invoice. Please try again.');
        }
    }
    
    // Check for success parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('productAdded') === 'true') {
        // Clean up the URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}




// Product database with categories (including category images)
const productDatabase = {
    "CeraVe": {
        categoryImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=200&fit=crop",
        products: [
            {
                id: 1,
                name: "CeraVe Hydrating Cleanser 237ml",
                description: "Gentle hydrating cleanser for normal to dry skin",
                defaultPrice: 15.00,
                image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop",
                
            },
            {
                id: 2,
                name: "CeraVe Hydrating Cleanser 355ml",
                description: "Gentle hydrating cleanser for normal to dry skin",
                defaultPrice: 17.00,
                image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop",
                
            },
            {
                id: 3,
                name: "CeraVe Hydrating Cleanser 473ml",
                description: "Gentle hydrating cleanser for normal to dry skin",
                defaultPrice: 20.00,
                image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop",
                
            },
            {
                id: 4,
                name: "CeraVe Foaming Cleanser 237ml",
                description: "Foaming facial cleanser for normal to oily skin",
                defaultPrice: 15.00,
                image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop",
                
            },
            {
                id: 5,
                name: "CeraVe Foaming Cleanser 355ml",
                description: "Foaming facial cleanser for normal to oily skin",
                defaultPrice: 17.00,
                image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop",
                
            },
            {
                id: 6,
                name: "CeraVe Foaming Cleanser 473ml",
                description: "Foaming facial cleanser for normal to oily skin",
                defaultPrice: 20.00,
                image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop",
                
            },
            {
                id: 7,
                name: "CeraVe Cream to Foam Cleanser 237ml",
                description: "Transforms from cream to foam while cleansing",
                defaultPrice: 15.00,
                image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop",
                
            },
            {
                id: 8,
                name: "CeraVe Cream to Foam Cleanser 355ml",
                description: "Transforms from cream to foam while cleansing",
                defaultPrice: 17.00,
                image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop",
                
            },
            {
                id: 9,
                name: "CeraVe Cream to Foam Cleanser 473ml",
                description: "Transforms from cream to foam while cleansing",
                defaultPrice: 20.00,
                image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop",
                
            },
            {
                id: 10,
                name: "CeraVe Acne Control Cleanser 237ml",
                description: "Acne control cleanser with salicylic acid",
                defaultPrice: 17.00,
                image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop",
                
            },
            {
                id: 11,
                name: "CeraVe Acne Control Cleanser 355ml",
                description: "Acne control cleanser with salicylic acid",
                defaultPrice: 20.00,
                image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop",
                
            },
            {
                id: 12,
                name: "CeraVe Acne Control Cleanser 473ml",
                description: "Acne control cleanser with salicylic acid",
                defaultPrice: 24.00,
                image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop",
                
            },
            {
                id: 13,
                name: "CeraVe SA Cleanser 237ml",
                description: "Salicylic acid cleanser for smooth skin texture",
                defaultPrice: 17.00,
                image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop",
                
            },
            {
                id: 14,
                name: "CeraVe SA Cleanser 355ml",
                description: "Salicylic acid cleanser for smooth skin texture",
                defaultPrice: 20.00,
                image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop",
                
            },
            {
                id: 15,
                name: "CeraVe SA Cleanser 473ml",
                description: "Salicylic acid cleanser for smooth skin texture",
                defaultPrice: 22.00,
                image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop",
                
            },
            {
                id: 16,
                name: "CeraVe Acne Foaming Cleanser 4%",
                description: "4% benzoyl peroxide acne foaming cleanser",
                defaultPrice: 18.00,
                image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=250&fit=crop",
                
            },
            {
                id: 17,
                name: "CeraVe Acne Foaming Cleanser 10%",
                description: "10% benzoyl peroxide acne foaming cleanser",
                defaultPrice: 18.00,
                image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=250&fit=crop",
                
            },
            {
                id: 18,
                name: "CeraVe Vitamin C Serum",
                description: "Brightening vitamin C serum for radiant skin",
                defaultPrice: 18.00,
                image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop",
                
            },
            {
                id: 19,
                name: "CeraVe Hyaluronic Acid Serum",
                description: "Hydrating hyaluronic acid serum",
                defaultPrice: 18.00,
                image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop",
                
            },
            {
                id: 20,
                name: "CeraVe Resurfacing Retinol Serum",
                description: "Anti-aging retinol serum for skin renewal",
                defaultPrice: 18.00,
                image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop",
                
            },
            {
                id: 21,
                name: "CeraVe Renewing Retinol Serum",
                description: "Renewing retinol serum for smoother skin",
                defaultPrice: 18.00,
                image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop",
                
            },
            {
                id: 22,
                name: "CeraVe AM",
                description: "Morning facial moisturizing lotion with SPF",
                defaultPrice: 16.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 23,
                name: "CeraVe PM",
                description: "Night facial moisturizing lotion",
                defaultPrice: 16.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 24,
                name: "CeraVe Moisturizing Lotion 237ml",
                description: "Daily facial and body moisturizing lotion",
                defaultPrice: 15.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 25,
                name: "CeraVe Moisturizing Lotion 355ml",
                description: "Daily facial and body moisturizing lotion",
                defaultPrice: 17.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 26,
                name: "CeraVe Moisturizing Lotion 473ml",
                description: "Daily facial and body moisturizing lotion",
                defaultPrice: 20.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 27,
                name: "CeraVe Moisturizing Aloe Vera 237ml",
                description: "Moisturizing lotion with soothing aloe vera",
                defaultPrice: 16.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 28,
                name: "CeraVe Moisturizing Aloe Vera 355ml",
                description: "Moisturizing lotion with soothing aloe vera",
                defaultPrice: 18.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 29,
                name: "CeraVe Moisturizing Aloe Vera 473ml",
                description: "Moisturizing lotion with soothing aloe vera",
                defaultPrice: 21.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 30,
                name: "CeraVe Moisturizing Cream 236ml",
                description: "Rich moisturizing cream for dry skin",
                defaultPrice: 16.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 31,
                name: "CeraVe Moisturizing Cream Set",
                description: "Complete moisturizing cream set",
                defaultPrice: 36.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 32,
                name: "CeraVe SA Cream 340g",
                description: "Salicylic acid cream for rough & bumpy skin",
                defaultPrice: 20.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 33,
                name: "CeraVe SA Lotion 237ml",
                description: "Salicylic acid lotion for body",
                defaultPrice: 18.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 34,
                name: "CeraVe Hydrating Mineral Sunscreen 75ml",
                description: "Broad spectrum SPF 30 mineral sunscreen",
                defaultPrice: 16.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 35,
                name: "CeraVe Hydrating Toner 200ml",
                description: "Hydrating facial toner with ceramides",
                defaultPrice: 16.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 36,
                name: "CeraVe Micellar Water 296ml",
                description: "3-in-1 micellar cleansing water",
                defaultPrice: 16.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 39,
                name: "CeraVe Night Cream",
                description: "Overnight recovery night cream",
                defaultPrice: 18.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 40,
                name: "CeraVe Repair Eye Cream",
                description: "Eye repair cream for dark circles",
                defaultPrice: 15.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 41,
                name: "CeraVe Renewing Eye Cream",
                description: "Renewing eye cream with peptides",
                defaultPrice: 16.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 42,
                name: "CeraVe Acne Control Gel",
                description: "Acne control gel treatment",
                defaultPrice: 16.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            }
        ]
    },
    "Dermatology Brands": {
        categoryImage: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=300&h=200&fit=crop",
        products: [
            {
                id: 45,
                name: "Differin Gel 15g",
                description: "Adapalene gel 0.1% for acne treatment",
                defaultPrice: 16.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 46,
                name: "Differin Gel 45g",
                description: "Adapalene gel 0.1% for acne treatment",
                defaultPrice: 20.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 48,
                name: "Cetaphil Gentle Skin Cleanser Set",
                description: "Complete gentle cleanser set",
                defaultPrice: 30.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 49,
                name: "Cetaphil Gentle Skin Cleanser 591ml",
                description: "Large size gentle skin cleanser",
                defaultPrice: 16.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 50,
                name: "Cetaphil Gentle Skin Cleanser 125ml",
                description: "Travel size gentle skin cleanser",
                defaultPrice: 9.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 51,
                name: "Cetaphil Moisturizing Lotion Set",
                description: "Complete moisturizing lotion set",
                defaultPrice: 32.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 52,
                name: "Cetaphil Moisturizing Cream Set",
                description: "Complete moisturizing cream set",
                defaultPrice: 32.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 55,
                name: "Cetaphil Daily Facial Cleanser 473ml",
                description: "Daily facial cleanser for all skin types",
                defaultPrice: 18.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 56,
                name: "Cetaphil Derma Control 237ml",
                description: "Derma control cleanser for acne-prone skin",
                defaultPrice: 14.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 57,
                name: "Cetaphil Oil Removing Foam Wash 237ml",
                description: "Oil removing foam wash for oily skin",
                defaultPrice: 14.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 58,
                name: "Cetaphil Baby Lotion Set",
                description: "Gentle baby lotion set",
                defaultPrice: 26.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 62,
                name: "Cetaphil Daily Oil Free",
                description: "Daily oil-free moisturizer",
                defaultPrice: 17.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 63,
                name: "Cetaphil PM",
                description: "Night moisturizer for sensitive skin",
                defaultPrice: 16.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 64,
                name: "Cetaphil Daily Facial Moisturizer SPF35",
                description: "Daily moisturizer with SPF 35 protection",
                defaultPrice: 17.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 65,
                name: "Cetaphil Daily Facial Moisturizer SPF15",
                description: "Daily moisturizer with SPF 15 protection",
                defaultPrice: 17.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 66,
                name: "Cetaphil Daily Facial Moisturizer SPF50",
                description: "Daily moisturizer with SPF 50 protection",
                defaultPrice: 17.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            }
        ]
    },
    "Deodorants & Antiperspirants": {
        categoryImage: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=200&fit=crop",
        products: [
            {
                id: 194,
                name: "Degree Black Man",
                description: "48-hour protection antiperspirant for men",
                defaultPrice: 8.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 196,
                name: "Secret Gel",
                description: "Clear gel antiperspirant for women",
                defaultPrice: 7.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 197,
                name: "Secret Gel Ocean Breeze",
                description: "Ocean breeze scented clear gel",
                defaultPrice: 7.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 200,
                name: "Secret Gel Unscented",
                description: "Unscented clear gel antiperspirant",
                defaultPrice: 7.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 202,
                name: "Secret Clinical Strength Soft Set",
                description: "Clinical strength soft solid set",
                defaultPrice: 12.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 206,
                name: "Old Spice Pure Sport Set",
                description: "Complete deodorant and body wash set",
                defaultPrice: 15.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 207,
                name: "Old Spice Swagger Set",
                description: "Swagger scented deodorant and body wash set",
                defaultPrice: 15.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 208,
                name: "Old Spice Deodorant 73g",
                description: "Classic Old Spice deodorant stick",
                defaultPrice: 6.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 212,
                name: "Etiaxil Protection 48h",
                description: "48-hour protection antiperspirant",
                defaultPrice: 12.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 213,
                name: "Etiaxil Sensitive",
                description: "Antiperspirant for sensitive skin",
                defaultPrice: 12.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 214,
                name: "Etiaxil Extreme",
                description: "Extra strong antiperspirant",
                defaultPrice: 15.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 225,
                name: "Secret Clinical Strength 45g",
                description: "Clinical strength antiperspirant",
                defaultPrice: 10.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            }
        ]
    },
    "Body Care": {
        categoryImage: "https://images.unsplash.com/photo-1556228149-d75f6723364e?w=300&h=200&fit=crop",
        products: [
            {
                id: 234,
                name: "Dove Body Wash Men",
                description: "Moisturizing body wash for men",
                defaultPrice: 8.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 235,
                name: "Dove Scrub 298g",
                description: "Exfoliating body scrub",
                defaultPrice: 9.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 239,
                name: "Dove Scrub 450g Brown Sugar",
                description: "Brown sugar exfoliating body scrub",
                defaultPrice: 12.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 251,
                name: "Dove Body Wash Hydration 6%",
                description: "Deep hydration body wash",
                defaultPrice: 8.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 252,
                name: "Dove Body Wash Vitality",
                description: "Energizing vitality body wash",
                defaultPrice: 8.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 262,
                name: "St. Ives Body Lemon Orange",
                description: "Energizing citrus body scrub",
                defaultPrice: 7.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 267,
                name: "St. Ives Facial Avocado",
                description: "Nourishing avocado face scrub",
                defaultPrice: 6.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 268,
                name: "St. Ives Facial Green Tea",
                description: "Antioxidant green tea face scrub",
                defaultPrice: 6.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 313,
                name: "Olay Niacinamide Cream",
                description: "Anti-aging cream with niacinamide",
                defaultPrice: 15.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 314,
                name: "Olay Vitamin C Cream",
                description: "Brightening vitamin C facial cream",
                defaultPrice: 15.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 315,
                name: "Olay Retinol Cream",
                description: "Anti-aging retinol night cream",
                defaultPrice: 16.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 323,
                name: "Olay Super Serum 5 in 1",
                description: "Multi-benefit facial serum",
                defaultPrice: 20.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 336,
                name: "Olay Body Wash",
                description: "Moisturizing body wash",
                defaultPrice: 8.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 350,
                name: "Irish Spring Original 946ml",
                description: "Classic deodorizing body wash",
                defaultPrice: 10.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            }
        ]
    },
    "Fragrances & Body Mists": {
        categoryImage: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=200&fit=crop",
        products: [
            {
                id: 278,
                name: "Fragrance Lotion Champagne",
                description: "Champagne scented body lotion",
                defaultPrice: 12.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 279,
                name: "Fragrance Lotion Sweet Pea",
                description: "Sweet pea scented body lotion",
                defaultPrice: 12.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 284,
                name: "Fragrance Lotion Into the Night",
                description: "Into the night scented body lotion",
                defaultPrice: 12.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 291,
                name: "Victoria Secret Pure Seduction Pink",
                description: "Pure seduction pink body mist",
                defaultPrice: 15.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 292,
                name: "Victoria Secret Velvet Petale",
                description: "Velvet petale fragrance mist",
                defaultPrice: 15.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 294,
                name: "Victoria Secret Love Spell",
                description: "Love spell fragrance mist",
                defaultPrice: 15.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 295,
                name: "Victoria Secret Rose",
                description: "Rose scented body mist",
                defaultPrice: 15.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 296,
                name: "Victoria Secret Bare Vanilla",
                description: "Bare vanilla fragrance mist",
                defaultPrice: 15.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 297,
                name: "Victoria Secret Body Mist",
                description: "Classic Victoria's Secret body mist",
                defaultPrice: 15.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 306,
                name: "Aroma Lotion Rose and Vanilla",
                description: "Rose and vanilla aromatherapy lotion",
                defaultPrice: 10.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 308,
                name: "Aroma Lotion Stress Relief",
                description: "Stress relief aromatherapy lotion",
                defaultPrice: 10.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            }
        ]
    },
    "Oral Care": {
        categoryImage: "https://images.unsplash.com/photo-1609087737387-5e9b15bcf16a?w=300&h=200&fit=crop",
        products: [
            {
                id: 361,
                name: "Crest Brilliance Set",
                description: "Complete teeth whitening set",
                defaultPrice: 25.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 362,
                name: "Crest Brilliance Charcoal",
                description: "Charcoal whitening toothpaste",
                defaultPrice: 8.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 365,
                name: "Sensodyne Advanced White Set",
                description: "Sensitive teeth whitening set",
                defaultPrice: 20.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 367,
                name: "Crest 3D White Set",
                description: "3D whitening toothpaste set",
                defaultPrice: 18.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 368,
                name: "Colgate Max Fresh Set",
                description: "Maximum freshness toothpaste set",
                defaultPrice: 15.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 369,
                name: "Colgate Total Set",
                description: "Total protection toothpaste set",
                defaultPrice: 15.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 370,
                name: "TheraBreath Mouthwash",
                description: "Fresh breath oral rinse",
                defaultPrice: 12.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 371,
                name: "TheraBreath Anti-Cavity Pink",
                description: "Anti-cavity mouthwash",
                defaultPrice: 12.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 372,
                name: "TheraBreath Healthy Gum Blue",
                description: "Healthy gum oral rinse",
                defaultPrice: 12.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 376,
                name: "Arm & Hammer Complete Care",
                description: "Complete care toothpaste",
                defaultPrice: 7.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 377,
                name: "Arm & Hammer PeroxiCare",
                description: "Peroxide whitening toothpaste",
                defaultPrice: 7.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            }
        ]
    },
    "Lip Care & Healing": {
        categoryImage: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300&h=200&fit=crop",
        products: [
            {
                id: 380,
                name: "Vaseline Lip Balm Cherry",
                description: "Cherry flavored lip balm",
                defaultPrice: 3.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 381,
                name: "Vaseline Lip Balm Original",
                description: "Original petroleum jelly lip balm",
                defaultPrice: 3.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 382,
                name: "Vaseline Lip Balm Rosy",
                description: "Rosy pink tinted lip balm",
                defaultPrice: 3.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 385,
                name: "Vaseline Healing Jelly 368g",
                description: "Original healing petroleum jelly",
                defaultPrice: 8.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 386,
                name: "Vaseline Healing Jelly Baby 368g",
                description: "Gentle baby petroleum jelly",
                defaultPrice: 8.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 388,
                name: "Vaseline USA Lotion 725ml",
                description: "Intensive care body lotion",
                defaultPrice: 12.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 394,
                name: "Carmex Original Lip Balm",
                description: "Classic medicated lip balm",
                defaultPrice: 4.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 395,
                name: "Carmex Lip Balm Flavor",
                description: "Flavored medicated lip balm",
                defaultPrice: 4.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 396,
                name: "ChapStick Classic Cherry",
                description: "Cherry flavored lip moisturizer",
                defaultPrice: 3.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 397,
                name: "ChapStick Classic Original",
                description: "Original lip moisturizer",
                defaultPrice: 3.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 398,
                name: "ChapStick Moisturizer",
                description: "Extra moisturizing lip balm",
                defaultPrice: 4.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            }
        ]
    },
    "Specialty & Miscellaneous": {
        categoryImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop",
        products: [
            {
                id: 426,
                name: "Advanced Clinical Vitamin C Serum",
                description: "Professional vitamin C anti-aging serum",
                defaultPrice: 20.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 427,
                name: "Advanced Clinical Vitamin C Cream",
                description: "Professional vitamin C anti-aging cream",
                defaultPrice: 18.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 430,
                name: "Melatonin 5% Cream",
                description: "Anti-aging melatonin night cream",
                defaultPrice: 15.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 432,
                name: "The Ordinary Peeling Solution",
                description: "AHA 30% + BHA 2% peeling solution",
                defaultPrice: 12.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 433,
                name: "The Ordinary Niacinamide Solution",
                description: "Niacinamide 10% + zinc 1% serum",
                defaultPrice: 10.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 408,
                name: "Vagisil Intimate Wash",
                description: "Gentle intimate cleansing wash",
                defaultPrice: 8.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 413,
                name: "Femfresh Daily Wash",
                description: "Daily intimate wash",
                defaultPrice: 8.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 422,
                name: "Olea Cotton Pad",
                description: "Soft cotton pads for makeup removal",
                defaultPrice: 5.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 423,
                name: "Aura Cotton Pad",
                description: "Premium cotton pads",
                defaultPrice: 5.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 440,
                name: "Neutrogena Hydroboost Water Gel",
                description: "Hydrating water gel moisturizer",
                defaultPrice: 15.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 444,
                name: "RoC Daily Serum Vitamin C",
                description: "Daily vitamin C brightening serum",
                defaultPrice: 22.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 445,
                name: "RoC Hyaluronic Serum",
                description: "Hydrating hyaluronic acid serum",
                defaultPrice: 22.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 446,
                name: "RoC Advanced Retinol Cream",
                description: "Advanced anti-aging retinol cream",
                defaultPrice: 25.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 448,
                name: "L'Oreal Collagen Moisturizer",
                description: "Anti-aging collagen moisturizer",
                defaultPrice: 14.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            },
            {
                id: 449,
                name: "L'Oreal Eye Serum Caffeine",
                description: "Caffeine eye serum for dark circles",
                defaultPrice: 12.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=250&fit=crop", 
            }
        ]
    }
};

// Toggle product catalog visibility
function toggleProductCatalog() {
    const catalogOverlay = document.getElementById('catalogOverlay');
    
    if (catalogOverlay) {
        if (catalogOverlay.style.display === 'none' || catalogOverlay.style.display === '') {
            // Show catalog
            catalogOverlay.style.display = 'flex';
            renderProductCatalog();
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        } else {
            // Hide catalog
            catalogOverlay.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    }
}

// Sidebar wrapper functions
function showProductCatalog() {
    const catalogOverlay = document.getElementById('catalogOverlay');
    if (catalogOverlay) {
        catalogOverlay.style.display = 'flex';
        renderProductCatalog();
    }
}

function showCustomProductForm() {
    const overlay = document.getElementById('customProductOverlay');
    if (overlay) {
        overlay.style.display = 'flex';
        clearCustomProductForm();
    }
}

// Setup search and filter functionality
function setupCatalogSearch() {
    const searchInput = document.getElementById('productSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    
    // Clear any existing filters
    if (searchInput) searchInput.value = '';
    if (categoryFilter) categoryFilter.value = '';
    
    updateResultCount();
}

function filterProducts() {
    const searchTerm = document.getElementById('productSearch').value.toLowerCase();
    const selectedCategory = document.getElementById('categoryFilter').value;
    
    let filteredProducts = {};
    let totalProductCount = 0;
    
    // Filter products based on search and category
    Object.keys(products).forEach(categoryName => {
        // Skip if category filter is active and doesn't match
        if (selectedCategory && categoryName !== selectedCategory) {
            return;
        }
        
        const categoryProducts = products[categoryName].items.filter(product => {
            const matchesSearch = !searchTerm || 
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm);
            
            return matchesSearch;
        });
        
        if (categoryProducts.length > 0) {
            filteredProducts[categoryName] = {
                ...products[categoryName],
                items: categoryProducts
            };
            totalProductCount += categoryProducts.length;
        }
    });
    
    // Render filtered products
    renderFilteredProducts(filteredProducts, totalProductCount);
    updateResultCount(totalProductCount);
}

function renderFilteredProducts(filteredProducts, totalCount) {
    const catalogContainer = document.getElementById('productCatalog');
    
    if (Object.keys(filteredProducts).length === 0) {
        catalogContainer.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: #666;">
                <h3>No products found</h3>
                <p>Try adjusting your search terms or category filter.</p>
            </div>
        `;
        return;
    }
    
    catalogContainer.innerHTML = Object.keys(filteredProducts).map(categoryName => {
        const category = filteredProducts[categoryName];
        return `
            <div class="category-section">
                <div class="category-header">
                    <img src="${category.image}" alt="${categoryName}" class="category-image">
                    <h3 class="category-title">${categoryName} (${category.items.length})</h3>
                </div>
                <div class="products-grid">
                    ${category.items.map(product => `
                        <div class="product-card">
                            <div class="product-image-container">
                                <img src="${product.image}" alt="${product.name}" class="product-image">
                            </div>
                            <div class="product-info">
                                <h4 class="product-name">${product.name}</h4>
                                <p class="product-description">${product.description}</p>
                                <span class="default-price">Default: $${product.defaultPrice.toFixed(2)}</span>
                            </div>
                            <div class="product-controls">
                                <div class="controls-header">
                                    <h4>Add to Invoice</h4>
                                </div>
                                <div class="control-row">
                                    <label class="control-label">Qty:</label>
                                    <input type="number" class="control-input" value="1" min="1" id="qty-${product.id}">
                                </div>
                                <div class="control-row">
                                    <label class="control-label">Price:</label>
                                    <input type="number" class="control-input" value="${product.defaultPrice.toFixed(2)}" step="0.01" min="0" id="price-${product.id}">
                                </div>
                                <div class="total-row">
                                    <div class="total-display" id="total-${product.id}">
                                        Total: $${product.defaultPrice.toFixed(2)}
                                    </div>
                                </div>
                            </div>
                            <button class="add-to-invoice-btn" onclick="addToInvoice('${product.id}', '${product.name}', '${product.description}', '${product.image}')">
                                ➕ Add to Invoice
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
    
    // Re-setup product control listeners
    setupProductControls();
}

function clearProductSearch() {
    document.getElementById('productSearch').value = '';
    document.getElementById('categoryFilter').value = '';
    filterProducts();
}

function updateResultCount(count) {
    const resultCountElement = document.getElementById('resultCount');
    if (resultCountElement) {
        if (count !== undefined) {
            resultCountElement.textContent = `${count} product${count !== 1 ? 's' : ''}`;
        } else {
            // Count all products
            const totalProducts = Object.values(products).reduce((sum, category) => sum + category.items.length, 0);
            resultCountElement.textContent = `${totalProducts} products`;
        }
    }
}

// Update product description
function updateProductDescription(productId, newDescription) {
    for (const category in productDatabase) {
        const product = productDatabase[category].products.find(p => p.id == productId);
        if (product) {
            product.description = newDescription.trim();
            break;
        }
    }
}

// Search products within a specific category
function searchCategoryProducts(category, searchTerm) {
    const categoryData = productDatabase[category];
    const grid = document.getElementById(`grid-${category}`);
    const countElement = document.getElementById(`count-${category}`);
    
    if (!categoryData || !grid || !countElement) return;
    
    const filteredProducts = categoryData.products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    // Update product grid
    grid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
    
    // Update count
    countElement.textContent = `${filteredProducts.length} products`;
    
    // Show suggestions if search term exists
    if (searchTerm.trim()) {
        showCategorySuggestions(category, searchTerm);
    }
}

// Show search suggestions for a category
function showCategorySuggestions(category, searchTerm) {
    const suggestionsContainer = document.getElementById(`suggestions-${category}`);
    const categoryData = productDatabase[category];
    
    if (!suggestionsContainer || !categoryData || !searchTerm.trim()) {
        if (suggestionsContainer) suggestionsContainer.style.display = 'none';
        return;
    }
    
    // Get matching products
    const suggestions = categoryData.products
        .filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 5); // Limit to 5 suggestions
    
    if (suggestions.length === 0) {
        suggestionsContainer.style.display = 'none';
        return;
    }
    
    suggestionsContainer.innerHTML = suggestions.map(product => `
        <div class="suggestion-item" onclick="selectSuggestion('${category}', '${product.name.replace(/'/g, "\\'")}')">
            <div class="suggestion-name">${highlightMatch(product.name, searchTerm)}</div>
        </div>
    `).join('');
    
    suggestionsContainer.style.display = 'block';
}

// Hide suggestions for a category
function hideCategorySuggestions(category) {
    setTimeout(() => {
        const suggestionsContainer = document.getElementById(`suggestions-${category}`);
        if (suggestionsContainer) {
            suggestionsContainer.style.display = 'none';
        }
    }, 200); // Small delay to allow clicking on suggestions
}

// Select a suggestion
function selectSuggestion(category, productName) {
    const searchInput = document.getElementById(`search-${category}`);
    const suggestionsContainer = document.getElementById(`suggestions-${category}`);
    
    if (searchInput) {
        searchInput.value = productName;
        searchCategoryProducts(category, productName);
    }
    
    if (suggestionsContainer) {
        suggestionsContainer.style.display = 'none';
    }
}

// Highlight matching text in suggestions
function highlightMatch(text, searchTerm) {
    if (!searchTerm.trim()) return text;
    
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<strong>$1</strong>');
}

// Clear category search
function clearCategorySearch(category) {
    const searchInput = document.getElementById(`search-${category}`);
    if (searchInput) {
        searchInput.value = '';
        searchCategoryProducts(category, '');
    }
    hideCategorySuggestions(category);
}


// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// Toggle category dropdown with auto-close functionality
function toggleCategoryDropdown(category) {
    // Close all other dropdowns first
    Object.keys(productDatabase).forEach(cat => {
        if (cat !== category) {
            const container = document.getElementById(`products-${cat}`);
            const arrow = document.getElementById(`arrow-${cat}`);
            if (container) {
                container.style.display = 'none';
                if (arrow) arrow.innerHTML = '▼';
            }
        }
    });
    
    // Toggle the clicked category
    const container = document.getElementById(`products-${category}`);
    const arrow = document.getElementById(`arrow-${category}`);
    
    if (container && arrow) {
        if (container.style.display === 'none') {
            container.style.display = 'block';
            arrow.innerHTML = '▲';
        } else {
            container.style.display = 'none';
            arrow.innerHTML = '▼';
        }
    }
}

// Render the product catalog with collapsible dropdowns
function renderProductCatalog() {
    const catalog = document.getElementById('productCatalog');
    catalog.innerHTML = '';
    
    Object.keys(productDatabase).forEach(category => {
        const categoryData = productDatabase[category];
        const categorySection = document.createElement('div');
        categorySection.className = 'category-section';
        
        categorySection.innerHTML = `
            <div class="category-dropdown">
                <div class="category-header" onclick="toggleCategoryDropdown('${category}')">
                    <img src="${categoryData.categoryImage}" alt="${category}" class="category-image" 
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjhGOUZBIi8+CjxwYXRoIGQ9Ik0xMjUgNzVIMTc1VjEyNUgxMjVWNzVaIiBmaWxsPSIjREVERURFIi8+Cjwvc3ZnPgo='">
                    <div class="category-info">
                        <div class="category-title">${category}</div>
                        <div class="product-count">${categoryData.products.length} products</div>
                    </div>
                    <div class="dropdown-arrow" id="arrow-${category}">▼</div>
                </div>
                <div class="products-container" id="products-${category}" style="display: none;">
                    <div class="category-search-section">
                        <div class="search-input-wrapper">
                            <input type="text" class="category-search-input" 
                                   id="search-${category}" 
                                   placeholder="🔍 Search ${category} products..."
                                   oninput="searchCategoryProducts('${category}', this.value)"
                                   onblur="hideCategorySuggestions('${category}')"
                                   onfocus="showCategorySuggestions('${category}', this.value)">
                            <div class="search-suggestions" id="suggestions-${category}"></div>
                        </div>
                        <div class="search-results-info">
                            <span class="results-count" id="count-${category}">${categoryData.products.length} products</span>
                        </div>
                    </div>
                    <div class="products-grid scrollable" id="grid-${category}">
                        ${categoryData.products.map(product => createProductCard(product)).join('')}
                    </div>
                </div>
            </div>
        `;
        
        catalog.appendChild(categorySection);
    });
}

// Generate Code 128 Barcode Pattern
function generateLinearBarcode(barcode) {
    if (!barcode || barcode.trim() === '') {
        barcode = '123456'; // Default short barcode
    }
    
    // Clean and shorten the barcode
    barcode = barcode.toString().replace(/\D/g, ''); // Remove non-digits
    if (barcode.length > 6) {
        barcode = barcode.substring(0, 6); // Keep only first 6 digits for short format
    }
    if (barcode.length < 6) {
        barcode = barcode.padEnd(6, '0'); // Pad to 6 digits
    }
    
    // Simple short barcode patterns for each digit (3 bars each)
    const shortPatterns = {
        '0': '█▁█',
        '1': '▁█▁',
        '2': '██▁',
        '3': '▁██',
        '4': '█▁▁',
        '5': '▁▁█',
        '6': '█▁▁',
        '7': '▁█▁',
        '8': '██▁',
        '9': '▁██'
    };
    
    // Generate short barcode with start/end markers
    let result = '█▁'; // Start marker
    
    // Add patterns for each digit
    for (let i = 0; i < barcode.length; i++) {
        const digit = barcode[i];
        result += shortPatterns[digit] || shortPatterns['0'];
    }
    
    result += '▁█'; // End marker
    
    return result;
}

// Create a product card
function createProductCard(product) {
    const barcodeValue = product.barcode || '';
    const barcodeDisplay = product.barcode || 'Click to add barcode';
    const barcodePattern = generateLinearBarcode(barcodeValue);
    
    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image" 
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDQwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjRjhGOUZBIi8+CjxwYXRoIGQ9Ik0xNzUgMTAwSDIyNVYxNTBIMTc1VjEwMFoiIGZpbGw9IiNERURFREUiLz4KPHN2Zz4K'">
            </div>
            
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="barcode-section">
                    <div class="barcode-display">
                        <div class="barcode-visual">
                            <div class="barcode-bars">${barcodePattern}</div>
                            <div class="barcode-number">${barcodeValue}</div>
                        </div>
                    </div>
                </div>
                <div class="default-price">Default Price: $${product.defaultPrice.toFixed(2)}</div>
            </div>
            
            <div class="product-controls">
                <div class="controls-header">
                    <h4>Customize Order</h4>
                </div>
                
                <div class="control-row">
                    <label class="control-label">Quantity:</label>
                    <input type="number" class="control-input" id="qty-${product.id}" value="1" min="0.01" step="0.01" 
                           onchange="updateTotal(${product.id})" title="Enter quantity">
                </div>
                
                <div class="control-row">
                    <label class="control-label">Unit Price ($):</label>
                    <input type="number" class="control-input" id="price-${product.id}" value="${product.defaultPrice.toFixed(2)}" 
                           min="0" step="0.01" onchange="updateTotal(${product.id})" title="Enter custom price">
                </div>
                
                <div class="total-row">
                    <div class="total-display" id="total-${product.id}">
                        <strong>Total: $${product.defaultPrice.toFixed(2)}</strong>
                    </div>
                </div>
            </div>
            
            <button class="add-to-invoice-btn" onclick="confirmAddProduct(${product.id}, '${product.name.replace(/'/g, "\\'")}')">
                📋 Add to Invoice
            </button>
        </div>
    `;
}

// Update total for a product
function updateTotal(productId) {
    const qtyInput = document.getElementById(`qty-${productId}`);
    const priceInput = document.getElementById(`price-${productId}`);
    const totalDisplay = document.getElementById(`total-${productId}`);
    
    const quantity = parseFloat(qtyInput.value) || 0;
    const price = parseFloat(priceInput.value) || 0;
    const total = quantity * price;
    
    totalDisplay.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    
    // Enhanced visual feedback for input validation
    if (quantity <= 0) {
        qtyInput.style.borderColor = '#dc3545';
        qtyInput.style.backgroundColor = '#fff5f5';
        qtyInput.setAttribute('title', 'Quantity must be greater than 0');
    } else {
        qtyInput.style.borderColor = '#28a745';
        qtyInput.style.backgroundColor = '#f8fff8';
        qtyInput.setAttribute('title', 'Valid quantity');
    }
    
    if (price < 0) {
        priceInput.style.borderColor = '#dc3545';
        priceInput.style.backgroundColor = '#fff5f5';
        priceInput.setAttribute('title', 'Price cannot be negative');
    } else {
        priceInput.style.borderColor = '#28a745';
        priceInput.style.backgroundColor = '#f8fff8';
        priceInput.setAttribute('title', 'Valid price');
    }
    
    // Update total display color based on validity
    if (quantity > 0 && price >= 0) {
        totalDisplay.style.color = '#28a745';
        totalDisplay.style.backgroundColor = '#f8fff8';
    } else {
        totalDisplay.style.color = '#dc3545';
        totalDisplay.style.backgroundColor = '#fff5f5';
    }
}

// Confirm before adding product to invoice
function confirmAddProduct(productId, productName) {
    const qtyInput = document.getElementById(`qty-${productId}`);
    const priceInput = document.getElementById(`price-${productId}`);
    
    const quantity = parseFloat(qtyInput.value) || 0;
    const price = parseFloat(priceInput.value) || 0;
    const total = quantity * price;
    
    // Validate inputs
    if (quantity <= 0) {
        showValidationError('Please enter a valid quantity greater than 0', qtyInput);
        return;
    }
    
    if (price < 0) {
        showValidationError('Please enter a valid price (0 or greater)', priceInput);
        return;
    }
    
    // Show custom confirmation modal
    showConfirmationModal(productId, productName, quantity, price, total);
}

// Show validation error with visual feedback
function showValidationError(message, inputElement) {
    // Show alert
    alert('❌ ' + message);
    
    // Add visual feedback
    inputElement.style.borderColor = '#dc3545';
    inputElement.style.boxShadow = '0 0 5px rgba(220, 53, 69, 0.5)';
    inputElement.focus();
    
    // Remove error styling after 3 seconds
    setTimeout(() => {
        inputElement.style.borderColor = '#ddd';
        inputElement.style.boxShadow = 'none';
    }, 3000);
}

// Show confirmation modal
function showConfirmationModal(productId, productName, quantity, price, total) {
    // Find the product to get its image
    let productImage = '';
    for (const category in productDatabase) {
        const product = productDatabase[category].products.find(p => p.id == productId);
        if (product) {
            productImage = product.image;
            break;
        }
    }
    
    const confirmationHTML = `
        <div class="confirmation-modal" id="confirmationModal">
            <div class="confirmation-content">
                <div class="confirmation-header">
                    <h3>🔍 Double Check Before Adding</h3>
                    <button class="close-confirmation" onclick="closeConfirmationModal()">&times;</button>
                </div>
                
                <div class="confirmation-body">
                    <div class="confirmation-product">
                        <img src="${productImage}" alt="${productName}" class="confirmation-image"
                             onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjhGOUZBIi8+CjxwYXRoIGQ9Ik00MCA0MEg2MFY2MEg0MFY0MFoiIGZpbGw9IiNERURFREUiLz4KPHN2Zz4K'">
                        <div class="confirmation-details">
                            <h4>${productName}</h4>
                            <div class="detail-row">
                                <span class="detail-label">Quantity:</span>
                                <span class="detail-value">${quantity}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Unit Price:</span>
                                <span class="detail-value">$${price.toFixed(2)}</span>
                            </div>
                            <div class="detail-row total-row">
                                <span class="detail-label">Total Amount:</span>
                                <span class="detail-value total-amount">$${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="confirmation-message">
                        <p>Are you sure you want to add this product to your invoice?</p>
                    </div>
                </div>
                
                <div class="confirmation-actions">
                    <button class="btn-cancel" onclick="closeConfirmationModal()">❌ Cancel</button>
                    <button class="btn-confirm" onclick="confirmAndAddProduct(${productId}, '${productName.replace(/'/g, "\\'\'")}', ${quantity}, ${price})">✅ Yes, Add to Invoice</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', confirmationHTML);
}

// Close confirmation modal
function closeConfirmationModal() {
    const modal = document.getElementById('confirmationModal');
    if (modal) {
        modal.remove();
    }
}

// Confirm and add product
function confirmAndAddProduct(productId, productName, quantity, price) {
    closeConfirmationModal();
    addProductToInvoiceDirectly(productId, productName, quantity, price);
}

// Add product directly to invoice (no page navigation)
function addProductToInvoiceDirectly(productId, productName, quantity, price) {
    const product = {
        id: Date.now(),
        name: productName,
        quantity: quantity,
        price: price,
        total: quantity * price
    };
    
    // Add the product to the invoice
    invoiceData.items.push(product);
    
    // Update the display
    renderInvoiceItems();
    updateSummary();
    
    // Hide the catalog and show success message
    toggleProductCatalog();
    
    // Show enhanced success message with better formatting
    showSuccessMessage(productName, quantity, price);
    
    // Scroll to the invoice table to show the new product
    setTimeout(() => {
        const invoiceTable = document.getElementById('invoiceTable');
        if (invoiceTable) {
            invoiceTable.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 500);
}

// Show success message
function showSuccessMessage(productName, quantity, price) {
    const successHTML = `
        <div class="success-modal" id="successModal">
            <div class="success-content">
                <div class="success-icon">✅</div>
                <h3>Product Added Successfully!</h3>
                <div class="success-details">
                    <p><strong>"${productName}"</strong> has been added to your invoice!</p>
                    <div class="success-summary">
                        <div>Quantity: <strong>${quantity}</strong></div>
                        <div>Price: <strong>$${price.toFixed(2)}</strong></div>
                        <div>Total: <strong>$${(quantity * price).toFixed(2)}</strong></div>
                    </div>
                    <p class="success-note">The product is now visible in your invoice table.</p>
                </div>
                <button class="success-close" onclick="closeSuccessModal()">Continue</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', successHTML);
    
    // Auto-close after 4 seconds
    setTimeout(() => {
        closeSuccessModal();
    }, 4000);
}

// Close success modal
function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.remove();
    }
}

// Add custom product
function addCustomProduct() {
    const name = document.getElementById('customName').value.trim();
    const price = parseFloat(document.getElementById('customPrice').value) || 0;
    const description = document.getElementById('customDescription').value.trim();
    const quantity = parseFloat(document.getElementById('customQuantity').value) || 0;
    
    // Validate inputs
    if (!name) {
        alert('Please enter a product name');
        document.getElementById('customName').focus();
        return;
    }
    
    if (quantity <= 0) {
        alert('Please enter a valid quantity greater than 0');
        document.getElementById('customQuantity').focus();
        return;
    }
    
    if (price < 0) {
        alert('Please enter a valid price (0 or greater)');
        document.getElementById('customPrice').focus();
        return;
    }
    
    const total = quantity * price;
    
    // Double-check confirmation
    const confirmMessage = `
Please confirm the custom product details:

Product: ${name}
${description ? `Description: ${description}\n` : ''}Quantity: ${quantity}
Unit Price: $${price.toFixed(2)}
Total: $${total.toFixed(2)}

Add this custom product to your invoice?`;
    
    if (confirm(confirmMessage)) {
        const product = {
            id: Date.now(),
            name: name,
            description: description,
            quantity: quantity,
            price: price,
            total: total
        };
        
        // Add the product to the invoice
        invoiceData.items.push(product);
        
        // Update the display
        renderInvoiceItems();
        updateSummary();
        
        // Clear the form
        document.getElementById('customName').value = '';
        document.getElementById('customPrice').value = '';
        document.getElementById('customDescription').value = '';
        document.getElementById('customQuantity').value = '1';
        
        // Hide the catalog and show success message
        toggleProductCatalog();
        
        // Show enhanced success message
        alert(`✅ Custom Product Added!

"${name}" has been added to your invoice and is visible in the table above.`);
        
        // Scroll to the invoice table
        const invoiceTable = document.getElementById('invoiceTable');
        if (invoiceTable) {
            invoiceTable.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

// Toggle custom product form overlay
function toggleCustomProductForm() {
    const overlay = document.getElementById('customProductOverlay');
    if (overlay) {
        if (overlay.style.display === 'flex') {
            overlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        } else {
            overlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            clearCustomProductForm();
            
            // Focus on product name field
            setTimeout(() => {
                document.getElementById('productName').focus();
            }, 100);
        }
    }
}

// Clear custom product form
function clearCustomProductForm() {
    document.getElementById('productName').value = '';
    document.getElementById('productDescription').value = '';
    document.getElementById('productQuantity').value = '1';
    document.getElementById('productPrice').value = '0';
    updateCustomProductDisplay();
    
    // Remove any error styling
    const inputs = document.querySelectorAll('#customProductOverlay input, #customProductOverlay select, #customProductOverlay textarea');
    inputs.forEach(input => {
        input.style.borderColor = '';
        input.style.backgroundColor = '';
    });
}

// Update custom product display (calculations and preview)
function updateCustomProductDisplay() {
    const quantity = parseFloat(document.getElementById('productQuantity').value) || 0;
    const price = parseFloat(document.getElementById('productPrice').value) || 0;
    const total = quantity * price;
    
    // Update calculation display
    document.getElementById('displayQuantity').textContent = quantity;
    document.getElementById('displayPrice').textContent = `$${price.toFixed(2)}`;
    document.getElementById('displayTotal').textContent = `$${total.toFixed(2)}`;
    
    // Update preview
    const name = document.getElementById('productName').value || 'Product Name';
    const description = document.getElementById('productDescription').value || 'Product description will appear here';
    
    document.getElementById('previewName').textContent = name;
    document.getElementById('previewDescription').textContent = description;
    document.getElementById('previewQty').textContent = quantity;
    document.getElementById('previewPrice').textContent = `$${price.toFixed(2)}`;
    document.getElementById('previewTotal').textContent = `$${total.toFixed(2)}`;
}

// Handle custom product form submission
function handleCustomProductSubmission(e) {
    e.preventDefault();
    
    const name = document.getElementById('productName').value.trim();
    const description = document.getElementById('productDescription').value.trim();
    const quantity = parseFloat(document.getElementById('productQuantity').value) || 0;
    const price = parseFloat(document.getElementById('productPrice').value) || 0;
    
    // Validation
    if (!name) {
        showFieldError('productName', 'Product name is required');
        return;
    }
    
    if (quantity <= 0) {
        showFieldError('productQuantity', 'Quantity must be greater than 0');
        return;
    }
    
    if (price < 0) {
        showFieldError('productPrice', 'Price cannot be negative');
        return;
    }
    
    // Create product object
    const product = {
        id: Date.now(),
        name: name,
        description: description || 'Custom product',
        quantity: quantity,
        price: price,
        total: quantity * price,
        category: 'Custom Products',
        isCustom: true
    };
    
    console.log('Creating custom product:', product); // Debug log
    
    // Add the product to the invoice
    invoiceData.items.push(product);
    
    // Update the display
    renderInvoiceItems();
    updateSummary();
    
    // Close the form
    toggleCustomProductForm();
    
    // Show success message
    showSuccessMessage(name, quantity, price);
    
    // Highlight the newly added item
    setTimeout(() => {
        highlightNewItems(1);
    }, 100);
}

// Show field error for validation
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.style.borderColor = '#dc3545';
        field.style.backgroundColor = '#fff5f5';
        field.setAttribute('title', message);
        
        // Show alert
        alert('❌ ' + message);
        field.focus();
        
        // Remove error styling after 3 seconds
        setTimeout(() => {
            field.style.borderColor = '';
            field.style.backgroundColor = '';
            field.removeAttribute('title');
        }, 3000);
    }
}

// Initialize custom product form when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for custom product form
    const quantityInput = document.getElementById('productQuantity');
    const priceInput = document.getElementById('productPrice');
    const nameInput = document.getElementById('productName');
    const descriptionTextarea = document.getElementById('productDescription');
    const customForm = document.getElementById('customProductForm');
    
    if (quantityInput) quantityInput.addEventListener('input', updateCustomProductDisplay);
    if (priceInput) priceInput.addEventListener('input', updateCustomProductDisplay);
    if (nameInput) nameInput.addEventListener('input', updateCustomProductDisplay);
    if (descriptionTextarea) descriptionTextarea.addEventListener('input', updateCustomProductDisplay);
    if (customForm) customForm.addEventListener('submit', handleCustomProductSubmission);
    
    // Initialize display
    updateCustomProductDisplay();
});

// Invoice Storage Functions
function saveCurrentInvoice() {
    if (invoiceData.items.length === 0) {
        alert('Cannot save empty invoice. Please add some products first.');
        return;
    }
    
    const invoiceDate = document.getElementById('invoiceDate').value || new Date().toISOString().split('T')[0];
    const buyerName = document.getElementById('buyerName').value || 'Unknown Customer';
    const companyName = document.querySelector('.company-details h2').textContent;
    
    const savedInvoice = {
        id: Date.now().toString(),
        date: invoiceDate,
        createdAt: new Date().toISOString(),
        buyerName: buyerName,
        companyName: companyName,
        items: [...invoiceData.items],
        deliveryFee: invoiceData.deliveryFee,
        subtotal: invoiceData.items.reduce((sum, item) => sum + item.total, 0),
        total: invoiceData.items.reduce((sum, item) => sum + item.total, 0) + invoiceData.deliveryFee,
        buyerInfo: {
            name: buyerName,
            phone: document.getElementById('buyerPhone').value || '',
            location: document.getElementById('buyerLocation').value || ''
        }
    };
    
    // Get existing saved invoices
    let savedInvoices = JSON.parse(localStorage.getItem('savedInvoices') || '[]');
    
    // Add new invoice
    savedInvoices.unshift(savedInvoice);
    
    // Clean old invoices (older than 1 month)
    cleanOldInvoices(savedInvoices);
    
    // Save to localStorage
    localStorage.setItem('savedInvoices', JSON.stringify(savedInvoices));
    
    // Update display
    displaySavedInvoices();
    
    // Update sidebar info
    updateSidebarInfo();
    
    alert('Invoice saved successfully!');
}

function cleanOldInvoices(invoices) {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    return invoices.filter(invoice => {
        const invoiceDate = new Date(invoice.createdAt);
        return invoiceDate > oneMonthAgo;
    });
}

function displaySavedInvoices() {
    const historyContainer = document.getElementById('invoiceHistory');
    let savedInvoices = JSON.parse(localStorage.getItem('savedInvoices') || '[]');
    
    // Clean old invoices automatically
    savedInvoices = cleanOldInvoices(savedInvoices);
    localStorage.setItem('savedInvoices', JSON.stringify(savedInvoices));
    
    if (savedInvoices.length === 0) {
        historyContainer.innerHTML = '<p style="font-size: 0.8rem; opacity: 0.7; text-align: center; margin: 1rem 0;">No saved invoices</p>';
        return;
    }
    
    historyContainer.innerHTML = savedInvoices.map(invoice => {
        const invoiceDate = new Date(invoice.createdAt);
        const isExpiring = isInvoiceExpiring(invoiceDate);
        const daysLeft = getDaysUntilExpiry(invoiceDate);
        
        return `
            <div class="saved-invoice ${isExpiring ? 'invoice-expired' : ''}" onclick="loadSavedInvoice('${invoice.id}')">
                <div class="saved-invoice-header">
                    <span class="saved-invoice-date">${invoice.date}</span>
                    <div class="saved-invoice-actions">
                        <button class="invoice-action-btn" onclick="event.stopPropagation(); deleteSavedInvoice('${invoice.id}')" title="Delete">🗑️</button>
                        <button class="invoice-action-btn" onclick="event.stopPropagation(); duplicateSavedInvoice('${invoice.id}')" title="Duplicate">📋</button>
                    </div>
                </div>
                <div class="saved-invoice-info">
                    <p><strong>${invoice.buyerName}</strong></p>
                    <p>${invoice.items.length} products - $${invoice.total.toFixed(2)}</p>
                    <p style="font-size: 0.7rem; opacity: 0.8;">
                        ${isExpiring ? `Expires in ${daysLeft} days` : `Saved ${getRelativeTime(invoiceDate)}`}
                    </p>
                </div>
            </div>
        `;
    }).join('');
}

function isInvoiceExpiring(createdDate) {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const threeDaysFromExpiry = new Date(oneMonthAgo);
    threeDaysFromExpiry.setDate(threeDaysFromExpiry.getDate() + 3);
    
    return createdDate < threeDaysFromExpiry;
}

function getDaysUntilExpiry(createdDate) {
    const expiryDate = new Date(createdDate);
    expiryDate.setMonth(expiryDate.getMonth() + 1);
    const today = new Date();
    const diffTime = expiryDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function getRelativeTime(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
}

function loadSavedInvoice(invoiceId) {
    const savedInvoices = JSON.parse(localStorage.getItem('savedInvoices') || '[]');
    const invoice = savedInvoices.find(inv => inv.id === invoiceId);
    
    if (!invoice) {
        alert('Invoice not found');
        return;
    }
    
    // Clear current invoice
    clearInvoice();
    
    // Load invoice data
    invoiceData.items = [...invoice.items];
    invoiceData.deliveryFee = invoice.deliveryFee;
    
    // Update form fields
    document.getElementById('invoiceDate').value = invoice.date;
    document.getElementById('buyerName').value = invoice.buyerInfo.name;
    document.getElementById('buyerPhone').value = invoice.buyerInfo.phone;
    document.getElementById('buyerLocation').value = invoice.buyerInfo.location;
    
    // Re-render the invoice
    renderInvoiceItems();
    updateSummary();
    
    alert('Invoice loaded successfully!');
}

function deleteSavedInvoice(invoiceId) {
    if (!confirm('Are you sure you want to delete this invoice?')) {
        return;
    }
    
    let savedInvoices = JSON.parse(localStorage.getItem('savedInvoices') || '[]');
    savedInvoices = savedInvoices.filter(inv => inv.id !== invoiceId);
    localStorage.setItem('savedInvoices', JSON.stringify(savedInvoices));
    displaySavedInvoices();
}

function duplicateSavedInvoice(invoiceId) {
    const savedInvoices = JSON.parse(localStorage.getItem('savedInvoices') || '[]');
    const invoice = savedInvoices.find(inv => inv.id === invoiceId);
    
    if (!invoice) {
        alert('Invoice not found');
        return;
    }
    
    // Create a duplicate with new ID and current date
    const duplicate = {
        ...invoice,
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString()
    };
    
    // Add to saved invoices
    const updatedInvoices = JSON.parse(localStorage.getItem('savedInvoices') || '[]');
    updatedInvoices.unshift(duplicate);
    localStorage.setItem('savedInvoices', JSON.stringify(updatedInvoices));
    
    displaySavedInvoices();
    alert('Invoice duplicated successfully!');
}

// Auto-cleanup function (run on page load)
function autoCleanupInvoices() {
    let savedInvoices = JSON.parse(localStorage.getItem('savedInvoices') || '[]');
    const originalLength = savedInvoices.length;
    
    savedInvoices = cleanOldInvoices(savedInvoices);
    localStorage.setItem('savedInvoices', JSON.stringify(savedInvoices));
    
    if (originalLength > savedInvoices.length) {
        console.log(`Automatically cleaned ${originalLength - savedInvoices.length} expired invoices`);
    }
    
    displaySavedInvoices();
}

// Customer Storage Functions
function saveCurrentCustomer() {
    const customerName = document.getElementById('buyerName').value.trim();
    const customerPhone = document.getElementById('buyerPhone').value.trim();
    const customerLocation = document.getElementById('buyerLocation').value.trim();
    
    if (!customerName && !customerPhone && !customerLocation) {
        alert('Please fill in at least one customer field (Name, Phone, or Location) before saving.');
        return;
    }
    
    const customer = {
        id: Date.now().toString(),
        name: customerName || 'Unknown Customer',
        phone: customerPhone || '',
        location: customerLocation || '',
        createdAt: new Date().toISOString(),
        lastUsed: new Date().toISOString()
    };
    
    // Get existing saved customers
    let savedCustomers = JSON.parse(localStorage.getItem('savedCustomers') || '[]');
    
    // Check if customer already exists (by name or phone)
    const existingCustomerIndex = savedCustomers.findIndex(c => 
        (c.name === customer.name && customer.name !== 'Unknown Customer') ||
        (c.phone === customer.phone && customer.phone !== '')
    );
    
    if (existingCustomerIndex !== -1) {
        // Update existing customer
        savedCustomers[existingCustomerIndex] = {
            ...savedCustomers[existingCustomerIndex],
            name: customer.name,
            phone: customer.phone,
            location: customer.location,
            lastUsed: customer.lastUsed
        };
        alert('Customer information updated successfully!');
    } else {
        // Add new customer
        savedCustomers.unshift(customer);
        alert('Customer saved successfully!');
    }
    
    // Limit to 50 customers to prevent storage overflow
    if (savedCustomers.length > 50) {
        savedCustomers = savedCustomers.slice(0, 50);
    }
    
    // Save to localStorage
    localStorage.setItem('savedCustomers', JSON.stringify(savedCustomers));
    
    // Update display
    displaySavedCustomers();
}

function displaySavedCustomers() {
    const historyContainer = document.getElementById('customerHistory');
    const savedCustomers = JSON.parse(localStorage.getItem('savedCustomers') || '[]');
    
    if (savedCustomers.length === 0) {
        historyContainer.innerHTML = '<p style="font-size: 0.8rem; opacity: 0.7; text-align: center; margin: 1rem 0;">No saved customers</p>';
        return;
    }
    
    // Sort by last used (most recent first)
    savedCustomers.sort((a, b) => new Date(b.lastUsed) - new Date(a.lastUsed));
    
    historyContainer.innerHTML = savedCustomers.map(customer => {
        const lastUsed = new Date(customer.lastUsed);
        const phoneDisplay = customer.phone ? `📞 ${customer.phone}` : '';
        const locationDisplay = customer.location ? `📍 ${customer.location}` : '';
        
        return `
            <div class="saved-customer" onclick="loadSavedCustomer('${customer.id}')">
                <div class="saved-customer-header">
                    <span class="saved-customer-name">${customer.name}</span>
                    <div class="saved-customer-actions">
                        <button class="customer-action-btn" onclick="event.stopPropagation(); deleteSavedCustomer('${customer.id}')" title="Delete">🗑️</button>
                        <button class="customer-action-btn" onclick="event.stopPropagation(); editSavedCustomer('${customer.id}')" title="Edit">✏️</button>
                    </div>
                </div>
                <div class="saved-customer-info">
                    ${phoneDisplay ? `<p>${phoneDisplay}</p>` : ''}
                    ${locationDisplay ? `<p>${locationDisplay}</p>` : ''}
                    <p style="font-size: 0.7rem; opacity: 0.8;">
                        Last used ${getRelativeTime(lastUsed)}
                    </p>
                </div>
            </div>
        `;
    }).join('');
}

function loadSavedCustomer(customerId) {
    const savedCustomers = JSON.parse(localStorage.getItem('savedCustomers') || '[]');
    const customer = savedCustomers.find(c => c.id === customerId);
    
    if (!customer) {
        alert('Customer not found');
        return;
    }
    
    // Load customer data into form
    document.getElementById('buyerName').value = customer.name !== 'Unknown Customer' ? customer.name : '';
    document.getElementById('buyerPhone').value = customer.phone;
    document.getElementById('buyerLocation').value = customer.location;
    
    // Update last used timestamp
    customer.lastUsed = new Date().toISOString();
    const updatedCustomers = savedCustomers.map(c => c.id === customerId ? customer : c);
    localStorage.setItem('savedCustomers', JSON.stringify(updatedCustomers));
    
    // Refresh display
    displaySavedCustomers();
    
    alert('Customer information loaded successfully!');
}

function deleteSavedCustomer(customerId) {
    if (!confirm('Are you sure you want to delete this customer?')) {
        return;
    }
    
    let savedCustomers = JSON.parse(localStorage.getItem('savedCustomers') || '[]');
    savedCustomers = savedCustomers.filter(c => c.id !== customerId);
    localStorage.setItem('savedCustomers', JSON.stringify(savedCustomers));
    displaySavedCustomers();
    
    alert('Customer deleted successfully!');
}

function editSavedCustomer(customerId) {
    const savedCustomers = JSON.parse(localStorage.getItem('savedCustomers') || '[]');
    const customer = savedCustomers.find(c => c.id === customerId);
    
    if (!customer) {
        alert('Customer not found');
        return;
    }
    
    // Load customer into form for editing
    loadSavedCustomer(customerId);
    
    // Scroll to buyer information section
    const buyerInfo = document.querySelector('.buyer-info');
    if (buyerInfo) {
        buyerInfo.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    alert('Customer loaded for editing. Make your changes and save again to update.');
}

function searchCustomers(searchTerm) {
    const savedCustomers = JSON.parse(localStorage.getItem('savedCustomers') || '[]');
    const filteredCustomers = savedCustomers.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm) ||
        customer.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Update display with filtered results
    const historyContainer = document.getElementById('customerHistory');
    if (filteredCustomers.length === 0) {
        historyContainer.innerHTML = '<p style="font-size: 0.8rem; opacity: 0.7; text-align: center; margin: 1rem 0;">No customers found</p>';
        return;
    }
    
    // Display filtered customers (reuse existing display logic)
    // This function could be expanded to show search results
}

// Initialize invoice history on page load
document.addEventListener('DOMContentLoaded', function() {
    autoCleanupInvoices();
    displaySavedCustomers();
    
    // Set up periodic cleanup (every hour)
    setInterval(autoCleanupInvoices, 60 * 60 * 1000);
});




